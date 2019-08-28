import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/prodDetails'

import './home.css'
const renderTableData=(data,changePage)=>{
  return data.map((pFVal, index) => {
     return (
        <tr key={index}>
           <td>{pFVal.name}</td>
           <td>{pFVal.weight}</td>
           <td>{pFVal.availability}</td>
           <td>{pFVal.isEditable?<button type="button" onClick={(e)=>{e.preventDefault();changePage(index)}}>Edit</button>:''}</td>
        </tr>
     )
  })
}


const Home = (props) => {
  return(
<div>
<table>
  <thead>
  <tr>
    <th>Name</th>
    <th>Weight</th>
    <th>Availability</th>
    <th>isEditable</th>
  </tr>
  </thead>
  <tbody>
  {renderTableData(props.products,props.changePage)}
  </tbody>
</table>
</div>)
}
const mapStateToProps = ({ prodDetails }) => ({
products:prodDetails.products
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: (index) => push('/edit-product?index='+index)
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
