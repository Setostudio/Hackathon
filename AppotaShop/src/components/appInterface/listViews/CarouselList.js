import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import { Text, Spinner } from "native-base";
import Carousel from "react-native-snap-carousel";

const { width, height } = Dimensions.get("window");
class CarouselList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.carouselProps.propsParam.navigation.navigate("Info");
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: width / 10,
            borderColor: "#320E3B"
          }}
        >
          <Image
            source={{ uri: item.imgUrl }}
            style={{
              width: (width * 3) / 4,
              borderRadius: width / 10,
              height: 200
            }}
          />

          <View
            style={{
              width: (width * 3) / 4,
              alignItems: "center",
              backgroundColor: "#fff"
            }}
          >
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.priceText}>
              {item.price} {item.currency}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    let { dataArray, propsParam } = this.props.parentProps;
    return (
      <View>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={dataArray}
          renderItem={this._renderItem}
          sliderWidth={width}
          itemWidth={(width * 3) / 4}
          sliderHeight={(height * 5) / 6}
          carouselProps={propsParam}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slideContainer: {
    height: 300
  },
  slide: {
    padding: 15,
    height: 100
  },
  headingText: {
    fontSize: 18,
    color: "#00695b"
  },
  nameText: {
    fontSize: 16,
    color: "#e05463"
  },
  priceText: {
    color: "#46b1e0"
  },
  loadingSpinner: {
    fontSize: 20
  },
  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
export default CarouselList;
