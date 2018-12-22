import React, { Component } from "react";
import { View, Image } from "react-native";
import { Button, Text, Item } from "native-base";
import { Alert } from 'react-native'; 
import { postData } from "../FetchService";

class PackageTile extends Component {
  buyPackage = async () => {
    this.props.parentSetState({ buying: true });
    try {
      const body = {
        userid: this.props.userid,
        packageid: this.props.data.id,
        cycles: this.props.data.cycles,
        amount: this.props.data.amount
      };

      const result = await postData("account/buy", body);

      if (result.result) {
        this.props.parentSetState({ transaction: "completed", buying: false });
      } else {
        this.props.parentSetState({ transaction: "failed", buying: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  confirming = async () => {
    Alert.alert(
      "Confirm?",
      "Are you sure",
      [
        { text: "No", onPress: () => alert("Canceled"), style: "cancel" },
        { text: "YES", onPress: () => this.buyPackage() }
      ],
      { cancelable: true }
    );
  };

  render() {
    const { data } = this.props;

    return (
      <View
        style={{
          flex: 1,
          margin: 20,
          height: 100,
          borderWidth: 0.5,
          borderColor: "grey",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 10,
          justifyContent: "space-between",
          backgroundColor: "white"
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold", padding: 20 }}>
          {" "}
          {"\u20B9"} {data.name}{" - "} {data.cycles} cycles 
        </Text>
        <Button
          info
          style={{ alignSelf: "center", margin: 20 }}
          onPress={() => this.confirming()}
        >
          <Text>BUY</Text>
        </Button>
      </View>
    );
  }
}
export default PackageTile;
