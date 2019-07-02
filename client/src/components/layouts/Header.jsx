import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const navbarForAnonymous = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link className="nav-link" to="/login">
            Login
                </Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/register">
            Register
                </Link>
        </NavItem>
      </Nav>
    )
    const navbarForLoggedInUser = (
      <Nav>
        <NavItem>
          <Link className="nav-link" to="/profile">
            Profile
                </Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/" onClick={this.props.logout}>
            Logout
                </Link>
        </NavItem>
      </Nav >
    )
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {isAuthenticated ? navbarForLoggedInUser : navbarForAnonymous}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {logout})(Header);