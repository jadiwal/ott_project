import React, { useState, useEffect } from 'react'
import moment from 'moment'

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Label
} from 'reactstrap'
import { Button, FormGroup, Form, Input } from 'reactstrap'
import Loader from 'Loader/Loaderimage'
import Modalcableguy from 'Modalcableguy'
import error_img from 'img/error.png'
import success_img from 'img/success.png'
import decrypt from 'utils/Functions/decrypt'
import constants from 'utils/constants'
import { Link } from 'react-router-dom'
// import LocationSelect from "components/ReusableComponent/LocationSelect";

const OttAppCreation = () => {
  const [header, setHeader] = useState('')
  const [modal, setModal] = useState(false)
  const [alertmessage, setAlertmessage] = useState('')
  const [alert_img, setAlert_img] = useState(null)
  const [loader, setLoader] = useState('none')

  const [ottAppName, setOttAppName] = useState('')
  const [ottAppImage, setOttAppImage] = useState('')
  const [lcnNo, setLcnNo] = useState('')
  const [subscription, setSubscription] = useState('paid')
  const [link, setLink] = useState('')

  const modal_close = () => {
    setModal(!modal)
    if (header.toUpperCase() == 'SUCCESS') {
      window.location.reload()
    }
  }

  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageChange = event => {
    setOttAppImage(event.target.files[0])
    const file = event.target.files[0] // Get the first selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file) // Create a URL for the selected image
      setSelectedImage(imageUrl) // Set the state with the URL
    }
  }

  const postData = () => {
    setLoader('block')

    const formData = new FormData()
    formData.append('name', ottAppName)
    formData.append('lcn_no', lcnNo)
    formData.append('ott_image', ottAppImage)
    formData.append('subscription', subscription)
    formData.append('status', 'Active')
    formData.append('link', link)
    formData.append('inserted_by', decrypt(localStorage.getItem('name')))

    if (ottAppName && ottAppName !== '') {
      fetch(constants.url + 'ott/add_ott_app', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          x_access_token: localStorage.getItem('token')
        },
        body: formData
      })
        .then(res => res.json())
        .then(
          result => {
            // // console.log(result);
            if (result.success == true) {
              setHeader('Success')
              setAlert_img(success_img)
              setLoader('none')
              setModal(true)
              setAlertmessage(result.msg)
            } else {
              setHeader('Error')
              setAlert_img(error_img)
              setLoader('none')
              setModal(true)
              setAlertmessage(result.msg)
            }
          },
          error => {
            // console.log(error);
            setHeader('Error')
            setAlert_img(error_img)
            setLoader('none')
            setModal(true)
            setAlertmessage('Something went wrong')
          }
        )
    } else {
      setHeader('Error')
      setAlert_img(error_img)
      setLoader('none')
      setModal(true)
      setAlertmessage('Name Not Valid')
    }
  }

  return (
    <>
      <Loader show={loader} />
      <div className='content'>
        <Modalcableguy
          header={header}
          open_v={modal}
          clicker={modal_close}
          alert_msg={alertmessage}
          img={alert_img}
        />
        <div className='row'>
          <div className='col-md-12'>
            <Card>
              <CardHeader className='d-flex align-items-center justify-content-between'>
                <CardTitle tag='h5' style={{ color: '#007bff' }}>
                  OTT Creation
                </CardTitle>
                <div className=''>
                  <Link className='btn btn-primary' to={'/admin/ott'}>
                    All Ott's
                  </Link>
                </div>
                {/* <hr /> */}
              </CardHeader>
              <CardBody style={{}}>
                <Form
                  onSubmit={event => {
                    event.preventDefault()
                    postData()
                  }}
                >
                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <label>Ott App Name*</label>
                        <Input
                          type='text'
                          name='ottApp_name'
                          id='ottApp_name'
                          placeholder='Ott App Name'
                          // autoComplete="off"
                          defaultValue={ottAppName}
                          required
                          onChange={e => setOttAppName(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <label>LCN No*</label>
                        <Input
                          type='text'
                          name='lcn_no'
                          id='lcn_no'
                          placeholder='LCN No'
                          // autoComplete="off"
                          defaultValue={lcnNo}
                          required
                          onChange={e => setLcnNo(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <label>Link*</label>
                        <Input
                          type='text'
                          name='link'
                          id='link'
                          placeholder='Link'
                          // autoComplete="off"
                          defaultValue={link}
                          required
                          onChange={e => setLink(e.target.value)}
                        ></Input>
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
                                  defaultChecked
                                  onChange={e =>
                                    setSubscription(e.target.value)
                                  }
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
                                  onChange={e =>
                                    setSubscription(e.target.value)
                                  }
                                />
                                Free
                              </Label>
                            </FormGroup>
                          </Col>
                          {/* <Col>
                            <FormGroup check>
                              <Label check>
                                <Input
                                  type='radio'
                                  name='gender'
                                  value='other'
                                  required
                                  onChange={e => setGender(e.target.value)}
                                />{' '}
                                Other
                              </Label>
                            </FormGroup>
                          </Col> */}
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      {/* <FormGroup> */}
                      <label>Ott App Image*</label>
                      <Input
                        name='ott_app_image'
                        id='ott_app_image'
                        placeholder='Ott App Image'
                        // autoComplete="off"
                        defaultValue={ottAppImage}
                        required
                        type='file'
                        accept='image/*' // Allow only image files
                        onChange={handleImageChange}
                      ></Input>
                      {/* </FormGroup> */}
                    </Col>
                    {selectedImage && (
                      <>
                        <Col md='6'>
                          <div>
                            <img
                              src={selectedImage}
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
                  <Button color='primary' type='submit'>
                    Submit
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default OttAppCreation
