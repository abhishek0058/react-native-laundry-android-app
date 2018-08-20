import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Spinner } from 'native-base';
import { View, Picker } from 'react-native';

export default class DropDown extends Component {

  state = {
      data: [],
      value: undefined
  }

  componentWillMount() {
      this.setState({ data: this.props.data })
  }

  makeOptions = (data = []) => {
    return data.map(item => (<Picker.Item key={item.id} label={item.name} value={item.id} />))
  }

  render() {
    const { data, label } = this.props

    return (
        <View style={{ 
            flex: 1, 
            borderWidth: 1, 
            marginHorizontal: 10, 
            borderRadius: 5, 
            borderColor: 'grey', 
            borderTopColor: 'white' 
        }}>
            <Picker
                selectedValue={this.state.value}
                style={{ height: 50 }}
                onValueChange={(itemValue, itemIndex) => {
                    if(this.props.cityChange) {
                        this.props.cityChange(itemValue)
                    } else if(this.props.updateHostel) {
                        this.props.updateHostel(itemValue)
                    }
                    this.setState({value: itemValue})}
                }>
                    <Picker.Item label={label} value="null" />
                    {this.makeOptions(data)}
            </Picker>
        </View>
    );
  }
}