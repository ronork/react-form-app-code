import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  editProductDetails
} from '../../modules/prodDetails'
import '../home/home.css';

class EditProductForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {priceTier:''}
        this.res=[...this.props.products]
    }
    checkUrl()
    {
     return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(document.getElementById('produrl').value);
    }
    enableSubmit()
    {
    if(document.getElementById('name').value!=='' && document.getElementById('weight').value!=='' && this.checkUrl() && this.state.priceTier && (document.getElementById('eyes').checked || document.getElementById('eno').checked))
    {
    let index = this.props.location.search.split('=')[1];
    this.res[index]={
    name:document.getElementById('name').value,
    pricingTier: this.state.priceTier,
    priceRange: document.getElementById('tierOptions').value,
    weight: document.getElementById('weight').value,
    availability: document.getElementById('avail').value,
    productUrl:document.getElementById('produrl').value,
    isEditable: document.getElementById('eyes').checked
    };
    document.getElementById("submitbtn").disabled = false;
    }
    else
    document.getElementById("submitbtn").disabled = true;
    }
    handleCheckBox = (id)=>{
        document.getElementById("eyes").checked = false;
        document.getElementById("eno").checked = false;
        document.getElementById(id).checked = true;
    }
    handlePriceRange()
    {
        let res = [];
        if(this.state.priceTier==='budget')
        {
            res.push(this.props.pricingInfo.budget.map((val,i)=>
            {
                return(<option key={i} value={val}>{val}</option>
                )
               
            }))
            return<select id="tierOptions">{res}</select>
        }
       else if(this.state.priceTier==='premier')
        {
          res.push(this.props.pricingInfo.premier.map((val,index)=>
            {
                return(<option key={index} value={val}>{val}</option>
                )
               
            }))
            return<select id="tierOptions">{res}</select>
        }
        else
        return
    }
    componentDidMount()
    {
        document.getElementById("submitbtn").disabled = true;

    }
    render()
    {
        return(
<div>
<table>
  <thead>
  <tr>
    <th>FieldName</th>
    <th>Type</th>
    <th>Comments</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>Name</td>
    <td><input id="name" onChange={()=>{this.enableSubmit()}} type="text"></input></td>
    <td>Required</td>
  </tr>
  <tr>
    <td>Weight</td>
    <td><input onChange={()=>{this.enableSubmit()}} id="weight" type="text"></input></td>
    <td>Required</td>
  </tr>
  <tr>
    <td>Availability</td>
    <td><input onChange={()=>{this.enableSubmit()}} id="avail" type="number" min="0"></input></td>
    <td>Optional</td>
  </tr>
  <tr>
    <td>Product Url</td>
    <td><input onChange={()=>{this.enableSubmit()}} id="produrl" type="url"></input></td>
    <td>Required</td>
  </tr>
  <tr>
    <td>Price Tier</td>
    <td><input type="radio" onClick={()=>{this.setState({priceTier:'budget'});this.enableSubmit()}} name="Tier" id="budget" value="budget" /><span style={{marginLeft:'5px',marginRight:'5px'}}>budget</span>
  <input type="radio" onClick={()=>{this.setState({priceTier:'premier'});this.enableSubmit()}} id="premier" name="Tier" value="premier" /><span style={{marginLeft:'5px',marginRight:'5px'}}>premier</span></td>
    <td>Required</td>
  </tr>
  <tr>
    <td>Price Range</td>
    <td>
    {
        this.handlePriceRange()
    }
</td>
    <td>Required</td>
  </tr>
  <tr>
    <td>Is Editable</td>
    <td>  <input style={{marginLeft:'5px',marginRight:'5px'}} type="checkbox" id="eyes" value="true" onClick={(e)=>{this.handleCheckBox(e.target.id);this.enableSubmit()}} />True
  <input style={{marginLeft:'5px',marginRight:'5px'}} type="checkbox" id="eno" name="vehicle2" value="false" onClick={(e)=>{this.handleCheckBox(e.target.id);this.enableSubmit()}} />False</td>
    <td>Required</td>
  </tr>
  </tbody>
</table>
<div style={{'margin':'10px','textAlign':'center'}}>
<button type="button" id="submitbtn" onClick={(e)=>{e.preventDefault();this.props.editProductDetails(this.res);this.props.changePage()}}>Submit</button>
</div>
</div>)

    }

}

const mapStateToProps = ({ prodDetails }) => ({
products:prodDetails.products,
pricingInfo:prodDetails.pricingInfo
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editProductDetails,
      changePage: () => push('/')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProductForm)
