import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './About.css'

const About = () => {
  return (
    <div className='About'>
      <br />
      <Container>
        <Row>
          <Col md={3} />
          <Col md={6}>
            <h3 className='title-about'>About:</h3>
            <p className='text-about'>This a site where you can manage your social media.</p>
          </Col>
          <Col md={3} />
        </Row>
      </Container>

    </div>
  )
};


export default About