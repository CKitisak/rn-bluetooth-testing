import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListView, View } from 'react-native'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
})

class ImmutableListView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: ds.cloneWithRows(this.props.dataset.toObject())
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.dataset.toObject())
    })
  }

  _renderSeparator(section, row) {
    return (
      <View
        key={`${section}-${row}`}
        style={{ height: 1, backgroundColor: '#ddd', marginVertical: 3, marginHorizontal: 10 }}
      />
    )
  }

  render() {
    return (
      <ListView
        dataSource={ this.state.dataSource }
        renderRow={ this.props.onRowRender }
        renderSeparator={ this._renderSeparator }
        enableEmptySections={ true }
      />
    )
  }
}

ImmutableListView.propTypes = {
  onRowRender: PropTypes.func.isRequired,
  dataset: ImmutablePropTypes.iterable.isRequired
}

export default ImmutableListView
