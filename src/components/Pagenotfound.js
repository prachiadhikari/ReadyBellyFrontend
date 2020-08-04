/* eslint-disable */
import React from "react";
import Footer from "./Footer";
import NavbarM from "./NavbarM";
const Pagenotfound = () => {
  return (
    <div>
      <NavbarM/>
        <section 
          className='card-image'
          style={{margin:"20px",backgroundColor:"gold"}}>
         
              <center><img
              src="Image/pagenotfound.png"
              alt=""
              style={{
                width: "80%",
                height: "80%",
                borderRadius: 10,
                marginRight: 5,
              }}
            /></center>
        </section>
        <Footer/>
    </div>
  );
};

export default Pagenotfound;
