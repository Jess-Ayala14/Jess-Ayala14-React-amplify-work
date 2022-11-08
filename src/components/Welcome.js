import React, { Component } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Welcome.css';
import logo_site from '../storage/logo.png'


class Welcome extends Component {

  render() {

    const welcomeStyle = {
      backgroundImage:
        "url('/welcome.jpg')",
      height: '100vh',
      marginTop: '-70px',
      backgroundPosition: '50%',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };

    return (
      <div className="Welcome" style={welcomeStyle}>
        <Container>
          <Row>
            <Col xs={2} md={3} lg={4} />
            <Col xs={8} md={6} lg={4} className="center">
              <h3 className="title-welcome">Welcome to Ali-Media</h3>
              <br />
              <img src={logo_site} />
              <br />
              <Card className='card-welcome'>
                <Card.Body className='center'>
                  <Card.Text className='text-welcome'>
                    The All-in-One social media Toolbox
                  </Card.Text>
                  <Button href='/Signup' variant="primary">Sing Up</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={2} md={3} lg={4} />
          </Row>
        </Container>
      </div>
    )
  }
}


export default Welcome