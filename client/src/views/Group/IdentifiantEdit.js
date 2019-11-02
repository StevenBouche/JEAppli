import React, { Component } from 'react';
import TeamsManager from '../../service/team/TeamsManager';
import equal from 'deep-equal';
import crypt from '../../service/utils/cryptoUtils'

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
    
class IdentifiantEdit extends Component {

    state = {
        modal: false,
        callback: undefined,
        teamId: "",
        groupId: "",
        identifiantid: "",
        username: "",
        email: "",
        password: "",
        description: "",
        url: "",
        identifiant: {}
    }

    componentDidUpdate(){
        
        const {modal} = this.props;
        const {callback} = this.props;
        const {teamId} = this.props;
        const {groupId} = this.props;
        const {identifiant} = this.props;
        const {identifiantid} = this.props;

        if( teamId !== this.state.teamId) this.setState({teamId: teamId});
        if( groupId !== this.state.groupId) this.setState({groupId: groupId});
        if( callback !== this.state.callback) this.setState({callback: callback});
        if( identifiantid !== this.state.identifiantid) this.setState({identifiantid: identifiantid});
        if( !equal(identifiant,this.state.identifiant)){
            this.setState({identifiant: identifiant})
        }

        if(modal !== this.state.modal) {
            this.setState({modal: modal}, 
                () => {
                    if(modal === false) this.clearStateForm(); 
                    if(modal === true) {
                        for(var i = 0; i < this.state.identifiant.length; i++){
                            if(this.state.identifiant[i]._id == this.state.identifiantid){
                               // console.log(this.state.identifiant[i])
                                this.handleName(this.state.identifiant[i].username);
                                this.handlemail(this.state.identifiant[i].email);
                                this.handlePassword(crypt.decryptWithKey(this.state.identifiant[i].password));
                             //   this.handlePassword(this.state.identifiant[i].password);
                                this.handleDescription(this.state.identifiant[i].description);
                                this.handleUrl(this.state.identifiant[i].url);
                            }
                        }
                        
                    }
                });
        }
    }

    setForm(){
        for(var i = 0; i < this.state.identifiant.length; i++){
            if(this.state.identifiant[i]._id == this.state.identifiantid){
              
                this.handleName(this.state.identifiant[i].username);
                this.handlemail(this.state.identifiant[i].email);
                this.handlePassword(this.state.identifiant[i].password);
                this.handleDescription(this.state.identifiant[i].description);
                this.handleUrl(this.state.identifiant[i].url);
            }
        }
    }

    handleName(name){ this.setState({username: name});}
    handlemail(email){ this.setState({email: email});}
    handlePassword(passwd){ this.setState({password: passwd});}
    handleDescription(description){ this.setState({description: description});}
    handleUrl(url){ this.setState({url: url});}

    async handleAction(){
        var identif = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            description: this.state.description,
            url: this.state.url
        }
        var res = await TeamsManager.updateIdentifiant(this.state.teamId,this.state.groupId,this.state.identifiantid,identif);
        res = await res.json();
        this.handleClose();
    }

    clearStateForm(){
        this.handleName("");
        this.handleDescription("");
        this.handlePassword("");
        this.handlemail("");
        this.handleUrl("");
    }

    handleClose(){
      //  this.clearStateForm();
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
                    <small> Form</small>
                    </CardHeader>
                    <CardBody>
                    <Row>
                        <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="name">Name</Label>
                            <Input  onChange={event => this.handleName(event.target.value)} value={this.state.username} type="text" id="name" placeholder="Enter username" required />
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input onChange={event => this.handlemail(event.target.value)} value={this.state.email} type="text" id="email" placeholder="Enter email" required />
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="pwd">Password</Label>
                            <Input onChange={event => this.handlePassword(event.target.value)} value={this.state.password} type="text" id="pwd" placeholder="Enter password" required />
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="description">Description</Label>
                            <Input onChange={event => this.handleDescription(event.target.value)} value={this.state.description} type="text" id="description" placeholder="Enter description" required />
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="url">Url</Label>
                            <Input onChange={event => this.handleUrl(event.target.value)} value={this.state.url} type="text" id="url" placeholder="Enter url" required />
                        </FormGroup>
                        </Col>
                    </Row>
                    </CardBody>
                </Card>
                </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.handleAction.bind(this)}>Edit identifiant</Button>{' '}
                <Button color="secondary" onClick={this.state.callback}>Cancel</Button>
            </ModalFooter>
        </Modal>
        );
    }
}

export default IdentifiantEdit;