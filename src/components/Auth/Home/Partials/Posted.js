import React, { useState, useEffect } from 'react'
import { Tab, Offcanvas, Nav, Row, Col, Card, Button, Container } from 'react-bootstrap';
import { async } from 'rxjs';
import { createStore } from 'state-pool';

const store = createStore();
store.setState("FBposted", []);
store.setState("InsPosted", []);
store.setState("DataTemp", []);


export const Posted = (data) => {

    const loginFB = data['dataFromParent'][0]
    const ACCESS_TOKEN = data['dataFromParent'][1];
    const [showOff, setShowOff] = useState(false);
    const [FBposted, setpostedFB] = store.useState("FBposted");
    const [InsPosted, setpostedIns] = store.useState("InsPosted");
    const [OffData, setDataTemp] = store.useState("DataTemp")
    const APICALLFB = "me?fields=posts{id,message,status_type,messages_tags,full_picture,attachments{media},created_time,shares,reactions}";
    const APICALLIns = "me?fields=instagram_business_account{media{permalink,media_type,caption,thumbnail_url,media_url,children{id,media_url}}}"

    ////////offCanvas Test /////////
    var message = 'Más juegos para pasar las noches de streams por twitch.tv/jessaydi    #twitch #gameplays #Back4Blood'
    var full_picture = 'https://scontent.felp1-1.fna.fbcdn.net/v/t15.5256-10/318532771_221688890212838_2833298807644438727_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=ubXVz_DysVAAX8lvba-&_nc_ht=scontent.felp1-1.fna&edm=AJdBtusEAAAA&oh=00_AfDUsDdJsOS8Wu6kbQje_VfGHIrr9kvgXi5F6AoD4uTUvg&oe=6393E5DF'

    /////////////////////////////////////

    // me?fields=instagram_business_account{media{id,media_type,caption,media_url}}  
    //me?fields=instagram_business_account{id,username,biography}
    //17841406287465765?fields=id,username,biography

    useEffect(() => {

        if (loginFB !== false) {
            AllPosts();
        }

    }, [ACCESS_TOKEN]);

    /*const OffData = ['2074988342714714_681050623507074', 'Más juegos para pasar las noches de streams por twitch.tv/jessaydi #twitch #gameplays #Back4Blood', 'added_video', 'https://scontent.felp1-1.fna.fbcdn.net/v/t15.5256-10/318532771_221688890212838_2833298807644438727_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=ad6a45&_nc_eui2=AeHiQRat4lX4YYodgncIwKWtlsEJIZ0hNYiWwQkhnSE1iE-96zfDtVN3QlRXnmxPXBxIQFvA0AUK29lsSRYdVeMC&_nc_ohc=HIPZg0Rpq9YAX8JRd7_&_nc_ht=scontent.felp1-1.fna&edm=AJdBtusEAAAA&oh=00_AfBjbSBpgj8sXx81upZm4BIWGZRPcXNFfAvkvYlL_tzrZA&oe=639DC91F']
    const OffData = ['2074988342714714_664851731793630', 'El Comodín Mayor buscando romperla en los Open Mic de la escena de Cd. Juárez.', 'added_photos', 'https://scontent.felp1-1.fna.fbcdn.net/v/t39.30808-6/315970203_664851711793632_6934775715914444800_n.jpg?stp=dst-jpg_s720x720&_nc_cat=108&ccb=1-7&_nc_sid=8024bb&_nc_eui2=AeG3L4rgo5KWrvvDaBpmgJZFJv_eYdl2UAUm_95h2XZQBTj4RvDS5Ph6Mxt8NzVPrwen5yF-N_o3bMVk5XxyRSE4&_nc_ohc=9mgR8NmHkfYAX92dKL1&_nc_ht=scontent.felp1-1.fna&edm=AJdBtusEAAAA&oh=00_AfA_4uj9ogsg4Eog2MKEMSg5pwClZtnyZM3BsDG9r8wXmA&oe=6398D956']
    */


    const offCanvasShow = (props) => {
        setDataTemp(props)
        setShowOff(true)
    };

    const offCanvasClose = () => {
        setDataTemp([]);
        setShowOff(false);
    }

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
                //console.log(response)

                console.log(setpostedFB(formatPostFB(getPostFB(response))))

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
                    [posts[key].id, posts[key].message, posts[key].status_type, posts[key].full_picture, posts[key].attachments, posts[key].messages_tags]
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
                    [media[key].permalink, media[key].caption, media[key].thumbnail_url, media[key].media_url, media[key].media_type]
                );
            })
            return content

        }


    }

    const FBPost = (props) => {

        const FBposted = props.posted;

        const listItems = FBposted.map((post) =>
            <Row>
                <Col xs={0} sm={2} md={2} lg={2} />
                <Col xs={12} sm={8} md={8} lg={8}>
                    <br />
                    <Card>
                        <Card.Title className='text-left'><a href={'https://www.facebook.com/' + post[0]} target="_blank">Go to post</a></Card.Title>
                        <Card.Body>
                            <Card.Text className='text-justify'>
                                {post[1]}
                            </Card.Text>
                            <div className='text-center'>
                                <img src={post[3]} />
                            </div>
                            <Card.Link className='text-right' ><a onClick={() => offCanvasShow(data = [post[0], post[1], post[2], post[3], post[4], post[5]])}>See Post</a></Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={0} sm={2} md={2} lg={2} />
            </Row>
        );

        return (
            <ul>{listItems}</ul>
        );
    }

    const InsPost = (props) => {

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
                                {post[4] === 'VIDEO' ?
                                    <video controls muted poster={post[2]}>
                                        <source src={post[3]} />
                                    </video>
                                    :
                                    <img src={post[3]} />
                                }
                            </div>
                            <Card.Link className='text-right' ><a onClick={() => offCanvasShow(data = [post[0], post[1], post[2], post[3], post[4]])}>See Post</a></Card.Link>
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
                                {loginFB === true
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
                                                            {/*
                                                            <br />
                                                            <Button variant="primary" onClick={offCanvasShow}>
                                                                Launch
                                                            </Button>
                                                            */}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col xs={2} md={3} lg={3} />
                                            </Row>
                                        </Col>
                                    </Row>
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="instagram-posted">
                                {loginFB === true
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
            <Offcanvas className="posts" show={showOff} onHide={offCanvasClose}>
                {OffData.length == 6 &&
                    <>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title><a href={'https://www.facebook.com/' + OffData[0]} target="_blank">Post From Facebook</a></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Container>
                                <Row>
                                    <Col className="center">
                                        <p>
                                            {OffData[1] ? OffData[1] : ''}
                                        </p>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col className="center">
                                        {OffData[2] === 'added_video' ?
                                            <video className="offcanvas-img" controls poster={OffData[3]} muted>
                                                <source src={OffData[4]['data'][0]['media']['source']} />
                                            </video>
                                            :
                                            <img className="offcanvas-img" src={OffData[3] ? OffData[3] : ''} />
                                        }
                                    </Col>
                                </Row>
                            </Container>
                        </Offcanvas.Body>
                    </>
                }
                {OffData.length == 5 &&
                    <>
                        <Offcanvas.Header className="instagram" closeButton>
                            <Offcanvas.Title>
                                <a href={OffData[0]} target="_blank">Instagram  Post</a>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Card.Text className='text-justify'>
                                {OffData[1]}
                            </Card.Text>
                            <div className='text-center'>
                                {OffData[4] === 'VIDEO' ?
                                    <video className="offcanvas-img" controls muted poster={OffData[2]}>
                                        <source src={OffData[3]} />
                                    </video>
                                    :
                                    <img className="offcanvas-img" src={OffData[3]} />
                                }
                            </div>
                        </Offcanvas.Body>
                    </>

                }
            </Offcanvas>
        </>
    )
}


export default Posted



