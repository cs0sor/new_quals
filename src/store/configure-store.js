import rootReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export default (initialState) =>
  createStore(
    rootReducer,
    initialState /* preloadedState, */,
    applyMiddleware(thunk),
    /* istanbul ignore next */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )


