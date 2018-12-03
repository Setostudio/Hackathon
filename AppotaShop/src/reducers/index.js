import { combineReducers } from "redux";
import selectReducer from "./FetchProductReducer";
const rootReducer = combineReducers({
  selectReducer
});

export default rootReducer;
