import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Tab, Button, Modal }
    from 'react-bootstrap';
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
    //const [isLoggedin, setIsLoggedin] = useState(false);

    useEffect(() => {

        scriptFB();

        checkLoginStateFB();


    }, []);

    //////////////////////////////////API FACEBOOK////////////////////////////////////////////////////
    const onLoginFB = () => {
        window.FB.login(function (response) {
            setloginFB(true);
            window.location.reload();
        },
            {
                scope: "email, public_profile ,pages_show_list, pages_read_engagement, pages_manage_posts,  pages_read_user_content"
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
    const scriptFB = () => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: "801174264382809",
                cookie: true,
                xfbml: true,
                version: 'v14.0'
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
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <Tab.Pane eventKey="Social">
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
                <Modal.Body>Modal for Twitter </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </Tab.Pane>


    )
}


export default Socialn;