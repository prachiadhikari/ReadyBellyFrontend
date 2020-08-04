/* eslint-disable */
import React from "react";
import {
 MDBIcon,
 MDBRow,
 MDBCard,
 MDBCol,MDBBtn,Link
} from "mdbreact";
import Footer from "./Footer";
import NavbarM from "./NavbarM";
const Empty = () => {
  return (
    <div>
      <NavbarM/>
        <MDBCard
          className='card-image'
          style={{
            backgroundImage:
              'url(Image/backgroound.jpg)'
          }}
        >
          <div className='text-white text-center d-flex flex-column align-items-center rgba-black-strong py-5 px-4 rounded'>
           
            
              <img
              src="Image/Cart.png"
              alt=""
              style={{
                width: "35%",
                height: "35%",
                borderRadius: 10,
                marginRight: 5,
              }}
            />
            
          </div>
        </MDBCard>
        <Footer/>
    </div>
  );
};

export default Empty;
