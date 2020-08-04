import React from 'react'
import { 
  Form, Button,FormGroup,FormInput
} from 'react-bootstrap'
import Axios from 'axios';
import { CustomInput } from 'reactstrap'
import 'mdbreact/dist/css/mdb.css'
import { Container,MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBView} from 'mdbreact';
import { Redirect,Link } from 'react-router-dom';
import Navigation from '../NavbarM'
import Footer from '../Footer'
class Profile extends React.Component {

constructor(props){
  super(props)
  this.state={
     users:[],
     path: "http://localhost:3023/"
  }

  }

    componentDidMount() {
        Axios.get('http://localhost:3023/users/myp'+localStorage.getItem("userId"))
            .then((response) => {
                this.setState({
                    user: response.data.user,
                    path: "http://localhost:3023/uploads/",
                })
                .catch((err) => {
                  });
            });
    
}


   
render(){

 if (this.state.user === null) {
            return <h3>Loading ...</h3>
        }else{

  return(

<Container>
<div>
<Navigation/>
 <MDBContainer style={{
  paddingLeft:"20px",backgroundImage:'url(image/teeth.jpg)',backgroundSize:'cover', marginTop:20}}>
      <MDBRow>
      <MDBCol md="3">
        </MDBCol>
        <MDBCol md="6" style={{marginTop:50,marginBottom:50}}>
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={this.formSubmitHandler} >
                <p className="h4 text-center py-4"> Profile</p>
                 <p className="h6 text-center py-4">
               <img className='img-thumbnail'
               style={{ width:'150',height:150,borderRadius:40}}
               src={`http://localhost:3023/uploads/`}
               alt="profile" /></p>
                <p className="h6" style={{marginBottom:20}}>
                <img src='image/people.png' style={{width:20,height:20,borderRadius:10,marginRight:10,marginLeft:150}}/>
                 Name: {this.state.user.fullname}
                 </p>
                <p className="h6 " style={{marginBottom:20}}> 
  <img src='image/people.png' style={{width:20,height:20,borderRadius:10,marginRight:10,marginLeft:150}}/>
                Address: {this.state.user.address1}</p>

                <p className="h6 " style={{marginBottom:20}}>
  <img src='image/phone1.png' style={{width:20,height:20,borderRadius:10,marginRight:10,marginLeft:150}}/>
                 Phone: {this.state.user.phone}</p>

                <p className="h6" style={{marginBottom:20}}>
  <img src='image/email1.png' style={{width:20,height:20,borderRadius:10,marginRight:10,marginLeft:150}}/>
                 Email: {this.state.user.email}</p>

                <p className="h6" style={{marginBottom:20}}> 
  <img src='image/dob.jpeg' style={{width:20,height:20,borderRadius:10,marginRight:10,marginLeft:150}}/>
                DOB: {this.state.user.dob}</p>

              
                <div className="text-center py-6 mt-6">
                 <MDBBtn
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                 ><Link to='updateprofile' style={{color: 'white'}}>
                  Update</Link>
                </MDBBtn>
</div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

      </MDBRow>
    </MDBContainer>
    <Footer/>
     </div>
</Container>
    
     
      
   )
        }
    }
}

export default Profile;