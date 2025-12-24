# Query monday.com Board Items with GraphQL

This guide explains how to pull detailed monday.com board item data through the GraphQL API that powers monday.com's platform. It covers authentication, request structure, common query patterns, pagination, and troubleshooting so you can confidently integrate board data into your own tooling.

---

## TL;DR

1. Send `POST https://api.monday.com/v2` (or `/v2/file` for assets) with the headers:
   - `Authorization: <your-monday-token>`
   - `Content-Type: application/json`
2. Wrap your GraphQL document in `{ "query": "...", "variables": { ... } }`.
3. Boards, items, column values, updates, activity logs, and files are all exposed as nested GraphQL fields—ask only for what you need to keep the complexity score low.

---

## Prerequisites

- A monday.com user with permission to view the target board.
- Either a **personal API token** (Admin > Developers > My tokens) or an **OAuth 2.0** app installed on the account.
- An HTTP client that can send JSON bodies (curl, Postman, Thunder Client, GraphiQL, or code).
- Optional: `jq` or another JSON formatter to inspect responses.

---

## 1. Authenticate

### Personal API token

1. In monday.com, open **Avatar → Developers → My tokens**.
2. Click **Generate** (or copy an existing token).
3. Store it as an environment variable, for example:

   ```bash
   export MONDAY_TOKEN="your-long-token"
   ```

### OAuth 2.0 app

1. Create an app in **Avatar → Developers → Apps**.
2. Configure the OAuth redirect URL and requested scopes (typically `boards:read`).
3. Exchange the authorization code for an access token on your backend.
4. Use the resulting bearer token as the `Authorization` header in every GraphQL request.

> Personal tokens are easiest for internal tooling. Use OAuth for multi-account apps or when you need end-user consent.

---

## 2. Collect the identifiers you need

| Object            | How to find it                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Board ID**      | Open the board in the browser and inspect the URL: `https://monday.com/boards/<boardId>/...`                             |
| **Item ID**       | Click the item → expand the info pane → `Item ID` is listed under the item name.                                        |
| **Column IDs**    | Hover a column header → three-dot menu → **Column settings** → `Column ID`.                                             |
| **Workspace/Team**| In GraphQL you can request `boards (workspace_ids: [...])` or filter with `owners { id }`.                              |

You only need the IDs relevant to the data you plan to pull.

---

## 3. Shape the GraphQL request

- **Endpoint:** `https://api.monday.com/v2`
- **Method:** `POST`
- **Headers:** `Authorization`, `Content-Type: application/json`
- **Body:** `{"query": "GraphQL document", "variables": {}}`

Every field you request consumes **complexity**. monday.com enforces a per-minute limit (typically 10,000). Ask for only the columns and sub-objects you truly need.

---

## 4. Essential query patterns

### 4.1 Pull board metadata and the latest items

```graphql
query BoardWithItems($boardId: [ID!], $limit: Int!) {
  boards(ids: $boardId) {
    id
    name
    state
    items_page(limit: $limit) {
      cursor
      items {
        id
        name
        created_at
        creator_id
        column_values {
          id
          text
          value
        }
      }
    }
  }
}
```

Pass `variables: { "boardId": 1234567890, "limit": 25 }`.

### 4.2 Fetch a specific item with rich column data

```graphql
query ItemDetails($itemId: [ID!]) {
  items(ids: $itemId) {
    id
    name
    board {
      id
      name
    }
    column_values {
      id
      title
      text         # human-readable value
      value        # JSON payload (e.g., status index, person IDs)
    }
    subitems {
      id
      name
    }
    updates(limit: 5) {
      id
      body
      created_at
      creator {
        id
        name
      }
    }
  }
}
```

### 4.3 Narrow columns to reduce payload size

```graphql
query ItemStatusOnly($itemId: [ID!]) {
  items(ids: $itemId) {
    id
    name
    column_values(ids: ["status", "person", "due_date"]) {
      id
      text
    }
  }
}
```

### 4.4 Paginate large boards with cursors

```graphql
query PageItems($boardId: [ID!], $cursor: String) {
  boards(ids: $boardId) {
    items_page(limit: 50, cursor: $cursor) {
      cursor        # pass this cursor into the next call
      items {
        id
        name
      }
    }
  }
}
```

Stop paginating when the API returns `cursor: null`.

---

## 5. Reading column values safely

Column `value` fields are JSON blobs. Common patterns:

| Column type | `value` payload (truncated)                               | Interpretation                                |
| ----------- | --------------------------------------------------------- | --------------------------------------------- |
| Status      | `{"index":1,"post_id":null}`                              | `index` corresponds to a label color.         |
| People      | `{"personsAndTeams":[{"id":12345,"kind":"person"}]}`      | IDs map to account members or teams.          |
| Date        | `{"date":"2024-12-31","changed_at":"2024-10-01T10:22:00Z"}`| ISO date string plus audit information.       |

- Use the `text` field for a quick, human-readable representation.
- Parse `value` as JSON when you need structured data (e.g., to map status index to label names, or to extract multiple assignees).

---

## 6. Example HTTP requests

### 6.1 `curl`

```bash
curl https://api.monday.com/v2 \
  -H "Content-Type: application/json" \
  -H "Authorization: ${MONDAY_TOKEN}" \
  -d '{"query":"query ($itemId: [ID!]) { items(ids: $itemId) { id name column_values { id text } } }","variables":{"itemId":[1234567890]}}'
```

Format the output with `| jq` when needed.

### 6.2 Node.js using `node-fetch`

```javascript
import fetch from "node-fetch";

const MONDAY_TOKEN = process.env.MONDAY_TOKEN;
const query = `
  query ($boardId: [ID!]) {
    boards(ids: $boardId) {
      id
      name
      items_page(limit: 10) {
        items {
          id
          name
        }
      }
    }
  }
`;

async function loadBoard(boardId) {
  const response = await fetch("https://api.monday.com/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: MONDAY_TOKEN
    },
    body: JSON.stringify({ query, variables: { boardId } })
  });

  const { data, errors } = await response.json();
  if (errors) {
    throw new Error(JSON.stringify(errors));
  }
  return data.boards[0];
}
```

Run with `MONDAY_TOKEN=<token> node script.mjs`.

---

## 7. Best practices & limits

- **Complexity:** Responses include `Complexity-Unit` and `Complexity-Remaining` headers. If you approach the limit, split queries into smaller chunks or poll less frequently.
- **Use `items_page`:** It is more efficient than the legacy `items` connection for large boards.
- **Cache reference data:** Board/column metadata changes infrequently—cache it to avoid repeating expensive calls.
- **Prefer variables:** They keep queries reusable and guard against injection.
- **Respect rate limits:** Use exponential backoff on HTTP 429 responses.
- **Security:** Never ship tokens in client-side code. Proxy requests through your backend for production apps.

---

## 8. Troubleshooting

| Symptom                         | Likely cause / fix                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `401 Unauthorized`             | Missing/invalid token. Double-check the header (no `Bearer` prefix is needed).                              |
| `404 Not Found` or null data   | Token lacks permission to view the board, or the board/item was archived.                                   |
| `ComplexityException`          | Query is too expensive. Request fewer nested fields or batch the work.                                      |
| Empty `column_values.value`    | Some columns (e.g., formulas) expose only the `text` representation—use `text` instead of `value`.          |
| `items_page` returns null      | The board is empty or you requested a cursor from another board. Restart without the cursor parameter.      |

If monday.com returns an `errors` array, log the `message` and `locations` fields to pinpoint the field causing the issue.

---

## 9. Helpful references

- monday.com GraphQL API docs: <https://developer.monday.com/api-reference/reference/overview>
- Complexity and rate limits: <https://developer.monday.com/api-reference/reference/complexity>
- monday-sdk-js: <https://github.com/mondaycom/monday-sdk-js>
- Support & community: <https://community.monday.com/c/developers-apis/7>

Use this README as a starting point and tailor the query structure to match the columns and automation logic on your specific board.
