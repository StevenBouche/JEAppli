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
    
class GroupeFormEdit extends Component {

    state = {
        modal: false,
        callback: undefined,
        groupData: {},
        name: "",
        description: "",
        teamid: ""
    }

    componentDidUpdate(){
        const {modal} = this.props;
        const {callback} = this.props;
        const {groupData} = this.props;
        const {teamid} = this.props;

        if(modal !== this.state.modal) {
            if(modal === false)  this.clearStateForm(); 
            this.setState({modal: modal});
        }

        if( callback !== this.state.callback) this.setState({callback: callback});
       // console.log(equal(this.state.groupData, groupData))

        if( groupData !== undefined && !equal(this.state.groupData, groupData)) {
        //    console.log("TEAM DATA EDDIT FORM")
       // console.log(groupData);
            this.setState({groupData: groupData},
                ()=> {
                    this.handleName(this.state.groupData.nameitem);
                    this.handleDescription(this.state.groupData.descitem);
                });  
        }

        if(teamid != this.state.teamid) this.setState({teamid: teamid});
    }

    handleName(name){
        this.setState({ name: name});
    }

    handleDescription(description){
        this.setState({ description: description});
    }

    async handleAction(){
        var res = await TeamsManager.updateGroup(this.state.teamid, this.state.groupData.key, this.state.name,this.state.description);
        res = await res.json();
        this.handleClose();
    }

    clearStateForm(){
        this.handleName(this.state.groupData.nameitem);
        this.handleDescription(this.state.groupData.descitem);
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

export default GroupeFormEdit;