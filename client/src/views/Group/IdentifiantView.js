import React, { Component } from 'react';
import TeamsManager from '../../service/team/TeamsManager';
import crypt from '../../service/utils/cryptoUtils'
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
    Card } from 'reactstrap';
    
class IdentifiantView extends Component {

    state = {
        modal: false,
        callback: undefined,
        password: "",
        identifiant: {},
        identifiantid: ""
    }

    componentDidUpdate(){
        
        const {modal} = this.props;
        const {callback} = this.props;
        const {identifiant} = this.props;
        const {identifiantid} = this.props;

        if( identifiantid !== this.state.identifiantid) this.setState({identifiantid: identifiantid});
        if( !equal(identifiant,this.state.identifiant)) this.setState({identifiant: identifiant});
        
        if(modal !== this.state.modal) {
            if(modal === false)  this.clearStateForm(); 
            this.setState({modal: modal});
            if(modal === true){
                for(var i = 0; i < this.state.identifiant.length; i++){
                    if(this.state.identifiant[i]._id == this.state.identifiantid){
                        this.handlePassword(crypt.decryptWithKey(this.state.identifiant[i].password));
                    }
                }
            }
        }

        if( callback !== this.state.callback) this.setState({callback: callback});

    }

    handlePassword(passwd){ this.setState({password: passwd});}

    async handleAction(){
        
    }

    clearStateForm(){
        this.handlePassword("");
    }

    handleClose(){
        this.clearStateForm();
        this.state.callback();
    }

    render(){
        return (
            <Modal isOpen={this.state.modal} toggle={this.state.callback} >
            <ModalHeader toggle={this.state.callback}>Identifiant modal</ModalHeader>
            <ModalBody>
            <Row>
                <Col xs="12" >
                <Card>
                    <CardHeader>
                    <strong>Identifiant</strong>
                    <small> View password</small>
                    </CardHeader>
                    <CardBody>
                    <Row>
                        <Col xs="12">
                        <p>{this.state.password}</p>
                        </Col>
                    </Row>
                    </CardBody>
                </Card>
                </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={this.state.callback}>Cancel</Button>
            </ModalFooter>
        </Modal>
        );
    }
}

export default IdentifiantView;