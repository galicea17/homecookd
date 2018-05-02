import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import "./SellerProfileEdit.css"
import {UpdateSellerInfo} from "../../../Utils/Sellers"
import {getSellerInfo} from "../../../Utils/Sellers"

import { Table } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

class ProfileEdit extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      business_name:'',
      newPassword:'',
      location:''

    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.HandleFormSubmission = this.HandleFormSubmission.bind(this);

  }
  handleFormChange(e){
       const value = e.target.value;
       const name = e.target.name;
       this.setState({[name]: value})
   }

  HandleFormSubmission(e){
    const name = this.state.name;
    const business_name = this.state.business_name;
    const newPassword = this.state.newPassword;
    const city = this.state.location;
    // const Time = this.state.Time;

    const requestBody = {
      name, business_name, city
    }

    UpdateSellerInfo(localStorage.getItem('api_token'),requestBody)
    .then(response => {
      alert("Response " + JSON.stringify(response))
    })
    .catch(error => {
      alert("Error " + JSON.stringify(error))
    })
    e.preventDefault();
  }

  componentDidMount() {
    getSellerInfo()
      .then(res => console.log(res))
  }

  render() {

    return (
    <div style={{padding: 150}}>
<center><h2>Edit Account Page</h2></center>


  <Table>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Name:</Table.Cell>
        <Table.Cell><TextField name="Name" value = {this.state.name}autoFocus
          onChange={this.handleFormChange}
        /></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>Restaurant Name:</Table.Cell>
        <Table.Cell><TextField name="Restaurant" value = {this.state.business_name} autoFocus
          onChange={this.handleFormChange}
        /></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>Password:</Table.Cell>
        <Table.Cell><TextField name="Password" value = {this.state.newPassword} autoFocus
          onChange={this.handleFormChange}
        /></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>City:</Table.Cell>
        <Table.Cell><TextField name="City" value = {this.state.City} autoFocus
          onChange={this.handleFormChange}
        /></Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>

  <Button content='Submit' onClick = {this.HandleFormSubmission}/>
    </div>
    )
  }
}


export default ProfileEdit;
