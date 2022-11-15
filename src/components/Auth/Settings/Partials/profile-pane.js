import React from 'react'
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { AmplifyLoadingSpinner } from '@aws-amplify/ui-react';
import { Container, Row, Col, ListGroup, Tab, Form, Button, Alert }
    from 'react-bootstrap';


const initialFormState = { name: '', lastname: '', OPassword: '', NPassword: '', CPassword: '' }

const Profile = () => {
    const [hideLightbox, setHideLightbox] = useState(true);
    const [hideLightbox1, setHideLightbox1] = useState(true);
    const [hideLightbox2, setHideLightbox2] = useState(true);
    const [alertpass, setHideAPass] = useState(true);
    const [formData, setFormData] = useState(initialFormState);
    let [state, setState] = useState(null);

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

    async function handleProfileSubmit(event) {

        if (!formData.name || !formData.lastname) {
            alert("Not validated: blank fields")
            return;
        }
        else {
            event.preventDefault();
            let user = await Auth.currentAuthenticatedUser();
            let result = await Auth.updateUserAttributes(user, {
                'given_name': formData.name,
                'family_name': formData.lastname
            });
            console.log(result);
            window.location.reload();
        }
    }

    async function handleChangePass(event) {

        event.preventDefault();

        if (formData.OPassword !== '' && formData.NPassword === formData.CPassword) {
            try {
                const currentUser = await Auth.currentAuthenticatedUser();
                await Auth.changePassword(
                    currentUser,
                    formData.OPassword,
                    formData.NPassword
                );

                window.alert('Password Change Success');
                window.location.reload();

            } catch (err) {
                window.alert(err);
            }
        }
        else {
            setHideAPass(false);
        }
    }


    if (!state) return <AmplifyLoadingSpinner />

    return (
        <Tab.Pane eventKey="User">
            <Container>
                <div className='profile-list'>
                    <ListGroup>
                        <ListGroup.Item>
                            <Form onSubmit={handleProfileSubmit}>
                                <Row className="justify-content-md-center">
                                    <Col md="3 text-left"><b>Username</b> <p>{format(JSON.stringify(state["username"]))}</p></Col>
                                    <Col md="6 text-center"><b>Given Name</b>
                                        <br />
                                        <p>{(JSON.stringify(state["attributes"]["given_name"])) ?
                                            format(JSON.stringify(state["attributes"]["given_name"]))
                                            :
                                            "Not Captured"
                                        }
                                            {" "}
                                            {(JSON.stringify(state["attributes"]["family_name"])) ?
                                                format(JSON.stringify(state["attributes"]["family_name"]))
                                                :
                                                ""
                                            }
                                        </p>
                                    </Col>
                                    <Col md="2 text-right"><a href="#User" onClick={() => setHideLightbox(false)}>Edit</a></Col>
                                </Row>
                                <div className={`${hideLightbox ? "hide-lightbox" : "lightbox"}`}>
                                    <Row className="justify-content-md-center username-edit">
                                        <Col md={2} lg={4} />
                                        <Col md="8" lg={4}>
                                            <Form.Label><h5>Edit Name</h5></Form.Label>
                                            <Form.Control type="text" value={formData.name} name="name" id="name"
                                                placeholder={(JSON.stringify(state["attributes"]["family_name"])) ?
                                                    "current: " + format(JSON.stringify(state["attributes"]["given_name"])) +" *"
                                                    :
                                                    "Undefined *"}
                                                onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                                            />
                                            <br />
                                            <Form.Control type="text" value={formData.lastname} name="lastname" id="lastname"
                                                placeholder={(JSON.stringify(state["attributes"]["given_name"])) ?
                                                    "current: " + format(JSON.stringify(state["attributes"]["family_name"]))+" *"
                                                    :
                                                    "Undefined *"}
                                                onChange={e => setFormData({ ...formData, 'lastname': e.target.value })}
                                            />
                                            <br />
                                            <Button variant="dark" onClick={() => setHideLightbox(true)}>Close</Button>{' '}
                                            <Button variant="info" type="submit">Submit</Button>

                                        </Col>
                                        <Col md={2} lg={4} />
                                    </Row>
                                </div>
                            </Form>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Form>
                                <Row className="justify-content-md-center">
                                    <Col md="3 text-left">Email</Col>
                                    <Col md="6 text-center">{format(JSON.stringify(state["attributes"]["email"]))}</Col>
                                    <Col md="2 text-right"><a href="#User" onClick={() => setHideLightbox1(false)}>Edit</a></Col>
                                </Row>
                                <div className={`${hideLightbox1 ? "hide-lightbox1" : "lightbox1"}`}>
                                    <Row className="justify-content-md-center username-edit">
                                        <Col md={2} lg={4} />
                                        <Col md="8" lg={4}>
                                            <Form.Label><h5>Edit Email</h5></Form.Label>
                                            <Form.Control type="text" placeholder="Type a new count email" />
                                            <br />
                                            <Button variant="dark" onClick={() => setHideLightbox1(true)}>Close</Button>{' '}
                                            <Button variant="info" disabled>Submit</Button>
                                        </Col>
                                        <Col md={2} lg={4} />
                                    </Row>
                                </div>
                            </Form>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Form onSubmit={handleChangePass}>
                                <Row className="justify-content-md-center">
                                    <Col md="3 text-left">Password</Col>
                                    <Col md="6 text-center">***********</Col>
                                    <Col md="2 text-right"><a href="#User" onClick={() => setHideLightbox2(false)}>Edit</a></Col>
                                </Row>
                                <div className={`${hideLightbox2 ? "hide-lightbox2" : "lightbox2"}`}>
                                    <Row className="justify-content-md-center username-edit">
                                        <Col md={2} lg={4} />
                                        <Col md="8" lg={4}>
                                            <br />
                                            <Form.Label><h5>To Change Password</h5></Form.Label>
                                            <br />
                                            <Form.Control type="Password" name="OPassword"
                                                value={formData.OPassword} placeholder="Type a old password"
                                                onChange={e => setFormData({ ...formData, 'OPassword': e.target.value })}
                                                required />
                                            <br />
                                            <Form.Label><h6>New Password</h6></Form.Label>
                                            <Form.Control type="Password" name="NPassword"
                                                value={formData.NPassword} placeholder="Type a new password"
                                                onChange={e => setFormData({ ...formData, 'NPassword': e.target.value })}
                                                required />
                                            <br />
                                            <Form.Label><h6>Confirm the new Password</h6></Form.Label>
                                            <Form.Control type="Password" name="CPassword"
                                                value={formData.CPassword} placeholder="Confirm the password"
                                                onChange={e => setFormData({ ...formData, 'CPassword': e.target.value })}
                                                required />
                                            <br />
                                            <Alert className={`${alertpass ?
                                                "hide-alertpass"
                                                :
                                                "alertpass"}`}
                                                variant="danger">
                                                Password don't match
                                            </Alert>
                                            <br />
                                            <Button variant="dark" onClick={() => setHideLightbox2(true)}>Close</Button>{' '}
                                            <Button variant="info" type="submit">Submit</Button>
                                        </Col>
                                        <Col md={2} lg={4} />
                                    </Row>
                                </div>
                            </Form>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </Container>
        </Tab.Pane>
    )
}


export default Profile;