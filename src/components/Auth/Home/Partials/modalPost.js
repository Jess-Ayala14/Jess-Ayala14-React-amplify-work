import React, { useState } from 'react';
import { Modal, Container, Row, Col, Form, Button }
    from 'react-bootstrap';

function modalPost(handleCloseP, setFormP, new_postP, onImageP, props) {

    const handleClose = handleCloseP.handleClose;
    const setFormData1 = setFormP.this.setFormData1;
    const new_post = new_postP.this.new_post;
    const onImageChange = onImageP.this.onImageChange;
    const show = props.show;
    const newPostData = props.newPostData;
    const img_form = props.img_form;
    const video_form = props.video_form;
    const eImgActive= props.eImgActive;
    const eVideoActive = props.eVideoActive;
    const eFileActive = props.eFileActive;

    return (
        <Modal show={show} onHide={handleClose}>
            <div className='modal-post'>
                <Modal.Header closeButton>
                    <Modal.Title>Post Something</Modal.Title>
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
                                    <video controls muted>
                                        <source src={video_form} />
                                    </video>
                                    :
                                    <></>
                                }
                                <Form.Label className={eImgActive ? "danger show" : "danger hide"}> Is not allowed Image size &gt; 8 MB</Form.Label>
                                <Form.Label className={eVideoActive ? "danger show" : "danger hide"}>Is not allowed Video size &gt; 8 GB</Form.Label>
                                <Form.Label className={eFileActive ? "danger show" : "danger hide"}> Only jpg, PNG and MP4 are allowed</Form.Label>
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
                    <Button variant="primary" disabled={eVideoActive || eImgActive || eFileActive ? true : false} onClick={new_post}>
                        Post
                    </Button>
                </Modal.Footer>
            </div>
        </Modal>

    );
}

export default modalPost;