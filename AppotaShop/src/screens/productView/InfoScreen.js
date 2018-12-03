import React, { Component } from "react";
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Container, Header, Content, Thumbnail, Text } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

import AppHeader from "../../components/appInterface/AppHeader";

import FirebaseApp from "../../components/firebase/config/FirebaseInit";
import FirebaseAuth from "../../components/firebase/services/FirebaseAuth";
const { width, height } = Dimensions.get("window");
class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNumber: 0
    };

    productData = this.props.navigation.getParam("productData");
  }

  onIncrease = () => {
    this.setState(prevState => ({
      currentNumber: prevState.currentNumber + 1
    }));
    this.saveData();
  };
  onDecrease = () => {
    if (this.state.currentNumber > 0) {
      this.setState(prevState => ({
        currentNumber: prevState.currentNumber - 1
      }));
      this.saveData();
    }
    return;
  };
  saveData = () => {
    let { uid } = FirebaseAuth._checkUserProfile();
    let { key, imgUrl, name, price, currency } = productData;

    FirebaseApp.database()
      .ref(`users/${uid}/cart/${key}`)
      .set({
        number: this.state.currentNumber,
        time: `${new Date().getDate()} / ${new Date().getMonth()}`,
        id: key,
        name,
        imgUrl,
        price,
        currency
      });
  };
  componentWillUnmount() {}
  render() {
    let { imgUrl, name, price, currency } = productData;
    return (
      <View>
        <View>
          <AppHeader navigationProps={this.props.navigation} />
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <View>
            <Image
              source={{ uri: imgUrl }}
              style={{ width: (width * 2) / 3, height: height / 3 }}
            />
          </View>
          <View>
            <Text>{name}</Text>
            <Text>
              {price} {currency}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.selectionButton}
              onPress={this.onDecrease}
            >
              <Ionicons name="ios-remove-circle" size={25} color="#1976d2" />
            </TouchableOpacity>
            <View style={styles.selectionButton}>
              <Text>{this.state.currentNumber}</Text>
            </View>
            <TouchableOpacity
              style={styles.selectionButton}
              onPress={this.onIncrease}
            >
              <Ionicons name="ios-add-circle" size={25} color="#1976d2" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectionButton: {
    margin: 10
  }
});
export default InfoScreen;
