import { FETCH_PRODUCT } from "../reducers/Types";

import FirebaseApp from "../components/firebase/config/FirebaseInit";
export const getProduct = productSection => {
  return {
    type: FETCH_PRODUCT,
    payload: productSection
  };
};

// // export const login = ({ email, password }) => {
// //   return function(dispatch) {
// //     firebase
// //       .auth()
// //       .signInAndRetrieveDataWithEmailAndPassword(email, password)
// //       .then(user => {
// //         dispatch(createLoginSuccessAction(email));
// //         dispatch(fetchMessages());
// //       })
// //       .catch(error => {
// //         const { code, message } = error;
// //         dispatch(createLoginErrorAction(error));
// //         console.error(code);
// //         console.error(message);
// //       });
// //   };
// };

export const getAllProduct = () => {
  return dispatch => {
    let items = [];
    FirebaseApp.database()
      .once("value")
      .then(snapShot => {
        items.forEach(child => {
          items.push(child.val());
        });
        dispatch(getProduct(items));
      });
  };
};
