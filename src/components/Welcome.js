import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../logo.svg';
import './Welcome.css'


class Welcome extends Component {

  render() {

    return (
      <div className="Welcome">
        <Container>
          <Row>
            <Col md={3} />
            <Col md={6} className="text-center">
              <img src={logo} className="img-welcome" alt="logo" />
              <p className='text-welcome'>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="text-welcome"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </Col>
            <Col md={3} />
          </Row>
        </Container>
      </div>
    )
  }
}


export default Welcome