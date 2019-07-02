import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import {connect} from "react-redux";
import { getMyProfile } from "../../actions/auth";
import getFingerprint from "../../helpers/getFingerprint";
import setHeaders from "../../helpers/setHeaders";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullName: "",
      phone: "",
      DOB: "",
      userType: "",
      avatar: "uploads/1562078182809-avatar.png",
      file: null
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      file: e.target.files && e.target.files[0]
    }, () => {
        const formData = new FormData();
        formData.append("avatar", this.state.file)
        axios.post("/api/users/upload-avatar", formData)
        .then(res => this.setState({
            avatar: res.data.avatar
        }))
        .catch(err => console.log(err))
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state, this.props.history);
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) return;
    getFingerprint((fingerprint) => {
        setHeaders(token, fingerprint)

        let {profile} = this.props.auth;
        this.props.getMyProfile(profile.id, (user) => {
          this.setState(user);
        })
      })
  }

  componentWillReceiveProps = nextProps => {
    const { profile } = nextProps.auth;
    this.setState(profile);
  };

  render() {
    return (
      <div>
        <h1>MY PROFILE</h1>

        <Container>
          <Row>
            <Col md={5}>
                <img 
                   src={`http://localhost:1270/${this.state.avatar}`}
               alt="avatar" />
                <input type="file" name="file" onChange={this.onChange} file={this.state.file} />
                
            </Col>
            <Col md={7}>
                <h4>MY INFO</h4>

              <Form onSubmit={this.onSubmit} method="POST">
                <FormGroup>
                  <Label for="email" className="d-flex justify-content-between mt-4">
                    Email
                    {/* <span className="text-danger">
                {this.state.errors.email ? this.state.errors.email : ""}
              </span> */}
                  </Label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email ..."
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <Label
                    for="fullName"
                    className="d-flex justify-content-between mt-4"
                  >
                    Full Name
                    {/* <span className="text-danger">
                {this.state.errors.email ? this.state.errors.email : ""}
              </span> */}
                  </Label>
                  <Input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="FullName ..."
                    value={this.state.fullName}
                    onChange={this.onChange}
                  />
                  <Label for="phone" className="d-flex justify-content-between mt-4">
                    Phone
                    {/* <span className="text-danger">
                {this.state.errors.email ? this.state.errors.email : ""}
              </span> */}
                  </Label>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone ..."
                    value={this.state.phone}
                    onChange={this.onChange}
                  />
                  <Label for="DOB" className="d-flex justify-content-between mt-4">
                    DOB
                    {/* <span className="text-danger">
                {this.state.errors.email ? this.state.errors.email : ""}
              </span> */}
                  </Label>
                  <Input
                    type="text"
                    name="DOB"
                    id="DOB"
                    placeholder="DOB ..."
                    value={this.state.DOB}
                    onChange={this.onChange}
                  />
                  <Label
                    for="userType"
                    className="d-flex justify-content-between mt-4"
                  >
                    User Type
                    {/* <span className="text-danger">
                {this.state.errors.email ? this.state.errors.email : ""}
              </span> */}
                  </Label>
                  <Input
                    type="text"
                    name="userType"
                    id="userType"
                    placeholder="UserType ..."
                    value={this.state.userType}
                    onChange={this.onChange}
                    disabled
                  />
                </FormGroup>

                <Button>Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      auth: state.auth
    }
  }
  
export default connect(mapStateToProps, {getMyProfile})(Profile);
