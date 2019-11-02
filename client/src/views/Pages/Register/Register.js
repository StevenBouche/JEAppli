import React, { Component } from 'react';
import { Button, Card, CardBody, /*CardFooter,*/ Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {withRouter } from 'react-router-dom';
import AuthManager from '../../../service/auth'

class Register extends Component {

  state = {
    values: {
      name: '',
      email: '',
      password: '',
      passwordrepeat: ''
    },
    touched: {
      name: false,
      email: false,
      password: false,
      passwordrepeat: false
    },
    errors: {
      name: null,
      email: null,
      password: null,
      passwordrepeat: null
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

  handleSignUp = async () => {
    try {
      const { history } = this.props;
      const { values } = this.state;

     // this.setState({ isLoading: true });

 //     await AuthManager.register('hello', values.email, values.password);
   
      await AuthManager.register(values.name,values.email,values.password);

      history.push('/');

    } catch (error) {

      this.setState({
        isLoading: false,
        serviceError: error
      });
    }
  };

  render() {
/*
    const {
      values,
      touched,
      errors
      isValid,
      submitError,
      isLoading
    } = this.state;

  const showFirstNameError = touched.firstName && errors.firstName ? errors.firstName[0] : false;
  const showLastNameError = touched.lastName && errors.lastName ? errors.lastName[0] : false;
  const showEmailError = touched.email && errors.email ? errors.email[0] : false;
  const showPasswordError = touched.password && errors.password ? errors.password[0] : false;
  const showPolicyError = touched.policy && errors.policy ? errors.policy[0] : false;
  */

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>



                      <Input type="text" onChange={event => this.handleFieldChange('name', event.target.value)}placeholder="Username" autoComplete="username" />



                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>



                      <Input onChange={event => this.handleFieldChange('email', event.target.value)} type="text" placeholder="Email" autoComplete="email" />
                     

                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>




                      <Input onChange={event => this.handleFieldChange('password', event.target.value)} type="password" placeholder="Password" autoComplete="new-password" />




                    </InputGroup>
                    
                    <Button onClick={this.handleSignUp} color="success" block>Create Account</Button>




                  </Form>
                </CardBody>              
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Register);
