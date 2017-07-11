import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BleManager } from 'react-native-ble-plx'

import * as blueTooth from '../actions/BlueTooth'

let timer = null
let counter = 0

class BlueTooth extends Component {
  componentWillMount() {
    this.manager = new BleManager()
    this.manager.onStateChange((newState) => {
      console.log('State changed: ' + newState)
    })
  }

  componentWillUnmount() {
    this.manager.destroy()
    delete this.manager
  }

  componentWillReceiveProps(newProps) {
    // Handle scanning
    // if (newProps.scanning !== this.props.scanning) {
    //   if (newProps.scanning === true) {
    //     console.log('scanning...')
    //     this.manager.startDeviceScan(null, null, (error, device) => {
    //       console.log('found!::', device)
    //       if (error) {
    //         newProps.stopScan()
    //         return
    //       }
    //       newProps.deviceFound({
    //         uuid: device.uuid,
    //         name: device.name,
    //         rssi: device.rssi,
    //         isConnectable: device.isConnectable,
    //         services: {}
    //       })
    //     })
    //   } else {
    //     this.manager.stopDeviceScan()
    //   }
    // }

    /**
     * FOR DEV mode
     */
    if (__DEV__) {
      if (newProps.scanning !== this.props.scanning) {
        if (newProps.scanning === true) {
          timer = setInterval(() => {
            counter++
            newProps.deviceFound({
              uuid: '' + new Date().getTime(),
              name: 'Device ' + counter,
              rssi: counter,
              isConnectable: false,
              services: {}
            })
          }, 3000)
        } else {
          clearInterval(timer)
          timer = null
        }
      }
    }
  }

  render() {
    return null
  }
}

const mapState = state => ({
  scanning: state.getIn(['BlueTooth', 'scanning'])
})

const mapDispatch = dispatch => ({
  deviceFound: (device) => dispatch(blueTooth.deviceFound(device)),
  stopScan: () => dispatch(blueTooth.stopScan()),
})

BlueTooth = connect(mapState, mapDispatch)(BlueTooth)

export default BlueTooth
