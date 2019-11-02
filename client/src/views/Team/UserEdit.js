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
    
class UserEdit extends Component {

    state = {
        modal: false,
        callback: undefined,
        teamId: undefined,
        userId: undefined,
        userrole: "", 
        roleTab: []
    }

    componentDidUpdate(){
        
        const {modal} = this.props;
        const {callback} = this.props;
        const {teamId} = this.props;
        const {userId} = this.props;
        const {roleTab} = this.props;

        if(modal !== this.state.modal) {
            if(modal === false)  this.clearStateForm(); 
            this.setState({modal: modal});
        }
        if( teamId !== this.state.teamId) this.setState({teamId: teamId});
        if( userId !== this.state.userId) this.setState({userId: userId});
        if( callback !== this.state.callback) this.setState({callback: callback});
        if( roleTab !== this.state.roleTab ) this.setState({roleTab: roleTab});
    }

    async handleRole(role){
       if(this.state.userrole != role) this.setState({userrole: role});
    }

    async handleAction(){
    //    console.log(this.state)
        if(this.state.userrole != "" && this.state.teamId != undefined && this.state.userId != undefined){
            var res = await TeamsManager.updateUserTeam(this.state.teamId, this.state.userId, this.state.userrole)
        }
        
        this.handleClose();
    }

    clearStateForm(){
        this.handleRole("user");
    }

    handleClose(){
        this.clearStateForm();
        this.state.callback();
    }

    render(){
        var option = [];
        for(var i = 0; i < this.state.roleTab.length; i++){
            option[i] = <option key={i} value={this.state.roleTab[i]}>{this.state.roleTab[i]}</option>;
        }
        return (
            <Modal isOpen={this.state.modal} toggle={this.state.callback} >
            <ModalHeader toggle={this.state.callback}>Team modal</ModalHeader>
            <ModalBody>
            <Row>
                <Col xs="12" >
                <Card>
                    <CardHeader>
                    <strong>User</strong>
                    <small> edit </small>
                    </CardHeader>
                    <CardBody>

                    <Row>
                        <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="role">Role</Label>
                        <Input placeholder="Select role" defaultValue="" onChange={event => this.handleRole(event.target.value)} type="select" name="role" id="role">
                    
                        {option}
                      </Input>

                        </FormGroup>
                        </Col>
                    </Row>
                    </CardBody>
                </Card>
                </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.handleAction.bind(this)}>Edit role user</Button>{' '}
                <Button color="secondary" onClick={this.state.callback}>Cancel</Button>
            </ModalFooter>
        </Modal>
        );
    }
}

export default UserEdit;