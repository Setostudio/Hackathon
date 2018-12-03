import { FETCH_PRODUCT } from "../reducers/Types";
export default (getProduct = productSection => {
  return {
    type: FETCH_PRODUCT,
    payload: productSection
  };
});
