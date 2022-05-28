import React, { useState, useEffect } from 'react'
import { Auth, API, Storage } from 'aws-amplify';
import { listBusinesses } from '../../../../graphql/queries';
import { createBusiness as createBusinessMutation, deleteBusiness as deleteBusinessMutation } from '../../../../graphql/mutations';
import { AmplifyLoadingSpinner } from '@aws-amplify/ui-react';
import { Container, Row, Col, Tab, Card, Button }
    from 'react-bootstrap';


const initialFormState = { name: '', about: '' }

const Bussiness = () => {

    const [business, setBusiness] = useState([]);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchBusiness();
    }, []);

    async function fetchBusiness() {
        const apiData = await API.graphql({ query: listBusinesses });
        const BusinessFromAPI = apiData.data.listBusinesses.items;
        await Promise.all(BusinessFromAPI.map(async business => {
            if (business.image) {
                const image = await Storage.get(business.image);
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
    }

    async function deleteBusiness({ id }) {
        const newBusinessArray = business.filter(business => business.id !== id);
        setBusiness(newBusinessArray);
        await API.graphql({ query: deleteBusinessMutation, variables: { input: { id } } });
    }

    async function onChange(e) {
        if (!e.target.files[0]) return
        const file = e.target.files[0];
        setFormData({ ...formData, image: file.name });
        await Storage.put(file.name, file);
        fetchBusiness();
    }

    let [state, setState] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const response = await Auth.currentAuthenticatedUser()
                setState(response)
            } catch (err) {
                console.error(err)
                setState(null)
            }
        })()
    }, [])

    const format = (variable) => {
        var data = variable
        data = data.split('"');
        data = data[1]
        return (data)
    }

    if (!state) return <AmplifyLoadingSpinner />

    return (
        <Tab.Pane eventKey="bussiness">
            <Container>
                <div className='bussiness-list'>
                    <Row>
                        <Card style={{ width: '62rem' }}>
                            <Card.Body>
                                <Card.Title className="text-left"><p>{format(JSON.stringify(state["username"]))}</p></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted text-left">Name Bussiness</Card.Subtitle>
                                <Card.Text>
                                    <h1>Business List</h1>
                                    <input
                                        onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                                        placeholder="Business name"
                                        value={formData.name}
                                    />
                                    <input
                                        onChange={e => setFormData({ ...formData, 'about': e.target.value })}
                                        placeholder="about"
                                        value={formData.about}
                                    />
                                    <input
                                        type="file"
                                        onChange={onChange}
                                    />
                                    <button onClick={createBusiness}>Save Data</button>
                                    <div style={{ marginBottom: 30 }}>
                                        {
                                            business.map(business => (
                                                <div key={business.id || business.name}>
                                                    <h2>{business.name}</h2>
                                                    <p>{business.about}</p>
                                                    <button onClick={() => deleteBusiness(business)}>Delete Info</button>
                                                    {
                                                        business.image && <img src={business.image} style={{ width: 150 , height: "auto" }} />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Card.Text>
                                <Card.Link className="text-left"><a href="#bussiness">Edit</a></Card.Link>
                            </Card.Body>
                        </Card>
                    </Row>
                </div>
            </Container>
        </Tab.Pane>
    )
}



export default Bussiness;