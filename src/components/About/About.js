
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

import{
	Nav,Container,Row,Col,Card,Navbar,Form,Button,FormControl,Carousel

} from 'react-bootstrap'
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn } from "mdbreact";


import Footer from '../Footer'
import NavbarM from '../NavbarM'




class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
  
 
    render() {

       
        return (

            <div>
            
				<NavbarM/>
        
                <MDBCard className="my-5 px-5 pb-5">
      <MDBCardBody >
        <h2 className="h1-responsive font-weight-bold text-center my-5">
          About US
        </h2>
        <p className="text-center w-responsive mx-auto mb-5">
        Readybelly is a One web page for all the foodies in Nepal, where they can search for their favourite restaurants, get food delivered to their home or office, get awesome deals when they dine-in at the restaurants, read and post restaurant reviews, explore restaurant menu.
        </p>
        <MDBRow>
          <MDBCol lg="5">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
              <img
                className="img-fluid"
                src="Image/Momo.png"
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7">
            <a href="#!" className="green-text">
              <h6 className="font-weight-bold mb-3">
                <MDBIcon icon="utensils" className="pr-2" />
                Food
              </h6>
            </a>
            
            <p>
            ReadyBrlly is the first company in Nepal that delivers food from hundreds of popular restaurants. As a pioneer food delivery service provider, we are making life easier through online ordering.
            </p>
            <p>
            We know that your time is valuable and sometimes every minute in the day counts. That’s why we deliver! So you can spend more time doing the things you love. You can get anything from Indian food to high French cuisine by placing a simple order online through our website.
            </p>
         
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>



				<Footer/>
            </div>
        )
    }
}

export default About;