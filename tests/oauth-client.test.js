import OAuthClient from '../src/index';

test('should generate authorization URL', () => {
    const client = new OAuthClient({
        clientId: 'test-client-id',
        redirectUri: 'http://localhost/callback',
        provider: 'google',
    });

    const url = client.getAuthorizationUrl({
        scope: ['openid', 'email'],
        state: 'test-state',
    });

    expect(url).toContain('client_id=test-client-id');
    expect(url).toContain('redirect_uri=http://localhost/callback');
    expect(url).toContain('response_type=code');
    expect(url).toContain('scope=openid%20email');
    expect(url).toContain('state=test-state');
});
