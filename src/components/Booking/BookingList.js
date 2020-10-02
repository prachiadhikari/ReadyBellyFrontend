import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  Link,
  MDBNavbarToggler,MDBModal,
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
import Axios from "axios";
import CollectionEmpty from "../CollectionEmpty";
import Feedback from "../FeedbackPage";


class BookingList extends Component {

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
      purchases: null
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
   updateBookingStatus = function(booking, status, purchaseId){
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
    if(status === 'delivered'){
        data.id= booking.id;
        data.status= 'DELIVERED';
    }else if(status === 'processing') {
        data.id= booking.id;
        data.status= 'PROCESSING';
    } 
    else  {
        data.id= booking.id;
        data.status= 'CANCELED';
    } 
    location.reload();
    console.log(data);

     axios
        .post("http://localhost:3023/api/purchase/"+booking.id + "/status-update" , data, {
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



  getAllBookings = () => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    Axios.get("http://localhost:3023/api/purchase/by/vendor/all", {headers: headers})
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
          <h2 className="font-weight-bold green-text" style={{ marginTop: "40px" }}>Booked/ Purchased Products
          </h2>

          <MDBRow>
            <MDBCard style={{ width: "100%" }}>
              <MDBCardBody>
                <MDBCol sm="12">
                <MDBTable striped>
                  <MDBTableHead color="unique-color-dark" textWhite>
                    <tr>
                        <th>Id</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        
                        <th>Status</th>
                        <th>User Remarks</th>
                        <th>Payment Remarks</th>
                        <th>Action</th>
                      </tr>
                    </MDBTableHead>
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
                          <td>{purchase.userRemarks}</td>
                          <td>{purchase.payment}</td>

                          
                          <td>
                            <MDBBtn color="primary" style={{paddingRight:'15px',display : (purchase.status ==='CANCELED'  || purchase.status ==='DELIVERED' || purchase.status ==='PROCESSING')? 'none' :'block'}}
                    onClick = {() => this.updateBookingStatus(purchase,'delivered')}>Deliver</MDBBtn> 
                    <MDBBtn color="warning" style={{paddingRight:'15px', display : ( purchase.status ==='DELIVERED' || purchase.status ==='PROCESSING' || purchase.status ==='CANCELED' )? 'none' :'block'}} 
                    onClick = {() => this.updateBookingStatus(purchase,'processing')}> PROCESSING </MDBBtn> 
                            <MDBBtn color="danger" style={{paddingRight:'15px', display : (purchase.status ==='CANCELED' || purchase.status ==='DELIVERED' || purchase.status ==='PROCESSING')? 'none' :'block'}} 
                    onClick = {this.toggleFeedbackModal(purchase.id)}>  &nbsp;&nbsp;
                    Cancel &nbsp;&nbsp; </MDBBtn>
                          
                     
                          </td>
 
                       
                        </tr>
                      ))}
                    </tbody>
                  </MDBTable>
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

export default BookingList;