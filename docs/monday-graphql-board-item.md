# Querying monday.com GraphQL for Board Items

This guide explains how to fetch board items from monday.com's GraphQL API, including authentication, crafting queries, paginating through items, filtering results, and handling errors. Use it as a quick reference when building internal tooling, data integrations, or debugging board data access.

---

## Prerequisites

- A monday.com account and the numeric ID of the board you want to read.
- A **user API token**, **OAuth token**, or **short-lived session token** with at least `boards:read` scope.
- A GraphQL-capable HTTP client (`curl`, Postman, Insomnia) or an app runtime (Node.js, Python, etc.).
- Optional: `jq` for formatting JSON when using the CLI.

> **Tip:** Store tokens in environment variables or secret managers—never commit them to the repository.

---

## Core Endpoint & Headers

| Setting        | Value/Notes                                                                                   |
| -------------- | --------------------------------------------------------------------------------------------- |
| URL            | `https://api.monday.com/v2`                                                                    |
| Method         | `POST`                                                                                        |
| Headers        | `Authorization: <MONDAY_API_TOKEN>`<br>`Content-Type: application/json`                       |
| Optional header| `API-Version: 2023-10` (or newer) if you rely on features gated behind API versioning.        |

The body of every request must contain a `query` string and, optionally, a `variables` JSON object.

---

## Canonical Board Item Query

```graphql
query BoardItems($boardIds: [ID!], $limit: Int!, $cursor: String) {
  boards(ids: $boardIds) {
    id
    name
    items_page(limit: $limit, cursor: $cursor) {
      cursor
      items {
        id
        name
        created_at
        creator {
          id
          name
        }
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
      }
    }
  }
}
```

**Key fields**

- `boards(ids: [...])`: limits results to specific boards (can receive multiple IDs).
- `items_page`: the recommended way to list items. It paginates and supports complex filters.
- `cursor`: opaque token used for the next page; pass it back via the `$cursor` variable.
- `column_values`: returns each column in both human-friendly (`text`) and raw JSON (`value`) forms.

---

## Quickstart with `curl`

```bash
export MONDAY_API_TOKEN="<your-token>"
export BOARD_ID="1234567890"

curl https://api.monday.com/v2 \
  -H "Authorization: $MONDAY_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data @- <<'EOF' | jq
{
  "query": "query ($boardIds: [ID!], $limit: Int!) { boards(ids: $boardIds) { id name items_page(limit: $limit) { items { id name column_values { id text } } } } }",
  "variables": {
    "boardIds": [$BOARD_ID],
    "limit": 25
  }
}
EOF
```

Adjust `limit` (1–500) to control batch size. If the response includes a non-null `cursor`, rerun the query with that cursor in the variables block to fetch the next page.

---

## Filtering & Searching Items

`items_page` accepts a `query_params` argument, letting you filter server-side:

```graphql
items_page(
  limit: 50
  query_params: {
    rules: [
      {
        column_id: "status"
        operator: contains_text
        values: ["Done"]
      }
    ]
    conjunction: and
  }
)
```

Useful operators include `contains_text`, `exists`, `date_between`, and `greater_than`. Combine multiple rules with `and`/`or` in `conjunction`. Filtering at the API-level reduces client-side processing and respects monday's rate limits.

---

## Fetching a Specific Item

When you already know an item ID, use the lightweight `items` field:

```graphql
query ItemById($itemIds: [ID!]) {
  items(ids: $itemIds) {
    id
    name
    column_values(ids: ["status", "person"]) {
      id
      text
      value
    }
    updates {
      id
      text_body
      created_at
    }
  }
}
```

Pass `column_values(ids: [...])` to limit the response to just the columns you need.

---

## Example Node.js Script

```ts
import fetch from "node-fetch";

const MONDAY_TOKEN = process.env.MONDAY_API_TOKEN;
const BOARD_ID = Number(process.env.BOARD_ID);

async function listItems(limit = 25, cursor = null) {
  const query = `
    query ($boardIds: [ID!], $limit: Int!, $cursor: String) {
      boards(ids: $boardIds) {
        items_page(limit: $limit, cursor: $cursor) {
          cursor
          items {
            id
            name
            column_values {
              id
              text
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.monday.com/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: MONDAY_TOKEN
    },
    body: JSON.stringify({
      query,
      variables: { boardIds: [BOARD_ID], limit, cursor }
    })
  });

  const { data, errors } = await res.json();
  if (errors) throw new Error(JSON.stringify(errors, null, 2));
  return data.boards[0].items_page;
}
```

Loop on `items_page.cursor` until it returns `null` to fetch the entire board safely without triggering rate limits.

---

## Pagination Strategy

1. Start with `cursor: null` and a reasonable `limit` (25–100).
2. Process the current `items`.
3. If `cursor` is non-null, pass it back in the next request.
4. Stop when the API returns `cursor: null`.

This cursor-based pagination is stable—even if items are added or removed during your sync—because monday snapshots the dataset behind the cursor.

---

## Common Error Responses

| HTTP Status | Meaning / Fix                                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| `401`       | Token missing or expired. Re-issue or refresh your OAuth token.                                             |
| `403`       | Token lacks `boards:read` scope or you do not belong to the board's workspace.                              |
| `429`       | Rate limited. Back off exponentially and respect the documented burst/steady limits (default 10 req/sec).   |
| `500/502`   | monday outage or transient error. Retry with jitter; file a support ticket if persistent.                   |

GraphQL-level errors return inside the `errors` array even with `200 OK`; always check for it before using `data`.

---

## Best Practices

- **Limit columns**: specify `column_values(ids: [...])` whenever possible to reduce payload size.
- **Cache board metadata** (column definitions, groups) since they rarely change.
- **Respect rate limits** by batching requests and honoring the `429` retry-after guidance.
- **Secure tokens**: load them from `.env` or your secrets manager—never log them or embed in client-side code.
- **Version your queries**: keep GraphQL operations alongside application code so changes are reviewable.

---

## Helpful Links

- monday.com GraphQL API reference: <https://developer.monday.com/api-reference/reference/introduction/>
- Rate limit policy: <https://developer.monday.com/api-reference/docs/rate-limits>
- Column value parsing tips: <https://developer.monday.com/api-reference/docs/columns-collection>

---

For additional monday GraphQL recipes or integration questions, open a discussion in this repository or reach out to the internal #vibe-platform Slack channel.
