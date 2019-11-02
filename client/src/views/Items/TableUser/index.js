import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Input, Pagination, PaginationItem, PaginationLink, Badge, Table  } from 'reactstrap';
import {withRouter} from 'react-router-dom';

class TableUser extends Component {

    constructor(props){
        super(props);
        this.data = props.data;
    }

    setRedirect = () => {
        this.props.history.push(this.redirectPath);
    }

    render(){
        return (
            <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Combined All Table
                </CardHeader>
                <CardBody>
                  <Table hover bordered striped responsive size="sm">
                    <thead>
                    <tr>

                      <th>Username</th>
                      <th>Date registered</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td><Input type="radio" name="radio1" /></td>
                      <td>Vishnu Serghei</td>
                      <td>2012/01/01</td>
                      <td>Member</td>
                      <td>
                        <Badge color="success">Active</Badge>
                      </td>
                    </tr>
                    <tr>
                     <td><Input type="radio" name="radio1" /></td>
                      <td>Zbyněk Phoibos</td>
                      <td>2012/02/01</td>
                      <td>Staff</td>
                      <td>
                        <Badge color="danger">Banned</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td><Input type="radio" name="radio1" /></td>
                      <td>Einar Randall</td>
                      <td>2012/02/01</td>
                      <td>Admin</td>
                      <td>
                        <Badge color="secondary">Inactive</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td><Input type="radio" name="radio1" /></td>
                      <td>Félix Troels</td>
                      <td>2012/03/01</td>
                      <td>Member</td>
                      <td>
                        <Badge color="warning">Pending</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td><Input type="radio" name="radio1" /></td>
                      <td>Aulus Agmundr</td>
                      <td>2012/01/21</td>
                      <td>Staff</td>
                      <td>
                        <Badge color="success">Active</Badge>
                      </td>
                    </tr>
                    </tbody>
                  </Table>
                  <nav>
                    
                  </nav>
                </CardBody>
              </Card>
            </Col>
          </Row>
        );
    }
}

export default withRouter(TableUser);