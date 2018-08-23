import React, { Component } from "react";
import { Header, Left, Body, Right, Text, Spinner, Icon } from "native-base";
import { View, ScrollView } from "react-native";
import { getData } from "../FetchService";
import { getFromAsync } from "../AsyncService";
import PurchaseList from "./PurchaseList";

class DataFetcher extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    user: false,
    loading: true,
    data: []
  };

  fetchHistory = async (userid) => {
      console.log(userid)
    try {
      const data = await getData(`purchaseHistory/userPurchases/${userid}`);
      this.setState({ data: data.result, fetching: false });
    } catch (e) {
      alert("Server is unreachable.");
      console.log(e);
    }
  };

  async componentWillMount() {
    try {
      const user = await getFromAsync("user");
      this.setState({ user, loading: false, fetching: true });
      this.fetchHistory(user.id);
    } catch (e) {
      console.log(`Purchase History`, e);
    }
  }

  refreshIcon = () => {
    if (!this.state.refreshing) {
      return (
        <Icon
          name="refresh"
          onPress={() => {
            this.setState({ refresh: !this.state.refresh, refreshing: true });
            setTimeout(() => {
              this.setState({ refreshing: false });
            }, 2000);
          }}
        />
      );
    } else if (this.state.data.length) {
      return <Spinner color="blue" />;
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 17,
              fontStyle: "italic",
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            No Previous Purchase History
            <Icon name="copy" />
          </Text>
        </View>
      );
    }
  };

  makeHeader = () => {
    return (
      <Header style={{ backgroundColor: "white" }}>
        <Left>
          <Icon
            name="menu"
            onPress={() => this.props.navigation.openDrawer()}
          />
        </Left>
        <Body>
          <Text
            style={{ fontWeight: "bold", fontSize: 18, fontStyle: "italic" }}
          >
            Purchases History
          </Text>
        </Body>
        <Right>{this.refreshIcon()}</Right>
      </Header>
    );
  };

  makeBody = () => {
    if (this.state.fetching || this.state.loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            fetching you history from server ...
          </Text>
          <Icon name="happy" style={{ fontSize: 20 }} />
        </View>
      );
    } else if (this.state.data.length) {
      return (
        <ScrollView>
            <PurchaseList data={this.state.data} />
        </ScrollView>
      )
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            No Previous Purchase Records Found
          </Text>
          <Icon name="copy" style={{ fontSize: 20 }} />
        </View>
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {this.makeHeader()}
        {this.makeBody()}
      </View>
    );
  }
}

export default DataFetcher;
