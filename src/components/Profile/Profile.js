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
export default class UserProfile extends Component {

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
          <MDBCardHeader className="form-header orange rounded white-text">
           <h3 className="my-3" >
            <MDBIcon icon="user-edit"/> Update Profile
             </h3>
                                
           </MDBCardHeader>
            <MDBCardBody>
                        <Form>
                            <FormGroup>
                                <Label for='fullname'>Fullname</Label>
                                <Input type='text'
                                    id="fullname"
                                    name='fullname'
                                    value={this.state.user.fullname}
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='address1'>Address</Label>
                                <Input type='text' id='address1'
                                    name='address1'
                                    value={this.state.user.address1}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                             <FormGroup>
                                <Label for='phone'>Phone Number</Label>
                                <Input type='text' id='phone'
                                    name='phone'
                                    value={this.state.user.phone}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='mobile'>Mobile Number</Label>
                                <Input type='text' id='mobile'
                                    name='mobile'
                                    value={this.state.user.mobile}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                             <FormGroup>
                                <Label for='email'>Email</Label>
                                <Input type='text' id='email'
                                    name='email'
                                    value={this.state.user.email}

                                    />

                                    <h6 style={{color:"red"}}>
                                     The address used to identify your ReadyBelly Account to you and others. You can't change this email address.
                                     </h6>
                            </FormGroup>
                            <FormGroup>
                                <Label for='user_type'>UserType</Label>
                                <Input type='text' id='user_type'
                                    name='user_type'
                                    value={this.state.user.user_type}
                                     />
                                        <h6 style={{color:"red"}}>
                                   This usertype can not be change. If you want create new account. </h6>
                            </FormGroup>
                             <FormGroup>
                                             <div>
                                             <img className='img-thumbnail'
                                    width='400' src={`http://localhost:3023/${this.state.user.image_path}`}
                                    alt="profile" />
                                               <input
                                                 type="file"
                                                 inputprops={{
                                                   accept: "image/*",
                                                 }}
                                                 id="previewImage"
                                                 name="avatar"
                                                 onChange={
                                                   this.handleFileSelect
                                                 }
                                                 ref={(fileInput) =>
                                                   (this.fileInput = fileInput)
                                                 }
                                               />{" "}
                                             </div>
                                           </FormGroup>
                            <Button color='danger' onClick={this.uploadImageAndUpdate} block>Update User</Button>


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