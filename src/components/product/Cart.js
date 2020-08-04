/* eslint-disable */
import React, { Component } from "react";
import ViewCart from "./ViewCart";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, CardColumns } from "react-bootstrap";
import item from "./ProductPage";

//Change items.js file in src for product updation

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: item,
      cart: [],
      viewcart: false,
      total: 0,
      search: null,
    };
  }
  add(item) {
    const removedCart = this.state.cart.filter((p) => p.id === item.id);
    if (removedCart.length > 0) {
      const withoutitem = this.state.cart.filter((p) => p.id != item.id);
      const updatedcart = {
        ...removedCart[0],
        quantity: removedCart[0].quantity + 1,
      };
      this.setState({
        cart: [...withoutitem, updatedcart],
        total: this.state.total + item.price,
      });
    } else {
      this.setState({
        cart: [...this.state.cart, { ...item, quantity: 1 }],
        total: this.state.total + item.price,
      });
    }
  }

  update = () => {
    this.setState({
      viewcart: !this.state.viewcart,
    });
  };

  plus = (item) => {
    this.add(item);
  };

  delete = (item) => {
    const items = this.state.cart.filter((p) => p.id !== item.id);
    this.setState({
      cart: items,
      total: this.state.total - item.quantity * item.price,
    });
  };

  minus = (item) => {
    if (item.quantity != 1) {
      this.setState({
        cart: [
          ...this.state.cart.filter((p) => p.id != item.id),
          { ...item, quantity: item.quantity - 1 },
        ],
        total: this.state.total - item.price,
      });
    } else {
      this.delete(item);
    }
  };

 
  render() {
    return (
      <div>

        <Button
          onClick={this.update}
          variant="primary"
          style={{
            marginTop: "15px",
            marginLeft: "44%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          View/Hide Cart
        </Button>
        {this.state.viewcart && (
          <ViewCart
            cart={this.state.cart}
            plus={this.plus}
            minus={this.minus}
            delete={this.delete}
            total={this.state.total}
            style={{ marginTop: "100px" }}
          />
        )}
      </div>
    );
  }
}

export default Cart;