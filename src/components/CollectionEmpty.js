/* eslint-disable */
import React from "react";
import {
 MDBIcon,
 MDBRow,
 MDBCard,
 MDBCol,MDBBtn,Link
} from "mdbreact";
import Navigation from "./NavbarM";
import Footer from "./Footer";


const CollectionEmpty = () => {
  return (
    <div>
      <Navigation/>
        <section 
          className='card-image'
          style={{margin:"20px"}}>
         
              <center><img
              src="Image/EMPTY.png"
              alt=""
              style={{
                width: "50%",
                height: "50%",
                borderRadius: 10,
                marginRight: 5,
              }}
            /></center>
        </section>
        <Footer/>
    </div>
  );
};

export default CollectionEmpty;
