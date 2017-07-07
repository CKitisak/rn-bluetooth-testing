import React, { Component } from 'react'
import {
  FlatList,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import BleManager from 'react-native-ble-manager'

const bleModule = NativeModules.BleManager
const bleEvent = new NativeEventEmitter(bleModule)

class rnBluetoothTest extends Component {
  constructor() {
    super()

    this.state = {
      isScanning: false,
      currentState: 'off',
      peripherals: new Map()
    }

    this._onDiscoverPeripheral   = this._onDiscoverPeripheral.bind(this)
    this._onDisconnectPeripheral = this._onDisconnectPeripheral.bind(this)
    this._onStopScan             = this._onStopScan.bind(this)
    this._onUpdateCharacteristic = this._onUpdateCharacteristic.bind(this)
    this._onUpdateState          = this._onUpdateState.bind(this)
  }

  componentWillMount() {
    /**
     * init BleManager
     */
    BleManager
      .start({
        showAlert: false,
        allowDuplicates: false
      })
      .then(() => {
        // Success code
        console.log('BleManager initialized');
      })

    /**
     * Android API >= 23 require the ACCESS_COARSE_LOCATION
     * permission to scan for peripherals
     */
    console.log('OS:', Platform.OS)
    console.log('Version:', Platform.Version)
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid
        .check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
        .then((result) => {
          console.log(result)
          if (result) {
            console.log('Permission is OK')
          } else {
            PermissionsAndroid
              .requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
              .then((result) => {
                if (result) {
                  console.log('User accept')
                } else {
                  console.log('User refuse')
                }
              })
          }
        })
    }
  }

  componentDidMount() {
    console.log(this.state.currentState)
    if (Platform.OS === 'android' && this.state.currentState === 'off') {
      BleManager
        .enableBluetooth()
        .then((r) => {
          // Success code
          console.log('The bluetooh is already enabled or the user confirm');
        })
        .catch((error) => {
          // Failure code
          console.log('The user refuse to enable bluetooth');
        })
    }

    this.discoverEvent   = bleEvent.addListener('BleManagerDiscoverPeripheral', this._onDiscoverPeripheral)
    this.disconnectEvent = bleEvent.addListener('BleManagerDisconnectPeripheral', this._onDisconnectPeripheral)
    this.updateStateEvent = bleEvent.addListener('BleManagerDidUpdateState', this._onUpdateState)
    this.stopEvent       = bleEvent.addListener('BleManagerStopScan', this._onStopScan)
    this.updateEvent     = bleEvent.addListener('BleManagerDidUpdateValueForCharacteristic', this._onUpdateCharacteristic)

  }

  componentWillUnmount() {
    this.discoverEvent.remove()
    this.disconnectEvent.remove()
    this.updateStateEvent.remove()
    this.stopEvent.remove()
    this.updateEvent.update()
  }

  _onDiscoverPeripheral(peripheral) {
    var peripherals = this.state.peripherals
    if (!peripherals.has(peripheral.id)) {
      console.log('Got ble peripheral', peripheral)
      peripherals.set(peripheral.id, peripheral)
      this.setState({ peripherals })
    }
  }

  _onDisconnectPeripheral(data) {
    let peripherals = this.state.peripherals
    let peripheral = peripherals.get(data.peripheral)
    if (peripheral) {
      peripheral.connected = false
      peripherals.set(peripheral.id, peripheral)
      this.setState({ peripherals })
    }
    console.log('Disconnected from ' + data.peripheral)
  }

  _onUpdateCharacteristic(data) {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value)
  }

  _onUpdateState(data) {
    console.log('BleManagerDidUpdateState', data)
    this.setState({ currentState: data.state })
  }

  _onStopScan() {
    console.log('Scanning done');
    this.setState({ scanning: false })
  }

  _startScan() {
    if (!this.state.scanning) {
      BleManager
        .scan([], 10, false)
        .then(() => {
          console.log('Scanning...')
          this.setState({ scanning: true })
        })
    }
  }

  // _connectionTest(peripheral) {
  //   if (peripheral) {
  //     if (peripheral.connected) {
  //       BleManager.disconnect(peripheral.id);
  //     } else {
  //       BleManager.connect(peripheral.id).then(() => {
  //         let peripherals = this.state.peripherals;
  //         let p = peripherals.get(peripheral.id);
  //         if (p) {
  //           p.connected = true;
  //           peripherals.set(peripheral.id, p);
  //           this.setState({ peripherals });
  //         }
  //         console.log('Connected to ' + peripheral.id);
  //       }).catch((error) => {
  //         console.log('Connection error', error);
  //       });
  //     }
  //   }
  // }

  _peripheralKey = (item, index) => item.id
  _renderPeripheral = ({ item }) => {
    console.log(item)
    return (
      // <TouchableOpacity onPress={() => this._connectionTest(item) } underlayColor='transparent'>
        <Text>
          Peripheral
        </Text>
      // </TouchableOpacity>
    )
  }

  render() {
    let { isScanning, peripherals } = this.state
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ marginTop: 40, margin: 20, padding: 20, backgroundColor: '#ccc' }}
          onPress={ () => this._startScan() }
        >
          <Text>
            Scan Bluetooth ({ isScanning ? 'ON' : 'OFF' })
          </Text>
        </TouchableOpacity>

        {
          peripherals.size === 0 &&
          <Text>
            no peripheral
          </Text>
        }

        <FlatList
          data={ Array.from(peripherals.values()) }
          keyExtractor={ this._peripheralKey }
          renderItem={ this._renderPeripheral }
        />
      </View>
    )
  }
}

export default rnBluetoothTest
