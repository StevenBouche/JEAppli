import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Label } from 'reactstrap';
import {withRouter} from 'react-router-dom';
import equal from 'deep-equal';

class ElementCard extends Component {

    state = {
        dataCard: {},
        idCard: undefined,
        classCard: "",
        item : undefined
    }

    getId(){
        return this.state.dataCard.key;
    }

    changeElementCard = (value) => {
        this.setState({
            classCard: this.props.classCard
        });
    }

    updateDataCard(){
        this.setState({dataCard: this.props.dataCard});
    }

    constructor(props){
        super(props);
        this.index = props.index;
        this.callback = props.callback;
        this.state.dataCard = props.dataCard;
    }

     componentDidUpdate() {
        const { classCard } = this.props;
        if (this.state.classCard !== classCard) this.changeElementCard(classCard);
        const {dataCard} = this.props;
        if(!equal(this.state.dataCard,dataCard)) this.setState({dataCard: this.props.dataCard});
      }

    setRedirect = () => {
        this.props.history.push(this.redirectPath);
    }

    handleClickCard(){
        
    }

    render(){


                /*
descitem: "Desc"
key: "5db41fa83a8e232ed4ceaefe"
nameitem: "FirstssUpdate"
redirectPath: "/team/5db41fa83a8e232ed4ceaefe"
userrole: "viewer"
*/


        return ( 
                    <Col xs="12" sm="6" md="4" lg="3" >    
                     
                    <Card onClick={() => this.callback(this.index,this.getId())} className={this.state.classCard} >
                      <CardHeader>
                          <Row>
                              <Col xs="12" className="d-flex align-items-center"> 
                                <strong>{ this.state.dataCard.nameitem }</strong>
                              </Col>
                          </Row>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col xs="12">
                              <Label><strong>Description</strong></Label>
                              <p>{ this.state.dataCard.descitem }</p>
                          </Col>
                          <Col xs="12">
                              <Label><strong>Role</strong></Label>
                              <p>{ this.state.dataCard.userrole }</p>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
              
        );
    }
}

export default withRouter(ElementCard);