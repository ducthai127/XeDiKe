import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
// import axios from 'axios';
// import _ from 'lodash';
import {register} from "../../actions/auth";
import {connect} from 'react-redux';
// import {withRouter} from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password2: "",
            fullName: "",
            phone: "",
            DOB: "",
            userType: "",
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()

        this.props.register(this.state, this.props.history)
    }
    

    render() {
        return (
            <div className="container text-left">
                <h1>REGISTER</h1>

                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="email" className="d-flex justify-content-between">Email
                        <span className="text-danger">{this.props.errors.email ? this.props.errors.email : ""}</span>
                        </Label>
                        <Input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Enter email ..."
                            value={this.state.email}
                            onChange={this.onChange}
                            invalid={this.props.errors.email ? true : false}
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

                    <FormGroup>
                        <Label for="password2">Confirmed password</Label>
                        <Input
                            type="password"
                            name="password2"
                            id="password2"
                            placeholder="Enter confirmed password ..."
                            value={this.state.password2}
                            onChange={this.onChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="fullName">Full name</Label>
                        <Input
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Enter fullName ..."
                            value={this.state.fullName}
                            onChange={this.onChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="userType">User type:</Label>
                        <Input
                            type="select"
                            name="userType"
                            id="userType"
                            value={this.state.userType}
                            onChange={this.onChange}
                        >
                            <option value="-1">Select user type...</option>
                            <option value="passenger">passenger</option>
                            <option value="driver" >driver</option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="phone">Phone</Label>
                        <Input
                            type="number"
                            name="phone"
                            id="phone"
                            placeholder="Enter phone ..."
                            value={this.state.phone}
                            onChange={this.onChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="DOB">DOB</Label>
                        <Input
                            type="date"
                            name="DOB"
                            id="DOB"
                            placeholder="Enter DOB ..."
                            value={this.state.DOB}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps, {register}) (Register);