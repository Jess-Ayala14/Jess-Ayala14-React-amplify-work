import React, { useEffect } from 'react'
import { Tab, Nav, Row, Col, Card, Button } from 'react-bootstrap';
import { createStore } from 'state-pool';

const store = createStore();
store.setState("posted", []);

export const Posted = (data) => {

    const loginFB = data['dataFromParent'][0]
    const ACCESS_TOKEN = data['dataFromParent'][1];
    const [posted, setposted] = store.useState("posted");
    const APICALL = "me?fields=posts{id,message,full_picture,created_time,shares,reactions}";

    useEffect(() => {

        AllPosts()

    }, []);

    function AllPosts(posted) {

        window.FB.api(
            APICALL,
            "GET",
            {
                access_token: ACCESS_TOKEN
            },
            function (response) {
                // Insert your code here
                getPost(response);

                setposted(formatPost(getPost(response)))

            }

        );


        function getPost(response) {

            const posts = response['posts']['data']

            return posts
        }

        function formatPost(posts) {

            const content = Object.keys(posts).map(key => {

                return (

                    [posts[key].id, posts[key].message, posts[key].full_picture]

                );
            })

            return content
        }

    }

    // console.log('hello',posted);



    function NumberPost(props) {

        const posts = props.posted;

        const listItems = posts.map((post) =>
            <Row>
                <Col md={2} lg={3} />
                <Col md={3} lg={3}>
                    <br />
                    <Card style={{ width: '18rem' }}>
                        <Card.Title className='text-left'><a href={'https://www.facebook.com/' + post[0]} target="_blank">Go to post</a></Card.Title>
                        <Card.Body>
                            <Card.Text className='text-justify'>
                                {post[1]}
                            </Card.Text>
                            <div className='text-center'>
                                <img src={post[2]} />
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} lg={3} />
            </Row>
        );

        return (
            <ul>{listItems}</ul>
        );
    }

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
                                {loginFB == true
                                    ?
                                    <Row>
                                        <Col className="center">
                                            <br />
                                            <NumberPost posted={posted} />
                                        </Col>
                                    </Row>
                                    :
                                    <Row>
                                        <Col className="center">
                                            <Row>
                                                <br />
                                                <Col md={2} lg={3} />
                                                <Col md={3} lg={3}>
                                                    <br/>
                                                    <Card style={{ width: '18rem' }}>
                                                        <Card.Body className='text-center'>
                                                            <Card.Text>
                                                                Please Login on Facebook
                                                            </Card.Text>
                                                            <Button href='/Settings'  variant="primary">Go to settings</Button>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col md={2} lg={3} />
                                            </Row>                            </Col>
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



