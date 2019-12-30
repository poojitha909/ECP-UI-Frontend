export const environment = {
  production: true,
  apiBaseUrl: 'https://ec.dev.code-alpha.org/BY/api',
  imageBaseUrl: 'https://ec.dev.code-alpha.org/project/images/',
  encryptKey: 'SECRET',
  facebook: {
    clientId: '2776633365685417',
    urlState: '"{st=fbState,ds=123456789}"',
    redirectUrl: 'https://ec.dev.code-alpha.org',
    auth_uri: "https://www.facebook.com/v3.3/dialog/oauth"
  },
  google: {
    client_id: "251496429893-3m1dqbmrlfuanl5ndaoak7mk05ul3a6m.apps.googleusercontent.com",
    urlState: 'google-St-123456789-ds',
    redirectUrl: 'https://ec.dev.code-alpha.org',
    auth_uri: "https://accounts.google.com/o/oauth2/auth"
  }
};
