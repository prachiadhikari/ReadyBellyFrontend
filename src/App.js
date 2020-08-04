/* eslint-disable */
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  // ahref equiv
  Route,
  // to catch the cliked route
} from "react-router-dom";
import Index from "./components/Index";
import Registration from "./components/Registration/Registration";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

import UpdateProduct from "./components/AddProduct/UpdateProduct";
import ProductPage from "./components/product/ProductPage";
import Authorization from './components/Authorization';
import { PrivateRoute } from './components/PrivateRoute.js'
import VendorProfile from './components/Dashboard/VendorProfile';
import UserProfile from './components/Dashboard/UserProfile';
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./components/product/Cart";
import { Container } from "react-bootstrap";
import Booking from "./components/Booking/Booking"
import ViewCart from "./components/product/ViewCart";
import Pay from "./components/Booking/Pay";
import BookingList from "./components/Booking/BookingList";
import Profile from "./components/Profile/Profile";

import UserBookingList from "./components/Booking/UserBookingList";
import UserList from "./components/Admin/UserList";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      color: "#ffffff",
    };
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>

          <Route exact path="/registration">
            <Registration />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/addproduct">
            <UpdateProduct />
          </Route>

          <Route exact path="/contact">
            <Contact />
          </Route>
           <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/booking">
            <Booking />
          </Route>
          <Route exact path="/viewcart">
            <ViewCart />
          </Route>
          <Route exact path="/purchaselist">
            <BookingList />
          </Route>
           <Route exact path="/pay">
            <Pay />
          </Route>
           <Route exact path="/userbooking">
            <UserBookingList />
          </Route>
	 <Route exact path="/userlist">
            <UserList />
          </Route>
          <Route exact path="/updateproduct/api/product/myp/:id" component={UpdateProduct}/>

           <PrivateRoute path="/products" component={(ProductPage)}/>
           <PrivateRoute path="/profile" component={(Profile)}/>

           <PrivateRoute path="/vendorprofile" component={(VendorProfile)}/>
          // <PrivateRoute path="/vendorprofile" component={Authorization(VendorProfile),["Vendor"]}/>
          <PrivateRoute path="/userprofile" component={Authorization(UserProfile),["User"]}/>

        </Switch>
      </Router>
    );
  }
}

export default App;
