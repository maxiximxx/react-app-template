import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// import { routePath } from './common/config/config'
import store from './store/index'
import Routes from './routes'
import './common/stylus/index.styl'

const App = () => (
  <BrowserRouter basename="/">
    <Provider store={store}>
      <Routes />
    </Provider>
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('app'))
