import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import InsightsFB from './Partials/InsightsFB';
import InsightsInst from './Partials/InsightsInst';
import { Container, Row, Col, Tab, Nav, Button, Card }
    from 'react-bootstrap';
import { createStore } from 'state-pool';
import './Analytics.css'


const store = createStore();
store.setState("token", '');


const Analytics = () => {

    let [state, setState] = useState(null);
    const [loginFB, setlogin] = useState(false);
    const [access_token, savingtoken] = store.useState("token")

    useEffect(() => {

        scriptFB()
        if (loginFB === true && access_token === '') {
            queryToken();
        }


        (async () => {
            try {
                const response = await Auth.currentAuthenticatedUser()
                setState(response)
            } catch (err) {
                console.error(err)
                setState(null)
            }
        })()

    }, [loginFB]);

    function queryToken() {

        window.FB.api(
            "me?fields=accounts{access_token}",
            "GET",
            function (response) {
                // Insert your code here
                response = response["accounts"]['data'][0]['access_token']
                getToken(response)
            }
        );
    }

    function getToken(token) {

        savingtoken(token)
        console.log(access_token)
    }

    const scriptFB = () => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: "801174264382809",
                cookie: true,
                xfbml: true,
                version: 'v15.0'
            });

            window.FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });


        };

        function checkLoginState() {
            window.FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });

        }

        function statusChangeCallback(response) {
            if (response.status === 'connected') {
                console.log('Logged in and authenticated');
                setlogin(true);

                // testAPI();
            } else {
                console.log('Not authenticated');
                setlogin(false);

            }

        }

        // load facebook sdk script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0&appId=801174264382809&autoLogAppEvents=1";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));


    }

    if (loginFB != false && access_token == '') {
        queryToken();
    }

    return (
        <div className='Analytics'>
            <Container>
                <br />
                <Row>
                    <Col xs={6} md={4} lg={4} >
                        {loginFB === true ?
                            <p>FACEBOOK Connected</p>
                            :
                            <p>Out from FACEBOOK</p>
                        }
                    </Col>
                    <Col xs={3} md={8} lg={8} />
                </Row>
                <br />
                <Row className='Insights'>
                    <Tab.Container defaultActiveKey="facebook-insight">
                        <Nav variant="pills" defaultActiveKey="facebook-insight">
                            <Nav.Item>
                                <Nav.Link className='facebook' eventKey="facebook-insight">Facebook</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className='instagram' eventKey="instagram-insight">Instagram</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <div className='socialM-content'>
                            <Tab.Content>
                                <Tab.Pane eventKey="facebook-insight">
                                    <InsightsFB dataFromParent={[loginFB, access_token]} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="instagram-insight">
                                    <InsightsInst dataFromParent={[loginFB, access_token]} />
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                    </Tab.Container>

                </Row>
            </Container>

        </div>
    )

}

export default withAuthenticator(Analytics);