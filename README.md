# Monday.com GraphQL Query Guide

This README provides information on how to perform GraphQL queries with Monday.com's API.

## Getting Started

To use Monday.com's GraphQL API, you'll need:

1. An API token from your Monday.com account
2. A GraphQL client or HTTP client that can send POST requests

## Basic Query Structure

A typical Monday.com GraphQL query looks like this:

```graphql
query {
  boards(limit: 5) {
    id
    name
    items {
      id
      name
    }
  }
}
```

## Examples

### 1. Fetching Boards

```graphql
query {
  boards(limit: 10) {
    id
    name
    description
  }
}
```

### 2. Fetching Items from a Specific Board

```graphql
query {
  boards(ids: 123456) {
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
```

### 3. Creating a New Item

```graphql
mutation {
  create_item(
    board_id: 123456,
    item_name: "New Task",
    column_values: "{\"status\": \"Working on it\", \"date\": \"2023-05-20\"}"
  ) {
    id
  }
}
```

## Best Practices

1. Always limit the number of results to avoid performance issues.
2. Only request the fields you need to minimize response size.
3. Use variables for dynamic values in your queries.

## Further Resources

- [Monday.com API Documentation](https://developer.monday.com/api-reference/docs)
- [GraphQL Official Website](https://graphql.org/)

Remember to keep your API token secure and never expose it in client-side code.
