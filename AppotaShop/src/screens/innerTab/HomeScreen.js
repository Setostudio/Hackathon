import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
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
  Button,
  Spinner
} from "native-base";

import update from "immutability-helper";

import AppHeader from "../../components/appInterface/AppHeader";
import CombinedList from "../../components/appInterface/listViews/CombinedList";

import { getAllProduct } from "../../actions/GetProductAction";
import getMoreProduct from "../../actions/GetMoreProductAction";

import { connect } from "react-redux";
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: [],
      isLoading: false,
      viewStyle: "grid"
    };
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );

  onChangeViewStyle = () => {
    let { viewStyle } = this.state;
    if (viewStyle == "grid") {
      this.setState({ viewStyle: "list" });
    } else {
      this.setState({ viewStyle: "grid" });
    }
  };
  renderFooter = () => {
    if (this.state.isLoading) {
      return (
        <View>
          <Spinner color="#1976d2" />
        </View>
      );
    } else {
      return <View />;
    }
  };
  async componentWillMount() {
    // let item = await this.props.getProduct("newProduct");
    // console.log(this.props.newProduct);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.newProduct);
  }

  render() {
    return (
      <Container>
        <View>
          <AppHeader
            headerModal="search"
            viewStyle={this.state.viewStyle}
            onChangeView={() => {
              this.onChangeViewStyle();
            }}
            navigationprops={this.props}
          />
        </View>
        <FlatList
          data={this.props.newProduct}
          extraData={this.props}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        <Button
          onPress={() => {
            this.props.getProduct();
          }}
        >
          <Text>Add</Text>
        </Button>
        <Button
          onPress={() => {
            this.props.getMoreProduct();
            this.props.getProduct();
          }}
        >
          <Text>Get More</Text>
        </Button>
        {/* <CombinedList
          onEndReached={() => {
            this.setState(prevState => ({
              isLoading: true
            }));
            setTimeout(() => {
              this.setState({ isLoading: false });
            }, 500);

            this.props.getMoreProduct();
          }}
          dataArray={this.props.newProduct}
          propsParam={this.props}
          viewStyle={this.state.viewStyle}
        /> */}
        <this.renderFooter />
      </Container>
    );
  }
}

mapStateToProps = state => ({
  numberLimit: state.numberLimit,
  newProduct: state.newProduct
});
mapDispatchToProps = dispatch => ({
  getProduct: productSession => dispatch(getAllProduct(productSession)),
  getMoreProduct: () => dispatch(getMoreProduct())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
