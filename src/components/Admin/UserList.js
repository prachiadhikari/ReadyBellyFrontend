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
} from "mdbreact";
import Navigation from "../NavbarM";
import Footer from "../Footer";
import Pagenotfound from "../Pagenotfound";
import SideNavv from "../SideNav";


import Axios from "axios";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: "http://localhost:3023/",
      users: null,
    };

    this.getAllUsers();
  }

  approveUser = userId => {
    var headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    };

    Axios.post("http://localhost:3023/api/user/" + userId + "/approve", {}, {headers: headers})
    .then((response) => {
      location.reload();
      toast.response("User Successfully Approved");
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
  }

  deleteUser = (userid) => {
    var x = confirm("You want to delete user?");
    if (x) {
      var headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      Axios
        .delete("http://localhost:3023/api/user/" + userid, {
          headers: headers,
        })
        .then((success) => {
          location.reload();
          toast.success("Successfully Deleted User");

        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      return false;
    }
  };


  getAllUsers = () => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    Axios.get("http://localhost:3023/api/user/all", {headers: headers})
        .then((res) => {
          console.log(res.data);
          this.setState({
            users: res.data.products,
          });
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
  }

  render() {
    if (!this.state.users || this.state.users.length < 1) {
      return (
        <Pagenotfound/>
      );
    }
    return (
      <div>
        <MDBContainer fluid>
          <Navigation />
          {/* <MDBRow style={{marginBottom:"-1%"}}> */}
            {/* <MDBCol size="2">
            <SideNavv/>
            </MDBCol> */}
            {/* <MDBCol size="6"> */}
          <h2 className="font-weight-bold  special-color-dark-text " style={{ marginTop: "40px" }}>Registered Users</h2>
              
          <MDBRow>
            <MDBCard style={{ width: "100%" }}>
              <MDBCardBody>
                <MDBCol sm="12">
                 <MDBTable striped>
                  <MDBTableHead color="unique-color-dark" textWhite>
                    <tr>
                     <th>Id</th>
                      <th>Profile Image</th>
                      <th>Email</th>
                      <th>Fullname</th>
                      <th>Phone Number</th>
                      <th>Mobile Number</th>
                      <th>Address</th>
                      <th>User Type</th>
                      <th>Approved</th>
                      <th>Action</th>
                </tr>
              </MDBTableHead>
            <MDBTableBody>
            {this.state.users.map((user, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td><img
                       className="img-fluid z-depth-0"
                       style={{ height: "100px", width: "100px" }}
                       src={this.state.path + user.image_path}/></td>
                       <td>{user.email}</td>
                       <td>{user.fullname}</td>
                       <td>{user.phone}</td>
                       <td>{user.mobile}</td>
                       <td>{user.address1}</td>
                       <td>{user.user_type}</td>
                       <td>{user.isApproved === true ? "Approved": "Unapproved"}</td>
                       <td>
                         {user.isApproved === true || user.user_type !== "VENDOR"? null : (<MDBBtn color="warning" className="white-text" onClick={() => this.approveUser(user.id)}> Approve User </MDBBtn>)} &nbsp;
                                               <MDBBtn color=" red darken-4" onClick={() => this.deleteUser(user.id)}> Remove User </MDBBtn></td>
                    </tr>
                      ))}
                   </MDBTableBody>
                 </MDBTable>
                </MDBCol>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </MDBContainer>
        <Footer />
      </div>
    );
  }
}

export default UserList;
