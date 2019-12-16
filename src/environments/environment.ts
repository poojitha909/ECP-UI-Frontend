// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'https://ec.code-alpha.org/BY/api',
  imageBaseUrl: 'https://ec.code-alpha.org/project/images/',
  encryptKey: 'SECRET',
  facebook: {
    clientId: '2776633365685417',
    urlState: '"{st=fbState,ds=123456789}"',
    redirectUrl: 'https://localhost:4200',
    auth_uri: "https://www.facebook.com/v3.3/dialog/oauth"
  },
  google: {
    client_id: "251496429893-3m1dqbmrlfuanl5ndaoak7mk05ul3a6m.apps.googleusercontent.com",
    urlState: 'google-St-123456789-ds',
    redirectUrl: 'https://localhost:4200',
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
