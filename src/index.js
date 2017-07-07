import React, { Component } from 'react'
import { Text, View } from 'react-native'

class rnBluetoothTest extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>
          Bluetooth Testing
        </Text>
        <Text>
          with react-native-bluetooth-cross-platform
        </Text>
      </View>
    )
  }
}

export default rnBluetoothTest
