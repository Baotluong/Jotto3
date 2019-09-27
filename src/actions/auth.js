// import { firebase, googleAuthProvider } from '../firebase/firebase';
import { history } from '../routers/AppRouter';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

// export const startLogin = () => {
//   return () => {
//     return firebase.auth().signInWithPopup(googleAuthProvider);
//   };
// };

export const logout = () => ({
  type: 'LOGOUT'
});

// export const startLogout = () => {
//   return () => {
//     return firebase.auth().signOut();
//   };
// };

export const setError = (error) => ({
  type: 'SET_ERROR',
  error
});

export const redirectWithError = (error) => {
  return async (dispatch) => {
    await dispatch(setError(error));
    history.push('/');
  };
}

export const clearError = () => ({
  type: 'CLEAR_ERROR',
});
