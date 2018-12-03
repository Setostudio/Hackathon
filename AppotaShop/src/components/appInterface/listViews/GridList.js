import React, { Component } from "react";
import { View, Dimensions } from "react-native";

import { Thumbnail, Text } from "native-base";
import GridView from "react-native-super-grid";

const { width, height } = Dimensions.get("window");
class GridList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { dataArray } = this.props.parentProps;
    return (
      <View>
        <GridView
          itemDimension={width / 3}
          items={dataArray}
          renderItem={item => (
            <View
              style={{
                borderColor: "#1976d2",
                borderWidth: 0.75,
                borderRadius: width / 12
              }}
            >
              <View
                style={{
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Thumbnail square large source={{ uri: item.imgUrl }} />
                <Text>{item.name}</Text>
                <Text>
                  {item.price} {item.currency}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

export default GridList;
