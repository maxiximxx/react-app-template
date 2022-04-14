import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import { routePath } from './common/config/config'
import Routes from './routes'
import './common/stylus/index.styl'

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes />
    </BrowserRouter>
  )
}

const container = document.getElementById('root')
const root = createRoot(container as Element)
root.render(<App />)
