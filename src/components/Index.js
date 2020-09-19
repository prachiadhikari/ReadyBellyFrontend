/* eslint-disable */
import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import Navigation from "./NavbarM";
import CarouselPage from "./Carousel";
import HomePage from "./Home";
import Product from "./Producthome";



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navigation />
        <CarouselPage />
        <HomePage />
        <Product />


        <section className="text-center my-5"></section>
        <Footer />
      </div>
    );
  }
}

export default Home;
