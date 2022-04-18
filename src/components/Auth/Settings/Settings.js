import React from 'react'
import { useEffect, useState, Component } from 'react'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Container, Row, Col, Tab, Button, Nav }
  from 'react-bootstrap';
import './Settings.css';
import { render } from '@testing-library/react';


class Settings extends Component {
  render() {
    return (
      <div className='settings'>
        <Container fluid>
          <br />
          <Row>
            <Col></Col>
            <Col><h2>Settings</h2></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <Tab.Container id="left-tabs-example" defaultActiveKey="bussiness">
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="bussiness">Bussiness Info</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="User">User Settings</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="Social">Social Network</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col className="settings-col-tab" sm={9}>
                    <div className='settings-content'>
                      <Tab.Content>
                        <Tab.Pane eventKey="bussiness">
                          <Container>
                            <Row>
                              <Col sm={8}>
                                <p>Bussiness</p>
                              </Col>
                            </Row>
                          </Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="User">
                          <Container>
                            <Row>
                              <Col sm={8}>
                                <p>User Info</p>
                              </Col>
                            </Row>
                          </Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Social">
                          <Container>
                            <Row>
                              <Col sm={8}>
                                <p>Social Network</p>
                              </Col>
                            </Row>
                          </Container>
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>
        </Container>


      </div>
    );
  }

}


export default withAuthenticator(Settings);