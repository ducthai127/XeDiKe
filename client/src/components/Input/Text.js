import React, { Component } from 'react';

class Text extends Component {
    render() {
        return (
            <FormGroup>
                <Label for="email" className="d-flex justify-content-between">Email
                            <span className="text-danger">{this.state.errors.email ? this.state.errors.email : ""}</span>
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
        );
    }
}

export default Text;