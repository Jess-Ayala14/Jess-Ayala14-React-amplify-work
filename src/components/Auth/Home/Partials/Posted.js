import React, { useState, useEffect } from 'react'
import { Tab, Nav, Row, Col } from 'react-bootstrap';




export const Posted = (loginFB) => {


    useEffect(() => {

        startThis();

    }, []);

    async function startThis() {
        var getUser = await fbposts(function (model) {
            //console.log(model);
            ShowPost(model)
        });


    };

    function ShowPost(value) {

        console.log('hello', Object.keys(value).length);

        if (Object.keys(value).length > 0) {
            for (let i = 0; i < Object.keys(value).length; i++) {

                console.log(value[i]['id']);
                //return <p>{value[i]['id']}</p>

            };

        }
        return (<p>Hello</p>)
    }

    async function fbposts(callback) {

        window.FB.api(
            "me?fields=posts{id,message,full_picture,created_time,shares,reactions}",
            "GET",
            {
                access_token: "EAALYqetuhVkBAOCp7yVjFTkih1zjZBcvmOIRLexIQNRs9e9XNMY6f31Oac0OVLKM0e299ZAErCxmltreTmK4hZB4hWSXjGWK9g3ZBDPqIHL2wvW6K91gOnutASsPaq0ly1elGyEUvtFP0GIawGOE9gX79lEm8QvKmn75zwUHdiCPGVtZBFXOqZBQWhHWwUjEseoVFtTMEDS5gZC30ZCIplVP06O8X3QoU5sZD"
            },
            function (response) {
                // Insert your code here

                callback(response['posts']['data']);

            }
        );


      
    }

    /*
        
            Graph API query Post
            me?fields=posts{message,full_picture,created_time,shares,reactions}
        
            {id_post}?fields=message,full_picture,created_time,shares,likes,comments
         
    */

    return (
        <>
            <Tab.Pane eventKey="posted">
                <Tab.Container defaultActiveKey="facebook-posted">
                    <Nav variant="pills" defaultActiveKey="facebook-posted">
                        <Nav.Item>
                            <Nav.Link className='facebook' eventKey="facebook-posted">Facebook</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className='instagram' eventKey="instagram-posted">Instagram</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className='twitter' eventKey="twitter-posted">Twitter</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div className='socialM-content'>
                        <Tab.Content>
                            <Tab.Pane eventKey="facebook-posted">
                                <br />
                                {loginFB.dataFromParent === true
                                    ?
                                    <Row>
                                        <Col className="center">
                                            <p>Facebook Posted</p>
                                            <br />
                                            <ShowPost />

                                        </Col>
                                    </Row>
                                    :
                                    <Row>
                                        <Col className="center">
                                            <p>Please Login on Facebook</p>
                                        </Col>
                                    </Row>
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="instagram-posted">
                                <br />
                                <Row>
                                    <Col className="center">
                                        <p>Instagram Posted</p>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="twitter-posted">
                                <br />
                                <Row>
                                    <Col className="center">
                                        <p>Twitter Posted</p>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </Tab.Container>
            </Tab.Pane>
        </>
    )
}


export default Posted