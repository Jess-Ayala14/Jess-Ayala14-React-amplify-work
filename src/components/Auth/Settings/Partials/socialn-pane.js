import React, { useState, useEffect } from 'react'
//import TwitterLogin from "react-twitter-login";
import { Container, Row, Col, Tab, Button, Modal }
    from 'react-bootstrap';
import fb_ins_logo from '../../../../storage/fb-ins.png';
import tw_logo from '../../../../storage/twitter.png';
//import { Client } from "twitter-api-sdk";


const Socialn = (props) => {

    const loginFB = props.data[0];
    const logoutFB = props.data[1];
    const onLoginFB = props.data[2];
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);
    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const CONSUMER_KEY = 'VrMi173miqclmI3A6CS8fmOrG'
    const CONSUMER_SECRET = 'Tv1Rm8PdtlTaNORw9uzRdtRyk9tkQY0c2MjOO4aKMPBsTtLfoK'

    //const client = new Client(process.env.BEARER_TOKEN);


    const authHandler = (err, data) => {
        console.log(err, data);
    };

    // Instantiate with desired auth type (here's Bearer v2 auth)

    /*
    async function main() {
        const stream = client.tweets.sampleStream({
            "tweet.fields": ["author_id"],
        });
        for await (const tweet of stream) {
            console.log(tweet.data?.author_id);
        }
    }*/

    return (
        <Tab.Pane eventKey="Social">
            {console.log(loginFB)}
            <Container>
                <div className='socialn-list'>
                    <Row className="justify-content-md-center">
                        <Col className='text-center'>
                            <img src={fb_ins_logo} />
                            <br />
                            <Row>
                                <Col className='text-center'>
                                    <Button
                                        variant="primary"
                                        onClick={handleShow}
                                        className={`${loginFB ? 'hide-button' : 'show-button'}`}
                                    >
                                        Pair
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='text-center'>
                                    <Button className={`${loginFB === true ? 'show-button' : 'hide-button'}`} onClick={logoutFB} >
                                        Log out
                                    </Button>
                                </Col>
                            </Row>

                        </Col>
                        <Col className='text-center'>
                            <img src={tw_logo} />
                            <br />
                            <Button variant="primary" onClick={handleShow1}>Pair</Button>
                        </Col>
                    </Row>
                </div>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Facebook Authorization</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    As a Guest to test this functional prototype
                    of the degree project for social networks and
                    with the purpose of incorporating them into it.
                    You authorize the use of Facebook from this website,
                    you will authorize the API: Facebook for Developers,
                    authenticating as you do on Facebook. This website
                    could save certain credentials to avoid repeating this
                    process, without the need to save your password and
                    user of the Facebook social network.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button onClick={onLoginFB}>
                        Login FB
                    </Button>

                </Modal.Footer>
            </Modal>
            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Twitter Authorization</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Modal for twitter</h4>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                    <Button>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>

        </Tab.Pane>


    )
}


export default Socialn;