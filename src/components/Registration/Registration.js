/* eslint-disable */
import React, { Component } from "react";
import {
 
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBCardHeader,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBModalBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBBadge,
} from "mdbreact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import { MDBIcon, MDBInput } from "mdbreact";
import Axios from "axios";
import Navigation from '../NavbarM'
import Footer from '../Footer'
import { FormGroup, Alert } from "reactstrap";
class Registration extends React.Component {
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
                 constructor(props) {
                   super(props);
                   this.state = {
                     email: "",
                     password: "",
                     isLoggedIn: false,
                     fullname: "",
                     address1: "",
                     phone: "",
                     restaurantname:"",
                     mobile: "",
                     user_type: "",
                     imagePath: "",
                     selectedFile: "",
                     validationMessage: "",
                     nameError: "",
                     address1Error: "",
                     mobileError: "",
                     phoneError: "",
                     usertypeError: "",
                     emailError: "",
                     passwordError: "",
                     redirect: false,
                   };
                 }
                 handleFileSelected = (event) => {
                   this.setState({ selectedFile: event.target.files[0] });
                   //for image url
                   let reader = new FileReader();

                   reader.onloadend = () => {
                     this.setState({ imagePreviewUrl: reader.result });
                   };

                   reader.readAsDataURL(event.target.files[0]);
                 };

                 uploadImage = () => {};
                 handleChange = (e) => {
                   this.setState({ [e.target.name]: e.target.value });
                 };

                 updateRegistrationValues = (e) => {
                   this.setState({ [e.target.name]: e.target.value });
                 };

                 validate = () => {
                   let nameError = "";
                   let address1Error = "";
                   let mobileError = "";
                   let phoneError = "";
                   let usertypeError = "";
                   let emailError = "";
                   let passwordError = "";

                   if (!this.state.fullname) {
                     nameError = "Full name cannot be empty";
                   }
                   if (!this.state.user_type) {
                     usertypeError = "User Type cannot be empty";
                   }
                   if (!this.state.address1) {
                     address1Error = "Address  cannot be empty";
                   }
                   if (this.state.mobile.length !== 10) {
                     mobileError = "Mobile phone number should be of 10 digit";
                   }
                   if (this.state.mobile.includes("-")) {
                     mobileError = "Invalid mobile number";
                   }
                   if (this.state.phone.includes("-")) {
                     phoneError = "Invalid phone number";
                   }
                   if (!this.state.email.includes("@")) {
                     emailError = "invalid email";
                   }
                   if (this.state.password.length < 6) {
                     passwordError = "Password should be greater than 6";
                   }
                   if (
                     nameError ||
                     address1Error ||
                     phoneError ||
                     mobileError ||
                     usertypeError ||
                     emailError ||
                     passwordError
                   ) {
                     this.setState({
                       nameError,
                       address1Error,
                       phoneError,
                       mobileError,
                       emailError,
                       passwordError,
                       usertypeError,
                     });
                     return false;
                   }
                   return true;
                 };

                

                 registerFinal = () => {

                  var data = {
                    fullname: this.state.fullname,
                    address1: this.state.address1,
                    phone: this.state.phone,
                    email: this.state.email,
                    mobile: this.state.mobile,
                    restaurantname:this.state.restaurantname,
                    user_type: this.state.user_type,
                    password: this.state.password,
                    imagePath: this.state.imagePath,
                  };

                  var headers = {
                    "Content-Type": "application/json",
                  };

                  Axios.post(
                    "http://localhost:3023/api/user/registration",
                    data,
                    headers
                  )
                    .then((response) => {
                      console.log(response.data);
                      if (response.status === 200) {
                        this.setState({ redirect: true });
                      }
                      toast.success("Register Sucessfully", {
                        position: toast.POSITION.RIGHT,
                      });
                      Object.keys(this.state).map((key, value) => {
                        this.state[key] = "";
                      });
                    })
                    .catch((err) => {
                      if (err.data) {
                        console.log(err.data.message);
                        toast(err);
                      }
                    });
                 }

                 register = (e) => {
                   e.preventDefault();
                   const isValid = this.validate();
                   if (isValid) {
                     console.log(this.state);
                     // Upload Image

                     const fd = new FormData();
                     fd.append(
                       "imageFile",
                       this.state.selectedFile,
                       this.state.selectedFile.name
                     );
                     Axios.post("http://localhost:3023/api/upload", fd)
                       .then((res) => {
                         console.log(res);
                         this.setState({ imagePath: res.data.path });
                         toast.success("Image sucessfully uploaded!!");

                         this.registerFinal();
                       })
                       .catch((err) => {
                         console.log(err);
                         this.setState({
                           checkValidImage: "Image is not valid",
                         });
                         toast.error("Image is not valid");
                         this.registerFinal();
                         // return;
                       });
                   }
                 };

                 render() {
                   if (this.state.isLoggedIn === true) {
                     toast.success("Login Sucessfully", {
                       position: toast.POSITION.RIGHT,
                     });
                     return <Redirect to="./" />;
                   } else if (this.state.redirect) {
                     return <Redirect to="/" />;
                   }
                   // else{
                   //   toast.error("Username/Password is incorrect", { position: toast.POSITION.RIGHT });

                   // }
                   // for image preview
                   let $imagePreview = (
                     <label
                       htmlFor="previewImage"
                       className="previewText image-container"
                     ></label>
                   );
                   if (this.state.imagePreviewUrl) {
                     $imagePreview = (
                       <label
                         htmlFor="previewImage"
                         className="image-container text-center"
                       >
                         <img
                           src={this.state.imagePreviewUrl}
                           alt="icon"
                           width="200"
                           height="200"
                         />
                       </label>
                     );
                   }

                   return (
                    
                                    <div>    

                         {/* <----------------------------------SignUp--------------------------------------------------------> */}
                         <MDBContainer style={{ marginTop:"40px"}}>
                           <Navigation/>  
                           <MDBRow> 
                           <MDBCol md="5" style={{marginTop:"120px"}}>
                                        <MDBCard>
                                          <MDBCardImage
                                            top
                                            src='./Image/nu.jpg'
                                            overlay='white-slight'
                                            hover
                                            height='320px'
                                            waves
                                            alt='new user'
                                          />
                                          <MDBCardBody>
                                            
                                            <MDBCardTitle>NEW USER ?</MDBCardTitle>
                                            <hr />
                                            <a href='#!' className='activator waves-effect waves-light mr-4'>
                                             
                                              <p> Register now to:  <MDBIcon icon='sign-in-alt' className='black-text' />
                                              </p>
                                            </a>
                                            <MDBCardText>
                                             <MDBBadge color="red" 
                                               pill>1</MDBBadge> Receive special offers. <br/>
                                             <MDBBadge color="red"
                                               pill>2</MDBBadge> Speed your way through checkout. <br/>
                                             <MDBBadge color="red"
                                               pill>3</MDBBadge> View your order history. <br/>
                                             <MDBBadge color="red"
                                               pill>4</MDBBadge> Access your saved items. <br/>
                                             <MDBBadge color="red"
                                               pill>5</MDBBadge> Instant access to your account. <br/>
                                            </MDBCardText>
                                            
                                          </MDBCardBody>
                                        </MDBCard>
                                      </MDBCol>
    

                           
                            
                             <MDBModalBody>
                                <MDBCol md="10"> 
                               <MDBCardHeader
                              
                                 className="form-header orange rounded white-text"
                                 
                               >
                                 <h3 className="my-3" >
                                   <MDBIcon icon="user-plus"/> SignUp
                                 </h3>
                                
                               </MDBCardHeader>
                                </MDBCol>
                                 <MDBCol md="10">
                                   <MDBCard>
                                     <MDBCardBody className="mx-6">
                                       <ToastContainer />
                                       <form onSubmit={this.register}>
                                         <div className="grey-text">
                                           <FormGroup>
                                             <MDBInput
                                               className="black-text"
                                               label="Your Fullname"
                                               name="fullname"
                                               id="fullname"
                                               icon="user"
                                               value={this.state.fullname}
                                               onChange={
                                                 this.updateRegistrationValues
                                               }
                                               group
                                               style={{ textAlign: "center" }}
                                               type="text"
                                               validate
                                               error="wrong"
                                               success="right"
                                             />
                                             {this.state.nameError ? (
                                               <Alert
                                                 color="danger"
                                                 size="sm"
                                                 className="mt-2"
                                               >
                                                 {this.state.nameError}
                                               </Alert>
                                             ) : null}
                                           </FormGroup>
                                           <FormGroup>
                                             <MDBInput
                                               className="black-text"
                                               label="Your Address"
                                               icon="home"
                                               name="address1"
                                               id="address1"
                                               value={this.state.address1}
                                               onChange={
                                                 this.updateRegistrationValues
                                               }
                                               group
                                               style={{ textAlign: "center" }}
                                               type="text"
                                               validate
                                               error="wrong"
                                               success="right"
                                             />
                                             {this.state.address1Error ? (
                                               <Alert
                                                 color="danger"
                                                 size="sm"
                                                 className="mt-2"
                                               >
                                                 {this.state.address1Error}
                                               </Alert>
                                             ) : null}
                                           </FormGroup>
                                           <FormGroup>
                                             <MDBInput
                                               className="black-text"
                                               name="phone"
                                               id="phone"
                                               label="Your Phone number"
                                               icon="phone"
                                               value={this.state.phone}
                                               onChange={
                                                 this.updateRegistrationValues
                                               }
                                               group
                                               style={{ textAlign: "center" }}
                                               type="text"
                                               validate
                                               error="wrong"
                                               success="right"
                                             />
                                             {this.state.phoneError ? (
                                               <Alert
                                                 color="danger"
                                                 size="sm"
                                                 className="mt-2"
                                               >
                                                 {this.state.phoneError}
                                               </Alert>
                                             ) : null}
                                           </FormGroup>
                                           <FormGroup>
                                             <MDBInput
                                               className="black-text"
                                               label="Your Mobile"
                                               name="mobile"
                                               id="mobile"
                                               value={this.state.mobile}
                                               onChange={
                                                 this.updateRegistrationValues
                                               }
                                               icon="phone"
                                               group
                                               style={{ textAlign: "center" }}
                                               type="text"
                                               validate
                                             />
                                             {this.state.mobileError ? (
                                               <Alert
                                                 color="danger"
                                                 size="sm"
                                                 className="mt-2"
                                               >
                                                 {this.state.mobileError}
                                               </Alert>
                                             ) : null}
                                           </FormGroup>
                                           <FormGroup>
                                             <MDBInput
                                               className="black-text"
                                               label="Your email"
                                               icon="envelope"
                                               name="email"
                                               id="email"
                                               value={this.state.email}
                                               onChange={
                                                 this.updateRegistrationValues
                                               }
                                               group
                                               style={{ textAlign: "center" }}
                                               type="email"
                                               validate
                                               error="wrong"
                                               success="right"
                                             />
                                             {this.state.emailError ? (
                                               <Alert
                                                 color="danger"
                                                 size="sm"
                                                 className="mt-2"
                                               >
                                                 {this.state.emailError}
                                               </Alert>
                                             ) : null}
                                           </FormGroup>

                                           <FormGroup>
                                             <MDBInput
                                               className="black-text"
                                               label=" Your password"
                                               name="password"
                                               id="password"
                                               value={this.state.password}
                                               onChange={
                                                 this.updateRegistrationValues
                                               }
                                               icon="lock"
                                               group
                                               style={{ textAlign: "center" }}
                                               type="password"
                                               validate
                                             />
                                             {this.state.passwordError ? (
                                               <Alert
                                                 color="danger"
                                                 size="sm"
                                                 className="mt-2"
                                               >
                                                 {this.state.passwordError}
                                               </Alert>
                                             ) : null}
                                           </FormGroup>
                                           <FormGroup>
                                               <div>
                                                 
                                                 <select
                                                   className="browser-default custom-select"
                                                   value={this.state.user_type}
                                                   name="user_type"
                                                   id="user_type"
                                                   onChange={
                                                     this
                                                       .updateRegistrationValues
                                                   }
                                                 >
                                                   <option>UserType</option>
                                                   <option value="VENDOR">
                                                     Vendor
                                                   </option>
                                                   <option value="USER">
                                                     User
                                                   </option>
                                                   <option value="ADMIN">
                                                     Admin
                                                   </option>
                                                 </select>
                                                 
                                               </div>
                                             {this.state.usertypeError ? (
                                               <Alert
                                                 color="danger"
                                                 size="sm"
                                                 className="mt-2"
                                               >
                                                 {this.state.usertypeError}
                                               </Alert>
                                             ) : null}
                                           </FormGroup>
                                           <FormGroup>
                                             <MDBInput
                                               className="black-text"
                                               label="Restaurant Name"
                                               icon="home"
                                               name="restaurantname"
                                               id="restaurantname"
                                               value={this.state.restaurantname}
                                               onChange={
                                                 this.updateRegistrationValues
                                               }
                                               group
                                               style={{ textAlign: "center" }}
                                               type="text"
                                               validate
                                               error="wrong"
                                               success="right"
                                             />
                                           </FormGroup>
                                           <FormGroup>
                                             <div>
                                               <input
                                                 type="file"
                                                 inputprops={{
                                                   accept: "image/*",
                                                 }}
                                                 id="previewImage"
                                                 name="avatar"
                                                 onChange={
                                                   this.handleFileSelected
                                                 }
                                                 ref={(fileInput) =>
                                                   (this.fileInput = fileInput)
                                                 }
                                               />{" "}
                                               {$imagePreview}
                                             </div>
                                           </FormGroup>
                                         </div>
                                         <div className="text-center py-6 mt-6">
                                           <MDBBtn
                                             type="submit"
                                             color="red"
                                             onClick={this.register}
                                             className="btn-block z-depth-1a white-text"
                                           >
                                             SignUp
                                           </MDBBtn>
                                         </div>
                                       </form>
                                     </MDBCardBody>
                                     
                                   </MDBCard>
                                 </MDBCol>
                             </MDBModalBody>
                          </MDBRow>
                         </MDBContainer>
                      <Footer />
                      </div>
                    
                   );
                 }
               }
export default Registration;

