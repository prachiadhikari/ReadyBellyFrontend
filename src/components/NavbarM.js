import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBRow,
  MDBCol,
  MDBContainer,
  ModalFooter,
  MDBCardHeader,
  MDBBtn,
  MDBCard,
  MDBModal,
  MDBModalHeader,
  MDBDropdownItem,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBCardBody,
  MDBModalBody,
  MDBLink
} from "mdbreact";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
import { BrowserRouter as Link, Redirect } from "react-router-dom";
import { MDBIcon, MDBInput } from "mdbreact";
import Axios from "axios";
import { FormGroup, Alert } from "reactstrap";
import Login from "./Login";

class NavbarM extends Component {
  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  state = {
    modal2: false,
    modal3: false,
  };

  toggle = (nr) => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
  };

  isNullOrUndefined = (obj) => obj === null || obj === undefined;

  handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");
    this.props.history.push("");
    location.reload();
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: !this.isNullOrUndefined(localStorage.getItem("token")),
      redirect: false,
      view: null,
      isLoggedInUserVendor: localStorage.getItem("userType") === "VENDOR",
      isAdmin: localStorage.getItem("userType") === "ADMIN",
    };


  }

  componentDidMount = () => {
  

    let view = (
      <MDBContainer>
        <MDBNavbar color="unique-color" dark expand="md" scrolling fixed="top">
          <MDBCol sm="2">
            <MDBNavbarBrand href="/">
              <strong className="white-text">READYBELLY</strong>
            </MDBNavbarBrand>
          </MDBCol>
         
         
            <MDBCol sm="4">
            <MDBNavbarNav>
              <MDBNavItem >
                <MDBNavLink as={Link} to="/" >
                  Home
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink as={Link} to="/about">
                  About
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink as={Link} to="/contact">
                  Contact Us
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink as={Link} to="/seller">
                  Top Seller
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink as={Link} to="/products">
                  Products
                </MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCol> <MDBCol sm="4">
          
        </MDBCol>
        <MDBCol sm="2">
            <MDBNavbarNav>
              {!this.state.isLoggedIn ? (
                <MDBNavItem>
                  <MDBNavLink to="#" onClick={this.toggle(2)}>
                    <MDBIcon icon="user"/>
                    Login/Register
                  </MDBNavLink>
                </MDBNavItem>
              ) : (
                <MDBNavItem right>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user" />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">

                     {this.state.isLoggedInUserVendor ? (  
                      <MDBNavLink as={Link} to="/purchaselist"> 
                      <MDBDropdownItem> 
                       <MDBIcon icon="clipboard-list"> {"  "} 
                          Purchases
                           </MDBIcon>
                      </MDBDropdownItem>
                      </MDBNavLink>
                      ):(


                      <MDBNavLink as={Link} to="/userbooking"> 

                      <MDBDropdownItem> 
                        <MDBIcon icon="clipboard-list"> {"  "}   
                          Your Booked Products
                        </MDBIcon>
                      </MDBDropdownItem>

                      </MDBNavLink>
                       
                      )}

                        <MDBNavLink as={Link} to="/profilepage"> 
                      <MDBDropdownItem> 
                      <MDBIcon icon="user-circle"> {"  "}   
                         My Profile
                           </MDBIcon>
                      </MDBDropdownItem>
                      </MDBNavLink>

                      
                       <MDBNavLink as={Link} to="/userlist"> 
                      <MDBDropdownItem> 
                      <MDBIcon icon="users"> {"  "}   
                          Registered Users
                           </MDBIcon>
                      </MDBDropdownItem>
                      </MDBNavLink>
                      <MDBNavLink as={Link} to="/viewcontact"> 
                      <MDBDropdownItem> 
                      <MDBIcon icon="comment"> {"  "}   
                         Queries
                           </MDBIcon>
                      </MDBDropdownItem>
                      </MDBNavLink> 
                      <MDBDropdownItem href="#">
                        <MDBIcon icon="sign-in-alt">
                        <a onClick={this.handleLogout}>Logout</a>
                        </MDBIcon>
                      </MDBDropdownItem>
                     
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              )}
            </MDBNavbarNav>
          </MDBCol>
        </MDBNavbar>
      </MDBContainer>
    );

    this.setState({ view: view });
  };

  render() {
    return (
      <div>
        {this.state.view}
        <MDBContainer>
          <MDBRow>
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)}>
              <Login />
            </MDBModal>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default withRouter(NavbarM);