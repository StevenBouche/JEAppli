import React, { Component } from 'react';
import TableUser from '../../views/Items/TableUser';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string'
import TeamsManager from '../../service/team/TeamsManager';
import equal from 'deep-equal';
import {Button, ButtonToolbar, ButtonGroup, Card, CardHeader, CardBody } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import IdentifiantEdit from './IdentifiantEdit'
import IdentifiantAdd from './IdentifiantAdd'
import IdentifiantView from './IdentifiantView'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

var enumRole = [
    'dev',
    'admin',
    'moderator',
    'viewer',
    'user'
];

function getValueOfRole(role) {
    for (var i = 0; i < enumRole.length; i++) {
        if (enumRole[i] == role) return i;
    }
    return -1;
};

function getTableRole(userrole,userselectrole){
    var x = getValueOfRole(userrole);
    var i = getValueOfRole(userselectrole);
    if( x+1 < i && x+1 < enumRole.length){
      return enumRole.slice(x+1,enumRole.length);
    }
    else return [];
  }

class Group extends Component {

    state= {
        teamid: "",
        groupid: "",
        userrole: "",
        idIndSelect: undefined,
        idUserSelect: undefined,
        userSelect: undefined,
        data: [],
        modal : false,
        modalEdit: false,
        modalView: false,
        modalUserAdd: false,
        modalUserEdit: false,
        stateButtonId: { view: true, add: true, edit: true, delete: true},
        stateButtonUser: { add: true, edit: true, delete: true }
    }

    async getData(){
        if(this.state.teamid !== "" && this.state.teamid !== ""){
          var data = await TeamsManager.getTeamGroup(this.state.teamid, this.state.groupid);
          if(!equal(this.state.data, data)){
              this.setState({data: data}, 
                () => {
                    this.updateStateButtonId();
                    this.updateStateButtonUser();
                });
          }
        }
      }

      onRowSelect(row, isSelected, e) {
        if(this.state.idIndSelect != row._id) this.setState({idIndSelect: row._id}, () => {this.updateStateButtonId()})
      }
    
    onRowSelectUser(row, isSelected, e) {
       // if(this.state.idUserSelect != row.id) this.setState({idUserSelect: row.id}, () => {})
        this.setState({userIdSelect: row.id}, () => {
            this.state.data.users.forEach((user) => {
              if(user.id == this.state.userIdSelect){
                  this.setState({userSelect: user},
                    () => {
                        this.updateStateButtonUser()
                    });
              }
            })
          });
    }

    async componentDidMount(){
        const values = queryString.parse(this.props.location.search)
        if(values.teamid !== undefined && values.groupid !== undefined ){
            if(values.teamid !== this.state.teamid || values.groupid !== this.state.groupid){
                this.setState({teamid: values.teamid, groupid: values.groupid},
                    async () => {
                        await this.getData();
                    })
            }
        } else this.props.history.push('/'); 
      //  if(this.state.userrole !== this.props)
      setInterval(() => {this.getData()},5*60000);
    }

    async toggle(){
        var b = this.state.modal;
        this.setState({modal: !b});
        if(b === true) await this.getData();
      }

      async toggleEdit(){
        var b = this.state.modalEdit;
        this.setState({modalEdit: !b});
        if(b === true) await this.getData();
      }

      async toggleView(){
        var b = this.state.modalView;
        this.setState({modalView: !b});
      }

      async toggleUserAdd(){
        var b = this.state.modalUserAdd;
        this.setState({modalUserAdd: !b});
        if(b === true) await this.getData();
      }

      async toggleUserEdit(){
        var b = this.state.modalUserEdit;
        this.setState({modalUserEdit: !b});
        if(b === true) await this.getData();
      }

      updateStateButtonId(){
          var state = {view: true, add: true, edit: true, delete: true};
          if(this.state.idIndSelect == undefined){
            if(this.state.data.userrole == 'admin' || this.state.data.userrole == 'moderator')state = {view: true, add: false, edit: true, delete: true};
          } else {
            if(this.state.data.userrole == 'admin') state = {view: false, add: false, edit: false, delete: false};
            else if (this.state.data.userrole == 'moderator') state = {view: false, add: false, edit: false, delete: true};
            else if (this.state.data.userrole == 'viewer') state = {view: false, add: true, edit: true, delete: true};
            else state = {view: true, add: true, edit: true, delete: true};
          }
          this.setState({stateButtonId: state});
      }

      updateStateButtonUser(){
          
        var state = {add: true, edit: true, delete: true};
        if(this.state.idUserSelect == undefined){
            if(this.state.data.userrole == 'admin' || this.state.data.userrole == 'moderator')state = {add: false, edit: true, delete: true};
        }
        else {  
            for(var i = 0; i < this.state.data.group.users.length; i++){
                if(this.state.data.group.users[i].id == this.state.idUserSelect){
                    var userrole = this.state.data.group.users[i].role;
                    if(getValueOfRole(userrole) > getValueOfRole(this.state.data.userrole)) {
                        var state = {add: false, edit: false, delete: false};
                    }
                    else var state = {add: false, edit: true, delete: true};
                }
            }
            if(this.state.data.userrole == 'admin' || this.state.data.userrole == 'moderator') state.add = false;
            else state.add = true;
        }
        this.setState({stateButtonUser: state});
      }

  render() {

    const selectRowProp = {
        onSelect: this.onRowSelect.bind(this),
        mode: 'radio'
    };
    
    const selectRowUser = {
        onSelect: this.onRowSelectUser.bind(this),
        mode: 'radio'
    };

    var data = this.state.data.group;
    var datauser = [];
    var teamname = "";
    var groupname = "";

    if(data == undefined) {
        data = [];
        datauser = []
    }
    else {
        data = this.state.data.group.identifiants;
        datauser = this.state.data.group.users;
        teamname = this.state.data.name;
        groupname = this.state.data.group.name;
    }

    var roleEdit = []; 
    if(this.state.data.userrole != undefined && this.state.userSelect != undefined){
        roleEdit = getTableRole(this.state.data.userrole,this.state.userSelect.role); 
    }

    return (

          <div className="animated fadeIn mt-3">
              <strong><h2>Team name : {teamname} - Group name : {groupname}</h2></strong>
        <Card>
            <CardHeader>
            <strong><h2>Identifiant of group </h2></strong>
            </CardHeader>
            <CardBody>
                    <ButtonToolbar className="mb-3">
                <ButtonGroup className="mr-2">
                    <Button disabled={this.state.stateButtonId.view} onClick={this.toggleView.bind(this)} color="primary" > View </Button>
                    <Button disabled={this.state.stateButtonId.add} onClick={this.toggle.bind(this)} color="primary" > Add </Button>
                    <Button disabled={this.state.stateButtonId.edit} onClick={this.toggleEdit.bind(this)} color="primary" >Edit </Button>
                    <Button disabled={this.state.stateButtonId.delete} color="primary"> Delete </Button>
                </ButtonGroup>    
            </ButtonToolbar>

            <BootstrapTable data={data} selectRow={selectRowProp} version="4">
                <TableHeaderColumn hidden dataField='_id' isKey>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField='username'>Username</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
                <TableHeaderColumn dataField='url'>Url</TableHeaderColumn>
            </BootstrapTable>

            <IdentifiantAdd modal={this.state.modal} callback={this.toggle.bind(this)} teamId={this.state.teamid} groupId={this.state.groupid}></IdentifiantAdd>
            <IdentifiantEdit modal={this.state.modalEdit} callback={this.toggleEdit.bind(this)} teamId={this.state.teamid} groupId={this.state.groupid} identifiant={data} identifiantid={this.state.idIndSelect}></IdentifiantEdit>
            <IdentifiantView modal={this.state.modalView} callback={this.toggleView.bind(this)} identifiant={data} identifiantid={this.state.idIndSelect} ></IdentifiantView>
            
            </CardBody>
        </Card>
          
        <Card>
            <CardHeader>
            <strong><h2>User of group</h2></strong>
            </CardHeader>
            <CardBody>
                            <ButtonToolbar className="mb-3">
                        <ButtonGroup className="mr-2">
                            <Button disabled={this.state.stateButtonUser.add} onClick={this.toggleUserAdd.bind(this)} color="primary"> Add </Button>
                            <Button disabled={this.state.stateButtonUser.edit} color="primary"> Edit </Button>
                            <Button disabled={this.state.stateButtonUser.delete} color="primary"> Delete </Button>
                        </ButtonGroup>    
                    </ButtonToolbar>

                    <BootstrapTable data={datauser} selectRow={selectRowUser} version="4">
                        <TableHeaderColumn hidden dataField='id' isKey>Product ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>Username</TableHeaderColumn>
                        <TableHeaderColumn dataField='role'>Role</TableHeaderColumn>
                    </BootstrapTable>
            </CardBody>
        </Card>

        <UserAdd modal={this.state.modalUserAdd} callback={this.toggleUserAdd.bind(this)} teamId={this.state.teamid} groupId={this.state.groupid}></UserAdd>
        <UserEdit roleTab={roleEdit} modal={this.state.modalUserEdit} callback={this.toggleUserEdit.bind(this)} teamId={this.state.teamid} groupId={this.state.groupid} userId={this.state.userIdSelect} ></UserEdit>
          </div>

    );
  }
}

export default withRouter(Group);
