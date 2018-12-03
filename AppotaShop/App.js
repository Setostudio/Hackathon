import React, { Component } from "react";
import { View, Text } from "react-native";

import Root from "./src/navigators/AppNavigator";
import { Provider } from "react-redux";
import { createStore } from "redux";

import rootReducer from "./src/reducers/index";
import FetchProductReducer from "./src/reducers/FetchProductReducer";
const store = createStore(FetchProductReducer);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

export default App;
