/* eslint-disable */
import React from "react";
import {
 MDBIcon,
 MDBRow,
 MDBCard,
 MDBCol,MDBBtn,Link
} from "mdbreact";

const HomePage = () => {
  return (
    <div>
        <MDBCard
          className='card-image'
          style={{
            backgroundImage:
              'url(Image/backgroound.jpg)'
          }}
        >
          <div className='text-white text-center d-flex flex-column align-items-center rgba-black-strong py-5 px-4 rounded'>
           
            <h3 className='py-3 font-weight-bold'>
              <strong>GET FOOD</strong> 
              <Link to="/products">
              <MDBBtn
                  color="orange"
                  rounded
                  className="font-weight-bold black-text"
                >DELIVIRED
                </MDBBtn>
                </Link>
            </h3>
            
          </div>
        </MDBCard>
    </div>
  );
};

export default HomePage;
