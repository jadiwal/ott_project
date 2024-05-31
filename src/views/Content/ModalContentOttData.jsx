import moment from 'moment/moment'
import React, { useState, useEffect, useRef } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap'
import { FormGroup, Form, Input, Row, Col } from 'reactstrap'
import decrypt from 'utils/Functions/decrypt'
import constants from 'utils/constants'
import Loader from 'Loader/Loaderimage'
import Modalcableguy from 'Modalcableguy'
import error_img from 'img/error.png'
import success_img from 'img/success.png'

const ModalContentOttData = props => {
  // console.log(props);
  return (
    <div>
      <Modal
        isOpen={props.modelContentOttAppData}
        toggle={props.modelContentOttAppDataClose}
        // className={className}
        // centered={true}
        backdrop='static'
        size='xl'
      >
        <ModalHeader toggle={props.modelContentOttAppDataClose}>
          Content Ott Data
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={event => {
              event.preventDefault()
              //   postData()
            }}
          >
            <Row>
              <Col md='6'>
                <FormGroup>
                  <label>Content Url*</label>
                  <Input
                    type='text'
                    name='content_url'
                    id='content_url'
                    placeholder='Content URL'
                    // autoComplete="off"
                    // defaultValue={url}
                    required
                    // onChange={e => setUrl(e.target.value)}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md='6'>
                <FormGroup>
                  <label>Trailer Url*</label>
                  <Input
                    type='text'
                    name='content_trailer_url'
                    id='content_trailer_url'
                    placeholder='Content Trailer URL'
                    // autoComplete="off"
                    // defaultValue={trailer}
                    required
                    // onChange={e => setTrailer(e.target.value)}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md='6'>
                <FormGroup>
                  <label>Position*</label>
                  <Input
                    type='text'
                    name='position'
                    id='position'
                    placeholder='Position'
                    // autoComplete="off"
                    // defaultValue={position}
                    required
                    // onChange={e => setPostion(e.target.value)}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md='6' className=''>
                {/* <FormGroup> */}
                <label>Content Thumbnail*</label>
                <Input
                  name='content_thumbnail'
                  id='content_thumbnail'
                  required
                  type='file'
                  accept="image/png, image/gif, image/jpeg"  // Allow only image files
                  onChange={props.handleContentImageChange}
                ></Input>
                {/* </FormGroup> */}
              </Col>
              {props.selectedContenImage && (
                <>
                  <Col md='6'>
                    <div>
                      <img
                        src={props.selectedContenImage}
                        alt='Selected'
                        style={{
                          maxHeight: '300px',
                          maxWidth: '300px',
                          minHeight: '299px',
                          minWidth: '299px'
                        }}
                      />
                    </div>
                  </Col>
                </>
              )}
              <Col md='6' className=''>
                {/* <FormGroup> */}
                <label>Content Banner*</label>
                <Input
                  name='content_banner'
                  id='content_banner'
                  required
                  type='file'
                  accept="image/png, image/gif, image/jpeg"  // Allow only image files
                  onChange={props.handleContentBannerImageChange}
                ></Input>
                {/* </FormGroup> */}
              </Col>
              {props.selectedContenBannerImage && (
                <>
                  <Col md='6'>
                    <div>
                      <img
                        src={props.selectedContenBannerImage}
                        alt='Selected'
                        style={{
                          maxHeight: '300px',
                          maxWidth: '300px',
                          minHeight: '299px',
                          minWidth: '299px'
                        }}
                      />
                    </div>
                  </Col>
                </>
              )}
            </Row>

            <Button type='submit' color='primary'>
              Submit
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ModalContentOttData
