import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// import { routePath } from './common/config/config'
import app from './store'
import Routes from './routes'
import './common/stylus/index.styl'

const store = configureStore({ reducer: app })

const App = () => (
  <BrowserRouter basename="/">
    <Provider store={store}>
      <Routes />
    </Provider>
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('app'))
