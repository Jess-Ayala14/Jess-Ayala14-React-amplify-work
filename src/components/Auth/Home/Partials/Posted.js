import React, { useEffect } from 'react'
import { Tab, Nav, Row, Col, Card } from 'react-bootstrap';
import { createStore, useGlobalState } from 'state-pool';

const store = createStore();
store.setState("posted", []);

export const Posted = (loginFB) => {

    const [posted, setposted] = store.useState("posted")

    const APICALL = "me?fields=posts{id,message,full_picture,created_time,shares,reactions}"
    const ACCESS_TOKEN = "EAALYqetuhVkBAKBixtLBnVBxdzHJlrsQqEKlJZAc3O1RDx9ZCzpqTGZCa8f9QvCuSMwvZCPIy2LEWHbaa63qPMOhQHgyZAIpkNL4QDyiZBq8P8rZC4aXLVWZBQ2UYPZBjZAvBdmai2itO0S6GuyXSLxT0IJUyAeB1oTTUv9enZCRYe1PECEQMhJuZCBR4ZCNmMmWtUgX2ZC7ldi6FoOcU9v5il4pV17u41sVeAylgZD"

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

        console.log(posts);

        const listItems = posts.map((post) =>
            <Row>
                <Col md={2} lg={3} />
                <Col md={3} lg={3}>
                    <br />
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title><a href={'https://www.facebook.com/' + post[0]} target="_blank"><h6>Go to Post</h6></a></Card.Title>
                            <Card.Text>
                                <p>{post[1]}</p>
                            </Card.Text>
                            <br />
                            <img src={post[2]} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} lg={3} />
            </Row>
        );

        console.log(listItems)

        return (
            <ul>{listItems}</ul>
        );
    }

    function NumberList() {

        const numbers = [1, 2, 3, 4, 5];

        const listItems = numbers.map((number) =>
            <li>{number}</li>
        );

        console.log(listItems)

        return (
            <ul>{listItems}</ul>
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
                                {loginFB.dataFromParent === true
                                    ?
                                    <Row>
                                        <Col className="center">
                                            <br />
                                            <NumberPost posted={posted} />


                                        </Col>
                                    </Row>
                                    :
                                    <>
                                        <Row>
                                            <Col className="center">
                                                <p>Please Login on Facebook</p>
                                            </Col>
                                        </Row>
                                        <NumberList />
                                    </>
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



