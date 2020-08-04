/* eslint-disable */
import React from "react";
import Carousel from "react-multi-carousel";
import axios from "axios";
import ViewCart from "./ViewCart";
import "react-multi-carousel/lib/styles.css";
import {
  MDBModal,
  MDBModalBody,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBMask,
  MDBIcon,
  MDBView,
  MDBBtn,
  MDBContainer,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBBadge,
  Link,
  MDBCardFooter,
  MDBTooltip,
  Card,
  CardColumns,
  Button,
} from "mdbreact";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProduct from "../AddProduct/UpdateProduct";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAdd: false,
      modalEdit: false,
      test: "hello",
      loaded: false,
      products: [],
      cart: [],
      viewcart: false,
      total: 0,
      products: props.products,
      path: "http://localhost:3023/",
      managedProducts: [],
      isLoggedInUserVendor: localStorage.getItem("userType") === 'VENDOR',
      responsive: {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      },
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    // this.state.managedProducts = this.getManagedProductsByType(this.state.products);
    this.state.managedProducts = this.getProductByVendorName(
      this.state.products
    );
  }

  ////CART////////
  add(selectedProduct) {
    //put only required
    selectedProduct = {
      id: selectedProduct.id,
      image: selectedProduct.image,
      name: selectedProduct.name,
      type: selectedProduct.type,
      price: selectedProduct.price,
      quantity: 1
    };
    
    let myCart = JSON.parse(localStorage.getItem("cart"));

    if (this.isNullOrUndefined(myCart)){
      myCart = [];
      myCart.push(selectedProduct);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } else {
      let productAlreadyAdded = myCart.find(product => product.id === selectedProduct.id); 
      myCart.push(selectedProduct);
      this.isNullOrUndefined(productAlreadyAdded) ? localStorage.setItem("cart", JSON.stringify(myCart)) : null;
    }
  }

  // plus = (products) => {
  //   this.add(products);
  // };

  // delete = (products) => {
  //   const product = this.state.cart.filter((p) => p.id !== products.id);
  //   this.setState({
  //     cart: product,
  //     total: this.state.total - products.quantity * products.price,
  //   });
  // };

  // minus = (products) => {
  //   if (products.quantity != 1) {
  //     this.setState({
  //       cart: [
  //         ...this.state.cart.filter((p) => p.id != products.id),
  //         { ...products, quantity: products.quantity - 1 },
  //       ],
  //       total: this.state.total - products.price,
  //     });
  //   } else {
  //     this.delete(products);
  //   }
  // };

    //// ///////

  getManagedProductsByType(products) {
    let productsByType = {};
    products.map((product) => {
      let productType = product.type;
      if (this.isNullOrUndefined(productsByType[productType])) {
        productsByType[productType] = [];
      }
      productsByType[productType].push(product);
    });
    return productsByType;
  }

  getProductByVendorName(products) {
    let productsByVendor = {};
    products.map((product) => {
      let vendorName = product.user.fullname;
      let userId = product.user.user_id;
      if (this.isNullOrUndefined(productsByVendor[vendorName])) {
        productsByVendor[vendorName] = this.getProductByVendorNameAndType(
          products,
          vendorName,
          userId
        );
      }
    });

    return productsByVendor;
  }

  getProductByVendorNameAndType(products, vendorName, userId) {
    let productsByType = [];
    products.map((product) => {
      if (product.user.fullname === vendorName && product.user_id === userId) {
        let productType = product.type;
        if (this.isNullOrUndefined(productsByType[productType])) {
          productsByType[productType] = [];
        }
        productsByType[productType].push(product);
      }
    });
    return productsByType;
  }

  isNullOrUndefined(object) {
    return object === null || object === undefined;
  }

  toggleEdit = function (product) {
    this.setState({
      modalEdit: !this.state.modalEdit,
      currentProduct: product,
    });
  };

  deleteProduct = (productid) => {
    var x = confirm("You want to delete?");
    if (x) {
      var headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      axios
        .delete("http://localhost:3023/api/product/" + productid, {
          headers: headers,
        })
        .then((success) => {
          location.reload();
          toast.success("Successfully Deleted");

        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      return false;
    }
  };

  
  componentDidMount() {
    let productDisplay = (
      <div>
        {Object.entries(this.state.managedProducts).map(
          ([vendorName, productByType]) => {
            return (
              <div>
                <h2 className="font-weight-bold red-text" style={{ textAlign: "left" }}>{vendorName}</h2>
                {Object.entries(productByType).map(([type, products]) => {
                  return (
                    <div>
                      <h3 className="font-weight-bold green-text"> {type} </h3>
                      <Carousel
                        responsive={this.state.responsive}
                      >
                        {products.map((product, key) => {
                          return (
                            <div
                              // className="mb-lg-0 mb-4"
                              key={product.id}
                            >
                              <MDBCard
                                className="align-items-center"
                                style={{
                                  marginBottom: "30px",
                                  marginRight: "20px",
                                }}
                              >
                                <MDBCardImage
                                  style={{ height: "200px", width: "100%" }}
                                  className="img-fluid"
                                  src={this.state.path + product.image}
                                  alt="img"
                                />
                                <MDBCardBody className="text-center">
                                  <MDBRow>
                                    <MDBCol>
                                      <span className="grey-text">
                                        {product.desc}
                                      </span>
                                    </MDBCol>
                                  </MDBRow>
                                  <MDBRow>
                                    <MDBCol>
                                      <MDBBadge pill color="danger">
                                        <strong> RS. {product.price} </strong>
                                      </MDBBadge>
                                    </MDBCol>
                                    <MDBCol>
                                      <MDBBadge pill color="success">
                                        <strong> {product.offer}% offer </strong>
                                      </MDBBadge>
                                    </MDBCol>
                                  </MDBRow>
                                  <MDBRow>
                                    <MDBCol>
                                      <MDBBadge pill color="warning">
                                        {product.size} 
                                      </MDBBadge>
                                    </MDBCol>
                                  </MDBRow>
                                  <MDBRow>
                                    <MDBCol>
                                      <h4 className="font-weight-bold black-text">
                                        {product.name}
                                      </h4>
                                    </MDBCol>
                                  </MDBRow>
                                 
                                  {!this.state.isLoggedInUserVendor ? (
                                    <MDBRow>
                                      <MDBCol >
                                        <a onClick={() => this.add(product)}>
                                          <img
                                            style={{
                                              height: "80px",
                                              width: "80px",
                                              borderRadius:"20px"
                                            }}
                                            src="./Image/cart.png"
                                          />
                                        </a>
                                      </MDBCol>
                                       
                                     
                                    </MDBRow>
                                  ) : null}
                                  {this.state.isLoggedInUserVendor ? (
                                    <MDBRow>
                                      <MDBCol
                                        xs="6"
                                        sm="6"
                                        className="text-left"
                                      >
                                        <a
                                          onClick={() =>
                                            this.toggleEdit(product)
                                          }
                                        >
                                          <img
                                            style={{
                                              height: "46px",
                                              width: "50px",
                                            }}
                                            src="./Image/edi.png"
                                          />
                                        </a>
                                      </MDBCol>
                                      <MDBCol xs="6" sm="6">
                                        <a onClick={() => this.deleteProduct(product.id)}>
                                          <img
                                            style={{
                                              height: "43px",
                                              width: "48px",
                                            }}
                                            src="./Image/delete.jpg"
                                          />
                                        </a>
                                      </MDBCol>
                                    </MDBRow>
                                  ) : null}
                                </MDBCardBody>
                              </MDBCard>
                            </div>
                          );
                        })}
                      </Carousel>
                    </div>
                  );
                })}
              </div>

            );
          }
        )}
      </div>


    );
    this.setState({ productDisplay: productDisplay });
  }

  render() {
    const{products}=this.state
    return (
      <MDBCard className="text-center">
        <MDBCardBody>
          <MDBModal
            isOpen={this.state.modalEdit}
            toggle={() => this.toggleEdit("")}
          >
            <MDBModalBody>
              <UpdateProduct product={this.state.currentProduct} />
            </MDBModalBody>
          </MDBModal>
          {this.state.productDisplay}
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default Products;