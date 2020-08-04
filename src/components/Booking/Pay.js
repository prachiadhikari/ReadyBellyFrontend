import React, { Component } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBNav, MDBNavItem, MDBNavLink, MDBTabPane,
MDBTabContent, MDBSelect, MDBSelectInput, MDBSelectOption, MDBSelectOptions } from "mdbreact";
import Navigation from "../NavbarM";
import StripeCheckout from 'react-stripe-checkout'
import Footer from "../Footer";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import Axios from "axios";


class Pay extends React.Component {

state={
  activePill: "1",
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




render() {
  const { activePill } = this.state;
//   async function handleToken(token) {
//     console.log(token)

//    const response= await Axios.post("http://localhost:3023/checkout",{
//         token
        
//     });
       
//         const {status}=response.data
//         {
           
//             if(status=='success')
//             {
                       
             
//         }
//     } 
 
// }

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
                    <MDBNavLink to="/booking" className={activePill==="1" ? "active" : "" } 
                      >
                      <strong>1. Billing</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#" className={activePill==="2" ? "active" : "" } 
                      >
                      <strong>2. Payment</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                </MDBNav>

                  <MDBTabPane tabId="2">
                    <div className="d-block my-3">
                      {/* <div className="mb-2">
                        <input name="group2" type="radio" className="form-check-input with-gap" id="radioWithGap4" required />
                        <label className="form-check-label" htmlFor="radioWithGap4">Credit card</label>
                      </div> */}
                      {/* <div className="mb-2">
                        <input iname="group2" type="radio" className="form-check-input with-gap" id="radioWithGap5"
                          required />
                        <label className="form-check-label" htmlFor="radioWithGap5">Debit card</label>
                      </div> */}
                      <MDBBtn color="success" >Cash on Delivery</MDBBtn>
                      <hr/>

                      
                      {
                              
                               
                              <StripeCheckout
                              stripeKey="pk_test_mOUfpxsf7uHArKmrOzVHLXu700t9B02FOq"
                              
                              />
                       
                      }
                     
                      {/* <MDBRow>
                        <MDBCol md="6" className="mb-3">
                          <label htmlFor="cc-name123">Name on card</label>
                          <input type="text" className="form-control" id="cc-name123" required />
                          <small className="text-muted">Full name as displayed on card</small>
                          <div className="invalid-feedback">
                            Name on card is required
                          </div>
                        </MDBCol>
                        <MDBCol md="6" className="mb-3">
                          <label htmlFor="cc-number123">Credit card number</label>
                          <input type="text" className="form-control" id="cc-number123" required />
                          <div className="invalid-feedback">
                            Credit card number is required
                          </div>
                        </MDBCol>
                      </MDBRow> */}
                      {/* <MDBRow>
                        <MDBCol md="3" className="mb-3">
                          <label htmlFor="cc-name123">Expiration</label>
                          <input type="text" className="form-control" id="cc-name123" required />
                          <div className="invalid-feedback">
                            Name on card is required
                          </div>
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">
                          <label htmlFor="cc-cvv123">CVV</label>
                          <input type="text" className="form-control" id="cc-cvv123" required />
                          <div className="invalid-feedback">
                            Security code required
                          </div>
                        </MDBCol>
                      </MDBRow> */}
                      <hr className="mb-4" />
                    
                    </div>
                  </MDBTabPane>
              
              </MDBCol>
              <MDBCol lg="4" className="mb-4">
                <MDBBtn color="primary" size="lg" block>
                  Place order
                </MDBBtn>
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

export default Pay;