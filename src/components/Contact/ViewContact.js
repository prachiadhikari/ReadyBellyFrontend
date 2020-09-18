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
import Axios from "axios";
import CollectionEmpty from "../CollectionEmpty";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: "http://localhost:3023/",
      contacts: null,
    };

    this.getAllContacts();
  }



  getAllContacts = () => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    Axios.get("http://localhost:3023/api/contact/all", {headers: headers})
        .then((res) => {
          console.log(res.data);
          this.setState({
            contacts: res.data.contacts,
          });
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
  }


deleteContact = (cid) => {
    var x = confirm("You want to delete query?");
    if (x) {
      var headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      Axios
        .delete("http://localhost:3023/api/contact/" + cid, {
          headers: headers,
        })
        .then((success) => {
          location.reload();
          toast.success("Successfully Deleted query");

        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      return false;
    }
  };



  render() {
    if (!this.state.contacts || this.state.contacts.length < 1) {
      return (
        <CollectionEmpty/>
      );
    }
    return (
      <div>
        <MDBContainer fluid>
          <Navigation />
          <h2 style={{ marginTop: "40px" }}>Queries</h2>

          <MDBRow>
            <MDBCard style={{ width: "100%" }}>
              <MDBCardBody>
                <MDBCol sm="12">
                 <MDBTable striped>
                  <MDBTableHead color="primary-color" textWhite>
                    <tr>
                     <th>Id</th>
                      <th>User Name</th>
                      <th>User Email</th>
                      <th>User Query</th>
                      <th>Action</th>
                     
                </tr>
              </MDBTableHead>
            <MDBTableBody>
            {this.state.contacts.map((contact, index) => (
                    <tr>
                      <td>{index + 1}</td>
                       <td>{contact.yourname}</td>
                       <td>{contact.youremail}</td>
                       <td>{contact.yourfeedback}</td>
                       <td> <MDBBtn color="danger" onClick={() => this.deleteContact(contact.id)}> Remove Query </MDBBtn></td>
                       
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
