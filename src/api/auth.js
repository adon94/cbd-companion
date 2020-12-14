import auth from '@react-native-firebase/auth';

function registerUser(user) {
  auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}

function signIn(user) {
  auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(() => {
      console.log('User signed in!');
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}

function signOut() {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}

export { registerUser, signOut, signIn };
