import moment from 'moment/moment'
import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap'
import { FormGroup, Form, Input, Row, Col } from 'reactstrap'
import decrypt from 'utils/Functions/decrypt'
import constants from 'utils/constants'

const ModalOttAppUpdate = props => {
  const { className } = props
  const [name, setName] = useState(props.item.name)
  const [lcnNo, setLcnNo] = useState(props.item.lcn_no)
  const [subscription, setSubscription] = useState(props.item.subscription)
  const [status, setStatus] = useState(props.item.status)
  const [link, setLink] = useState(props.item.link)
  const [oldImg, setOldImg] = useState(props.item.image)
  const [newImg, setNewImg] = useState()
  const [selectedImage, setSelectedImage] = useState(null)

  const [changeLogo, setChangeLogo] = useState(false)

  useEffect(() => {
    setName(props.item.name)
    setOldImg(props.item.image)
    setLcnNo(props.item.lcn_no)
    setSubscription(props.item.subscription)
    setStatus(props.item.status)
    setLink(props.item.link)
  }, [props.item])

  const postData = () => {
    props.modalUpdateOttApp(props.item.id, name, lcnNo, subscription, link, status, oldImg, newImg)
  }

  const handleImageChange = event => {
    setNewImg(event.target.files[0])
    const file = event.target.files[0] // Get the first selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file) // Create a URL for the selected image
      setSelectedImage(imageUrl) // Set the state with the URL
    }
  }
  const cancelHandler = () => {
    setNewImg(null)
    setSelectedImage(null)
    setChangeLogo(false)
  }

  return (
    <div>
      <Modal
        isOpen={props.modal_update}
        toggle={props.modal_update_close}
        className={className}
        // centered={true}
        backdrop='static'
        size='xl'
      >
        <ModalHeader toggle={props.modal_update_close}>
          UPDATE OTT APP
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={event => {
              event.preventDefault()
              postData()
            }}
          >
            <Row>
              <Col md='6'>
                <FormGroup>
                  <label>Name</label>
                  <Input
                    type='text'
                    name='name'
                    id='name'
                    required
                    defaultValue={props.item.name}
                    onChange={e => {
                      setName(e.target.value)
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md='6'>
                <FormGroup>
                  <label>LCN No*</label>
                  <Input
                    type='text'
                    name='lcn_no'
                    id='lcn_no'
                    required
                    defaultValue={props.item.lcn_no}
                    onChange={e => {
                      setLcnNo(e.target.value)
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md='6'>
                <FormGroup>
                  <label>Link*</label>
                  <Input
                    type='text'
                    name='link'
                    id='link'
                    required
                    defaultValue={props.item.link}
                    onChange={e => {
                      setLink(e.target.value)
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md='6' className=''>
                <FormGroup>
                  <label>Subscription*</label>
                  <Row>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type='radio'
                            name='subscription'
                            value='Paid'
                            required
                            defaultChecked={props.item.subscription == 'Paid'}
                            onChange={e => setSubscription(e.target.value)}
                          />{' '}
                          Paid
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type='radio'
                            name='subscription'
                            value='Free'
                            required
                            defaultChecked={props.item.subscription == 'Free'}
                            onChange={e => setSubscription(e.target.value)}
                          />
                          Free
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col md='6' className=''>
                <FormGroup>
                  <label>Status*</label>
                  <Row>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type='radio'
                            name='status'
                            value='Active'
                            required
                            defaultChecked={props.item.status == 'Active'}
                            onChange={e => setStatus(e.target.value)}
                          />{' '}
                          Active
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type='radio'
                            name='status'
                            value='Block'
                            required
                            defaultChecked={props.item.status == 'Block'}
                            onChange={e => setStatus(e.target.value)}
                          />
                          Block
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              {changeLogo == false ? (
                <Col md='6'>
                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <label>Image</label> <br />
                        <img
                          style={{
                            maxHeight: '200px',
                            maxWidth: '200px',
                            minHeight: '199px',
                            minWidth: '199px'
                          }}
                          src={constants.url + oldImg}
                        />
                      </FormGroup>
                    </Col>
                    <Col md='6' className='text-right'>
                      <Button
                        type='button'
                        onClick={() => {
                          setChangeLogo(true)
                        }}
                      >
                        Change
                      </Button>
                    </Col>
                  </Row>
                </Col>
              ) : null}
              {changeLogo ? (
                <>
                  <Col md='6'>
                    <Row>
                      <Col>
                        <label>Select Image</label>
                        <Input
                          type='file'
                          name='lang_image'
                          id='lang_image'
                          required
                          onChange={handleImageChange}
                        />
                      </Col>

                      <Col className='text-right'>
                        <Button
                          onClick={() => {
                            cancelHandler()
                          }}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  {selectedImage && (
                    <>
                      <Col md='6'></Col>
                      <Col md='6'>
                        <FormGroup>
                          <img
                            src={selectedImage}
                            alt='Selected'
                            style={{
                              maxHeight: '200px',
                              maxWidth: '200px',
                              minHeight: '199px',
                              minWidth: '199px'
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </>
                  )}
                </>
              ) : null}
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
export default ModalOttAppUpdate
