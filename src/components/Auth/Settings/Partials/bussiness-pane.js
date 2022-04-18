import React from 'react'
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { AmplifyLoadingSpinner } from '@aws-amplify/ui-react';
import { Container, Row, Tab, Card }
    from 'react-bootstrap';


const Bussiness = () => {
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
                                    <h6>About</h6>
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