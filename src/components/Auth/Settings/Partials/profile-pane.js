import React from 'react'
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { AmplifyLoadingSpinner } from '@aws-amplify/ui-react';
import { Container, Row, Col, ListGroup, Tab, Form, Button }
    from 'react-bootstrap';


const Profile = () => {
    const [hideLightbox, setHideLightbox] = useState(true);
    const [hideLightbox1, setHideLightbox1] = useState(true);
    let [state, setState] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const response = await Auth.currentAuthenticatedUser()
                setState(response)
            } catch (err) {
                console.error(err)
                setState(null)
            }
        })()
    }, [])

    const format = (variable) => {
        var data = variable
        data = data.split('"');
        data = data[1]
        return (data)
    }


    if (!state) return <AmplifyLoadingSpinner />
    return (
        <Tab.Pane eventKey="User">
            <Container>
                <div className='profile-list'>
                    <ListGroup>
                        <ListGroup.Item>
                            <Form >
                                <div>
                                    <Row className="justify-content-md-center">
                                        <Col md="3 text-left">Username</Col>
                                        <Col md="6 text-center"><p>{format(JSON.stringify(state["username"]))}</p></Col>
                                        <Col md="2 text-right"><a href="#User" onClick={() => setHideLightbox(false)}>Edit</a></Col>
                                    </Row>
                                </div>
                                <div className={`${hideLightbox ? "hide-lightbox" : "ligthbox"}`}>
                                    <Row className="justify-content-md-center username-edit">
                                        <Col md="6 text-left">
                                            <Form.Label><h5>Edit Username</h5></Form.Label>
                                            <Form.Control type="text" name="username"  id="username" placeholder={"current: " + format(JSON.stringify(state["username"]))} defaultValue="" />
                                            <br />
                                            <Button variant="light" type="submit">Submit</Button>
                                            <Button variant="dark" onClick={() => setHideLightbox(true)}>Close</Button>{' '}
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Form>
                                <div>
                                    <Row className="justify-content-md-center">
                                        <Col md="3 text-left">Email</Col>
                                        <Col md="6 text-center">{format(JSON.stringify(state["attributes"]["email"]))}</Col>
                                        <Col md="2 text-right"><a href="#User" onClick={() => setHideLightbox1(false)}>Edit</a></Col>
                                    </Row>
                                </div>
                                <div className={`${hideLightbox1 ? "hide-lightbox" : "ligthbox"}`}>
                                    <Row className="justify-content-md-center username-edit">
                                        <Col md="6 text-left">
                                            <Form.Label><h5>Edit Email</h5></Form.Label>
                                            <Form.Control type="text" placeholder="Type a new username" />
                                            <br />
                                            <Button variant="light">Submit</Button>
                                            <Button variant="dark" onClick={() => setHideLightbox1(true)}>Close</Button>{' '}
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row className="justify-content-md-center">
                                <Col md="3 text-left">Password</Col>
                                <Col md="6 text-center">***********</Col>
                                <Col md="2 text-right"><a href="#User">Edit</a></Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </Container>
        </Tab.Pane>
    )
}


export default Profile;