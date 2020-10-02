/* eslint-disable */
import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBCardHeader,
  MDBBtn,
  MDBCard,MDBBadge,
  MDBCardBody,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownMenu,
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
  searchProduct = (event) => {
    axios
      .get("http://localhost:3023/api/product/searchProduct/" + event.target.value)
      .then((success) => {
        this.setState({products: success.data});
        console.log(success)

      })
      .catch((err) => {
       console.log(err)
      });
};

search = (searchText) => {
  axios
      .get("http://localhost:3023/api/product/searchProduct/" + searchText)
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
sort = (type, order) => {
  var unOrderedProducts = this.state.products;
  var orderedProducts;
  console.log(unOrderedProducts);
  if (type === "VENDOR") {
    if (order === "DESC") {
      orderedProducts = unOrderedProducts.sort((b, a) =>
        a.user.fullname.localeCompare(b.user.fullname)
      );
    } else {
      orderedProducts = unOrderedProducts.sort((a, b) =>
        a.user.fullname.localeCompare(b.user.fullname)
      );
    }
  } else if (type === "PRODUCT_NAME") {
    if ((order = "DESC")) {
      orderedProducts = unOrderedProducts.sort((b, a) =>
        a.name.localeCompare(b.name)
      );
    } else {
      orderedProducts = unOrderedProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
  }
  this.setState({ products: unOrderedProducts });
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
    const elementStyle ={
      borderRadius:'10px',
      width: "100%",
      marginLeft: "0px",
      marginBottom: "30px",
      border: "1px solid orange",
      height: "40px",
    }
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
              {!this.state.isLoggedInUserVendor ? (
              <div>
                <MDBDropdown>
                  <MDBDropdownToggle caret color="primary">
                    Sort By
                  </MDBDropdownToggle>
                  <MDBDropdownMenu basic>
                    <MDBDropdownItem onClick={() => this.sort("VENDOR", "ASC")}>
                      Vendor (Asc)
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      onClick={() => this.sort("VENDOR", "DESC")}
                    >
                      Vendor (Desc)
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </div> ) : null}
            </MDBCol>
            {this.state.isLoggedInUserVendor ? (
              <MDBCol sm="3">
                <MDBBtn
                  color="mdb-color darken-3"
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
              {/* <span className="counter">22</span> */}
                <MDBBtn  
                  onClick={this.update}
                  color="warning"
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "left",
                  }}
                >
                 
                  {this.state.viewcart ? "Hide " : "View "} Cart
                  <MDBIcon style={{marginLeft:"5px"}} icon="shopping-cart"/>
                  <MDBBadge color="danger" className="ml-2">4</MDBBadge>
                </MDBBtn>
                
                </Link>
                
              </MDBCol>
            )}
          </MDBRow>
          <MDBRow>
          <MDBCol md="12">
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text unique-color-dark lighten-3" id="basic-text1">
            <MDBIcon className="text-white" icon="search" />
          </span>
        </div>
        <input   placeholder="Enter product to be searched" 
  
      onChange={this.searchProduct} className="form-control my-0 py-1" type="text" aria-label="Search" />
      </div>
    </MDBCol>
          
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
            {this.state.products.length > 0 ? (
              <ViewProducts
                key={this.state.products[0].name}
                products={this.state.products}
              />) : (
               <ProductEmpty/>
              )}
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
 
  }
}
export default ProductPage;