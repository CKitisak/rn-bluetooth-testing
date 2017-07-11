import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    color: '#777',
    fontSize: 16
  },
  description: {
    color: '#444',
    fontSize: 16
  }
})

const DeviceItem = ({ name, uuid, rssi, onSelect }) => (
  <TouchableOpacity onPress={ onSelect }>
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 3 }}>
          <Text style={ styles.label }>
            Name:
          </Text>
          <Text style={ styles.description }>
            { name ? name : '-' }
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={ styles.label }>
            RSSI:
          </Text>
          <Text style={ styles.description }>
            { rssi }
          </Text>
        </View>
      </View>

      <View>
        <Text style={ styles.label }>
          UUID:
        </Text>
        <Text style={ styles.description }>
          { uuid }
        </Text>
      </View>
    </View>
  </TouchableOpacity>
)

DeviceItem.propTypes = {
  name: PropTypes.string,
  uuid: PropTypes.string.isRequired,
  rssi: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default DeviceItem
