/* eslint-disable */
import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBCardHeader,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBModalBody,
  MDBModal,
  Link,
} from "mdbreact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { MDBIcon, MDBInput } from "mdbreact";
import Navigation from "../NavbarM";
import Footer from "../Footer";
import { FormGroup, Alert } from "reactstrap";
import ViewProducts from "./ViewProducts";
import ViewCart from "./ViewCart";
import ProductEmpty from "../ProductEmpty";
import axios from "axios";
import UpdateProduct from "../AddProduct/UpdateProduct";

class ProductPage extends React.Component {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    if (localStorage.getItem("userType") === "VENDOR") {
      axios
        .get(
          "http://localhost:3023/api/product/" +
            localStorage.getItem("userId") +
            "/all"
        )
        .then((res) => {
          this.setState({
            products: res.data.products,
          });
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      axios
        .get("http://localhost:3023/api/product/all")
        .then((res) => {
          console.log(res.data.products);
          this.setState({
            products: res.data.products,
            path: "http://localhost:3023/uploads/",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  toggleAdd = () => {
    this.setState({
      modalAdd: !this.state.modalAdd,
    });
  };

  update = () => {
    this.setState({
      viewcart: !this.state.viewcart,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      modalAdd: false,
      name: "",
      price: "",
      description: "",
      category: "",
      quantity: "",
      size: "",
      image: "",
      validationMessage: "",
      nameError: "",
      priceError: "",
      descriptionError: "",
      categoryError: "",
      quantityError: "",
      sizeError: "",
      redirect: false,
      products: [],
      isLoggedInUserVendor: localStorage.getItem("userType") === "VENDOR",
    };
  }

  render() {
    if (this.state.products.length > 0) {
      console.log("inside products");
      return (
        <MDBContainer style={{ marginTop: "40px" }} fluid>
          <MDBRow>
            <MDBCol sm="12">
              <Navigation />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol sm="9">
              <h1 className="font-weight-bold black-text">MENUS</h1>
            </MDBCol>
            {this.state.isLoggedInUserVendor ? (
              <MDBCol sm="3">
                <MDBBtn
                  color="success"
                  rounded
                  className="white-text"
                  onClick={() => this.toggleAdd()}
                >
                  ADD NEW FOOD
                  <MDBIcon style={{marginLeft:"5px"}} icon="plus-circle"/>
                
                </MDBBtn>
              </MDBCol>
            ) : (
              <MDBCol sm="3">
              <Link to="/viewcart">
                <MDBBtn
                  onClick={this.update}
                  color="warning"
                  style={{
                    marginTop: "15px",
                    marginLeft: "44%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {this.state.viewcart ? "Hide " : "View "} Cart
                  <MDBIcon style={{marginLeft:"5px"}} icon="shopping-cart"/>
                </MDBBtn>
                </Link>
              </MDBCol>
            )}
          </MDBRow>
          <MDBRow>
            <MDBCol sm="12">
              {this.state.viewcart && (
                <ViewCart style={{ marginTop: "100px" }} />
              )}
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol sm="12">
              <ViewProducts products={this.state.products} />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol sm="12">
              
            </MDBCol>
          </MDBRow>

              <MDBModal isOpen={this.state.modalAdd} toggle={this.toggleAdd}>
                <MDBModalBody>
                  <UpdateProduct />
                </MDBModalBody>
              </MDBModal>
          <Footer />
        </MDBContainer>
      );
    } else {
      console.log("Products!!!!!");
      return (<ProductEmpty/>);
    }
  }
}
export default ProductPage;