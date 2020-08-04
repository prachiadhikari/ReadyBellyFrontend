/* eslint-disable */
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table } from "react-bootstrap";
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
import Empty from "../Empty";
import StripeCheckout from 'react-stripe-checkout'
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class ViewCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      quantity: "",
      price: "",
      offer:"",
      size:"",
      userRemarks: "",
      vendorRemarks: "",
      id: "",
      selectedFile: "",
      redirect: false,
      cart: JSON.parse(localStorage.getItem("cart")),
      path: "http://localhost:3023/",
      config: {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    };
  }
  updateCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let newCart = cart.map((cartProduct) => {
      if (cartProduct.id === product.id && product.quantity > 0) {
        return product;
      }
      if (product.quantity > 0) {
        return cartProduct;
      }
    });

    this.setState({ cart: newCart });
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  handleplus = (product) => {
    product.quantity++;
    this.updateCart(product);
  };

  handledelete = (product, index) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);

    this.setState({ cart: cart });
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  handleminus = (product) => {
    if (product.quantity != 1) {
      product.quantity--;
      this.updateCart(product);
    }
  };

  update = () => {
    this.setState({
      viewcart: !this.state.viewcart,
    });
  };

  ////////BOOKING///////

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  bookingValues = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  bookFinal = () => {
    var x = confirm("Are you sure, you want to book Products?");
    if (x) {
    var data = JSON.parse(localStorage.getItem("cart"));
    var newData = data.map(product => {
      return {
        quantity: product.quantity,
        price: product.price,
        productId: product.id
      }
    })
    var headers = {
      //data: JSON.parse(localStorage.getItem("cart")),

      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    Axios.post("http://localhost:3023/api/purchase/book", newData, {
      headers: headers,
    })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          this.setState({ redirect: true });
        } 
        toast.success("Your Product(s) Booked Sucessfully", 
        localStorage.removeItem("cart"),
        {

          position: toast.POSITION.RIGHT,
        }); 
      })}
      else{ 
       
          console.log(err.data.message);
          toast(err);
        }
  };


  render() {
    const { cart } = this.state;
    if (!this.state.cart || this.state.cart.length < 1) {
      return (
        <div>
          <Empty/>
        </div>
      );
    }
    return (
      <div>
        <MDBContainer>
          <Navigation />
          <h2 className="font-weight-bold green-text" style={{ marginTop: "40px" }}>Your Cart</h2>
            <form onSubmit={this.bookFinal}>
             <ToastContainer />
            <MDBRow>
            
              <MDBCard className="align-items-center">
                <MDBCardBody>
                  <MDBCol>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Product Image</th>
                          <th>Product Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Plus</th>
                          <th>Minus</th>
                          <th>Delete</th>
                          <th>Net Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.cart.map((products, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                className="img-fluid z-depth-0"
                                style={{ height: "100px", width: "100px" }}
                                src={this.state.path + products.image}
                              />
                            </td>
                            <td>{products.name}</td>
                            <td>{products.price} /-</td>
                            <td>{products.quantity}</td>


                            <td>
                              <Button
                                onClick={() => this.handleplus(products)}
                                variant="success"
                                style={{ margin: "5px" }}
                              >
                                <i class="fas fa-plus-circle"></i>
                              </Button>
                            </td>
                            <td>
                              <Button
                                onClick={() => this.handleminus(products)}
                                variant="secondary"
                                style={{ margin: "5px" }}
                              ><i class="fas fa-minus-circle"></i>
                              </Button>
                            </td>
                            <td>
                              <Button
                                onClick={() =>
                                  this.handledelete(products, index)
                                }
                                variant="danger"
                                style={{ margin: "5px" }}
                              ><i class="fas fa-trash"></i>
                              </Button>
                            </td>
                            <td> {products.quantity * products.price}/-</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </MDBCol>
                  <p class="text-primary mb-0">
                    <i class="fas fa-info-circle mr-1"></i> Do not delay the
                    purchase, adding products to your cart does not mean booking
                    them.
                  </p>
                </MDBCardBody>
              </MDBCard>

                 <MDBCard>
                <MDBCardBody>
                <MDBCol>
                  <h5 class="mb-3">The total price of</h5>

                  <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Price
                      <span>
                        RS{" "}
                        {this.state.cart
                          .map((product) => product.price * product.quantity)
                          .reduce((a, b) => a + b)}
                      </span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>RS 0</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>The total price of</strong>
                        <strong>
                          <p class="mb-0">(including shipping)</p>
                        </strong>
                      </div>
                      <span>
                        <strong>
                          RS{" "}
                          {this.state.cart
                            .map((product) => product.price * product.quantity)
                            .reduce((a, b) => a + b)}
                        </strong>
                      </span>
                    </li>
                  </ul>
                  
                  {/* <button
                    type="submit"
                    onClick={this.bookFinal}
                    class="btn btn-primary btn-rounded"
                  >
                    confirm booking
                  </button> */}
                 <div>
                  <MDBBtn onClick={this.bookFinal} color="success" >Cash on Delivery</MDBBtn>
                     
                  </div>
                  <div>
                      
                     <center>{     
                             <StripeCheckout
                             onClick={this.bookFinal}
                             stripeKey="pk_test_mOUfpxsf7uHArKmrOzVHLXu700t9B02FOq"
                             
                             />
                      
                     }</center>
                 </div>
                  </MDBCol>
                </MDBCardBody>
              </MDBCard>

              </MDBRow>

            </form>

         

          <div
            class="card mb-3"
            style={{
              marginTop: "10px",
              marginRight: "278px",
              marginLeft: "-16px",
            }}
          >
            <div class="card-body">
              <h5 class="mb-4">Expected shipping delivery</h5>

              <p class="mb-0"> MON. 10:00. - FRI. 16:00.</p>
            </div>
          </div>

          <div
            class="card mb-3"
            style={{
              marginTop: "10px",
              marginRight: "278px",
              marginLeft: "-16px",
            }}
          >
            <div class="card-body">
              <h5 class="mb-4">We accept</h5>

              <img
                style={{ height: "15%", width: "15%", margin: "1%" }}
                src="./Image/visa.png"
              />
              
              <img
                style={{height: "15%", width: "15%", margin: "1%"  }}
                src="./Image/master.png"
              />
              <img
                style={{ height: "15%", width: "15%", margin: "1%"   }}
                src="./Image/wallet.png"
              />
              <img
                style={{ height: "25%", width: "25%", margin: "1%"  }}
                src="./Image/digital.jpg"
              />
            </div>
          </div>
        </MDBContainer>
        <Footer />
      </div>
    );
  }
}

export default ViewCart;