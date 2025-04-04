import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './componets/TopNavbar'
import Layout from './componets/layout'

const App = () => {
  return (
<>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Layout/>}>

  </Route>
</Routes>
</BrowserRouter>

</>
  )
}

export default App