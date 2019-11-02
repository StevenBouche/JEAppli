import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import AuthManager from '../../../service/auth'
import {withRouter} from 'react-router-dom';

class Login extends Component {

  state = {
    values: {
      email: '',
      password: ''
    },
    touched: {
      email: false,
      password: false
    },
    errors: {
      email: null,
      password: null
    },
    isValid: false,
    isLoading: false,
    submitError: null,
    showSignInError: null
  };

  handleFieldChange = (field, value) => {
    const newState = {...this.state};

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  handleSignIn = async () => {
    try {
      const {history} = this.props;
      const {values} = this.state;

      this.setState({isLoading: true});
      this.setState({showSignInError: false});

      await AuthManager.login(values.email,values.password);
      
      let loginResult = AuthManager.isLogin();

      this.setState({isLoading: false});
      if (loginResult) {
        localStorage.setItem('isAuthenticated', true);
        history.push('/');
        this.setState({showSignInError: false});
      } else {
        localStorage.setItem('isAuthenticated', false);
        this.setState({showSignInError: true});
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        serviceError: error
      });
    }
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onChange={event => this.handleFieldChange('email', event.target.value)} type="text" placeholder="Email" autoComplete="email" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onChange={event => this.handleFieldChange('password', event.target.value)} type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button  onClick={this.handleSignIn} color="primary" className="px-4">
                              Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Login);
