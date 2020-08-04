/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";

const Authorization = (WrappedComponent, allowedRoles) => {
  class WithAuthorization extends Component {
    render() {
      const user_type  = this.props.user_type;
      if (allowedRoles.includes(user_type)) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <h1>You are not allowed to view this page!</h1>;
      }
    }
  }
  const mapStateToProps = state => ({ user: state.login.username, user_type: state.login.user_type })
  return connect(mapStateToProps)(WithAuthorization);
};
export default Authorization;