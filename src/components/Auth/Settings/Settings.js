import React, { useState, useEffect } from 'react'
import Bussiness from './Partials/bussiness-pane';
import Profile from './Partials/profile-pane';
import Socialn from './Partials/socialn-pane';
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Container, Row, Col, Tab, Nav, Button }
  from 'react-bootstrap';
import './Settings.css';
import { async } from 'rxjs';


function Settings() {

  const [loginFB, setloginFB] = useState(false);

  useEffect(() => {

    scriptFB();

  }, [loginFB]);

  //////////////////////////////////////////API FACEBOOK///////////////////////////////////////////////////////////////

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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className='settings'>
      <Container>
        <br />
        <Row>
          <Col md='3 text-left'><h2>Settings</h2></Col>
          <Col m="3"></Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Tab.Container id="left-tabs-example" defaultActiveKey="business">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="business">Business Info</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="User">User Settings</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Social">Social Network</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col className="settings-col-tab" sm={9}>
                  <div className='settings-content'>
                    <Tab.Content>
                      <Bussiness data={loginFB} />
                      <Profile />
                      <Socialn data={[loginFB,logoutFB, onLoginFB]} />
                    </Tab.Content>
                  </div>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </Container>

    </div>


  );
}




export default withAuthenticator(Settings);