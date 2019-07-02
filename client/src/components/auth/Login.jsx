import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
// import _ from "lodash";
import Fingerprint2 from "fingerprintjs2";
import {login} from "../../actions/auth";
import {connect} from 'react-redux';
// import {withRouter} from 'react-router-dom';
// withRouter là higher order component
// conect là higher order component
// nhận vào 1 component và trả về 1 component, component B sẽ có những cái props A

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",

      errors: {}
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.login(this.state, this.props.history)
  };

  testPrivate = () => {
    const token = localStorage.getItem("token");
    Fingerprint2.getV18({}, fingerprint => {
      axios.defaults.headers.common["Authorization"] = token;
      axios.defaults.headers.common["fingerprint"] = fingerprint;
      axios
        .get("/api/users/test-private")
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  render() {
    return (
      <div className="container text-left">
        <h1>Login</h1>

        <Form onSubmit={this.onSubmit} method="POST">
          <FormGroup>
            <Label for="email" className="d-flex justify-content-between">
              Email
              <span className="text-danger">
                {this.state.errors.email ? this.state.errors.email : ""}
              </span>
            </Label>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Enter email ..."
              value={this.state.email}
              onChange={this.onChange}
              invalid={this.state.errors.email ? true : false}
            />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password ..."
              value={this.state.password}
              onChange={this.onChange}
            />
          </FormGroup>

          <Button>Submit</Button>
        </Form>

        <Button onClick={this.testPrivate}>TEST PRIVATE</Button>
      </div>
    );
  }
}

export default connect(null, {login}) (Login);
