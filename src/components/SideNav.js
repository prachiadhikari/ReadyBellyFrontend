
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

import { MDBIcon } from "mdbreact";
import { Container } from 'react-bootstrap';

class SideNavv extends React.Component {
   
  
      render(){
  return (
    <div >
    <SideNav.Toggle />
    
<Router>
    <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav
            style={{backgroundColor:"orange",
            marginTop:"5%",height:"100%"}}
            >
                <SideNav.Toggle onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }} />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="">
                        <NavIcon>
                        <MDBIcon icon="home"  style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>Dashboard</NavText>
                    </NavItem>
                    <NavItem eventKey="">
                    <NavIcon>
                        <MDBIcon icon="utensils"  style={{ fontSize: '1.75em' }} />
                        </NavIcon> 
                        <NavText>Orders</NavText>
                    </NavItem>
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
                        <NavText>Logout</NavText>
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
