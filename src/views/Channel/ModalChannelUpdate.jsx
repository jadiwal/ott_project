import moment from 'moment/moment'
import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap'
import { FormGroup, Form, Input, Row, Col } from 'reactstrap'
import decrypt from 'utils/Functions/decrypt'
import constants from 'utils/constants'

const ModalChannelUpdate = (props) => {
  const { className } = props
  const [name, setName] = useState(props.item.name)
  const [type, setType] = useState(props.item.type)
  const [oldImg, setOldImg] = useState(props.item.image)
  const [newImg, setNewImg] = useState()
  const [selectedImage, setSelectedImage] = useState(null)

  const [changeLogo, setChangeLogo] = useState(false)

  useEffect(() => {
    setName(props.item.name)
    setType(props.item.type)
    setOldImg(props.item.image)
  }, [props.item])

  const postData = () => {
    props.modalUpdateGenre(
      props.item.id,
      name,
      type,
      oldImg,
      newImg
    )
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
  // console.log(props.typeDataz, 'sfsdfg')
  if (Array.isArray(props.typeData)) {
    let types = props.typeData;
    let d = types.map(v => v.name);
    console.log(d);
  } else {
    console.error("props.typeData is not an array or is undefined.");
  }
  let typeArr = Array.isArray(props.typeData)
  console.log(typeArr, 'arra')
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
          Update Channel
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
                  <label>Type</label>
                  <Input
                    type='select'
                    name='type'
                    id='type'
                    defaultValue={props.item.type}
                    onChange={e => {
                      setType(e.target.value)
                    }}
                  >

                   
                    {/* {props.typeData.map((v, i) => {
                          return (
                            <option key={i} value={v.id}>{v.name}</option>
                          )
                        })} */}
                  </Input>
                  {/* <Input
                          type='text'
                          name='type'
                          id='type'
                          required
                          defaultValue={props.item.type}
                          onChange={e => {
                            setName(e.target.value)
                          }}
                        /> */}
                </FormGroup>
              </Col>
              {/* <Col md='6'>
                      <FormGroup>
                        <label>Type</label>
                        <Input
                          type='select'
                          name='type'
                          id='type'
                          required
                          value={props.item.type}
                          onChange={e => {
                            setType(e.target.value)
                          }}
                          >
                                <option value=""></option>
                                <option value="music">Music</option>
                                <option value="movie">Movie</option>
                                <option value="series">Web Series</option>
                        </Input>
                      </FormGroup>
                    </Col>             */}
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
            <Button type='submit' color='primary'>Submit</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalChannelUpdate;
