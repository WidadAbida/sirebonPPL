if(firebase.apps.length == 0)
    firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

// Emulator Settings
if (location.hostname === "localhost") {
    db.useEmulator("localhost", 8080);
    auth.useEmulator('http://localhost:9099/');
}