import browserEnvironment from './browser.js';
import serverEnvironment from './server.js';

export default class OAuthClient {
    constructor(config) {
        const { clientId, clientSecret, redirectUri, provider } = config;

        if (!clientId || !redirectUri || !provider) {
            throw new Error('Missing required configuration: clientId, redirectUri, or provider');
        }

        this.clientId = clientId;
        this.clientSecret = clientSecret || null;
        this.redirectUri = redirectUri;
        this.providerConfig = require(`./providers/${provider}.js`).default;

        this.environment = typeof window !== 'undefined' ? browserEnvironment : serverEnvironment;
    }

    getAuthorizationUrl({ scope, state }) {
        const queryParams = new URLSearchParams({
            client_id: this.clientId,
            redirect_uri: this.redirectUri,
            response_type: 'code',
            scope: scope.join(' '),
            state,
        });
        return `${this.providerConfig.authorizationEndpoint}?${queryParams}`;
    }

    async exchangeAuthorizationCode({ code }) {
        const response = await fetch(this.providerConfig.tokenEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                redirect_uri: this.redirectUri,
                grant_type: 'authorization_code',
                code,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to exchange authorization code for tokens');
        }

        const tokens = await response.json();
        this.environment.saveToken('tokens', tokens);
        return tokens;
    }

    async refreshAccessToken({ refreshToken }) {
        const response = await fetch(this.providerConfig.tokenEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to refresh access token');
        }

        const tokens = await response.json();
        this.environment.saveToken('tokens', tokens);
        return tokens;
    }

    getSavedTokens() {
        return this.environment.getToken('tokens');
    }
}
