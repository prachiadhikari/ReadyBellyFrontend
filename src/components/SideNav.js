
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
 import
'bootstrap-css-only/css/bootstrap.min.css';
 import
'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import{
	BrowserRouter as Router,
	Switch,
	Link,
	Route

} from 'react-router-dom'

import { MDBIcon,MDBNavLink } from "mdbreact";
import { Container } from 'react-bootstrap';

class SideNavv extends React.Component {
    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        localStorage.removeItem("userId");
        localStorage.removeItem("cart");
        this.props.history.push("");
        location.reload();
      }; 
  
      render(){
  return (
    <div >
    <SideNav.Toggle />
    
<Router>
    <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav
            style={{backgroundColor:"#3F729B",
            marginTop:"5%",height:"100%"}}
            >
                <SideNav.Toggle onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }} />
                <SideNav.Nav defaultSelected="utensils">
                   
                    
                    <NavItem eventKey="">
                   
                    <NavIcon>
                    <MDBIcon icon="align-justify"   style={{ fontSize: '1.75em' }} />
                        </NavIcon> 
                        <NavText>Menus</NavText>
                       
                    </NavItem>
                    <NavItem eventKey="">
                    <NavIcon>
                        <MDBIcon icon="utensils"  style={{ fontSize: '1.75em' }} />
                        </NavIcon> 
                        <NavText>Resturants</NavText>
                    </NavItem>

                    <NavItem eventKey="">
                    <NavIcon>
                    <MDBIcon icon="users" style={{ fontSize: '1.75em' }} />
                        </NavIcon> 
                        <NavText>Users</NavText>
                    </NavItem>
                    <NavItem eventKey="">
                    <NavIcon>
                    <MDBIcon icon="comments"  style={{ fontSize: '1.75em' }} />
                        </NavIcon> 
                        <NavText>Feedbacks</NavText>
                    </NavItem>
                    <NavItem eventKey="/">
                    <NavIcon>
                    <MDBIcon icon="sign-out-alt"  style={{ fontSize: '1.75em' }} />
                        </NavIcon> 
                        <NavText>
                        <a onClick={this.handleLogout}>Logout</a>
                        </NavText>
                    </NavItem>
                    
                   
                </SideNav.Nav>
            </SideNav>
            
        </React.Fragment>
    )}
    />
</Router>
    </div>
  );
};
}

export default SideNavv;
