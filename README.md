# OAuth Client Library

A JavaScript library for performing OAuth 2.0 authorization flows in both browser and server environments.

## Installation

```bash
npm install oauth-client
```

## Usages

```js
import OAuthClient from "oauth-client";

const oauthClient = new OAuthClient({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  redirectUri: "your-redirect-uri",
  provider: "google",
});

// Get authorization URL
const authUrl = oauthClient.getAuthorizationUrl({
  scope: ["openid", "email", "profile"],
  state: "random-state",
});

// Exchange authorization code
const tokens = await oauthClient.exchangeAuthorizationCode({
  code: "your-code",
});

// Refresh tokens
const refreshedTokens = await oauthClient.refreshAccessToken({
  refreshToken: tokens.refreshToken,
});
```

## Testing

```bash
npm test
```

## Running the Project

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run tests:

   ```bash
   npm test
   ```
