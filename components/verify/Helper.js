import React, { Component } from "react";
import {
  Input,
  Spinner,
  View,
  Text,
  Icon,
  Saperator,
  Item,
  Button
} from "native-base";
import { getData } from '../FetchService'
import { putInAsync } from '../AsyncService'

class Helper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newValue: this.props.inputValue
    };
  }

  chooseButtonOrText = () => {
    if (this.props.status == "Verified") {
        return (
            <Text style={{ textAlign: 'left', margin: 20, fontSize: 20, fontStyle: 'italic', color: 'green' }}>
                Verified
                <Icon
                  active
                  name="done-all"
                  style={{ color: "green", marginHorizontal: 10 }}
                />
            </Text>
        );
    } 
    else if(this.state.buttonLoading) {
      return (
        <Button
        full
        info
        iconRight
        style={{
          margin: 10,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text>Loading ....</Text>
        <Spinner color="white" />
      </Button>
      );
    } else if(this.state.buttonDone) {
      return (
        <Button
        full
        success
        iconRight
        style={{
          margin: 10,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text>Sent Successfully</Text>
        <Icon name="checkmark" style={{ color: "white" }} />
      </Button>
      );
    }
    else {
      return (
        <Button
          full
          info
          iconRight
          style={{
            margin: 10,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={async () => {
            this.setState({ buttonLoading: true })
            try {
              const result = await getData(this.props.URL)
              if(result.result) {
                putInAsync('email_link_already_sent', true)
                this.setState({ buttonLoading: false, buttonDone: true })
              } else {
                alert("Server Error")
              }
            } catch (e) {
              alert('Error')
              console.log(e)
            }
          }}
        >
          <Text>{this.props.ButtonLabel}</Text>
          <Icon name="send" style={{ color: "white" }} />
        </Button>
      );
    }
  };

  render() {
    const { icon, ButtonLabel, URL, status, title } = this.props;

    return (
      <View style={{ flex: 1, marginVertical: 10 }}>
        <View style={{ flex: 1, paddingHorizontal: 20, marginVertical: 5 }}>
          <Text
            style={{
              borderWidth: 1,
              borderRadius: 10,
              fontSize: 20,
              fontStyle: "italic",
              textAlign: "center",
              borderColor: "#A3AFA9"
            }}
          >
            {title}
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            marginHorizontal: 10,
            borderTopWidth: 1,
            borderTopColor: "#A3AFA9"
          }}
        >
          <Item>
            <Icon
              active
              name={icon}
              style={{ fontSize: 20, color: "#37D67A" }}
            />
            <Input
              value={this.state.newValue}
              onChangeText={newValue => this.setState({ newValue })}
            />
          </Item>
        </View>
        <View style={{ flex: 2 }}>
            {this.chooseButtonOrText()}
        </View>
      </View>
    );
  }
}
export default Helper;
