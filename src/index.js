import React, { Component } from 'react'
import { Text, View } from 'react-native'
import BluetoothCP from 'react-native-bluetooth-cross-platform'

class rnBluetoothTest extends Component {
  componentWillMount () {
    console.log('componentWillMount')
    console.log(BluetoothCP)
    BluetoothCP.advertise('BT')     // BT, WIFI, WIFI-BT(default)
    BluetoothCP.getNearbyPeers(this.onReceivedNearbyPeers)
    BluetoothCP.getConnectedPeers(this.onReceivedConnectedPeers)
  }

  componentDidMount () {
    console.log('componentDidMount')
    BluetoothCP.browse('BT')      // BT, WIFI, WIFI-BT(default)
    this.addPeerDetectedListener    = BluetoothCP.addPeerDetectedListener(this.onPeerDetected)
    this.addPeerLostListener        = BluetoothCP.addPeerLostListener(this.onPeerLost)
    this.addReceivedMessageListener = BluetoothCP.addReceivedMessageListener(this.onReceivedMessage)
    this.addInviteListener          = BluetoothCP.addInviteListener(this.onInvite)
    this.addConnectedListener       = BluetoothCP.addConnectedListener(this.onConnected)
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
    this.addPeerDetectedListener.remove()
    this.addPeerLostListener.remove()
    this.addReceivedMessageListener.remove()
    this.addInviteListener.remove()
    this.addConnectedListener.remove()
  }

  onReceivedNearbyPeers (user) {
    console.log('onReceivedNearbyPeers', user)
  }
  onReceivedConnectedPeers (user) {
    console.log('onReceivedConnectedPeers', user)
  }
  onPeerDetected (user) {
    console.log('onPeerDetected', user)
  }
  onPeerLost (user) {
    console.log('onPeerLost', user)
  }
  onReceivedMessage (user) {
    console.log('onReceivedMessage', user)
  }
  onInvite (user) {
    console.log('onInvite', user)
  }
  onConnected (user) {
    console.log('onConnected', user)
  }

  render () {
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
