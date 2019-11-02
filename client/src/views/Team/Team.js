import React, { Component } from 'react';
import ElementGroup from '../Items/ElementCard/ElementGroup';
import TeamsManager from '../../service/team/TeamsManager';
import GroupFormAdd from './GroupFormAdd'
import equal from 'deep-equal';
import GroupeFormEdit from './GroupeFormEdit'
import UserAdd from './UserAdd'
import {Button, ButtonToolbar, ButtonGroup, Card, CardHeader, CardBody } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import UserEdit from './UserEdit'

//TODO passez en import
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

class Team extends Component {

  state = {
    id: undefined,
    groupData: {},
    data: [], 
    modalEdit: false,
    modal: false,
    modalUserAdd: false,
    modalUserEdit: false,
    stateOfButtonUser : { add: true, edit: true, delete: true },
    userIdSelect: undefined, 
    userSelect: undefined
  }

  constructor(props){
    super(props);
     //
  }

  setId (idT) {
     this.setState({
      id: idT
    })
  }

  getId = () => {
    return this.state.id;
  }

  async getData(){

    if(this.state.id !== undefined){
      var data = await TeamsManager.getGroupTeam(this.state.id);
      if(!equal(this.state.data, data)){
    //    console.log(data)
          this.setState({data: data}, () => {
            this.stateOfButtonUser();
          });
      }
    }
  }

  async componentDidMount(){
    var id = this.props.match.params.id;
    if(this.state.id !== id) {
      this.setState({id: id}, async () => {
        await this.getData()
      });
    }
    setInterval(() => {this.getData()},5*60000);
  }

  async componentDidUpdate(){
    var id = this.props.match.params.id;
    if(this.state.id !== id) {
      this.setState({id: id}, async () => {await this.getData()});
    }
  }

  updateGroupData(data){
    this.setState({groupData: data});
  }

  async toggle(){
    var b = this.state.modal;
    this.setState({modal: !b});
    if(b === true) await this.getData();
  }

  async toggleEdit(){
    var b = false;
    b = this.state.modalEdit;
    this.setState({modalEdit: !b});
    if(b === true) await this.getData();
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

  onRowSelectUser(row, isSelected, e) {
   // console.log(row.id)
    this.setState({userIdSelect: row.id}, () => {
      this.state.data.users.forEach((user) => {
        if(user.id == this.state.userIdSelect){
            this.setState({userSelect: user},
              () => {
                this.stateOfButtonUser()
              });
        }
      })
    });
  }

  stateOfButtonUser(){
    var state = { add: true, edit: true, delete: true };
   // console.log(this.state.data.userrole)
  //  console.log(this.state.userIdSelect)
  //  console.log(this.state.userSelect)
    if(this.state.userSelect !== undefined){
       var i = getValueOfRole(this.state.data.userrole);
       var x = getValueOfRole(this.state.userSelect.role);
       if( i < x) { state.edit = false; state.delete = false; }
    }

    if(this.state.data.userrole == 'admin' || this.state.data.userrole == 'moderator') {
      state.add = false;
    }

    if(!equal(this.state.stateOfButtonUser, state)) {
      this.setState({stateOfButtonUser: state});
    }

  }

  render() {

   
/*

         
<ElementGroup ></ElementGroup>
*/
    var items = [];
    var data = this.state.data.groups;
    var datauser = [];

    if(data !== undefined) {
      for(var i = 0; i < data.length; i++){
        var redirectPath = "/group?teamid="+this.state.data._id+"&groupid="+data[i]._id;
          items.push({
            key: data[i]._id,
            nameitem: data[i].name,
            descitem: data[i].description,
            redirectPath: redirectPath,
            userrole: data[i].userrole 
          });
      }
    }

    if(this.state.data.users !== undefined){
      datauser = this.state.data.users;
    }

    var roleEdit = []; 
    if(this.state.data.userrole != undefined && this.state.userSelect != undefined){
        roleEdit = getTableRole(this.state.data.userrole,this.state.userSelect.role); 
    }
   
    const selectRowUser = {
      onSelect: this.onRowSelectUser.bind(this),
      mode: 'radio'
    };

    return (

          <div className="animated fadeIn mt-3">

          <strong><h2>Team name : {this.state.data.name}</h2></strong>
          <Card>
            <CardHeader>
            <strong><h2>Groups of team</h2></strong>
            </CardHeader>
            <CardBody>

            <ElementGroup 
                callbackDataSelect={this.updateGroupData.bind(this)} 
                dataElement={items} 
                callback={this.toggle.bind(this)} 
                callbackEdit={this.toggleEdit.bind(this)}
                userrole={this.state.data.userrole}
                > 
                
          </ElementGroup>

          <GroupFormAdd modal={this.state.modal} callback={this.toggle.bind(this)} teamId={this.state.id}></GroupFormAdd>
          <GroupeFormEdit modal={this.state.modalEdit} callback={this.toggleEdit.bind(this)} groupData={this.state.groupData} teamid={this.state.id}></GroupeFormEdit>

          </CardBody>
          </Card>
          
          <Card>
            <CardHeader>
            <strong><h2>User of team</h2></strong>
            </CardHeader>
            <CardBody>
                            <ButtonToolbar className="mb-3">
                        <ButtonGroup className="mr-2">
                            <Button  disabled={this.state.stateOfButtonUser.add} color="primary" onClick={this.toggleUserAdd.bind(this)}> Add </Button>
                            <Button  disabled={this.state.stateOfButtonUser.edit} color="primary" onClick={this.toggleUserEdit.bind(this)}> Edit </Button>
                            <Button  disabled={this.state.stateOfButtonUser.delete} color="primary"> Delete </Button>
                        </ButtonGroup>    
                    </ButtonToolbar>

                    <BootstrapTable data={datauser} selectRow={selectRowUser} version="4">
                        <TableHeaderColumn hidden dataField='id' isKey>Product ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>Username</TableHeaderColumn>
                        <TableHeaderColumn dataField='role'>Role</TableHeaderColumn>
                    </BootstrapTable>
            </CardBody>

            <UserAdd modal={this.state.modalUserAdd} callback={this.toggleUserAdd.bind(this)} teamId={this.state.id}></UserAdd>
            <UserEdit roleTab={roleEdit} modal={this.state.modalUserEdit} callback={this.toggleUserEdit.bind(this)} teamId={this.state.id} userId={this.state.userIdSelect} ></UserEdit>
        </Card>

         
          </div>


          
    
    );
  }
}

export default Team;
