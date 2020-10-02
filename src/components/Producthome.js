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
  MDBCardFooter,
  MDBBtn,
  MDBIcon, 
  MDBCardImage, 
  MDBCardText, 
  MDBCardTitle,
} from "mdbreact";
import Axios from "axios";

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
        <MDBCard className="my-5 px-5 pb-5" >
        <section className="text-center my-5">
        <h2 className="h1-responsive font-weight-bold my-5">
          Why is it so great?
        </h2>
        <p className="lead grey-text w-responsive mx-auto mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam.
        </p>
        <MDBRow>
          <MDBCol md="4">
            <MDBIcon icon="chart-area" size="3x" className="red-text" />
            <h5 className="font-weight-bold my-4">Analytics</h5>
            <p className="grey-text mb-md-0 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit maiores aperiam minima assumenda deleniti hic.
            </p>
          </MDBCol>
          <MDBCol md="4">
            <MDBIcon icon="book" size="3x" className="cyan-text" />
            <h5 className="font-weight-bold my-4">Tutorials</h5>
            <p className="grey-text mb-md-0 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit maiores aperiam minima assumenda deleniti hic.
            </p>
          </MDBCol>
          <MDBCol md="4">
            <MDBIcon far icon="comments" size="3x" className="orange-text" />
            <h5 className="font-weight-bold my-4">Support</h5>
            <p className="grey-text mb-md-0 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit maiores aperiam minima assumenda deleniti hic.
            </p>
          </MDBCol>
        </MDBRow>
      </section>
        </MDBCard>
        <MDBCard className="my-5 px-5 pb-5" >
        <h2 className='h1-responsive font-weight-bold text-center my-5'>Our bestsellers</h2>
      <p className='grey-text text-center w-responsive mx-auto mb-5'>
      "What differentiates sellers today is their ability to bring fresh ideas." -Jill Konrath</p>
      <MDBRow> {users.map(prod => (
      <MDBCol md="6" lg="4">
        <MDBCard className="m-2" style={{ width: "22rem" }} cascade ecommerce wide>
      <MDBCardImage
        cascade
        top style={{ height: "200px"}}
        src={this.state.path + prod.image_path}
        alt="vendor image"
        waves
      />
      <MDBCardBody cascade className="text-center">
        <MDBCardTitle tag="h5"><MDBIcon icon="user" />
               {prod.user_type}</MDBCardTitle>
        <MDBCardTitle>
          <a href="#!">
            <strong>{prod.fullname}</strong>
          </a>
        </MDBCardTitle>
        <MDBCardText>
        {prod.phone} </MDBCardText>
        <MDBCardFooter>
          
          <span className="float-left">{prod.address1}</span>
          <span className="float-right">
            <MDBTooltip placement="top">
              <MDBBtn tag="a" href="https://mdbootstrap.com" target="_blank" color="transparent" size="lg" className="p-1 m-0 mr-2 z-depth-0" >
                  <MDBIcon icon="share-alt"/>
              </MDBBtn>
              <div>Share</div>
            </MDBTooltip>
            <MDBTooltip placement="top">
              <MDBBtn tag="a" color="transparent" size="lg" className="p-1 m-0 z-depth-0" >
                <MDBIcon icon="heart" className="red-text"/>
              </MDBBtn>
              <div>Added to Wishlist</div>
              
            </MDBTooltip>
            
          </span>
          
        </MDBCardFooter>
      </MDBCardBody>
    </MDBCard>
    </MDBCol>
      ))}
    </MDBRow>
    </MDBCard>
     </div>
    );
  }
}

export default TopSeller;
