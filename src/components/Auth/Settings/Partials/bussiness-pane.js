import React, { useState, useEffect } from 'react'
import { Auth, API, Storage } from 'aws-amplify';
import { AmplifyLoadingSpinner } from '@aws-amplify/ui-react';
import { Container, Row, Col, Tab, Card, Button, Form, Modal }
    from 'react-bootstrap';
import { listBusinesses } from '../../../../graphql/queries';
import {
    createBusiness as createBusinessMutation,
    updateBusiness as updateBusinessMutation
} from '../../../../graphql/mutations';
import { async } from 'rxjs';


const initialFormState = { name: '', about: '', image: '', phone: '' }
const updateFormState = { profile: '' }

const Bussiness = (props) => {

    const loginFB = props.data;
    const [updatePic, setUpdate] = useState(updateFormState);
    const [formData, setFormData] = useState(initialFormState);
    const [hideLightbox, setHideLightbox] = useState(true);
    const [business, setBusiness] = useState([]);
    const [img_profile, setImg_profile] = useState();
    const [showModal, setShow] = useState(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        fetchBusiness();

        //scriptFB();

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

    async function fetchBusiness() {
        const apiData = await API.graphql({ query: listBusinesses });
        const BusinessFromAPI = apiData.data.listBusinesses.items;
        await Promise.all(BusinessFromAPI.map(async business => {
            if (business.image) {
                Storage.configure({ level: 'private' })
                const image = await Storage.get('Profile/Pic_Profile');
                business.image = image;
            }
            return business;
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

    async function updateNameB() {
        const apiData = await API.graphql({ query: listBusinesses });
        const BusinessFromAPI = apiData.data.listBusinesses.items;
        const id_businesses = BusinessFromAPI[0]['id']
        await Promise.all(BusinessFromAPI.map(async business => {
            return business;
        }))
        if (!formData.name) return;
        const updateBusiness = {
            id: id_businesses,
            name: formData.name
        }

        await API.graphql({ query: updateBusinessMutation, variables: { input: updateBusiness } });
        setBusiness([...business, formData]);
        setFormData(initialFormState);
        window.location.reload();
    }

    async function sync_fb() {

        const apiData = await API.graphql({ query: listBusinesses });
        const BusinessFromAPI = apiData.data.listBusinesses.items;
        /* BusinessFromAPI[0]['id'];
        BusinessFromAPI[0]['website'];
         BusinessFromAPI[0]['about']
        BusinessFromAPI[0]['phone'];
        Query
        me?fields=website,description,phone
        Update
        me?website=https://linktr.ee/UrComfortZ0ne&about=This is an Entertaiment Page from a Streamer&phone=+526562413784
        me?website=BusinessFromAPI[0]['name']&about=BusinessFromAPI[0]['about']&phone=BusinessFromAPI[0]['phone'];
        */

        window.FB.api(
            "me?fields=accounts{access_token}",
            "GET",
            function (response) {
                // Insert your code here
                response = response["accounts"]['data'][0]['access_token']
                post_sync(response)
            }
        );

        function post_sync(access_token) {

            window.FB.api(
                "me?about=" + BusinessFromAPI[0]['about'] + "&phone=" + BusinessFromAPI[0]['phone'],
                "POST",
                {
                    access_token: access_token
                },
                //{ "about": BusinessFromAPI[0]['about'], "phone": BusinessFromAPI[0]['phone'] },
                function (response) {
                    console.log(response)
                    alert("Facebook Sync Success: " + response['success'])
                }
            );
        }

    }

    async function updateAboutB() {
        const apiData = await API.graphql({ query: listBusinesses });
        const BusinessFromAPI = apiData.data.listBusinesses.items;
        const id_businesses = BusinessFromAPI[0]['id']
        await Promise.all(BusinessFromAPI.map(async business => {
            return business;
        }))
        if (!formData.about) return;
        const updateBusiness = {
            id: id_businesses,
            about: formData.about
        }

        await API.graphql({ query: updateBusinessMutation, variables: { input: updateBusiness } });
        setBusiness([...business, formData]);
        setFormData(initialFormState);
        window.location.reload();
    }

    async function updatePhoneB() {
        const apiData = await API.graphql({ query: listBusinesses });
        const BusinessFromAPI = apiData.data.listBusinesses.items;
        const id_businesses = BusinessFromAPI[0]['id']
        await Promise.all(BusinessFromAPI.map(async business => {
            return business;
        }))
        if (!formData.phone) return;
        const updateBusiness = {
            id: id_businesses,
            phone: formData.phone
        }

        await API.graphql({ query: updateBusinessMutation, variables: { input: updateBusiness } });
        setBusiness([...business, formData]);
        setFormData(initialFormState);
        window.location.reload();
    }

    async function onChange(e) {
        if (!e.target.files[0].name) return
        //setFormData({ ...formData, "image": e.target.files[0].name });
        const [file] = e.target.files;
        setImg_profile(URL.createObjectURL(file));
        Storage.configure({ level: 'private' })
        await Storage.put("Profile/Pic_Profile", file,
            {
                contentType: "image/png"
            });

        fetchBusiness();
    }

    async function onChangeUp(e) {
        if (!e.target.files[0].name) return
        setUpdate({ ...updatePic, "profile": e.target.files });
        const [file] = e.target.files;
        setImg_profile(URL.createObjectURL(file));
    }

    async function saveNewPic() {
        console.log(updatePic.profile)
        if (!updatePic.profile) return;
        const [file] = updatePic.profile
        console.log("Inside")
        Storage.configure({ level: 'private' })
        await Storage.put("Profile/Pic_Profile", file,
            {
                contentType: "image/png"
            })
        window.location.reload()
    }

    const handleClose = () => {
        setShow(false);
        updatePic.profile = '';
        setImg_profile('');
    }

    let [state, setState] = useState(null)

    if (!state) return <AmplifyLoadingSpinner />

    return (
        <Tab.Pane eventKey="business">
            {/*console.log(loginFB)*/}
            <Container>
                <div className='business-list'>
                    <Row>
                        <Card style={{ width: '62rem' }}>
                            <Card.Body>
                                <Card.Title className="text-left">{business.map(business => (business.name)) ?
                                    'Business Name: ' + business.map(business => (business.name))
                                    : 'Undefined'}</Card.Title>
                                <Card.Text>
                                    {business.map(business => business.id) == '' ?
                                        <Form>
                                            <Row className="justify-content-md-center">
                                                <Col md="6 text-left">
                                                    <Form.Label><h6>Tell us About your Business: *</h6></Form.Label>
                                                    <Form.Control type="text" onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                                                        placeholder="Type your Business name *" value={formData.name} required />
                                                    <br />
                                                    <Form.Control type="text" onChange={e => setFormData({ ...formData, 'about': e.target.value })}
                                                        placeholder="Describe your Business *" value={formData.about} required />
                                                    <br />
                                                    <Form.Control type="tel" onChange={e => setFormData({ ...formData, 'phone': e.target.value })}
                                                        placeholder="Enter a Phone  Number" value={formData.phone} />
                                                    <br />
                                                    <Form.Control type="file" name='picture' onChange={onChange} required={true} />
                                                    <img src={img_profile} alt="" />
                                                    <br />
                                                    <Button onClick={createBusiness}>Save Data</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                        :
                                        business.map(business => (
                                            <div>
                                                <Row className="justify-content-md-center">
                                                    <Col md="10 text-center" key={business.id || business.name}>
                                                        <h6>Business Info: </h6><p>{business.about}</p>
                                                        <br />
                                                        {
                                                            business.image && <img src={business.image} style={{ width: 150, height: "auto" }} />
                                                        }
                                                        <br />
                                                        <h6>Phone: </h6><p>{!business.phone ? 'No phone' : business.phone}</p>
                                                    </Col>
                                                    <Col md="6"></Col>
                                                    <Col md="2 text-right">
                                                        <br />
                                                        <Card.Link className='text-right' ><a href='#bussiness' onClick={() => setHideLightbox(false)}>Edit</a></Card.Link>
                                                    </Col>
                                                    <Col md="3">
                                                        <Button variant='primary' onClick={sync_fb} disabled={loginFB === true ? '' : 'true'} >
                                                            Sync FB
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <div className={`${hideLightbox ? "hide-lightbox" : "ligthbox"}`}>
                                                    <Row className="justify-content-md-center">
                                                        <Col md="10" lg="6">
                                                            <Row className='justify-content-center'>
                                                                <Form.Label><h4>Update Info</h4></Form.Label>
                                                            </ Row>
                                                            <Row className="justify-content-center">
                                                                <Col xs="6">
                                                                    <Button variant="light" onClick={handleShow}>Change Picture</Button>
                                                                </Col>
                                                                <Col xs="2" />
                                                            </Row>
                                                            <br />
                                                            <Form>
                                                                <Row className="justify-content-center">
                                                                    <Col xs="6">
                                                                        <Form.Control type='text'
                                                                            onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                                                                            placeholder={"Name: " + business.name}
                                                                            value={formData.name}
                                                                        />
                                                                    </Col>
                                                                    <Col xs="3">
                                                                        <Button variant="light" onClick={updateNameB}>Update</Button>
                                                                    </Col>
                                                                </Row>
                                                            </Form>
                                                            <br />
                                                            <Form>
                                                                <Row className="justify-content-center">
                                                                    <Col xs="6">
                                                                        <Form.Control type='text'
                                                                            onChange={e => setFormData({ ...formData, 'about': e.target.value })}
                                                                            placeholder={"About: " + business.about}
                                                                            value={formData.about}
                                                                        />
                                                                    </Col>
                                                                    <Col xs="3">
                                                                        <Button variant="light" onClick={updateAboutB}>Update</Button>
                                                                    </Col>
                                                                </Row>
                                                            </Form>
                                                            <br />
                                                            <Form>
                                                                <Row className="justify-content-center">
                                                                    <Col xs="6">
                                                                        <Form.Control type='tel'
                                                                            onChange={e => setFormData({ ...formData, 'phone': e.target.value })}
                                                                            placeholder={"Phone: " + business.phone}
                                                                            value={formData.phone}
                                                                        />
                                                                    </Col>
                                                                    <Col xs="3">
                                                                        <Button variant="light" onClick={updatePhoneB}>Update</Button>
                                                                    </Col>
                                                                </Row>
                                                            </Form>
                                                            <br />
                                                            <Row className='justify-content-md-center'>
                                                                <Col xs="6"></Col>
                                                                <Button className='col-3' variant="dark" onClick={() => setHideLightbox(true)}>Close</Button>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                </div>
            </Container>
            <Modal className='settings-business' show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="justify-content-md-center">
                            <Col md="10">
                                <Row className="justify-content-md-center">
                                    {business.map(business => (
                                        business.image && <img className="afterChange" src={business.image} />
                                    ))}
                                </Row>
                                <Form.Label className="text-left"><h6>To Update:</h6></Form.Label>
                                <Form.Control className="text-left" type="file" name="profile" onChange={onChangeUp} required={true} />
                                <br />
                                <Row className="justify-content-md-center">
                                    <img className={img_profile ? "text-center" : "hide"} src={img_profile} alt="" />
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveNewPic}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </Tab.Pane>
    )
}



export default Bussiness;