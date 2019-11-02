import React, { Component } from 'react';
import TeamsManager from '../../service/team/TeamsManager';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
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
    
class UserAdd extends Component {

    state = {
        modal: false,
        callback: undefined,
        teamId: "",
        term: "",
        datauser: [],
        idSelect: undefined
    }

    componentDidUpdate(){
        
        const {modal} = this.props;
        const {callback} = this.props;
        const {teamId} = this.props;

        if(modal !== this.state.modal) {
            if(modal === false)  this.clearStateForm(); 
            this.setState({modal: modal});
        }

        if( teamId !== this.state.teamId) this.setState({teamId: teamId},async () => {await this.handleTerm("");});
        if( callback !== this.state.callback) this.setState({callback: callback});

    }

    async handleTerm(term){
        if(this.state.term != term){
            this.setState({term: term},
                async () => {
                    var res = await TeamsManager.getUsetTeamComp(this.state.teamId,this.state.term)
                    if(!equal(res,this.state.datauser)) this.setState({datauser: res});
                });
        }
    }

    async handleAction(){
        if(this.state.idSelect != undefined){
            await TeamsManager.addUserTeam(this.state.teamId, this.state.idSelect);
        }
        this.handleClose();
    }

    clearStateForm(){
        this.handleTerm("");
        this.setState({idSelect: undefined})
    }

    handleClose(){
        this.clearStateForm();
        this.state.callback();
    }

    onRowSelectUser(row, isSelected, e) {
        if(this.state.idSelect != row._id) this.setState({idSelect: row._id});
      //  console.log(row._id)
    }

    render(){

        const selectRowUser = {
            onSelect: this.onRowSelectUser.bind(this),
            mode: 'radio'
          };
        
          var datauser = this.state.datauser;

        return (
            <Modal isOpen={this.state.modal} toggle={this.state.callback} >
            <ModalHeader toggle={this.state.callback}>Team modal</ModalHeader>
            <ModalBody>
            <Row>
                <Col xs="12" >
                <Card>
                    <CardHeader>
                    <strong>User</strong>
                    <small> add </small>
                    </CardHeader>
                    <CardBody>
                    <BootstrapTable data={datauser} selectRow={selectRowUser} version="4">
                        <TableHeaderColumn hidden dataField='_id' isKey>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>Username</TableHeaderColumn>
                    </BootstrapTable>
                    <Row>
                        <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="name">Username</Label>
                            <Input  onChange={event => this.handleTerm(event.target.value)} type="text" id="name" placeholder="Enter group name" required />
                        </FormGroup>
                        </Col>
                    </Row>
                    </CardBody>
                </Card>
                </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.handleAction.bind(this)}>Add user</Button>{' '}
                <Button color="secondary" onClick={this.state.callback}>Cancel</Button>
            </ModalFooter>
        </Modal>
        );
    }
}

export default UserAdd;