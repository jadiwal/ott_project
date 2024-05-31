import React, { useState, useEffect } from 'react'
import moment from 'moment'

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from 'reactstrap'
import { Button, FormGroup, Form, Input } from 'reactstrap'
import Loader from 'Loader/Loaderimage'
import Modalcableguy from 'Modalcableguy'
import error_img from 'img/error.png'
import success_img from 'img/success.png'
import decrypt from 'utils/Functions/decrypt'
import constants from 'utils/constants'
import { Link } from 'react-router-dom'
// import LocationSelect from "components/ReusableComponent/LocationSelect";

const LanguageCreation = () => {
  const [header, setHeader] = useState('')
  const [modal, setModal] = useState(false)
  const [alertmessage, setAlertmessage] = useState('')
  const [alert_img, setAlert_img] = useState(null)
  const [loader, setLoader] = useState('none')

  const [langName, setLangName] = useState('')
  const [langImage, setLangImage] = useState('')

  const modal_close = () => {
    setModal(!modal)
    if (header.toUpperCase() == 'SUCCESS') {
      window.location.reload()
    }
  }

  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageChange = event => {
    setLangImage(event.target.files[0])
    const file = event.target.files[0] // Get the first selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file) // Create a URL for the selected image
      setSelectedImage(imageUrl) // Set the state with the URL
    }
  }

  const postData = () => {
    setLoader('block')

    const formData = new FormData()
    formData.append('lang', langName)
    formData.append('language_image', langImage)
    formData.append('inserted_by', decrypt(localStorage.getItem('name')))

      fetch(constants.url + 'ott/add_lang', {
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
                  Language Creation
                </CardTitle>
                <div className=''>
                  <Link className='btn btn-primary' to={'/admin/language'}>
                    All Language
                  </Link>
                </div>
                {/* <hr /> */}
              </CardHeader>
              <CardBody style={{}}>
                <Form
                  onSubmit={event => {
                    event.preventDefault()
                    postData();
                  }}
                >
                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <label>Language Name*</label>
                        <Input
                          type='text'
                          name='lang_name'
                          id='lang_name'
                          placeholder='Language Name'
                          // autoComplete="off"
                          defaultValue={langName}
                          required
                          onChange={e => setLangName(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      {/* <FormGroup> */}
                      <label>Language Image*</label>
                      <Input
                        name='lang_image'
                        id='lang_image'
                        placeholder='Language Image'
                        // autoComplete="off"
                        defaultValue={langImage}
                        required
                        type='file'
                        accept='image/*' // Allow only image files
                        onChange={handleImageChange}
                      ></Input>
                      {/* </FormGroup> */}
                    </Col>
                    {selectedImage && (
                      <>
                        <Col md='6'></Col>
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

export default LanguageCreation
