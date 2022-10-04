import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Insights from './Partials/Insights';
import { Container, Row, Col, Tab, Button, Modal, Nav, Form, Card, Pagination }
    from 'react-bootstrap';
import { createStore, useGlobalState } from 'state-pool';


const store = createStore();
store.setState("token", '');


const Analytics = () => {

    let [state, setState] = useState(null);
    const [loginFB, setlogin] = useState(false);
    const [access_token, savingtoken] = store.useState("token")

    useEffect(() => {

        scriptFB();

        if (loginFB === true && access_token === '') {
            queryToken()
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

    }, []);

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
                version: 'v14.0'
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

    if (loginFB === true && access_token === '') {
        queryToken()
    }

    scriptFB();

    return (
        <div className='Analytics'>
            <Container>
                <br />
                <Row>
                    <Col xs={6} md={4} lg={2}>
                        {loginFB === true ?
                            <p>FACEBOOK Connected</p>
                            :
                            <p>Out from FACEBOOK</p>
                        }
                        <Col xs={3} md={5} lg={7} />
                        <Col xs={6} md={3} lg={2} />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={6} md={4} lg={2}>
                        <Insights dataFromParent={[loginFB, access_token]}  />
                    </Col>
                    <Col xs={3} md={5} lg={7} />
                    <Col xs={6} md={3} lg={2} />
                </Row>
            </Container>

        </div>
    )

}

export default withAuthenticator(Analytics);