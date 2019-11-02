import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import ElementCard from '.';
import equal from 'deep-equal';

import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Row,
  } from 'reactstrap';

class ElementGroup extends Component {

    state = {
      teamid: undefined,
      teamUserRole: undefined,
      indexSelect: undefined,
      idSelect: undefined,
      dataSelect: {},
      dataElement: [],
      callbackModalAdd: undefined,
      callbackModalEdit: undefined,
      stateButton: {
        view: true,
        edit: true,
        add: true,
        delete: true
      },
      modal: false,
      classCard: '',
      elements: {
        callback: undefined,
        items: []
      }
    };
    
    constructor(props){
        super(props);
        this.items = [];
        this.itemsRef = [];
        this.state.modal = false;
        this.state.callbackModalAdd = props.callback;
        this.callbackDataSelect = props.callbackDataSelect;
        this.callbackEdit = props.callbackEdit;
    }

    notifyIdSelect(index,id){
      if(this.state.indexSelect === index && this.state.idSelect === id) {
        this.setState({indexSelect: undefined, idSelect: undefined},
          () => { 
            /*this.callbackDataSelect(this.state.dataSelect)*/
            this.updateDataselect();
            ;});
      }
      else {
        this.setState({indexSelect: index, idSelect: id},
          () => {
        //    this.callbackDataSelect(this.state.dataSelect); 
          //  this.stateOfButton();
            this.updateDataselect();
          })
      }
     
    }

    updateDataselect(){
      var data = this.state.dataElement;
      var dataelem = data[this.state.indexSelect]
      if(!equal(dataelem,this.state.dataSelect)){
        this.setState({dataSelect: dataelem},
          () => {
            this.stateOfButton();
            this.callbackDataSelect(this.state.dataSelect);
          });
      }
    }

    componentDidMount(){
      var state = {view: true, edit: true, add: false, delete: true};
      this.setState({stateButton: state});
    }

    componentDidUpdate(){
      const { dataElement } = this.props;
        if (!equal(this.state.dataElement,dataElement)) {
        //  console.log("CONTEXT have change")
          this.setState(
            {dataElement: this.props.dataElement},  
            () => { this.updateDataselect();}
          );
        }
        const {userrole } = this.props;
        if(this.state.teamUserRole !== userrole) {
          this.setState({teamUserRole: userrole}, this.stateOfButton());
        }
    }

  handleView(){
   // console.log(this.state.dataSelect.redirectPath);
    this.props.history.push(this.state.dataSelect.redirectPath);
  }

  stateOfButton(){
    var state = {view: true, edit: true, add: true, delete: true};
      if(this.state.teamUserRole !== undefined){
        if(this.state.teamUserRole === 'admin') state = {view: false, edit: false, add:false, delete: false};
        else if(this.state.teamUserRole === 'moderator')state = {view: false, edit: false, add:false, delete: true};
        else {
          if(this.state.dataSelect !== undefined && this.state.teamUserRole === 'viewer'){
            if(this.state.dataSelect.userrole === 'admin') state = {view: false, edit: false, add:true, delete: false};
            else if(this.state.dataSelect.userrole === 'moderator') state = {view: false, edit: false, add:true, delete: true};
            else if (this.state.dataSelect.userrole === 'viewer') state = {view: false, edit: true, add: true, delete: true};
            else state = {view: true, edit: true, add: true, delete: true};
          } else state = {view: true, edit: true, add: true, delete: true};
        }
      } else {
        if(this.state.dataSelect !== undefined){
            if(this.state.dataSelect.userrole === 'admin') state = {view: false, edit: false, add:false, delete: false};
            else if(this.state.dataSelect.userrole === 'moderator') state = {view: false, edit: false, add:false, delete: true};
            else if (this.state.dataSelect.userrole === 'viewer') state = {view: false, edit: true, add: false, delete: true};
            else state = {view: true, edit: true, add: false, delete: true};
        } else state = {view: true, edit: true, add: false, delete: true};
      }
     // this.state.stateButton = state;
   //  console.log(state)
      this.setState({stateButton: state});
  }

  render() {

    var data = this.state.dataElement;
    var items = [];
   
    if (data !== undefined){
      for(var i = 0; i < data.length ; i++){
     
        if(i === this.state.indexSelect) items[i] = <ElementCard 
                                                      dataCard={data[i]} 
                                                      callback={this.notifyIdSelect.bind(this)} 
                                                      classCard='card-accent-primary' 
                                                      key={i} 
                                                      index={i}
                                                      ></ElementCard>;
        else items[i] = <ElementCard 
                            dataCard={data[i]} 
                            callback={this.notifyIdSelect.bind(this)} 
                            classCard='' 
                            key={i} 
                            index={i}
                            ></ElementCard>;
      }
    }

    
    
    return (
      <div className="animated fadeIn">
     
        <ButtonToolbar className="mb-3">
                  <ButtonGroup className="mr-2">
                    <Button 
                     disabled={this.state.stateButton.view} 
                      color="primary" 
                      onClick={this.handleView.bind(this)}>
                        View
                    </Button>

                    <Button 
                       disabled={this.state.stateButton.add} 
                      color="primary" 
                      onClick={this.state.callbackModalAdd}>
                        Add
                    </Button>

                    <Button 
                      disabled={this.state.stateButton.edit} 
                      color="primary" 
                      onClick={this.callbackEdit}>
                        Edit
                    </Button>

                    <Button
                      color="primary"
                      disabled={this.state.stateButton.delete} 
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
        </ButtonToolbar>

          <Row>
            {items}
          </Row>
      </div>
    );
  }
}

export default withRouter(ElementGroup);
