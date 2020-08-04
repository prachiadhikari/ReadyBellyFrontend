
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
 import
'bootstrap-css-only/css/bootstrap.min.css';
 import
'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import{
	BrowserRouter as Router,
	Switch,
	Link,
	Route

} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import { FormGroup, Alert } from "reactstrap";
import {  MDBRow,MDBContainer,MDBCardBody, MDBCol,MDBModalHeader, MDBCard,MDBInput, MDBIcon, MDBBtn } from "mdbreact";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
import Footer from '../Footer'
import NavbarM from '../NavbarM'



class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
          message:"",
          id:"",
          config: {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          },
          redirect: false,
          form: null,
        }
    }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

 
    render() {

       
        return (

            <div>
				<NavbarM/>
                <MDBCard className="my-5 px-5 pb-5">
    <section className="my-5">
      <h2 className="h1-responsive font-weight-bold text-center my-5">
        Contact us
      </h2>
     
      <MDBRow>
        <MDBCol lg="5" className="lg-0 mb-4">
          <MDBCard>
            <MDBCardBody>
              <div className="form-header orange ">
              <MDBModalHeader  className="form-header orange-color rounded"> <h3 className="white-text">
         <MDBIcon icon="envelope" /> Write to Us
       </h3></MDBModalHeader>
              </div>
              <p className="dark-grey-text">
                We'll write rarely, but only the best content.
              </p>
              <div className="md-form">
                <MDBInput
                  icon="user"
                  label="Your name"
                  iconClass="grey-text"
                  type="text"
                  id="form-name"
                />
              </div>
              <div className="md-form">
                <MDBInput
                  icon="envelope"
                  label="Your email"
                  iconClass="grey-text"
                  type="text"
                  id="form-email"
                />
              </div>
              <div className="md-form">
                <MDBInput
                  icon="pencil-alt"
                  label=" Enquiry"
                  iconClass="grey-text"
                  type="textarea"
                  id="form-text"
                />
              </div>
              <div className="text-center">
                <MDBBtn color="orange darken-4">
                <MDBIcon far icon="paper-plane" />
                Submit
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="7">
          <div
            id="map-container"
            className="rounded z-depth-1-half map-container"
            style={{ height: "400px" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d76765.98321148289!2d-73.96694563267306!3d40.751663750099084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spl!2spl!4v1525939514494"
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
              <MDBBtn tag="a" floating color="blue" className="accent-1">
              <MDBIcon icon="map-marker-alt" />
              </MDBBtn>
              <p>Dillibazar</p>
              <p className="mb-md-0">Kathmandu</p>
            </MDBCol>
            <MDBCol md="4">
              <MDBBtn tag="a" floating color="blue" className="accent-1">
                <MDBIcon icon="phone" />
              </MDBBtn>
              <p>9876549987</p>
              <p className="mb-md-0">Everyday, 24 hrs</p>
            </MDBCol>
            <MDBCol md="4">
              <MDBBtn tag="a" floating color="blue" className="accent-1">
                <MDBIcon icon="envelope" />
              </MDBBtn>
              <p>readybelly@gmail.com</p>
              <p className="mb-md-0">sale@gmail.com</p>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </section>

                </MDBCard>
				<Footer/>
            </div>
        )
    }
}

export default Contact;