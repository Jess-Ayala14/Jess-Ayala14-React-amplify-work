import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './About.css';

const About = () => {

  const aboutStyle = {
    backgroundImage:
      "url('/about.jpg')",
    height: '100vh',
    marginTop: '-70px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };


  return (
    <div className='About' style={aboutStyle}>
      <br />
      <Container className='about'>
        <Row>
          <Col md={2} lg={3} />
          <Col md={8} lg={6}>
            <h3 className='title-about'>About Ali-Media:</h3>
            <p className='text-about text-justify'>
              This a site where you can manage your social media.
              Are you tired of changing from one app to another or
              jumping from one tag to another? Ali-Media-Tools is
              here to help you and give you the opportunity to save
              time, using social media in your business publications
              and adding the functions of them that you use in your
              routine.
            </p>

            <p className='text-about text-justify'>
              The All-in-one for Social Media as a toolbox, was the initial
              idea, to make better control of the products posted by businesses
              and help to get better gains.
            </p>
          </Col>
          <Col md={2} lg={3} />
        </Row>
      </Container>

    </div>
  )
};


export default About