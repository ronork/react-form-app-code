import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import EditProduct from '../editProduct'

const App = () => (
  <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/edit-product" component={EditProduct} />
  </div>
)

export default App
