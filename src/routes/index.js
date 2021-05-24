import { hot } from 'react-hot-loader/root'
import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'

import Index from '../pages/index'

const routes = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to="/index" />,
  },
  { path: '/index', component: Index },
]

const Routes = () => (
  <Switch>
    {routes.map((v) => (
      <Route exact={v.exact} key={v.path} path={v.path} render={v.render} component={v.component} />
    ))}
  </Switch>
)

export default hot(Routes)
