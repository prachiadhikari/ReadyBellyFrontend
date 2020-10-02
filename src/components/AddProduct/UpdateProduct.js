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
} from "mdbreact";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { MDBIcon, MDBInput } from "mdbreact";
import Navigation from "../NavbarM";
import Footer from "../Footer";
import { FormGroup, Alert } from "reactstrap";
class UpdateProduct extends React.Component {
  state = {
    isOpen: false,
  };

  isNullOrUndefined = (object) => {
    return object === null || object === undefined;
  };

  validate = () => {
    let nameError = "";
    let priceError = "";
    let descriptionError = "";
    let categoryError = "";
    let offerError = "";
    let sizeError = "";

    if (!this.state.name) {
      nameError = "Food name cannot be empty";
    }
    if (
      this.state.price.includes("-", "+", ".", "?", "/", "<", ">", "{", "}")
    ) {
      priceError = "Invalid price format";
    }
    if (!this.state.price) {
      priceError = "Product price cannot be empty";
    }
    if (!this.state.desc) {
      descriptionError = "Description cannot be empty";
    }
    if (!this.state.type) {
      categoryError = "Select at least one Category";
    }
    if (!this.state.size) {
      sizeError = "Select at least one Size";
    }
    if (
      nameError ||
      priceError ||
      descriptionError ||
      categoryError ||
      offerError ||
      sizeError
    ) {
      this.setState({
        nameError: nameError,
        priceError: priceError,
        descriptionError: descriptionError,
        categoryError: categoryError,
        offerError: offerError,
        sizeError: sizeError,
      });
      return false;
    }
    return true;
  };

  successCallBack = (response) => {
    console.log(response.data);
    toast.success(
      this.state.isUpdate ? "Updated Sucessfully" : "Inserted Successfully",
      {
        position: toast.POSITION.RIGHT,
      }
    );
    Object.keys(this.state).map((key, value) => {
      this.state[key] = "";
    });
  };

  errorCallBack = (err) => {
    if (err.response.data) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  setProductForEdit = (product) => {
    if (!this.isNullOrUndefined(product)) {
      this.state.name = product.name;
      this.state.price = product.price;
      this.state.desc = product.desc;
      this.state.type = product.type;
      this.state.size = product.size;
      this.state.image = product.image;
      this.state.path = product.path;
      this.state.product = product;
      this.state.id = product.id;
      this.state.offer = product.offer;
    }
    console.log(this.state);
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      desc: "",
      type: "",
      offer: "",
      size: "",
      image: "",
      path: "",
      product: "",
      id: "",
      selectedFile:'',
      validationMessage: "",
      nameError: "",
      priceError: "",
      descriptionError: "",
      categoryError: "",
      offerError: "",
      sizeError: "",
      updateProductView: null,
      config: {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
      redirect: false,
      form: null,
    };
    if (this.isNullOrUndefined(props.product)) {
      this.state.isUpdate = false;
    } else {
      this.state.isUpdate = true;
      this.setProductForEdit(props.product);
    }
  }

 
  uploadImage = () => {};

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  productUpdatedValues = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileSelected = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    //for image url
    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({ imagePreviewUrl: reader.result });
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  addProduct = (data, headers) => {
    Axios.post("http://localhost:3023/api/product/add", data, {
      headers: headers,
    })
      .then(this.successCallBack)
      .catch(this.errorCallBack);
       location.reload();
  };

  updateProduct = (data, headers) => {
    Axios.put("http://localhost:3023/api/product/update", data, {
      headers: headers,
    })
      .then(this.successCallBack)
      .catch(this.errorCallBack);
       location.reload();
  };

  updateFinal = () => {
    var data = {
      id: this.state.id,
      name: this.state.name,
      price: this.state.price,
      desc: this.state.desc,
      type: this.state.type,
      size: this.state.size,
      image: this.state.image,
      offer: this.state.offer,
    };

    if (!this.isNullOrUndefined(this.state.image)) {
      data.path = this.state.image;
    }

    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    if (this.state.isUpdate) {
      this.updateProduct(data, headers);
    } else {
      this.addProduct(data, headers);
    }
  };

  uploadImageAndUpdate = (e) => {
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      // Upload Image
      if (
        !this.isNullOrUndefined(this.state.selectedFile) &&
        !this.isNullOrUndefined(this.state.selectedFile.name)
      ) {
        const fd = new FormData();
        fd.append(
          "imageFile",
          this.state.selectedFile,
          this.state.selectedFile.name
        );
        Axios.post("http://localhost:3023/api/upload", fd)
          .then((res) => {
            console.log(res);
            this.setState({ image: res.data.path });
            toast.success("Image sucessfully uploaded!!");

            this.updateFinal();
          })
          .catch((err) => {
            console.log(err);
            this.setState({
              checkValidImage: "Image is not valid",
            });
            toast.error("Image is not valid");
            this.updateFinal();
          });
      } else {
        this.updateFinal();
      }
    }
  };

  render() {
    // for image preview
    let $imagePreview = (
      <label
        htmlFor="previewImage"
        className="previewText image-container"
      ></label>
    );
    if (this.state.imagePreviewUrl) {
      $imagePreview = (
        <label
          htmlFor="previewImage"
          className="image-container text-center"
        >
          <img
            src={this.state.imagePreviewUrl}
            alt="icon"
            width="200"
            height="200"
          />
        </label>
      );
    }
    return (
      <MDBContainer>
        <MDBRow>
          <MDBModalBody>
            <MDBRow>
              <MDBCol>
                <MDBCardHeader className="form-header unique-color-dark rounded white-text">
                  <h3 className="my-3">
                    <MDBIcon icon="clipboard-list " />
                    {this.state.isUpdate? "Update Product" : "Add Product"}
                  </h3>
                </MDBCardHeader>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ marginTop: "10px" }}>
              <MDBCol>
                <MDBCard>
                  <MDBCardBody>
                    <form>
                      <div className="grey-text">
                        <FormGroup>
                          <MDBInput
                            className="black-text"
                            label="Food Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.productUpdatedValues}
                            id="name"
                            type="text"
                            icon="pizza-slice"
                            validate
                            error="wrong"
                            success="right"
                            containerClass="text-left"
                          />
                        </FormGroup>
                        <FormGroup>
                          <MDBInput
                            className="black-text"
                            label="Food Price"
                            icon="money-bill-alt"
                            value={this.state.price}
                            onChange={this.productUpdatedValues}
                            name="price"
                            id="price"
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                            containerClass="text-left"
                          />
                        </FormGroup>
                        <FormGroup>
                          <MDBInput
                            className="black-text"
                            name="desc"
                            id="description"
                            label=" Description"
                            value={this.state.desc}
                            onChange={this.productUpdatedValues}
                            icon="list-ul"
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                            containerClass="text-left"
                          />
                        </FormGroup>

                        <FormGroup>
                          <div>
                            <select
                              className="browser-default custom-select"
                              name="type"
                              value={this.state.type}
                              onChange={this.productUpdatedValues}
                              id="type"
                            >
                              <option> Category</option>
                              <option value="BURGER">BURGER</option>
                              <option value="CHINESE">CHINESE</option>
                              <option value="JAPANESE">JAPANESE</option>
                                <option value="MOMO">MOMO</option>
                              <option value="NEWARI">NEWARI</option>
                              <option value="PIZZA">PIZZA</option>
                              <option value="SWEETS">SWEETS</option>
                              <option value="BAKERY">BAKERY</option>
                                <option value="SOFTDRINKS">SOFT DRINKS</option>
                              <option value="HARDDRINKS">HARD DRINKS</option>
                            </select>
                          </div>
                        </FormGroup>

                        <FormGroup>
                          <div>
                            <select
                              className="browser-default custom-select"
                              name="size"
                              value={this.state.size}
                              onChange={this.productUpdatedValues}
                              id="size"
                            >
                              <option>Size</option>
                              <option value="HALF">HALF</option>
                              <option value="FULL">FULL</option>
                              <option value="LARGE">LARGE</option>
                              <option value="MEDIUM">MEDIUM</option>
                              <option value="SMALL">SMALL</option>

                            </select>
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <MDBInput
                            className="offer"
                            name="offer"
                            label="Offer"
                            icon="sort-numeric-up-alt"
                            id="offer"
                            type="number"
                            validate
                            error="wrong"
                            success="right"
                            value={this.state.offer}
                            onChange={this.productUpdatedValues}
                          />
                          {this.state.offerError ? (
                            <Alert color="danger" size="sm" className="mt-2">
                              {this.state.offerError}
                            </Alert>
                          ) : null}
                        </FormGroup>
                        <FormGroup>

                        <div className="input-group">
                                              <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupFileAddon01">
                                                  Upload
                                                </span>
                                              </div>
                                              <div className="custom-file">
                                                <input
                                                  type="file"
                                                  inputprops={{
                                                    accept: "image/*",
                                                  }}
                                                  className="custom-file-input"
                                                  id="inputGroupFile01"
                                                  aria-describedby="inputGroupFileAddon01"
                                                  onChange={
                                                    this.handleFileSelected
                                                  }
                                                  ref={(fileInput) =>
                                                    (this.fileInput = fileInput)
                                                  }
                                                />
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                  Choose file
                                                </label>
                                              </div>
                                              
                                            </div>
                                            {" "}
                                               {$imagePreview}

                        </FormGroup>
                      </div>
                      <div className="text-center py-6 mt-6">
                        <MDBBtn
                          color="green darken-4"
                          className="btn-block z-depth-1a white-text"
                          onClick={this.uploadImageAndUpdate}
                        >
                          {this.state.isUpdate ? "Update Product" : "Add Product"}
                        </MDBBtn>
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default UpdateProduct;
