import React, { Component } from "react";
import { View, Text } from "react-native";

import CarouselList from "./CarouselList";
import ProductList from "./ProductList";
import GridList from "./GridList";
class CombinedList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    switch (this.props.viewStyle) {
      case "grid":
        return <ProductList parentProps={this.props} />;
      case "list":
        return <GridList parentProps={this.props} />;
      default:
        return (
          <View>
            <Text>Hello</Text>
          </View>
        );
    }
  }
}

export default CombinedList;
