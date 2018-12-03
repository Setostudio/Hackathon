import React, { Component } from "react";
import { View } from "react-native";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Thumbnail,
  Button
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppHeader from "../../components/appInterface/AppHeader";

import FirebaseAuth from "../../components/firebase/services/FirebaseAuth";
import FirebaseApp from "../../components/firebase/config/FirebaseInit";
class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCart: [],
      totalCount: 0
    };
  }

  onDelete = item => {
    let { uid } = FirebaseAuth._checkUserProfile();
    let { name, currency, id, imgUrl, number, price } = item;

    if (number <= 1) {
      FirebaseApp.database()
        .ref(`users/${uid}/cart/${id}`)
        .set({});
    } else {
      FirebaseApp.database()
        .ref(`users/${uid}/cart/${id}`)
        .set({
          name,
          currency,
          id,
          imgUrl,
          number: number - 1,
          price
        });
    }
  };
  onPay = () => {
    let { uid } = FirebaseAuth._checkUserProfile();
    let { listCart } = this.state;
    listCart.forEach(child => {
      FirebaseApp.database()
        .ref(`users/${uid}/property`)
        .push()
        .set(child);
    });
    FirebaseApp.database()
      .ref(`users/${uid}/cart`)
      .set({});
  };
  componentWillMount() {
    let { uid } = FirebaseAuth._checkUserProfile();

    FirebaseApp.database()
      .ref(`users/${uid}/cart`)
      .on("value", snapShot => {
        let totalCount = 0;
        let items = [];
        snapShot.forEach(child => {
          let { name, currency, id, imgUrl, number, price, time } = child.val();
          items.push({
            name,
            currency,
            id,
            imgUrl,
            number,
            price,
            time,
            productSum: price * number
          });
          totalCount = totalCount + price * number;
        });
        this.setState({ listCart: items, totalCount: totalCount });
      });
  }
  render() {
    return (
      <Container>
        <AppHeader navigationprops={this.props.navigation} />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 10 }}>
            <Text>Your total value : {this.state.totalCount} USD</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => {
                this.onPay();
              }}
            >
              <Ionicons name="ios-checkmark-circle" size={25} color="#1976d2" />
            </Button>
          </View>
        </View>
        <List
          dataArray={this.state.listCart}
          renderRow={item => (
            <ListItem thumbnail>
              <Left>
                <Thumbnail source={{ uri: item.imgUrl }} />
              </Left>
              <Body>
                <Text>{item.name}</Text>
                <Text note numberOfLines={2}>
                  {item.price} x {item.number} {item.currency}
                </Text>
              </Body>
              <Right>
                <Button
                  onPress={() => {
                    this.onDelete(item);
                  }}
                  transparent
                >
                  <Ionicons name="ios-close-circle" size={25} color="#1976d2" />
                </Button>
              </Right>
            </ListItem>
          )}
        />
      </Container>
    );
  }
}

export default CartScreen;
