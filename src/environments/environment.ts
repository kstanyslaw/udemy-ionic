// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: 'https://ionic-angular-course-14586.firebaseio.com/',
  auth_API_signup: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  auth_API_login: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  auth_API_KEY: 'AIzaSyCDp7atnqtMfFpPxfiQ3eDXtURDctLkq5c',
  firebase_cloud_function: 'https://us-central1-ionic-angular-course-14586.cloudfunctions.net/storeImage',
  firebase_project_ID: 'ionic-angular-course-14586',
  maps_API_KEY: 'AIzaSyClK9JpYbKH0aMyzDzKaPPgmz9qgauBpQg'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
