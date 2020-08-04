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
} from "mdbreact";
import Navigation from "../NavbarM";
import Footer from "../Footer";
import Feedback from "../FeedbackPage";
import CollectionEmpty from "../CollectionEmpty";


import Axios from "axios";

class UserBookingList extends Component {
  state = {
    isOpen: false,
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
        this.setState({
          purchases: res.data.products,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
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
                  <MDBBtn color="success">Cash on Delivery</MDBBtn>

                  {
                    <StripeCheckout stripeKey="pk_test_mOUfpxsf7uHArKmrOzVHLXu700t9B02FOq" />
                  }
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Vendor Remarks</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.purchases.map((purchase, index) => (
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
                      ))}
                    </tbody>
                  </Table>
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