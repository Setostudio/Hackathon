import { FETCH_MORE } from "../reducers/Types";

export default (getMoreProduct = () => {
  return {
    type: FETCH_MORE
  };
});
