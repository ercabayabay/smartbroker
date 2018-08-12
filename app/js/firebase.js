// Initialize Firebase
var config = {
    apiKey: "AIzaSyAb1RxFIWWygL06e-XfNcEjOIj6DIJXyM4",
    authDomain: "ercapp-4a9e3.firebaseapp.com",
    databaseURL: "https://ercapp-4a9e3.firebaseio.com",
    projectId: "ercapp-4a9e3",
    storageBucket: "ercapp-4a9e3.appspot.com",
    messagingSenderId: "406105202213"
  };
  firebase.initializeApp(config);

  const auth = firebase.auth();

  const router = {
      login: '/login',
      dashboard: '/dashboard'
  }

  auth.onAuthStateChanged( firebaseUser => {
    if( !firebaseUser ){
        if( window.location.href.indexOf( router.login ) < 0 ){
            window.location.href = router.login;
        }
    }
  });

  function app(){
      return {
          signIn: function( username, password, callback ){
              const promise = auth.signInWithEmailAndPassword( username, password );

              promise
                .then( user => {
                    console.log( user.user.email + ' logged in');
                    callback.success();
                    window.location.href = router.dashboard;
                })
                .catch( e => {
                    console.log( e );
                    callback.failed();
                });
          }
      }
  }