/* eslint-disable */
import React from "react";
import {
 MDBIcon,
 MDBRow,
 MDBCard,MDBModal,MDBModalBody,
 MDBCol,MDBBtn,Link
} from "mdbreact";
import Footer from "./Footer";
import NavbarM from "./NavbarM";
import UpdateProduct from "./AddProduct/UpdateProduct";

class ProductEmpty extends React.Component {
    state = {
      isOpen: false,
    };
    toggleAdd = () => {
        this.setState({
          modalAdd: !this.state.modalAdd,
        });
      };
      render(){
  return (
    <div>
        <section
          className='card-image'
          style={{margin:"20px"}}
        >
           
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
            <MDBModal isOpen={this.state.modalAdd} toggle={this.toggleAdd}>
                <MDBModalBody>
                  <UpdateProduct />
                </MDBModalBody>
              </MDBModal>
        </section>
    </div>
  );
};
}

export default ProductEmpty;
