/* eslint-disable */
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  Link,
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


class BookingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: "http://localhost:3023/",
      purchases: null
    };

    this.getAllBookings();
  }

  // updateBookingStatus = function(booking, status){
  //   console.log(booking);
  //   const axios = require('axios');
  //   const { version } = require('axios/package');
  //   axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('userToken');
  //   axios.defaults.headers.common['Content-Type'] = 'application/json';
  //   var data ={id :'', status:''};
  //   if(status === 'delivered'){
  //       data.id= booking.id;
  //       data.status= 'DELIVERED';
  //   }else if(status === 'processing') {
  //       data.id= booking.id;
  //       data.status= 'PROCESSING';
  //   } 
  //   else  {
  //       data.id= booking.id;
  //       data.status= 'CANCELED';
  //   } 

  //   console.log(data);
  //   axios.post("http://localhost:3023/api/purchase/booking/update",data)
  //   .then(function(response) {
  //     toast("Booking status updated successfully.",{autoClose: 1000});
  //     location.reload();
  //   });
  
  // }

  deletePurchase = (purchaseId) => {
    var x = confirm("You want to delete ?");
    if (x) {
      var headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      Axios
        .delete("http://localhost:3023/api/purchase/" + purchaseId, {
          headers: headers,
        })
        .then((success) => {
          location.reload();
          toast.success("Successfully Deleted ");

        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      return false;
    }
  };
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
          <h2 className="font-weight-bold green-text" style={{ marginTop: "40px" }}>Booked/ Purchased Products</h2>

          <MDBRow>
            <MDBCard style={{ width: "100%" }}>
              <MDBCardBody>
                <MDBCol sm="12">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        
                        <th>Status</th>
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
                          <td>
                            <MDBBtn color="primary" style={{paddingRight:'15px',display : (purchase.status ==='CANCELED'  || purchase.status ==='DELIVERED' || purchase.status ==='PROCESSING')? 'none' :'block'}}
                    onClick = {() => this.updateBookingStatus(purchase,'delivered')}>Deliver</MDBBtn> 
                    <MDBBtn color="warning" style={{paddingRight:'15px', display : ( purchase.status ==='DELIVERED' || purchase.status ==='PROCESSING' || purchase.status ==='CANCELED' )? 'none' :'block'}} 
                    onClick = {() => this.updateBookingStatus(purchase,'processing')}> PROCESSING </MDBBtn> 
                            <MDBBtn color="danger" style={{paddingRight:'15px', display : (purchase.status ==='CANCELED' || purchase.status ==='DELIVERED' || purchase.status ==='PROCESSING')? 'none' :'block'}} 
                    onClick = {() => this.updateBookingStatus(purchase,'canceled')}> Cancel </MDBBtn>
                     <a onClick={() => this.deletePurchase(purchase.id)}>
                                          <img
                                            style={{
                                              height: "50px",
                                              width: "50px",
                                              borderRadius:"20px"
                                            }}
                                            src="./Image/delete.png"
                                          />
                                        </a>
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
        <Footer />
      </div>
    );
  }
}

export default BookingList;