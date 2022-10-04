import React, { useEffect } from 'react'
import { Tab, Nav, Row, Col, Card, Button } from 'react-bootstrap';
import { createStore } from 'state-pool';

const store = createStore();
store.setState("FBposted", []);
store.setState("InsPosted", []);


export const Posted = (data) => {

    const loginFB = data['dataFromParent'][0]
    const ACCESS_TOKEN = data['dataFromParent'][1];
    const [FBposted, setpostedFB] = store.useState("FBposted");
    const [InsPosted, setpostedIns] = store.useState("InsPosted");
    const APICALLFB = "me?fields=posts{id,message,full_picture,created_time,shares,reactions}";
    const APICALLIns = "me?fields=instagram_business_account{media{permalink,media_type,caption,media_url}}"

    // me?fields=instagram_business_account{media{id,media_type,caption,media_url}}  
    //me?fields=instagram_business_account{id,username,biography}
    //17841406287465765?fields=id,username,biography

    useEffect(() => {
        
        if (loginFB !== false) {
            AllPosts();
        }

    }, []);



    function AllPosts() {

        window.FB.api(
            APICALLFB,
            "GET",
            {
                access_token: ACCESS_TOKEN
            },
            function (response) {
                // Insert your code here
                getPostFB(response);

                setpostedFB(formatPostFB(getPostFB(response)))

            }

        );

        window.FB.api(
            APICALLIns,
            "GET",
            {
                access_token: ACCESS_TOKEN
            },
            function (response) {
                // Insert your code here
                getPostIns(response);
                setpostedIns(formatPostIns(getPostIns(response)))

            }

        );


        function getPostFB(response) {
            const posts = response['posts']['data']
            return posts
        }

        function formatPostFB(posts) {

            const content = Object.keys(posts).map(key => {
                return (
                    [posts[key].id, posts[key].message, posts[key].full_picture]
                );
            })
            return content
        }

        function getPostIns(response) {

            const media = response['instagram_business_account']['media']['data'];
            return media
        }


        function formatPostIns(media) {

            const content = Object.keys(media).map(key => {
                return (
                    [media[key].permalink, media[key].caption, media[key].media_url]
                );
            })
            return content

        }


    }


    function FBPost(props) {

        const FBposted = props.posted;

        const listItems = FBposted.map((post) =>
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

    function InsPost(props) {

        const InsPosted = props.posted;
        const listItems = InsPosted.map((post) =>
            <Row>
                <Col md={2} lg={3} />
                <Col md={3} lg={3}>
                    <br />
                    <Card className='inst' style={{ width: '18rem' }}>
                        <Card.Title className='text-left inst'><a href={post[0]} target="_blank">Go to post</a></Card.Title>
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
                                            <FBPost posted={FBposted} />
                                        </Col>
                                    </Row>
                                    :
                                    <Row>
                                        <Col className="center">
                                            <Row>
                                                <br />
                                                <Col md={2} lg={3} />
                                                <Col md={3} lg={3}>
                                                    <br />
                                                    <Card style={{ width: '18rem' }}>
                                                        <Card.Body className='text-center'>
                                                            <Card.Text>
                                                                Please Login on Facebook
                                                            </Card.Text>
                                                            <Button href='/Settings' variant="primary">Go to settings</Button>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col md={2} lg={3} />
                                            </Row>                            </Col>
                                    </Row>
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="instagram-posted">
                                {loginFB == true
                                    ?
                                    <Row>
                                        <Col className="center">
                                            <br />
                                            <InsPost posted={InsPosted} />
                                        </Col>
                                    </Row>
                                    :
                                    <Row>
                                        <Col className="center">
                                            <Row>
                                                <br />
                                                <Col md={2} lg={3} />
                                                <Col md={3} lg={3}>
                                                    <br />
                                                    <Card className="inst" style={{ width: '18rem' }}>
                                                        <Card.Body className='text-center'>
                                                            <Card.Text>
                                                                Please Authorize Instagram
                                                            </Card.Text>
                                                            <Button href='/Settings' className="btn-instagram">Go to settings</Button>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col md={2} lg={3} />
                                            </Row>                            </Col>
                                    </Row>
                                }
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



