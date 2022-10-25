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
    const APICALLIns = "me?fields=instagram_business_account{media{permalink,media_type,caption,media_url,children{id,media_url}}}"

    // me?fields=instagram_business_account{media{id,media_type,caption,media_url}}  
    //me?fields=instagram_business_account{id,username,biography}
    //17841406287465765?fields=id,username,biography

    useEffect(() => {

        if (loginFB !== false) {
            AllPosts();
        }

    }, [ACCESS_TOKEN]);



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
                    [media[key].permalink, media[key].caption, media[key].media_url, media[key].media_type]
                );
            })
            return content

        }


    }


    function FBPost(props) {

        const FBposted = props.posted;

        const listItems = FBposted.map((post) =>
            <Row>
                <Col xs={0} sm={1} md={2} lg={2} />
                <Col xs={12} sm={10} md={10} lg={8}>
                    <br />
                    <Card>
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
                <Col xs={0} sm={1} md={2} lg={2} />
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
                <Col xs={0} sm={1} md={2} lg={2} />
                <Col xs={12} sm={10} md={8} lg={8}>
                    <br />
                    <Card className='inst'>
                        <Card.Title className='text-left inst'><a href={post[0]} target="_blank">Go to post</a></Card.Title>
                        <Card.Body>
                            <Card.Text className='text-justify'>
                                {post[1]}
                            </Card.Text>
                            <div className='text-center'>
                                {post[3] === 'VIDEO' ?
                                    <video src={post[2]} controls></video>
                                    :
                                    <img src={post[2]} />
                                }

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={0} sm={1} md={2} lg={2} />
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
                                        <br />
                                        <FBPost posted={FBposted} />
                                    </Row>
                                    :
                                    <Row>
                                        <Col className="center">
                                            <Row>
                                                <br />
                                                <Col xs={2} md={3} lg={3} />
                                                <Col xs={8} md={6} lg={6}>
                                                    <br />
                                                    <Card>
                                                        <Card.Body className='text-center'>
                                                            <Card.Text>
                                                                Please Login on Facebook
                                                            </Card.Text>
                                                            <Button href='/Settings' variant="primary">Go to settings</Button>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col xs={2} md={3} lg={3} />
                                            </Row>                            </Col>
                                    </Row>
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="instagram-posted">
                                {loginFB == true
                                    ?
                                    <Row>
                                        <br />
                                        <InsPost posted={InsPosted} />
                                    </Row>
                                    :
                                    <Row>
                                        <Col className="center">
                                            <Row>
                                                <br />
                                                <Col xs={2} md={3} lg={3} />
                                                <Col xs={8} md={6} lg={6}>
                                                    <br />
                                                    <Card className="inst">
                                                        <Card.Body className='text-center'>
                                                            <Card.Text>
                                                                Please Authorize Instagram
                                                            </Card.Text>
                                                            <Button href='/Settings' className="btn-instagram">Go to settings</Button>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col xs={2} md={3} lg={3} />
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



