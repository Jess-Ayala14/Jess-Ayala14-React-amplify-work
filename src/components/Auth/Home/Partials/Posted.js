import React from 'react'
import { Tab, Nav } from 'react-bootstrap';

export const Posted = (loginFB) => {

    //const [loginFB, setlogin] = useState(false);

    return (
        <>
            <Tab.Pane eventKey="posted">
                <Tab.Container defaultActiveKey="facebook-posted">
                    <Nav variant="pills" defaultActiveKey="facebook-posted">
                        <Nav.Item>
                            <Nav.Link eventKey="facebook-posted">Facebook</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="instagram-posted">Instagram</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="twitter-posted">Twitter</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div className='socialM-content'>
                        <Tab.Content>
                            <Tab.Pane eventKey="facebook-posted">
                                {loginFB.dataFromParent === true

                                    ? <p>Facebook Posted</p>
                                    : <p>Please Login on Facebook</p>

                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="instagram-posted">
                                <p>Instagram Posted</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="twitter-posted">
                                <p>Twitter Posted</p>
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </Tab.Container>
            </Tab.Pane>
        </>
    )
}


export default Posted