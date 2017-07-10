import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { BleManager } from 'react-native-ble-plx'

class rnBluetoothTest extends Component {
  componentWillMount() {
    this.manager = new BleManager()

  }

  componentDidMount() {
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {

      } else if (state === 'PoweredOff') {

      } else {

      }
    }, true)
  }

  _scanStart() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return
      }

      // do something with found device
    });
  }

  _scanStop () {
    // Stop scanning as it's not necessary if you are scanning for one device.
    this.manager.stopDeviceScan()
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>
          Bluetooth Testing
        </Text>
        <Text>
          with react-native-ble-plx
        </Text>
        <TouchableOpacity onPress={ this._scanStart.bind(this) }>
          <Text>
            Scan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ this._scanStop.bind(this) }>
          <Text>
            Stop Scanning
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default rnBluetoothTest
