import { useEffect, useState, Component } from 'react'
import Files from './Partials/Files';
import Posted from './Partials/Posted';
import Drafts from './Partials/Drafts';
import { Auth } from 'aws-amplify';
import { AmplifyLoadingSpinner, AmplifySignOut } from '@aws-amplify/ui-react'
import { Container, Row, Col, Tab, Button, Nav }
    from 'react-bootstrap';
import './Home.css';
import { AmplifyUsernameField, withAuthenticator } from '@aws-amplify/ui-react';

const Home = () => {

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
        <div className='profile' >
            <br/>
            <Container>
                <Row>
                    <Col>
                        <p> Hello {format(JSON.stringify(state["username"]))}</p>
                    </Col>
                    <Col>
                        This is your email:  {format(JSON.stringify(state["attributes"]["email"]))}
                    </Col>
                    <Col>
                        <Button variant="primary">
                            New Post
                        </Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="files">
                        <Row>
                            <Col sm={2}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="files">Files</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="posted">Posted</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="drafts">Draft</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col className="profile-col-tab" sm={9}>
                                <Tab.Content>
                                    <Files />
                                    <Posted />
                                    <Drafts />
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Row>
            </Container>
        </div>
    )
}

export default Home