import React, { Component } from 'react'
import "./Policy.css"
import { Auth } from 'aws-amplify';
import { Col, Container, Row, Button } from 'react-bootstrap';


export default class Policy extends Component {

    handleLogOut = async event => {
        event.preventDefault();
        try {
            Auth.signOut();
            this.props.auth.setAuthStatus(false);
            this.props.auth.setUser(null);
        } catch (error) {
            console.log(error.message)
        }

    }

    render() {
        return (
            <div className="policy">
                <Container>
                    <br />
                    <Row>
                        <Col md={2} />
                        <Col md={8} className="policy-content">
                            <iframe src="https://bootstrapreacte06b1a36ef0c43d083041afe7c754fd9225637-dev.s3.amazonaws.com/termly.html" width='102%' height='100%' />
                        </Col>
                        <Col md={2} />
                    </Row>
                    <br />
                    <Row>
                        <Col md={2} />
                        <Col className="text-right" md={8}>
                            {!this.props.auth.isAuthenticated && (
                                <Button variant="primary" href="/">Go back</Button>
                            )}
                            {this.props.auth.isAuthenticated && (
                                <Button variant="primary" href="/Signup">Go back</Button>
                            )}
                        </Col>
                        <Col md={2} />
                    </Row>
                </Container>
            </div>

        )
    }
}