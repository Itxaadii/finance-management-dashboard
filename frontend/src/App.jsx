import { useState } from 'react'
import './App.css'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"

function App() {
  const router = createBrowserRouter(
  createRoutesFromElements(
  <>
      <Route path='/' element={<Login/>}>
    </Route>
      <Route path='dashboard' element={<Dashboard/>}></Route>
  </>

  )
)

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
