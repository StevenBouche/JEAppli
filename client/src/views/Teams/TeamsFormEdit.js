import React, { Component } from 'react';
import TeamsManager from '../../service/team/TeamsManager';
import equal from 'deep-equal';

import {
    Button,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Row,
    Col,
    CardHeader,
    CardBody,
    Label,
    FormGroup,
    Card,
    Input } from 'reactstrap';
    
class TeamsForm extends Component {

    state = {
        modal: false,
        callback: undefined,
        teamData: {},
        name: "",
        description: ""
    }

    componentDidUpdate(){
        const {modal} = this.props;
        const {callback} = this.props;
        const {teamData} = this.props;

        if(modal !== this.state.modal) {
            if(modal === false)  this.clearStateForm(); 
            this.setState({modal: modal});
        }

        if( callback !== this.state.callback) this.setState({callback: callback});
      //  console.log(equal(this.state.teamData, teamData))
        if( teamData !== undefined && !equal(this.state.teamData, teamData)) {
      //      console.log("TEAM DATA EDDIT FORM")
     //   console.log(teamData);
            this.setState({teamData: teamData},
                ()=> {
                    this.handleName(this.state.teamData.nameitem);
                    this.handleDescription(this.state.teamData.descitem);
                });  
        }
    }

    handleName(name){
        this.setState({ name: name});
    }

    handleDescription(description){
        this.setState({ description: description});
    }

    async handleAction(){
        var res = await TeamsManager.updateTeam(this.state.teamData.key, this.state.name,this.state.description);
        res = await res.json();
        this.handleClose();
    }

    clearStateForm(){
        this.handleName(this.state.teamData.nameitem);
        this.handleDescription(this.state.teamData.descitem);
    }

    handleClose(){
        this.clearStateForm();
        this.state.callback();
    }

    render(){
           
        return (
            <Modal isOpen={this.state.modal} toggle={this.state.callback} >
            <ModalHeader toggle={this.state.callback}>Teams modal</ModalHeader>
            <ModalBody>
            <Row>
                <Col xs="12" >
                <Card>
                    <CardHeader>
                    <strong>Team</strong>
                    <small> Form</small>
                    </CardHeader>
                    <CardBody>
                    <Row>
                        <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="name">Name</Label>
                            <Input  onChange={event => this.handleName(event.target.value)} value={this.state.name} type="text" id="name" placeholder="Enter group name" required />
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="description">Description</Label>
                            <Input onChange={event => this.handleDescription(event.target.value)} value={this.state.description} type="text" id="description" placeholder="Enter group description" required />
                        </FormGroup>
                        </Col>
                    </Row>
                    </CardBody>
                </Card>
                </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.handleAction.bind(this)}>Edit team</Button>{' '}
                <Button color="secondary" onClick={this.state.callback}>Cancel</Button>
            </ModalFooter>
        </Modal>
        );
    }
}

export default TeamsForm;