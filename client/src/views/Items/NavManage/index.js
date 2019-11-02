import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import {
Button,
ButtonGroup,
ButtonToolbar,
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

const NavManage = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const [idSelect, setIdSelect] = useState(undefined);
  const [dataSelect, setDataSelect] = useState({});
  const [modal, setModal] = useState(false);
  const history = props.history;
  //const toggle = () => setIsOpen(!isOpen);
  const toggle = () => setModal(!modal);

  const handleView = () => {

  };

  const handleEdit = () => {

  };

  const handleAdd = () => {

  };

  useEffect(() => {
      if(idSelect != props.idSelect){
        setIdSelect(props.idSelect);
        console.log("Nav component "+props.idSelect);
      }
      if(dataSelect != props.dataSelect){
        setDataSelect(props.dataSelect);
        console.log(dataSelect);
      }
  });

  return (
    <div>
        <ButtonToolbar className="mb-3">
                  <ButtonGroup className="mr-2">
                    <Button>View</Button>
                    <Button onClick={toggle}>Add</Button>
                    <Modal isOpen={modal} toggle={toggle} >
                        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                        <ModalBody>
                        <Row>
            <Col xs="12" >
              <Card>
                <CardHeader>
                  <strong>Group</strong>
                  <small> Form</small>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" placeholder="Enter group name" required />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <Input type="text" id="description" placeholder="Enter group description" required />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                  </ButtonGroup>
        </ButtonToolbar>

        <p>{idSelect}</p>
    </div>
  );
}

export default withRouter(NavManage);