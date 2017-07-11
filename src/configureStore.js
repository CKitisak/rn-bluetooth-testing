import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { Iterable } from 'immutable'

import reducers from './reducers'

const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) {
    return state.toJS()
  } else {
    return state;
  }
}


const configureStore = () => {
  let middlewares = []

  if (__DEV__) {
    const logger = createLogger({
      collapsed: true,
      stateTransformer
    })
    middlewares.push(logger)
  }

  const store = createStore(
    reducers,
    applyMiddleware(...middlewares)
  )

  return store
}

export default configureStore
