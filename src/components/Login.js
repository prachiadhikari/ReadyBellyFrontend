/* eslint-disable */
import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBRow,
  MDBCol,
  MDBContainer,
  ModalFooter,
  MDBCardHeader,
  MDBBtn,
  MDBCard,
  MDBModal,
  MDBModalHeader,
  MDBCardBody,
} from "mdbreact";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import { MDBIcon, MDBInput } from "mdbreact";
import Axios from "axios";
import { FormGroup, Alert } from "reactstrap";
export default class Login extends Component {
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
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      emailError: "",
      passwordError: "",
      redirect: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3023/api/user/login", this.state)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.userToken);
        localStorage.setItem("userType", response.data.user.user_type);
        localStorage.setItem("userId", response.data.user.id);
        // switch (response.data.user.user_type) {
        //   case "ADMIN": {
        //     history.push("/");
        //     break;
        //   }
        //   case "VENDOR": {
        //     history.push("/vendordash");
        //     break;
        //   }
        //   case "USER": {
        //     history.push("/");
        //     break;
        //   }
        //   default:
        //     history.push("/");
        // }
        this.setState({ isLoggedIn: true });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message);
      });
    this.setState({ email: "", password: "" });
  };

  render() {
    if (this.state.isLoggedIn === true) {
      toast.success("Login Sucessfully", {
        position: toast.POSITION.RIGHT,
      });
      return <Redirect to="/products" />;
    } else if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
            <MDBCard
              style={{
                marginLeft: "10px",
                width: "480px",
              }}
            >
              <MDBCardHeader
                className="form-header unique-color-dark rounded white-text"
                style={{ width: "100%" }}
              >
                <h3 className="my-3">
                  <MDBIcon icon="lock" /> Sign-In
                </h3>
              </MDBCardHeader>
              <MDBCardBody className="mx-6">
                <form onSubmit={this.formSubmitHandler}>
                  <div className="grey-text">
                    <FormGroup>
                      <MDBInput
                        className="black-text"
                        label="Your Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        icon="envelope"
                        group
                        type="email"
                        name="email"
                        id="email"
                        style={{ textAlign: "center" }}
                        validate
                        error="wrong"
                        success="right"
                      />
                      {this.state.emailError ? (
                        <Alert color="danger" size="sm" className="mt-2">
                          {this.state.emailError}
                        </Alert>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <MDBInput
                        className="black-text"
                        label="Your Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        icon="lock"
                        style={{ textAlign: "center" }}
                        group
                        name="password"
                        id="password"
                        type="password"
                        validate
                      />
                      {this.state.passwordError ? (
                        <Alert color="danger" size="sm" className="mt-2">
                          {this.state.passwordError}
                        </Alert>
                      ) : null}
                    </FormGroup>
                  </div>
                  <div className="text-center py-6 mt-6">
                    <MDBBtn
                      type="submit"
                      color=" green darken-4"
                      className="btn-block z-depth-1a white-text"
                      onClick={this.submitForm}
                    >
                      Login
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
              <ModalFooter className="mx-5 pt-3 mb-1">
                <p className="font-small grey-text d-flex justify-content-end">
                  Not a member?
                  <Link
                    to="/registration"
                    className="blue-text ml-1"
                    onClick={this.toggle(2)}
                  >
                    Sign up here!!{" "}
                  </Link>
                </p>
              </ModalFooter>
            </MDBCard>
    );
  }
}
