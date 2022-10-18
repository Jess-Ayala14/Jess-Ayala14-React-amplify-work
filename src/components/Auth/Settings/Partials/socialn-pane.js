import React, { useState, useEffect } from 'react'
//import TwitterLogin from "react-twitter-login";
import { Container, Row, Col, Tab, Button, Modal }
    from 'react-bootstrap';
import { async } from 'rxjs';
import fb_ins_logo from '../../../../storage/fb-ins.png';
import tw_logo from '../../../../storage/twitter.png';



const Socialn = () => {

    const [loginFB, setloginFB] = useState(false);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);
    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const CONSUMER_KEY = 'VrMi173miqclmI3A6CS8fmOrG'
    const CONSUMER_SECRET = 'Tv1Rm8PdtlTaNORw9uzRdtRyk9tkQY0c2MjOO4aKMPBsTtLfoK'


    const authHandler = (err, data) => {
        console.log(err, data);
    };


    //const [isLoggedin, setIsLoggedin] = useState(false);

    useEffect(() => {

        scriptFB();

        //checkLoginStateFB();

    }, [loginFB]);

    //////////////////////////////////API FACEBOOK////////////////////////////////////////////////////
    const onLoginFB = () => {
        window.FB.login(function (response) {
            setloginFB(true);
            window.location.reload();
        },
            {
                scope: "email, read_insights, pages_show_list, ads_management, business_management, instagram_basic, instagram_manage_insights, instagram_content_publish, pages_read_engagement, pages_manage_metadata, pages_read_user_content, pages_manage_posts, public_profile"
            }
        );

    };

    async function checkLoginStateFB() {
        window.FB.getLoginStatus(function (response) {
            statusChangeCallbackFB(response);
        });

    }

    const statusChangeCallbackFB = (response) => {
        if (response.status === 'connected') {
            console.log('Logged in and authenticated');
            setloginFB(true);

            // testAPI();
        } else {
            console.log('Not authenticated');
            setloginFB(false);

        }

    }

    const logoutFB = () => {
        window.FB.logout(function (response) {
            setloginFB(false);
            window.location.reload();
        });

    }

    /////////////////////////////////////////////SCRIPT SDK //////////////////////////////////////////////////
    async function scriptFB() {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: "801174264382809",
                cookie: true,
                xfbml: true,
                version: 'v15.0'
            });

            window.FB.getLoginStatus(function (response) {
                statusChangeCallbackFB(response);
            });
        };

        // load facebook sdk script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0&appId=801174264382809&autoLogAppEvents=1";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));


    }
    scriptFB()
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Instantiate with desired auth type (here's Bearer v2 auth)



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
                    <Button variant='Primary'>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>

        </Tab.Pane>


    )
}


export default Socialn;