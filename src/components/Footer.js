/* eslint-disable */
import React from "react";
import { MDBCol, MDBContainer,MDBIcon, MDBRow, MDBFooter } from "mdbreact";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <MDBFooter color="unique-color" className="font-small lighten-3 pt-4 mt-4">
      <MDBContainer className="text-center text-md-left">
        <MDBRow className="my-4">
          <MDBCol md="4" lg="4">
            <h5 className="text-uppercase mb-4 font-weight-bold">
              READYBELLY
            </h5>
            <img
              src="Image/logo.png"
              alt=""
              style={{
                width: 150,
                height: 150,
                borderRadius: 10,
                marginRight: 5,
              }}
            />
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
          <MDBCol md="2" lg="2" className="ml-auto">
            <h5 className="text-uppercase mb-4 font-weight-bold">About</h5>
            <ul className="list-unstyled">
              <p>
                <Link to="#">AboutUs</Link>
              </p>
              <p>
                <Link to="#">Contact</Link>
              </p>
            </ul>
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
          <MDBCol md="5" lg="3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Address</h5>
            <p>
              <img
                src="image/locations.png"
                alt=""
                style={{ width: 20, height: 20, borderRadius: 10 }}
              />{" "}
              Dillibazar, Kathmandu
            </p>
            <p>
            <a href="#!" className="email-ic mr-3">
        <MDBIcon icon="envelope" />
      </a>{" "}
              info@example.com
            </p>
            <p>
            <a href="#!" className="email-ic mr-3">
        <MDBIcon icon="phone" />
      </a>{" "}
              + 01 234 567 88
            </p>
            <p>
            <a href="#!" className="email-ic mr-3">
        <MDBIcon icon="phone" />
      </a>{" "}
              + 01 234 567 89
            </p>
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
          <MDBCol md="5" lg="3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Follow us</h5>
            <a href="#!" className="fb-ic mr-3">
        <MDBIcon fab icon="facebook-f" />
      </a>
      <a href="#!" className="tw-ic mr-3">
        <MDBIcon fab icon="twitter" />
      </a>
      <a href="#!" className="gplus-ic mr-3">
        <MDBIcon fab icon="google-plus-g" />
      </a>
      <a href="#!" className="ins-ic mr-3">
        <MDBIcon fab icon="instagram" />
      </a>
      <a href="#!" className="pin-ic mr-3">
        <MDBIcon fab icon="pinterest" />
      </a>
      <a href="#!" className="email-ic mr-3">
        <MDBIcon icon="envelope" />
      </a>
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="https://www.readybelly.com"> readybelly.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;
