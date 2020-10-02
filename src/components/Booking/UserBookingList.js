/* eslint-disable */
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StripeCheckout from 'react-stripe-checkout'
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  Link,MDBModal,
  MDBNavbarToggler,
  MDBCard,
  MDBCardBody,
  MDBTooltip,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBInput,
  MDBBtn,
  MDBCollapse,
  MDBCardHeader
} from "mdbreact";
import Navigation from "../NavbarM";
import Footer from "../Footer";
import Feedback from "../FeedbackPage";
import CollectionEmpty from "../CollectionEmpty";
import Axios from "axios";

class UserBookingList extends Component {
  state = {
    isOpen: false,
    collapseID: ""
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  state = {
    modal2: false,
    modal3: false,
  };

  toggle = (nr) => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
  };

  toggleFeedbackModal = (purchaseId) => () => {
    if (purchaseId !== null && purchaseId !== undefined) {
      this.setState({selectedPurchaseId: purchaseId,
        feedbackModal: !this.state.feedbackModal})
    } else {
      this.setState({feedbackModal: !this.state.feedbackModal})
    }
    // this.setState({feedbackModal: !this.state.feedbackModal});

  }

  constructor(props) {
    super(props);
    this.state = {
      path: "http://localhost:3023/",
      purchases: null,
      status:""
    };

    this.getAllBookings();
  }

  
groupAndGetFinalPurchase = (purchases) => {
  const purchaseMap = new Map();
  purchases.forEach(purchase => {
    var finalPurchase =  purchaseMap.get(purchase.createdAt);
    if (!finalPurchase) {
      finalPurchase = [];
      finalPurchase.push(purchase);
      purchaseMap.set(purchase.createdAt, finalPurchase);
    } else {
      finalPurchase.push(purchase);
    }
  });
  return purchaseMap;
}
updateBookingPayment = function(booking, payment, purchaseId){
  console.log(booking);
  const axios = require('axios');
  var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

  const { version } = require('axios/package');
  //axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("token");
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  var data ={id :'', status:''};
  if(status === 'cashondelivery'){
      data.id= booking.id;
      data.payment= 'CASH_ON_DELIVERY';
  }else if(status === 'paid') {
      data.id= booking.id;
      data.payment= 'PAID';
  } 
  else  {
      data.id= booking.id;
      data.payment= 'CANCELED';
  } 
  location.reload();
  console.log(data);

   axios
      .post("http://localhost:3023/api/purchase/"+booking.id + "/payment-update" , data, {
        headers: headers,
      })
      .then((response) => {
        location.reload();
        toast.response("Booking Status Updated Sucessfully");

      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
}
cancelBooking = function(purchaseId, feedback){
    var headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
    var data ={status: 'CANCELED', feedback: feedback};
     Axios.post("http://localhost:3023/api/purchase/"+ purchaseId + "/status-update" , data, {
          headers: headers,
        })
        .then((response) => {
          toast.success("Booking Status Updated Sucessfully");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
  }

  
getAllBookings = () => {
  var headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  Axios.get("http://localhost:3023/api/purchase/by/user/all", {headers: headers})
      .then((res) => {
        console.log(res.data);
        var products = res.data.products;
        var purchaseMap = this.groupAndGetFinalPurchase(products);
        /*
         * Converting to object literal
        */
        var purchaseObjectLiteral = Array.from(purchaseMap).reduce((obj, [key, value]) => (
          Object.assign(obj, { [key]: value }) 
        ), {});
        console.log(purchaseObjectLiteral);
        this.setState({
          purchases: purchaseObjectLiteral,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
}

downloadInvoice = (createdAt) => () => {
  var headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  Axios.get(
    "http://localhost:3023/api/purchase/generate-invoice/" +
      localStorage.getItem("userId") +
      "/" +
      createdAt,
    { responseType: "blob", headers: headers })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();
      console.log(res.data);
      console.log("Invoice Generated");
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

toggleCollapseList = collapseID => () => {
  this.setState(prevState => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : ""
  }));
}

  render() {
    if (!this.state.purchases || this.state.purchases.length < 1) {
      return (
       <CollectionEmpty/>
      );
    }
    return (
      <div>
        <MDBContainer fluid>
          <Navigation />
          <h2 style={{ marginTop: "40px" }}>Your Booked Products</h2>
          <MDBRow>
            <MDBCard style={{ width: "100%" }}>
              <MDBCardBody>
                <MDBCol sm="12">
               
                  {
                  Object.keys(this.state.purchases).map((createdAt, i) => 
                  (
                    <div>
                      <MDBCard style={{ marginTop: "1rem" }}>
                      <MDBCardHeader color="stylish-color-dark ">
                      {new Date(createdAt).toLocaleDateString()} - {new Date(createdAt).toISOString().substr(11, 8)}

                        <MDBBtn
                          color="primary"
                          onClick={this.toggleCollapseList("basicCollapse" + createdAt)}
                          style={{ marginBottom: "1rem", float: "right" }}
                        >
                          View Purchases
                        </MDBBtn>
                      {
                        this.state.purchases[createdAt].every(purchase => purchase.status === "DELIVERED" || purchase.status === "CANCELED") ?
                        (<MDBBtn
                          color="success"
                          style={{ marginBottom: "1rem", float: "right" }}
                          onClick={this.downloadInvoice(createdAt)}
                        >
                          Generate Bill
                        </MDBBtn>) : null
                      }
                      </MDBCardHeader>
                      <MDBCardBody style={{paddingBottom: "0px"}}>
                      <MDBCollapse id={"basicCollapse" + createdAt} isOpen={this.state.collapseID}>
                      <MDBTable striped>
                  <MDBTableHead color="unique-color-dark" textWhite>
                    
                       <tr>
                         <th>Id</th>
                         <th>Product Image</th>
                         <th>Product Name</th>
                         <th>Price</th>
                         <th>Quantity</th>
                         <th>Status</th>
                         <th>Vendor Remarks</th>
                         <th>Payment</th>
                         <th>Payment Action</th>

                         <th>Action</th>
                       </tr>
                       </MDBTableHead>
                     <tbody>
                       {
                     this.state.purchases[createdAt].map( (purchase, index) => 
                          (
                         <tr>
                           <td>{index + 1}</td>
                           <td>
                             <img
                               className="img-fluid z-depth-0"
                               style={{ height: "100px", width: "100px" }}
                               src={this.state.path + purchase.product.image}
                             />
                           </td>
                           <td>{purchase.product.name}</td>
                           <td>{purchase.price} /-</td>
                           <td>{purchase.quantity}</td>
                           <td> {purchase.status}</td>
                           <td> {purchase.vendorRemarks}</td>
                           <td> {purchase.payment}</td>
                           <td>
                       <StripeCheckout stripeKey="pk_test_mOUfpxsf7uHArKmrOzVHLXu700t9B02FOq" />

                           </td>
                           
                           <td>
                             <MDBBtn
                               color="danger"
                               style={{
                                 paddingRight: "15px",
                                 display:(
                                   purchase.status === "CANCELED" ||
                                   purchase.status === "DELIVERED" ||
                                   purchase.status === "PROCESSING")
                                     ? "none"
                                     : "block",
                               }}
                               onClick={this.toggleFeedbackModal(purchase.id)}
                             >
                              &nbsp;&nbsp;
                             Cancel &nbsp;&nbsp;
                             </MDBBtn>
                           </td>
                         </tr>
                         ))
                        }
                     </tbody>
                   </MDBTable>
                            </MDBCollapse>
                  
                      </MDBCardBody>
                      </MDBCard>
                      
                    
                            
                      </div>
                  )
                    )}
                </MDBCol>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </MDBContainer>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBModal isOpen={this.state.feedbackModal} toggle={this.toggleFeedbackModal}>
          <Feedback onFeedbackSubmit={this.cancelBooking} selectedPurchaseId={this.state.selectedPurchaseId} toggleMethod={this.toggleFeedbackModal}/>
        </MDBModal>
        <Footer />
      </div>
    );
  }
}

export default UserBookingList;