import { FETCH_PRODUCT, FETCH_MORE } from "./Types";
import { Alert } from "react-native";

import update from "immutability-helper";

import FirebaseApp from "../components/firebase/config/FirebaseInit";

INITIAL_STATE = {
  newProduct: [{ name: "Bitis" }],
  numberLimit: 5
};

const selectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      let items = [];

      FirebaseApp.database()
        .ref("newProduct")
        .limitToFirst(state.numberLimit)
        .once("value")
        .then(snapShot => {
          snapShot.forEach(child => {
            items.push(child.val());
          });
        });

      console.log("Reducer:", items);
      return update(state, {
        newProduct: { $set: items }
      });

    case FETCH_MORE:
      return { ...state, numberLimit: state.numberLimit + 5 };
    default:
      return state;
  }
};

export default selectReducer;
