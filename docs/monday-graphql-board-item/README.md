# Querying monday.com Board Items with GraphQL

This guide walks through every step required to read monday.com board items through the GraphQL API—from securing an API token to writing robust queries that return column values, subitems, updates, and files. Use it as a quick-start and as a reference when you need to troubleshoot or extend your integration.

## Table of contents

1. [Prerequisites](#prerequisites)
2. [Create an API token](#create-an-api-token)
3. [Locate board, item, and column IDs](#locate-board-item-and-column-ids)
4. [Understand the GraphQL request](#understand-the-graphql-request)
5. [Basic “get board item” query](#basic-get-board-item-query)
6. [Run the query with cURL](#run-the-query-with-curl)
7. [Call the API from JavaScript/TypeScript](#call-the-api-from-javascripttypescript)
8. [Requesting column values, subitems, files, and updates](#requesting-column-values-subitems-files-and-updates)
9. [Filtering, searching, and pagination patterns](#filtering-searching-and-pagination-patterns)
10. [Interpreting column values](#interpreting-column-values)
11. [Performance, rate limits, and complexity](#performance-rate-limits-and-complexity)
12. [Troubleshooting](#troubleshooting)
13. [Additional references](#additional-references)

---

## Prerequisites

- A monday.com account with access to the board you want to read.
- A **Board ID** (every board URL looks like `https://<account>.monday.com/boards/<BOARD_ID>`).
- Optional but recommended: a target **Item ID** (hover an item → “Copy item link”, the number after `/pulses/` is the ID).
- A personal API token or OAuth 2.0 access token with permission to read the board.
- Any HTTP client (curl, Postman, Thunder Client) or runtime (Node.js, Deno, Python, etc.).

> **Tip:** Keep tokens in environment variables (for example `MONDAY_API_TOKEN`) and never hard-code them in source control.

## Create an API token

1. In monday.com choose **Avatar → Developers → My Tokens** (or go to `https://<account>.monday.com/apps/manage/tokens`).
2. Click **Generate** (or copy an existing token). Give the token a descriptive name so you can rotate it later.
3. Store it in a secure secret store (1Password, Vault, GitHub Actions secrets, etc.).

For OAuth 2.0 apps, finish the OAuth flow and keep the resulting access token; the rest of the guide is identical.

## Locate board, item, and column IDs

| Entity | How to obtain | Example |
| --- | --- | --- |
| Board ID | URL fragment after `/boards/` | `https://acme.monday.com/boards/123456789` → `123456789` |
| Item ID | Copy link from the item context menu or look at `/pulses/<ITEM_ID>` | `https://acme.monday.com/boards/123456789/pulses/987654321` → `987654321` |
| Column ID | Hover a column header → **Column settings → Column info** | `status`, `people`, `date4`, etc. |

You can also fetch IDs programmatically via GraphQL (for example `boards { id name columns { id title } }`).

## Understand the GraphQL request

- **Endpoint:** `https://api.monday.com/v2`
- **Method:** `POST`
- **Headers:**
  - `Authorization: <YOUR_API_TOKEN>` (token only, no “Bearer” prefix required—although the API also accepts `Bearer <token>`).
  - `Content-Type: application/json`
  - Optional: `API-Version: 2023-10` (stabilizes responses when monday ships new API versions).
- **Body:**

```json
{
  "query": "GraphQL document as a string",
  "variables": { "optional": "JSON variables object" }
}
```

Every query must be a POST request—even for reads. Errors are returned in the standard GraphQL `errors` array alongside the `data` object.

## Basic “get board item” query

```graphql
query GetBoardItem($boardIds: [Int!]!, $itemIds: [Int!]) {
  boards(ids: $boardIds) {
    id
    name
    items(ids: $itemIds) {
      id
      name
      state         # active | archived | deleted
      created_at
      creator {
        id
        name
      }
    }
  }
}
```

Variables to pass with the request:

```json
{
  "boardIds": [123456789],
  "itemIds": [987654321]
}
```

If `itemIds` is omitted, the API returns every item on the board (potentially thousands), so keep it narrow or paginate with `items_page`.

## Run the query with cURL

```bash
export MONDAY_API_TOKEN="your_token_here"

curl https://api.monday.com/v2 \
  -H "Authorization: $MONDAY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d @- <<'EOF'
{
  "query": "query ($boardIds: [Int!]!, $itemIds: [Int!]) { boards(ids: $boardIds) { name items(ids: $itemIds) { id name state } } }",
  "variables": {
    "boardIds": [123456789],
    "itemIds": [987654321]
  }
}
EOF
```

The API responds with:

```json
{
  "data": {
    "boards": [
      {
        "name": "Product Roadmap",
        "items": [
          {
            "id": "987654321",
            "name": "Add GraphQL docs",
            "state": "active"
          }
        ]
      }
    ]
  },
  "account_id": 11223344
}
```

## Call the API from JavaScript/TypeScript

```ts
import fetch from "node-fetch";

const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN!;

const query = `
  query ($boardIds: [Int!]!, $itemIds: [Int!]) {
    boards(ids: $boardIds) {
      id
      name
      items(ids: $itemIds) {
        id
        name
        column_values {
          id
          title
          text   # always a human-readable fallback
          value  # JSON payload, varies per column type
        }
      }
    }
  }
`;

async function getBoardItems(boardIds: number[], itemIds: number[]) {
  const response = await fetch("https://api.monday.com/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: MONDAY_API_TOKEN
    },
    body: JSON.stringify({ query, variables: { boardIds, itemIds } })
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }

  return json.data.boards.flatMap((board: any) => board.items);
}
```

## Requesting column values, subitems, files, and updates

```graphql
query DetailedBoardItem($boardId: [Int!]!, $itemId: [Int!]) {
  boards(ids: $boardId) {
    name
    workspace {
      id
      name
    }
    items(ids: $itemId) {
      id
      name
      group {
        id
        title
      }
      column_values {
        id
        title
        text
        value
      }
      updates(limit: 5) {
        id
        body_text
        creator {
          name
        }
        created_at
      }
      subitems {
        id
        name
        column_values(ids: ["status", "date4"]) {
          id
          text
        }
      }
      assets {
        id
        public_url
        file_extension
      }
    }
  }
}
```

### Limit returned columns

Filtering column values avoids large payloads:

```graphql
column_values(ids: ["status", "timeline", "people"])
```

### Retrieve the “Activity Log” (updates) in chronological order

`updates(limit: 10, page: 1, newest_first: false)` returns the oldest ones first.

## Filtering, searching, and pagination patterns

### 1. `items_by_column_values`

Fetch items that match a specific column value (for example “Status = Done”):

```graphql
query ItemsByStatus(
  $boardId: Int!,
  $columnId: String!,
  $value: String!,
  $limit: Int
) {
  items_by_column_values(
    board_id: $boardId,
    column_id: $columnId,
    column_value: $value,
    limit: $limit
  ) {
    id
    name
    column_values(ids: [$columnId]) {
      text
    }
  }
}
```

`column_value` expects a stringified representation (for Status columns, pass the label text). Limit defaults to 25 and caps at 150 items.

### 2. `items_page` (cursor-based pagination)

Use `items_page` to fetch large boards without hitting payload limits:

```graphql
query PaginatedItems($boardId: [Int!]!, $limit: Int!, $cursor: String) {
  boards(ids: $boardId) {
    items_page(limit: $limit, cursor: $cursor) {
      cursor          # pass this into the next call
      items {
        id
        name
        updated_at
      }
    }
  }
}
```

Recommended settings:

- `limit` between 25 and 500 (max allowed).
- Persist the last `cursor` so you can resume pagination after failures.
- Stop calling once the API returns `cursor: null`.

### 3. Filter by workspace, group, or state

Combine `items_page` with `query_params` to scope results:

```graphql
boards(ids: $boardId) {
  items_page(
    limit: 100,
    query_params: { group_ids: ["topics"], state: active }
  ) {
    items { id name }
  }
}
```

Accepted filters: `group_ids`, `newest_first`, `order_by: updated_at`, `state` (`active`, `archived`, `deleted`), and `ids`.

## Interpreting column values

Each `column_values[]` entry includes:

- `text`: Always a human-readable string (localized, stripped of markup).
- `value`: JSON specific to the column type.
- `id` / `title`: Useful for mapping to your internal schema.

Examples:

```json
{
  "id": "status",
  "title": "Status",
  "text": "In Progress",
  "value": "{\"index\":1,\"post_id\":null}"
}
```

```json
{
  "id": "timeline",
  "title": "Timeline",
  "text": "May 27 - Jun 5",
  "value": "{\"from\":\"2025-05-27\",\"to\":\"2025-06-05\",\"changed_at\":\"2025-05-24\"}"
}
```

Common column-specific tips:

- **People** column: `value` is an array of user IDs (`{"personsAndTeams":[{"id":12345,"kind":"person"}]}`).
- **Numbers** column: `text` is formatted while `value` is raw numeric (string) data (`{"changed_at":"..." ,"number":"42"}`).
- **Dropdown / Status**: `value.index` matches the label order; `text` is the label itself.
- **Link** column: `value` contains `{ "url": "...", "text": "..." }`.
- **Mirror** columns cannot be queried directly—you must query the source board.

Always parse `value` defensively; fields may be absent if the column is empty.

## Performance, rate limits, and complexity

- Each account has a **complexity budget** (default: 10,000 per minute). Simple `items` queries cost ~1, heavy nested structures cost more.
- Request only the fields you need (GraphQL makes this easy).
- Prefer `items_page` over fetching all items at once.
- You can ask the API to return the remaining budget by adding the `complexity` field to your query:

```graphql
{
  complexity {
    before          # usage before the query runs
    after           # usage after the query runs
    limit           # your minute-based ceiling
    reset_in_x_seconds
  }
}
```

- Responses also include the `X-RateLimit-Remaining` header—log it in production to spot throttling early.

If you exceed the limit, monday returns HTTP 429 and a `retry_after` hint. Exponential backoff with jitter is recommended.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `401 Unauthorized` | Missing or invalid token | Regenerate the token or ensure you are sending `Authorization` header. |
| `Permission denied` error in GraphQL | Token lacks access to the board | Share the board with the user/app tied to the token or use an OAuth app installed on that account. |
| Empty `items[]` array | Wrong board/item IDs or the item is archived/deleted | Double-check IDs and add `state: all` filters if you need archived items. |
| `Complexity budget exhausted` | Query returned too many nested fields or items | Remove unused fields, paginate, or schedule the job later. |
| Column `value` is `null` even though UI shows data | The column is a mirror/formula that calculates on the fly | Query the source board for mirrors, evaluate formulas client-side, or fetch the dependency columns directly. |
| `Cannot return null for non-nullable field` | Requesting a field that is not initialized (e.g., `creator` on legacy items) | Wrap optional fields in fragments or make them nullable in your schema definition. |

## Additional references

- [monday.com GraphQL API reference](https://developer.monday.com/api-reference/reference)
- [Rate limits & complexity docs](https://developer.monday.com/api-reference/docs/rate-limits-section)
- [Authentication overview](https://developer.monday.com/api-reference/docs/authentication)
- [API Playground (GraphiQL)](https://api.monday.com/playground) — experiment with queries interactively.

Feel free to copy snippets from this README into your integration, customize them for your use case, and keep the token handling secure.
