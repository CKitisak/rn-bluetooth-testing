import React from 'react'
import { Text, View } from 'react-native'

import BlueTooth from './BlueTooth'
import DevicesList from './DevicesList'

const App = () => (
  <View style={{ flex: 1 }}>
    <Text>App Component</Text>
    <BlueTooth />
    <DevicesList />
  </View>
)

export default App
