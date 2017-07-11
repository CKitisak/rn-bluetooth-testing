export const DEVICE_STATE_CONNECT       = 'CONNECT'
export const DEVICE_STATE_CONNECTING    = 'CONNECTING'
export const DEVICE_STATE_DISCOVERING   = 'DISCOVERING'
export const DEVICE_STATE_FETCHING      = 'FETCHING SERVICES AND CHARACTERISTICS'
export const DEVICE_STATE_CONNECTED     = 'CONNECTED'
export const DEVICE_STATE_DISCONNECT    = 'DISCONNECT'
export const DEVICE_STATE_DISCONNECTING = 'DISCONNECTING'
export const DEVICE_STATE_DISCONNECTED  = 'DISCONNECTED'

export const START_SCAN                 = 'START_SCAN'
export const STOP_SCAN                  = 'STOP_SCAN'
export const DEVICE_FOUND               = 'DEVICE_FOUND'
export const CHANGE_DEVICE_STATE        = 'CHANGE_DEVICE_STATE'


export const startScan = () => ({
  type: START_SCAN
})

export const stopScan = () => ({
  type: STOP_SCAN
})

export const deviceFound = (device) => ({
  type: DEVICE_FOUND,
  device
})

export const changeDeviceState = (deviceId, state) => ({
  type: CHANGE_DEVICE_STATE,
  deviceId,
  state
})


