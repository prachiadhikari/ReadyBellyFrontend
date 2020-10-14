/* eslint-disable */
import React from 'react'
import { 
  Container
} from 'react-bootstrap'
import Navigation from '../NavbarM'
import Footer from '../Footer'
import{ MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBInput, MDBIcon} from 'mdbreact';
import './Contact.css';
import { FormGroup, Alert } from "reactstrap";
import Axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


class Contact extends React.Component {

constructor(props){
  super(props)


  this.state = {
   
    redirect:false,
     yourname:"",
    youremail:"",
    yourfeedback:"",
    validationMessage:"",
    nameError:"",
     emailError:"",
     feedbackError: "",

  }
}

validate = () => {
  let nameError = "";
  let emailError = "";
  let feedbackError = "";

  if (!this.state.yourname) {
nameError = "yourname cannot be empty";
}
if (!this.state.youremail.includes("@")) {
emailError = "invalid email"
}
 if (!this.state.yourfeedback) {
feedbackError = "yourfeedback cannot be empty";
}

if (nameError || emailError || feedbackError ) {
this.setState({
nameError,
emailError,
feedbackError,

})
return false;
}
return true;
}

 handleChange = (e) => {
  this.setState({ [e.target.name]: e.target.value });
 };

updateContactValues = (e) => {
 this.setState({ [e.target.name]: e.target.value });
};


  contactFinal = () => {

    var data = {
      yourname: this.state.yourname,
      youremail: this.state.youremail,
      yourfeedback: this.state.yourfeedback,
    };

    var headers = {
      "Content-Type": "application/json",
    };

    Axios.post(
      "http://localhost:3023/api/contact/add",
     data,
      headers
    )
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          this.setState({ redirect: true });
        }
        toast.success("Your query sent Sucessfully", {
          position: toast.POSITION.RIGHT,
          
        }); 
      })
      .catch((err) => {
        if (err.data) {
          console.log(err.data.message);
          toast(err);
        }
      });
   }

   contact = (e) =>{
     e.preventDefault();
     const isValid= this.validate();
     if(isValid){
       console.log(this.state)}
       this.contactFinal();
        location.reload();
   }


render(){
  return(
    <div>
 <Container >
  <Navigation />
    <section className="my-5" >
      <MDBRow >
      <h2 className="h1-responsive font-weight-bold text-center my-5" style={{ marginLeft:"300px"}}>
        Contact us for any query
      </h2>
      </MDBRow>
      <MDBRow>
        <MDBCol lg="5" className="lg-0 mb-4" style={{ marginBottom:"200px"}}>
          <MDBCard style={{height:"500px", marginTop:"2px"}}>
            <MDBCardBody>
             <ToastContainer />
            <form onSubmit={this.contact} >
                <h3 className="mt-2">
                 Send Message Us
                </h3>
              <p className="dark-grey-text">
                Get in touch.
              </p>
              <div className="md-form">
                <MDBInput
                  icon="user" 
                  label="Your name"
                  iconClass="grey-text"
                  type="text"
                  id="yourname"
                  name="yourname" 
                  value={this.state.yourname}
                  onChange={
                  this.updateContactValues
                  }
                />
                {this.state.nameError
                ? (
                <Alert color="danger" size="sm" className="mt-2">
                {this.state.nameError}</Alert>
                )
                : null}
                
              </div>
              <div className="md-form">
                <MDBInput
                  icon="envelope" 
                  label="Your email"
                  iconClass="grey-text"
                  type="email"
                  id="youremail"
                  name="youremail" 
                  value={this.state.youremail}
                  onChange={
                  this.updateContactValues
                   }
                />
                {this.state.emailError
                ? (
                <Alert color="danger" size="sm" className="mt-2">
                {this.state.emailError}</Alert>
                )
                : null}
                
              </div>
              <div className="md-form">
                <MDBInput
                  icon="tag"
                  label="Your Feedback" 
                  iconClass="grey-text"
                  type="textarea"
                  id="yourfeedback" 
                  name="yourfeedback"
                  value={this.state.yourfeedback}
                  onChange={
                  this.updateContactValues
                  }
                />
                {this.state.feedbackError
                ? (
                <Alert color="danger" size="sm" className="mt-2">
                {this.state.feedbackError}</Alert>
                )
                : null}
              </div>
              <div className="text-center">
              <MDBBtn
              type="submit"
              color="red"
              onClick={this.contact}
              className="btn-block z-depth-1a white-text">
              Contact Us 
              </MDBBtn>
              </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="7">
          <div
            id="map-container"
            className="rounded z-depth-1-half map-container"
            style={{ height: "400px" }}
          >
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.359005886075!2d85.32785091449199!3d27.706199732150523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190a74aa1f23%3A0x74ebef82ad0e5c15!2sSoftwarica%20College%20Of%20IT%20%26%20E-Commerce!5e0!3m2!1sen!2snp!4v1601545882847!5m2!1sen!2snp" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"
              title="This is a unique title"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
            />
          </div>
          <br />
          <MDBRow className="text-center">
            <MDBCol md="4">
              <MDBBtn tag="a" floating color="red accent-2" className="accent-1">
                <MDBIcon icon="map-marker-alt" />
              </MDBBtn>
              <p>Kathmandu, Maitidevi 44600</p>
              <p className="mb-md-0">Nepal</p>
            </MDBCol>
            <MDBCol md="4">
             
               <MDBBtn tag="a" floating color="red accent-2" className="accent-1">
                <MDBIcon icon="phone" />
              </MDBBtn>
             
              <p>+ 977 984 456 2871</p>
              <p className="mb-md-0">Mon - Fri, 8:00-22:00</p>
            </MDBCol>
            <MDBCol md="4">
               <MDBBtn tag="a" floating color="red accent-2" className="accent-1">
                <MDBIcon icon="envelope" />
              </MDBBtn>
              <p>onlinefood1@gmail.com</p>
              <p className="mb-md-0">readybelly@gmail.com</p>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </section>
    </Container>
     <Footer />
     </div>
  );
}
}

export default Contact

