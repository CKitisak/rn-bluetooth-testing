import * as blueTooth from '../actions/BlueTooth'
import { Map, List, OrderedMap } from 'immutable'

const initialState = Map({
  devices: OrderedMap(),
  scanning: false,
  selectedDeviceId: null,
  state: blueTooth.DEVICE_STATE_DISCONNECTED
})

const BlueTooth = (state = initialState, action) => {
  switch (action.type) {
    case blueTooth.START_SCAN:
      return state.set('scanning', true)
    case blueTooth.STOP_SCAN:
      return state.set('scanning', false)
    case blueTooth.DEVICE_FOUND:
      return state.mergeDeepIn(['devices', action.device.uuid], action.device)
    case blueTooth.CHANGE_DEVICE_STATE:
      return state.withMutations(state => {
        state.set('scanning', false)
             .set('state', action.state)
             .set('selectedDeviceId', action.deviceId)
      })
    default:
      return state
  }
}

export default BlueTooth
