import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import TeamsManager from '../../service/team/TeamsManager';
import ElementGroup from '../Items/ElementCard/ElementGroup'
import TeamsForm from './TeamsForm'
import TeamsFormEdit from './TeamsFormEdit'
import equal from 'deep-equal';
import {Card, CardHeader, CardBody } from 'reactstrap';

class Teams extends Component {

  state = { 
    data: [], 
    modal: false,
    modalEdit: false,
    teamData: {}
  };

  async getData(){
    var data = await TeamsManager.getTeams();
    if(!equal(this.state.data,data)){
        this.setState({data: data});
    }
  }

  async componentDidMount() {
    await this.getData();
    setInterval(() => {this.getData()},5*60000);
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

  updateTeamData(data){
    this.setState({teamData: data});
  }

  render ()  {

    var items = [];
    var data = this.state.data;

    for(var i = 0; i < data.length; i++){
      var redirectPath = "/team/"+data[i]._id;
        items.push({
          key: data[i]._id,
          nameitem: data[i].name,
          descitem: data[i].description,
          redirectPath: redirectPath,
          userrole: data[i].userrole 
        });
    }

    return (
      <div className="animated fadeIn mt-3">
        <Card>
            <CardHeader>
            <strong><h2>Your team</h2></strong>
            </CardHeader>
            <CardBody>
              
      <ElementGroup callbackDataSelect={this.updateTeamData.bind(this)} dataElement={items} callback={this.toggle.bind(this)} callbackEdit={this.toggleEdit.bind(this)}> </ElementGroup>
       <TeamsForm modal={this.state.modal} callback={this.toggle.bind(this)}></TeamsForm>
      <TeamsFormEdit modal={this.state.modalEdit} callback={this.toggleEdit.bind(this)} teamData={this.state.teamData}></TeamsFormEdit>
 
            </CardBody>
          </Card>
      </div>
    );
  }
}

export default withRouter(Teams);
