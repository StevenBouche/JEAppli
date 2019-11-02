import React, { Component } from 'react';
import TeamsManager from '../../service/team/TeamsManager';

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
    
class GroupFormAdd extends Component {

    state = {
        modal: false,
        callback: undefined,
        teamId: "",
        name: "",
        description: ""
    }

    componentDidUpdate(){
        
        const {modal} = this.props;
        const {callback} = this.props;
        const {teamId} = this.props;

        if(modal !== this.state.modal) {
            if(modal === false)  this.clearStateForm(); 
            this.setState({modal: modal});
        }

        if( teamId !== this.state.teamId) this.setState({teamId: teamId});
        if( callback !== this.state.callback) this.setState({callback: callback});

    }

    handleName(name){
        this.setState({name: name});
       
    }

    handleDescription(description){
        this.setState({description: description});
    }

    async handleAction(){
        var res = await TeamsManager.createGroup(this.state.teamId,this.state.name,this.state.description);
        res = await res.json();
        this.handleClose();
    }

    clearStateForm(){
        this.handleName("");
        this.handleDescription("");
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
                    <strong>Group</strong>
                    <small> Form</small>
                    </CardHeader>
                    <CardBody>
                    <Row>
                        <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="name">Name</Label>
                            <Input  onChange={event => this.handleName(event.target.value)} type="text" id="name" placeholder="Enter group name" required />
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="description">Description</Label>
                            <Input onChange={event => this.handleDescription(event.target.value)} type="text" id="description" placeholder="Enter group description" required />
                        </FormGroup>
                        </Col>
                    </Row>
                    </CardBody>
                </Card>
                </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.handleAction.bind(this)}>Create group</Button>{' '}
                <Button color="secondary" onClick={this.state.callback}>Cancel</Button>
            </ModalFooter>
        </Modal>
        );
    }
}

export default GroupFormAdd;