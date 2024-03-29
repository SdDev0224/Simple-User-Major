import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers} from 'redux'
import createSagaMiddleware from 'redux-saga'
import mainReducer from './reducers'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import App from './components/App'
import Tasks from './components/Tasks'
import { mainSaga } from './saga/saga'
import './index.css'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    combineReducers({
        mainReducer, 
        routing: routerReducer }),
    applyMiddleware(sagaMiddleware))
sagaMiddleware.run(mainSaga)

const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store = {store}>
        <Router history = {history}>
            <Route path = '/' component ={App} />
            <Route path = "/:id" component = {Tasks} />
        </Router>
    </Provider>,
    document.getElementById('root')
)