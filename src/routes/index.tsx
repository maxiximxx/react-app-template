import React from 'react'
import { useRoutes, RouteObject } from 'react-router-dom'

import Index from '../pages/index'

const routeConfig: RouteObject[] = [
  {
    path: '/',
    children: [
      { element: <Index />, index: true },
      {
        path: '/index',
        element: <Index />,
      },
    ],
  },
]

function RootRoutes() {
  const element = useRoutes(routeConfig)
  return element
}

export default RootRoutes
