import React, { Component } from 'react'
import axios from 'axios'
import { Form, Card, NavItem, Nav, Col, Row, CardBody, FormGroup, Input, Button, Label, CustomInput, Container } from 'reactstrap'
import { MDBContainer,  NavbarToggler,MDBCardHeader, MDBIcon, Collapse, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBView} from 'mdbreact'
import Navigation from '../NavbarM'
import Footer from '../Footer'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
export default class ProfilePage extends Component {

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
                  
             <MDBCard className="my-5 px-5 pb-5">
     
          <MDBCardHeader className="form-header orange accent-2 rounded white-text">
           <h3 className="my-3" >
            <MDBIcon icon="user"/> Your Profile
             </h3>
                                
           </MDBCardHeader>
            <MDBCardBody>
              <MDBRow>
                <MDBCol sm="4">
                <MDBCard style={{width:250,height:250}}>
                <img className='img-thumbnail'
                                    width='250' height='250' src={`http://localhost:3023/${this.state.user.image_path}`}
                                    alt="profile" />
                </MDBCard>
                </MDBCol>
                <MDBCol sm="8">
                  <MDBCard>
                    <MDBRow>
                      <MDBCol>
                        <MDBCard style={{height:100}}>
                        <h4>FullName: {this.state.user.fullname}</h4>
                        </MDBCard>
                      </MDBCol>
                      <MDBCol>
                        <MDBCard style={{height:100}}>
                        <h4>Address: {this.state.user.address}</h4>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol>
                        <MDBCard style={{height:100}}>
                        <h4>Phone number: {this.state.user.phone}</h4>
                        </MDBCard>
                      </MDBCol>
                      <MDBCol>
                        <MDBCard style={{height:100}}>
                        <h4>Mobile Number: {this.state.user.mobile}</h4>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                    <MDBCol>
                        <MDBCard style={{height:100}}>
                        <h4>Email: {this.state.user.email}</h4>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                    <MDBCol>
                        <MDBCard style={{height:100}}>
                        <h4>UserType: {this.state.user.user_type}</h4>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                   
                    Email:
                    <hr/>
                    UserType:
                    <hr/>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
                       
            </MDBCardBody>
    </MDBCard>

    
      
      
      </Container>
      <Footer />
      </div>
            )
        }
}