/* eslint-disable */
import React, { Component } from "react";
import { MDBContainer, MDBInput, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBNav, MDBNavItem, MDBNavLink, MDBTabPane,
MDBTabContent, MDBSelect, MDBSelectInput, MDBSelectOption, MDBSelectOptions } from "mdbreact";
import Navigation from "../NavbarM";
import Footer from "../Footer";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import axios from "axios";


class Booking extends React.Component {

state={
  activePill: "1",
  isOpen: false,
}

togglePills = tab => {
  if (this.state.activePill !== tab) {
    this.setState({
      ctivePill: tab
    });
  }
}

selectNextTab = () => {
  this.setState({
    activePill: (+this.state.activePill + 1).toString()
  });
}

constructor(props) {
    super(props);
    this.state = {
    cart: JSON.parse(localStorage.getItem("cart")),
    path:'',
    us:'',
    id:'',
   price:'',
   quantity:'',
   address:'',
   selectedFile:'',
   cart: [],
   ID:'',
    config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null,
    redirect:false

  }
  }

componentWillMount() {

 
 

       
      
 }


render() {
 

  const {us} = this.state

return (
  <div>
    <MDBContainer>
    <Navigation />
    <MDBCol style={{marginTop:"60px"}}>
    <h2>Checkout Panel</h2>
    </MDBCol>
  <MDBRow className="my-2" center>
        <MDBCard className="w-100" style={{marginTop:"20px"}}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol lg="8" className="mb-4">
                <MDBNav pills color="primary" className="nav-justified">
                  <MDBNavItem>
                    <MDBNavLink to="#"  onClick={()=> this.togglePills("1")}>
                      <strong>1. Billing</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/pay" >
                      <strong>2. Payment</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                </MDBNav>

               
                  <MDBTabPane tabId="1">
                    <form>
                      <MDBRow>
                 
                         
                       
                        <MDBCol>  
                          <label 
                          htmlFor="text">
                          Name
                          </label>
                          <input 
                          type="text" 
                          id="price" 
                          className="form-control mb-4"  />

<label 
                          htmlFor="text">
                          Price
                          </label>
                          <input 
                          type="text" 
                          id="price" 
                          className="form-control mb-4"  />
                          <label 
                          htmlFor="address">
                          Address
                          </label>
                          <input 
                          type="text" 
                          id="address" 
                          className="form-control mb-4" 
                          placeholder="Main Street" />
                        </MDBCol>


                      </MDBRow>
                      <hr />
                      <div className="mb-1">
                        <input 
                        type="checkbox" 
                        className="form-check-input filled-in" id="chekboxRules" />
                        <label 
                        className="form-check-label" 
                        htmlFor="chekboxRules">
                        I accept the terms and conditions
                        </label>
                      </div>

                      <div className="mb-1">
                        <input type="checkbox" className="form-check-input filled-in" id="safeTheInfo" />
                        <label 
                        className="form-check-label" 
                        htmlFor="safeTheInfo">
                        Save this information for next time
                        </label>
                      </div>

                      <MDBBtn color="primary" size="lg" block >BOOK</MDBBtn>
                      <hr />
                    </form>
                  </MDBTabPane>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
    </div>
    );
  }
}

export default Booking;