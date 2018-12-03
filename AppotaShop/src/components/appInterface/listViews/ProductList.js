import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";

import CarouselList from "./CarouselList";
class ProductList extends Component {
  render() {
    let { onEndReached, dataArray, propsParam } = this.props.parentProps;
    return (
      <ScrollView>
        <List
          onEndReached={onEndReached}
          dataArray={dataArray}
          renderRow={item => (
            <ListItem thumbnail>
              <Left>
                <Thumbnail source={{ uri: item.imgUrl }} />
              </Left>
              <Body>
                <Text>{item.name}</Text>
                <Text note numberOfLines={2}>
                  {item.price} {item.currency}
                </Text>
              </Body>
              <Right>
                <Button
                  transparent
                  onPress={() => {
                    propsParam.navigation.navigate("Info", {
                      productData: item
                    });
                  }}
                >
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
          )}
        />
      </ScrollView>
    );
  }
}

export default ProductList;
