import React from 'react'
import routerConfig from './router'
import { RouterProvider } from 'react-router-dom'

function App() {
  return <RouterProvider router={routerConfig}></RouterProvider>
}

export default App
