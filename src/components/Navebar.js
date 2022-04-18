import React, { Component } from 'react'
import './Navebar.css'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify';
import { Navbar, Container, Nav, NavDropdown }
    from 'react-bootstrap';


export default class Navebar extends Component {
    handleLogOut = async event => {
        event.preventDefault();
        try {
            Auth.signOut();
            this.props.auth.setAuthStatus(false);
            this.props.auth.setUser(null);
        } catch (error) {
            console.log(error.message)
        }
    }
    render() {
        return (
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    {!this.props.auth.isAuthenticated && (
                        <Navbar.Brand href="/">Ali-Media</Navbar.Brand>
                    )}
                    {this.props.auth.isAuthenticated && (
                        <Navbar.Brand href="/Signup">Ali-Media</Navbar.Brand>
                    )}
                    <Navbar.Toggle aria-control="navbarScroll" />
                    <Navbar.Collapse id="basic-navbar-nav navbarScroll" >
                        {!this.props.auth.isAuthenticated && (
                            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                                <Nav.Link href="/">Welcome</Nav.Link>
                                <Nav.Link href="/About">About</Nav.Link>
                            </Nav>
                        )}
                        {this.props.auth.isAuthenticated && (
                            <Nav className="me-auto">
                                <Navbar.Text className='navbar-item'>
                                    {this.props.auth.isAuthenticated && this.props.auth.user && (
                                        <>Hello {this.props.auth.user.username}</>

                                    )}
                                </Navbar.Text>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            {!this.props.auth.isAuthenticated && (
                                <Nav.Link href="/Signup">Signup</Nav.Link>
                            )}
                            {this.props.auth.isAuthenticated && (
                                <NavDropdown title={"Options"}
                                    id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/Settings">Settings</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item ><AmplifySignOut /></NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        )
    }
}

