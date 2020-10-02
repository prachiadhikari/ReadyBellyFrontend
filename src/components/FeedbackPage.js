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
export default class Feedback extends Component {
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
      message: "",
      emailError:"",
      redirect: false,
    };

  }



  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };


  validate=()=>{
    let emailError=""
    if (!this.state.message){
      emailError="message can not be empty"
    }
    if (
      emailError 
    ) {
      this.setState({
        emailError: emailError,
      });
      return false;
    }
    return true;
  };

  addFeedback = () => {
    this.props.onFeedbackSubmit(this.props.selectedPurchaseId, this.state.message);
   }

   feedback = (e) =>{
     e.preventDefault();
     const isValid= this.validate();
     if(isValid){
       console.log(this.state)}
   }

  render() {
   

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <MDBCard
              style={{
                marginLeft: "10px",
                width: "480px",
              }}
            >
              <MDBCardHeader
                className="form-header unique-color-dark rounded white-text"
                style={{ width: "452px" }}
              >
                <h3 className="my-3">
                  <MDBIcon icon="comment-dots" color="red" /> Feedback
                </h3>
              </MDBCardHeader>
              <MDBCardBody className="mx-6">
                <form onSubmit={this.addFeedback}>
                  <div className="grey-text">
                    <FormGroup>
                      <MDBInput
                        className="black-text"
                        label="Your Message"
                        value={this.state.message}
                        onChange={this.handleChange}
                        icon="comments"
                        group
                        type="text"
                        name="message"
                        id="message"
                        style={{ textAlign: "center" }}
                        validate
                        error="wrong"
                        success="right"
                      />
                      {this.state.emailError ? (
                        <Alert color="red darken-4" size="sm" className="mt-2">
                          {this.state.emailError}
                        </Alert>
                      ) : null}
                    </FormGroup>

                  
                  </div>
                  <div className="text-center py-6 mt-6">
                    <MDBBtn
                      type="submit"
                      icon="paper-plane"
                      color="red accent-2"
                      className="btn-block z-depth-1a white-text"
                      onClick={this.addFeedback}
                    ><MDBIcon icon="paper-plane" style={{margin:"5px"}} />
                      Send 
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
              <ModalFooter className="mx-5 pt-3 mb-1">
                
              </ModalFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
