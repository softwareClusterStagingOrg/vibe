# Creating a monday.com Board with GraphQL

This guide walks through creating a monday.com board programmatically with the monday GraphQL API. It assumes you already work in this repository and need reproducible steps for provisioning a fresh board (for demos, QA environments, or automation pipelines).

## Prerequisites

- A monday.com account with permissions to create boards.
- A permanent or short-lived API token generated from **Admin > Developers > My tokens**.
- `curl`, Postman, or any HTTP client capable of sending GraphQL requests.
- Optional: Node.js (v18+) if you want to run the JavaScript example.

The GraphQL endpoint is `https://api.monday.com/v2`. All requests must include the `Authorization` header with your API token.

```http
Authorization: <YOUR_MONDAY_API_TOKEN>
Content-Type: application/json
```

## 1. Shape Your Board Definition

Decide what the board should represent before you hit the API:

- **Name**: A human-readable string, e.g., "Growth Experiments – Q4".
- **Kind**: `public`, `private`, or `share`. Most internal automation uses `private`.
- **Workspace** (optional): Provide a workspace ID if you do not want the default workspace.
- **Columns**: List the column types you need (status, people, date, text, numbers, files, etc.).
- **Groups/Pulses**: You can add groups and items after the board exists; capture them in your plan.

Documenting these choices up front keeps your script readable and makes future automation easier to tweak.

## 2. Create the Board via GraphQL

Use the `create_board` mutation. Supply variables to avoid string interpolation issues.

```graphql
mutation CreateBoard($board_name: String!, $board_kind: BoardKind!, $workspace_id: Int) {
  create_board(
    board_name: $board_name
    board_kind: $board_kind
    workspace_id: $workspace_id
  ) {
    id
    name
    board_kind
    workspace_id
  }
}
```

### Example Request with `curl`

```bash
curl https://api.monday.com/v2 \
  -H "Authorization: $MONDAY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation CreateBoard($board_name: String!, $board_kind: BoardKind!, $workspace_id: Int) { create_board(board_name: $board_name, board_kind: $board_kind, workspace_id: $workspace_id) { id name board_kind workspace_id } }",
    "variables": {
      "board_name": "Automation Demo Board",
      "board_kind": "private",
      "workspace_id": 123456789
    }
  }'
```

If you omit `workspace_id`, the board is created in the default workspace tied to your API token.

### Example Request with `fetch`

```js
import fetch from "node-fetch";

const MONDAY_ENDPOINT = "https://api.monday.com/v2";
const MONDAY_TOKEN = process.env.MONDAY_TOKEN;

const query = `
  mutation CreateBoard($board_name: String!, $board_kind: BoardKind!, $workspace_id: Int) {
    create_board(
      board_name: $board_name
      board_kind: $board_kind
      workspace_id: $workspace_id
    ) {
      id
      name
      board_kind
      workspace_id
    }
  }
`;

const variables = {
  board_name: "Automation Demo Board",
  board_kind: "private",
  workspace_id: 123456789
};

const response = await fetch(MONDAY_ENDPOINT, {
  method: "POST",
  headers: {
    Authorization: MONDAY_TOKEN,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ query, variables })
});

const { data, errors } = await response.json();
if (errors) console.error(errors);
console.log(data.create_board);
```

## 3. Add Columns (Optional but Typical)

New boards contain the default `Name`, `Person`, `Status`, and `Date` columns. Use `create_column` to append additional structure:

```graphql
mutation CreateTextColumn($board_id: Int!, $title: String!) {
  create_column(
    board_id: $board_id
    title: $title
    column_type: text
  ) {
    id
    title
    type
  }
}
```

Run separate mutations for each column you need (e.g., `dropdown`, `numbers`, `files`). Capture the returned column IDs if you plan to seed rows immediately afterward.

## 4. Seed Items (Rows)

Once the board exists (and any custom columns are in place), insert items with the `create_item` mutation. Use `column_values` to populate custom columns in a single call.

```graphql
mutation CreateBoardItem($board_id: Int!, $group_id: String!, $item_name: String!, $column_values: JSON!) {
  create_item(
    board_id: $board_id
    group_id: $group_id
    item_name: $item_name
    column_values: $column_values
  ) {
    id
    name
    board {
      id
      name
    }
  }
}
```

`column_values` must be a JSON string that maps column IDs to serialized column payloads:

```json
{
  "status": { "label": "Planned" },
  "person": { "personsAndTeams": [{ "id": 98765432, "kind": "person" }] },
  "date4": { "date": "2025-01-15" },
  "text": "Kickoff checklist pending"
}
```

## 5. Troubleshooting Checklist

- **Permission errors**: Ensure the API token belongs to a user with board creation rights inside the selected workspace.
- **`workspace_id` invalid**: Confirm the workspace actually exists in the account (query `workspaces` to list them).
- **Rate limiting**: monday.com currently caps bursts at ~120 requests/min per token; stagger requests or use batching.
- **Column payload mismatch**: Column IDs are opaque (e.g., `text_1` or `status4`). Query the board’s `columns { id title type settings_str }` to verify the ID and expected JSON structure before writing values.

## 6. Useful Companion Queries

```graphql
query ListWorkspaces {
  workspaces {
    id
    name
    kind
  }
}
```

```graphql
query InspectBoard($board_id: [Int]) {
  boards(ids: $board_id) {
    id
    name
    board_kind
    workspace_id
    columns {
      id
      title
      type
      settings_str
    }
    groups {
      id
      title
    }
  }
}
```

## 7. Automating Inside CI / Scripts

- Store tokens as secrets (e.g., GitHub Actions `MONDAY_TOKEN`) and inject them into scripts that call the GraphQL mutations above.
- Use idempotent naming conventions (`Automation Demo Board – ${runId}`) to avoid clashing with existing boards.
- Remember to clean up boards when they are only needed temporarily: call `archive_board` or `delete_board`.

## References

- [monday.com GraphQL API reference](https://developer.monday.com/api-reference/)
- [monday.com column types and payload formats](https://developer.monday.com/api-reference/reference/columns-section)
- [monday.com rate limits](https://developer.monday.com/api-reference/reference/rate-limits-section)
