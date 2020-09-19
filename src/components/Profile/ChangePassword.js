import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { Form, Card, NavItem, Nav, Col, Row, CardBody, FormGroup, Input, Button, Label, CustomInput, Container } from 'reactstrap'
import { MDBContainer,  NavbarToggler,MDBCardHeader, MDBIcon, Collapse, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBView} from 'mdbreact'
import Navigation from '../NavbarM'
import Footer from '../Footer'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
export default class Password extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: null,
            users: [],
            id: "",
            userId: "",
            fullname: "",
            email: "",
            phone: "",
            mobile: "",
            address1: "",
            user_type: "",
            password: "",
            path: "http://localhost:3023/",
            isOpen: false,
            userId: null, 
            selectedFile: null, 
            config: {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          },
        }
    }

     
  componentDidMount ()  {
   var headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      axios
        .get(
          "http://localhost:3023/api/user/profile/" +
            localStorage.getItem("userId") , {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          this.setState({
            user: res.data.user
          });
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
      }

    handleFileSelect = (e) => {
        this.setState({ selectedFile: event.target.files[0] });
    //for image url
    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({ imagePreviewUrl: reader.result });
    };

    reader.readAsDataURL(event.target.files[0]);
    }

    updateUser = (e, data) => {
         var headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };

        //e.preventDefault();
        axios.put('http://localhost:3023/api/user/update', 
           this.state.user ,{
      headers: headers,
    })
            .then((response) => console.log(response.data))
            .catch((err) => console.log(err.response))
       
    }

    uploadImage = () => {};

    handleChange(e) {
        this.setState({
            user: { ...this.state.user, [e.target.name]: e.target.value }
        })
    }

    uploadImageAndUpdate = (e) => {
        const fd = new FormData();
        fd.append(
          "imageFile",
          this.state.selectedFile,
          //this.state.selectedFile.name
        );
        axios.post("http://localhost:3023/api/upload", fd, this.state.config)
          .then((res) => {
            console.log(res);
           this.setState({
                    user: { ...this.state.user, imagePath: res.data.path }
                })
            toast.success(" Your Profile sucessfully Updated!!");
           location.reload();

            this.updateUser();
          })
          .catch((err) => {
            console.log(err);
            this.setState({
              checkValidImage: "Image is not valid",
            });
            toast.error("Image is not valid");
            this.updateUser();
          });
    
  };


    render() {
       if (this.state.user === null) {
            return <h3>Please Login First</h3>
        } 
          
          const{user}=this.state
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

          return(
    <div>

            <Container>
             <Navigation />
                  
 <MDBContainer style={{
  paddingLeft:"200px", marginTop:"20px"}}>
      <MDBRow>
        <MDBCol md="8">
          <MDBCard>
          <MDBCardHeader className="form-header unique-color-dark  rounded white-text">
           <h3 className="my-3" >
            <MDBIcon icon="user-edit"/> Change Password
             </h3>
                                
           </MDBCardHeader>
            <MDBCardBody>
                        <Form>
                        <FormGroup>
                                <Label for='password'>Current Password</Label>
                                <Input type='text' id='password'
                                    name='password'
                                    value={this.state.password}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='newPassword'>New Password</Label>
                                <Input type='text' id='address1'
                                    name='address1'
                                    value={this.state.newpassword}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='address1'>Confirm Password</Label>
                                <Input type='text' id='address1'
                                    name='address1'
                                    value={this.state.newpassword}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <Button color='green' onClick={this.uploadImageAndUpdate} block>Update Password</Button>


                        </Form>
                     </MDBCardBody>
          </MDBCard>
        </MDBCol>

        
      </MDBRow>
    </MDBContainer>

    
      
      
      </Container>
      <Footer />
      </div>
            )
        }
}