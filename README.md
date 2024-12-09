## Frog NextJS Caching Issue
This repo contains a NextJS app that uses Frog to create an endpoint for a Farcaster Frame.

Note that the image route is being cached even though the `headers` have `"cache-control" : "max-age=0"`

(try changing some of the test data and see that the image does not update on refresh)

```
npm install
npm run dev
```

Head to http://localhost:3000/api

