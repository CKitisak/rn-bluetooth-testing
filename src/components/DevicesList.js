import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import * as blueTooth from '../actions/BlueTooth'
import ImmutableListView from './ImmutableListView'
import DeviceItem from './DeviceItem'

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15
  },
  button: {
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
})

const renderDevice = (device, connectToDevice) => (
  <DeviceItem
    name={ device.get('name') }
    uuid={ device.get('uuid') }
    rssi={ device.get('rssi') }
    onSelect={ () => connectToDevice(device.get('rssi')) }
  />
)

const DevicesList = ({
  devices,
  scanning,
  startScan,
  stopScan,
  connectToDevice
}) => (
  <View style={{ flex: 1 }}>
    <View style={{ flex: 1, marginBottom: 15 }}>
      <ImmutableListView
        dataset={ devices }
        onRowRender={ (rowData) => renderDevice(rowData, connectToDevice) }
      />
    </View>
    <View style={ styles.buttonGroup }>
      <TouchableOpacity
        onPress={ () => startScan() }
        disabled={ scanning }
        style={ styles.button }
      >
        <Text>
          Start scanning
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ () => stopScan() }
        disabled={ !scanning }
        style={ styles.button }
      >
        <Text>
          Stop scanning
        </Text>
      </TouchableOpacity>
    </View>
  </View>
)

DevicesList.propTypes = {
  devices: ImmutablePropTypes.iterable.isRequired,
  scanning: PropTypes.bool.isRequired,
  startScan: PropTypes.func.isRequired,
  stopScan: PropTypes.func.isRequired,
  connectToDevice: PropTypes.func.isRequired
}

const mapState = state => ({
  devices: state.getIn(['BlueTooth', 'devices']),
  scanning: state.getIn(['BlueTooth', 'scanning'])
})

const mapDispatch = dispatch => ({
  startScan: () => dispatch(blueTooth.startScan()),
  stopScan: () => dispatch(blueTooth.stopScan()),
  connectToDevice: (uuid) => dispatch(blueTooth.changeDeviceState(uuid, blueTooth.DEVICE_STATE_CONNECT))
})

DevicesList = connect(mapState, mapDispatch)(DevicesList)

export default DevicesList
