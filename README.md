# DebateX Frontend

This frontend is now wired to call a backend through a shared API layer instead of hardcoded mock data.

## Setup

1. Copy `.env.example` to `.env`
2. Set `VITE_API_BASE_URL` to your API Gateway base URL
3. Update any endpoint paths if your Lambda routes use different paths
4. Run `npm install`
5. Run `npm run dev`

## Environment Variables

- `VITE_API_BASE_URL`: API Gateway base URL
- `VITE_API_EXPLORE_DEBATES`: debate listing endpoint
- `VITE_API_DEBATE_DETAILS`: single debate endpoint, use `:id` placeholder
- `VITE_API_DEBATE_REACT`: comment reaction endpoint
- `VITE_API_DEBATE_COMMENTS`: add-comment endpoint
- `VITE_API_LOGIN`: login endpoint
- `VITE_API_SIGNUP`: signup endpoint
- `VITE_API_ADMIN_ARTICLES`: admin article list endpoint
- `VITE_API_AI_TOPICS`: AI title generation endpoint
- `VITE_API_CREATE_DEBATE`: create debate endpoint

## Expected Response Shapes

The frontend currently expects flexible JSON and normalizes a few possible field names.

Explore page:

```json
{
  "debates": []
}
```

Debate details page:

```json
{
  "debate": {},
  "comments": []
}
```

Admin title generation:

```json
{
  "articleUrl": "https://www.manoramaonline.com/...",
  "titles": ["Title 1", "Title 2", "Title 3", "Title 4"]
}
```

If your backend payload names differ, update `src/services/debates.js`.
