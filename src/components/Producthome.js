/* eslint-disable */
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  Link,
  MDBCard,
  MDBCardBody,
  MDBTooltip,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBInput,
  MDBBtn,
  MDBIcon, 
  MDBCardImage, 
  MDBCardText, 
  MDBCardTitle,
} from "mdbreact";
import Navigation from "./NavbarM";
import Footer from "./Footer";
import Axios from "axios";
import CollectionEmpty from "./CollectionEmpty";

class TopSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: "http://localhost:3023/",
      users: null,
      users: [],
    };

    this.getAllUsers();
  }

  

  getAllUsers = () => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    Axios.get("http://localhost:3023/api/user/type", {headers: headers})
        .then((res) => {
          console.log(res.data);
          this.setState({
            users: res.data.users,
          });
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
  }

  render() {
     const{users}=this.state
    return (
      <div>
        <MDBContainer fluid>
          <Navigation />
          <h2 style={{ marginTop: "40px", marginLeft:"600px" }}>OUR SELLERS</h2>

 <MDBRow> {users.map(prod => (
      <MDBCol md="6" lg="4">
        <MDBCard personal className="my-5"   style={{ height: "440px", width: "440px" }}>
          <MDBCardImage
            top
             style={{ height: "200px"}}
            src={this.state.path + prod.image_path}
            alt="vendor image"
          />
          <MDBCardBody>
            <MDBCardTitle>
              <a href="#!" className="title-one">
                {prod.fullname}
              </a>
            </MDBCardTitle>
            <p className="card-meta"> {prod.phone}</p>
             <p className="card-meta"> {prod.mobile}</p>
            <MDBCardText> {prod.address1}</MDBCardText>
            <hr />
            <a href="#!" className="card-meta">
              <span>
                <MDBIcon icon="user" />
               {prod.user_type}
              </span>
            </a>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      ))}
    </MDBRow>
        </MDBContainer>
        <Footer />
      </div>
    );
  }
}

export default TopSeller;
