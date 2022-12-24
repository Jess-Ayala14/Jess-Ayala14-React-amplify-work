import React, {useState} from 'react';
import { Modal,Container,Row } from 'react-bootstrap';
import loadimg from '../../../../storage/loader.gif';


function ModalLoading(props) {

    const show1 = props.data[0];
    const postingClose = props.data[1];

    return (
        <Modal show={show1} onHide={postingClose}>
        <div className='modal-post'>
            <Modal.Header closeButton>
                <Modal.Title>Posting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <img src={loadimg} style={{height:"150px", width:"auto"}} />
                    </Row>
                </Container>
            </Modal.Body>
        </div>
    </Modal>
    );
}

export default ModalLoading;