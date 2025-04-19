import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './componets/layout'
import Home from './pages/Home'
import Contact from './pages/contact'
import OurStore from './pages/OurStore'
import Auth from './authers/Resgister'
import Blog from './pages/Blogs'
import ProductDetail from './pages/productDetail'
import CartPage from './redux/cardPage'
// import FeaturedCollection from './componets/FeaturedCollection'

const App = () => {
  return (
<>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Layout/>}>
  <Route path='home' element={<Home/>}/>
  <Route path='contact' element={<Contact/>}/>
  <Route path='ourstore' element={<OurStore/>}/>
  <Route path='blogs' element={<Blog/>}/>
  <Route path='login' element={<Auth/>}/>
  <Route path='cartpage' element={<CartPage/>}/>
 

  </Route>
</Routes>
</BrowserRouter>

</>
  )
}

export default App