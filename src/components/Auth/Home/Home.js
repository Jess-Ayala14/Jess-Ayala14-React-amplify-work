import React, { useEffect, useState } from 'react';
import Files from './Partials/Files';
import Posted from './Partials/Posted';
import Drafts from './Partials/Drafts';
import { Auth, API, Storage } from 'aws-amplify';
import { AmplifyLoadingSpinner } from '@aws-amplify/ui-react';
import { Container, Row, Col, Tab, Button, Modal, Nav, Form, Card, Pagination }
    from 'react-bootstrap';
import './Home.css';
import { listBusinesses } from '../../../graphql/queries';
import { createBusiness as createBusinessMutation }
    from '../../../graphql/mutations';
import { createStore, useGlobalState } from 'state-pool';
import { async, windowWhen } from 'rxjs';

const store = createStore();
store.setState("token", '');

const initialFormState = { name: '', about: '', image: '', phone: '' };
const initialPostState = { description: '', picture: '', fb_checkbox: false, inst_checkbox: false };

const Home = () => {


    const [formData, setFormData] = useState(initialFormState);
    const [newPostData, setFormData1] = useState(initialPostState);
    let [state, setState] = useState(null);
    const [business, setBusiness] = useState([]);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [loginFB, setlogin] = useState(false);
    const [access_token, savingtoken] = store.useState("token")
    const [img_form, setImg] = useState();
    const [video_form, setVideo] = useState();
    const [img_profile, setImg_profile] = useState();

    useEffect(() => {
        fetchBusiness();
        scriptFB();

        if (loginFB === true && access_token === '') {
            queryToken()
        }

        console.log(loginFB);

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

    //////////////////////////////////API FACEBOOK////////////////////////////////////////////////////

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

    const handleClose = () => {
        setShow(false);
        newPostData.description = '';
        newPostData.picture = '';
        newPostData.fb_checkbox = '';
        newPostData.inst_checkbox = ''
        setImg('');
        setVideo('');

    }

    async function new_post() {

        if (!newPostData.description && !newPostData.picture) return;

        console.log('FB' + newPostData.fb_checkbox, 'inst' + newPostData.inst_checkbox)

        if (newPostData.fb_checkbox === true || newPostData.inst_checkbox === true) {

            const split = newPostData.picture.split("fakepath\\");
            newPostData.picture = split[1];
            Storage.configure({ level: 'private' })
            const urlImg = await Storage.get('temp/' + newPostData.picture);


            if (newPostData.fb_checkbox === true) {
                function fbPosting() {
                    var params = {
                        //Page Token with publish_pages (to post as Page)
                        access_token: access_token,
                        //status message
                        message: newPostData.description,
                        //absolute url to the image, must be public
                        url: 'https://alimediatoolsoct73015-dev.s3.amazonaws.com/private/us-east-1%3A862cf919-44b1-4a17-890e-abaaa50f919c/temp/among+us.mp4',

                    };

                    window.FB.api(
                        "me?fields=id",
                        "GET",
                        {
                            access_token: access_token
                        },
                        function (response) {
                            // Insert your code here
                            post(response.id)

                        }
                    );

                    function post(page_id) {
                        window.FB.api(
                            page_id + '/photos?',
                            'POST',
                            params,
                            function (response) {

                                console.log(urlImg, response)
                                if (!response.error) {
                                    alert("FB: Publication was successful")
                                    window.location.reload();
                                }
                                else {
                                    alert("FB: ", toString(response.error.message))
                                }
                            }
                        );

                    }

                }

                fbPosting(urlImg);
            }


            if (newPostData.inst_checkbox === true) {
                function instPosting() {
                    var params = {
                        //Page Token with publish_pages (to post as Page)
                        //access_token: access_token,
                        //status message
                        caption: newPostData.description,
                        //absolute url to the image, must be public
                        video_url: 'https://alimediatoolsoct73015-dev.s3.amazonaws.com/private/us-east-1%3A862cf919-44b1-4a17-890e-abaaa50f919c/temp/among+us.mp4',
                        media_type: 'VIDEO'
                    };

                    window.FB.api(
                        "me?fields=instagram_business_account{id}",
                        "GET",
                        {
                            access_token: access_token
                        },
                        function (response) {
                            // Insert your code here
                            media(response["instagram_business_account"]["id"])

                        }
                    );

                    function media(insta_id) {
                        window.FB.api(
                            insta_id + '/media',
                            'POST',
                            params,
                            function (response) {
                                console.log(response)

                                if (response['id'] !== '') {

                                    alert("Inst: Publication was successful")
                                    window.location.reload();
                                    media_publish(insta_id, response.id)
                                }
                                else {
                                    alert("Inst: ", toString(response))
                                }
                            }
                        );
                    }

                    function media_publish(insta_id, id_media) {

                        window.FB.api(
                            insta_id + '/media_publish',
                            'POST',
                            { "creation_id": id_media },
                            function (response) {
                                console.log("Media Posted:", response)
                            }
                        );

                    }
                }
                instPosting(urlImg)
            }

        }
        else {
            alert("Check at least one option")
            handleClose()
        }

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
    //checkLoginState();
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const format = (variable) => {
        var data = variable
        data = data.split('"')
        data = data[1]
        data = data.charAt(0).toUpperCase() + data.slice(1);
        return (data)
    }

    async function fetchBusiness() {
        const apiData = await API.graphql({ query: listBusinesses });
        const BusinessFromAPI = apiData.data.listBusinesses.items;
        await Promise.all(BusinessFromAPI.map(async business => {
            if (business.image) {
                Storage.configure({ level: 'private' })
                const image = await Storage.get('Profile/' + business.image)
                business.image = image
            }
            return business
        }))
        setBusiness(apiData.data.listBusinesses.items);
    }

    async function createBusiness() {
        if (!formData.name || !formData.about) return;
        await API.graphql({ query: createBusinessMutation, variables: { input: formData } });
        if (formData.image) {
            const image = await Storage.get(formData.image);
            formData.image = image;
        }

        setBusiness([...business, formData]);
        setFormData(initialFormState);
        window.location.reload();
    }

    async function onChange(e) {
        if (!e.target.files[0].name) return
        setFormData({ ...formData, "image": e.target.files[0].name });
        const [file] = e.target.files;
        setImg_profile(URL.createObjectURL(file));
        Storage.configure({ level: 'private' })
        await Storage.put("Profile/" + e.target.files[0].name, file,
            {
                contentType: "image/png"
            });

        fetchBusiness();
    }

    //e => setFormData1({ ...newPostData, 'description': e.target.value })}
    async function onImageChange(e) {
        const ImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        const videoTypes = ['video/mp4', 'video/mkv'];
        if (!e.target.files[0].name) return
        setFormData1({ ...newPostData, "picture": e.target.value });
        const [file] = e.target.files;
        if (ImageTypes.includes(file["type"]))
            setImg(URL.createObjectURL(file))
        else if (videoTypes.includes(file["type"]))
            setVideo(URL.createObjectURL(file))
            /*
        Storage.configure({ level: 'private' })
        await Storage.put("temp/" + e.target.files[0].name, file);
        */
    }

    const Table = () => {
        if (business.map(business => business.id) != "")
            return true
        else
            return false
    }

    if (!state) return <AmplifyLoadingSpinner />

    return (
        <div className='Home' >
            {Table() ?
                <Container>
                    <div>
                        <br />
                        <Row>
                            <Col xs={6} md={3} lg={2}>
                                <Card>
                                    {business.map(business => (
                                        <Card.Body>
                                            <Card.Title>{business.name}</Card.Title>
                                            <Card.Text>
                                                <img className='profile_img' src={business.image} alt="profile" />
                                            </Card.Text>
                                            <Card.Subtitle className='text-left'>{business.about}</Card.Subtitle>
                                        </Card.Body>
                                    ))}
                                </Card>
                            </Col>
                            <Col xs={3} md={6} lg={7}>
                                {loginFB === true

                                    ? <p>Graph API FB Inside</p>
                                    : <p>Graph API FB Outside</p>

                                }

                            </Col>
                            <Col xs={3} md={3} lg={3}>
                                <Button variant="primary" onClick={handleShow} disabled={loginFB === true ? '' : true}>
                                    New Post
                                </Button>
                            </Col>
                        </Row>
                        <br />
                        <Row className='row-tab-md-lg'>
                            <Tab.Container id="left-tabs-example" defaultActiveKey="posted">
                                <Col className='hide' md={3} lg={2}>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="posted">Posted</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="files">Files</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="drafts">Draft</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col className="Home-col-tab" xs={0} sm={9} md={9} lg={8}>
                                    <Tab.Content>
                                        <Posted dataFromParent={[loginFB, access_token]} />
                                        <Files dataFromParent={loginFB} />
                                        <Drafts dataFromParent={loginFB} />
                                    </Tab.Content>
                                </Col>
                            </Tab.Container>
                        </Row>
                        <div className='row-tab-xs-xl'>
                            <Tab.Container defaultActiveKey="posted">
                                <Row className='responsive'>
                                    <Nav variant="tabs">
                                        <Col xs={1} sm={1} />
                                        <Col xs={3} sm={3}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="posted">Posted</Nav.Link>
                                            </Nav.Item>
                                        </Col>
                                        <Col xs={3} sm={3}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="files">Files</Nav.Link>
                                            </Nav.Item>
                                        </Col>
                                        <Col xs={3} sm={3}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="drafts">Draft</Nav.Link>
                                            </Nav.Item>
                                        </Col>
                                    </Nav>
                                </Row>
                                <Row className='responsive-content'>
                                    <Col className="Home-col-tab" xs={12} sm={12} md={9} lg={8}>
                                        <Tab.Content>
                                            <Posted dataFromParent={[loginFB, access_token]} />
                                            <Files dataFromParent={loginFB} />
                                            <Drafts dataFromParent={loginFB} />
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </div>


                    </div>
                </Container>
                :
                <Container className="business_form">
                    <div>
                        <br />
                        <Row>
                            <Col sm={1} md={2} lg={3} />
                            <Col sm={10} md={8} lg={6}>
                                <Card>
                                    <Card.Header>
                                        <Card.Title>Welcome to Ali-Media Tools</Card.Title>
                                    </Card.Header>
                                    <Tab.Container defaultActiveKey="first">
                                        <Tab.Content>
                                            <Tab.Pane eventKey="first">
                                                <Card.Body>
                                                    <Row className="justify-content-md-center">
                                                        <Col md={10} sm={12} lg={8} >
                                                            <p>
                                                                Hello {format(JSON.stringify(state["username"]))},
                                                                welcome to Ali-Media-Tools. Thank you for accepting
                                                                to participate: you have been invited to probe this
                                                                functional prototype, which consists add multiple
                                                                fuctions of your favorites social media. On this site,
                                                                you could post and watch your history post from Facebook,
                                                                also Instagram, and Twitter at the same point.
                                                            </p>
                                                            <br />
                                                            <h4>Please press next</h4>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                <Card.Body>
                                                    <Form>
                                                        <Row className="justify-content-md-center">
                                                            <Col md={10} sm={12} lg={8}>
                                                                <Form>
                                                                    <Form.Label><h4>Tell us About your Business: *</h4></Form.Label>
                                                                    <Form.Control type="text" onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                                                                        placeholder="Type your Business name *" value={formData.name} required />
                                                                    <br />
                                                                    <Form.Control type="text" onChange={e => setFormData({ ...formData, 'about': e.target.value })}
                                                                        placeholder="Describe your Business *" value={formData.about} required />
                                                                    <br />
                                                                    <Form.Control type="tel" onChange={e => setFormData({ ...formData, 'phone': e.target.value })}
                                                                        placeholder="Enter a Phone Number" value={formData.phone} />
                                                                    <br />
                                                                    <Form.Control type="file" onChange={onChange} required={true} />
                                                                    <img src={img_profile} alt="" />
                                                                    <br />
                                                                    <Button onClick={createBusiness}>Save Data</Button>
                                                                </Form>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </Card.Body>
                                            </Tab.Pane>
                                            <br />
                                            <Card.Footer>
                                                <Card.Text>

                                                    <Nav className="justify-content-center">
                                                        <Pagination.Item eventKey="first">
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="first">{"<"}</Nav.Link>
                                                            </Nav.Item>
                                                        </Pagination.Item>
                                                        <Pagination.Item eventKey="second">
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="second">{">"}</Nav.Link>
                                                            </Nav.Item>
                                                        </Pagination.Item>
                                                    </Nav>

                                                </Card.Text>
                                            </Card.Footer>
                                        </Tab.Content>
                                    </Tab.Container>

                                </Card>
                            </Col>
                            <Col sm={1} md={2} lg={6} />
                        </Row>
                    </div>
                </Container >
            }

            {/* Modal Form*/}
            <Modal show={show} onHide={handleClose}>
                <div className='modal-post'>
                    <Modal.Header closeButton>
                        <Modal.Title>New Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Row>
                                    <Col xs={4}>
                                        <Form.Group>
                                            <Form.Check type="checkbox" name="fb_checkbox" value={newPostData.fb_checkbox} label="Facebook"
                                                onChange={e => setFormData1({ ...newPostData, 'fb_checkbox': e.target.checked })} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group>
                                            <Form.Check type="checkbox" name="inst_checkbox" value={newPostData.inst_checkbox} label="instagram"
                                                onChange={e => setFormData1({ ...newPostData, 'inst_checkbox': e.target.checked })} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group>
                                            <Form.Check type="checkbox" label="Twitter" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <br />
                                <Form.Group className="mb-3" controlId="formFileMultiple">
                                    <Form.Label>Select Image</Form.Label>
                                    <Form.Control type="file" name='picture' onChange={onImageChange} value={newPostData.picture} required={true} />
                                    <br />
                                    {img_form ?
                                        <img src={img_form} alt="" />
                                        :
                                        <></>
                                    }
                                    {video_form ?
                                        <video src={video_form} controls alt="" />
                                        :
                                        <></>
                                    }
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Enter a Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={newPostData.description} name="description"
                                        onChange={e => setFormData1({ ...newPostData, 'description': e.target.value })} />
                                </Form.Group>
                            </Form>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={new_post}>
                            Post
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div >

    )

}

export default Home