import React, { Component } from "react";
import "./App.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {setCurrentUser, logout} from "./actions/auth";
import jwtDecode from "jwt-decode";
import {connect} from "react-redux";
import getFingerprint from "./helpers/getFingerprint";
import setHeaders from "./helpers/setHeaders";

// import component
import Header from "./components/layouts/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/auth/Profile";
import NotFound from "./components/NotFound";

class App extends Component {

  componentDidMount () {
    // login tự động
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = jwtDecode(token);
    this.props.setCurrentUser(decoded);
    getFingerprint((fingerprint) => {
      setHeaders(token, fingerprint)
    })

    // logout: New Date.now > exp (token)
    if (Date.now() / 1000 > decoded.exp) {
      this.props.logout()
    }

  }

  render() {
    const {isAuthenticated} = this.props.auth;
    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={isAuthenticated ? Profile : NotFound} />
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {setCurrentUser, logout})(App);
