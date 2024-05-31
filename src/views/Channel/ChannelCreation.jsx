import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from 'reactstrap'
import { Button, FormGroup, Form, Input } from 'reactstrap'
import Loader from 'Loader/Loaderimage'
import Modalcableguy from 'Modalcableguy'
import error_img from 'img/error.png'
import success_img from 'img/success.png'
import decrypt from 'utils/Functions/decrypt'
import constants from 'utils/constants'
import { Link } from 'react-router-dom'
import { error } from 'jquery';

const ChannelCreation = (props) => {

  const [typeData, setTypeData] = useState([])

  const [selectedImage, setSelectedImage] = useState(null)

  const [channelName, setChannelName] = useState('')
  const [channelType, setChannelType] = useState('')
  const [channelImage, setChannelImage] = useState('')

  const getTypes = () => {

    fetch(constants.url + 'ott/all_type', {
      method: 'GET',
      headers: {
        x_access_token: localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result, 'result')
        setTypeData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getTypes()
  }, [])



  const handleImageChange = event => {
    setChannelImage(event.target.files[0])
    const file = event.target.files[0] // Get the first selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file) // Create a URL for the selected image
      setSelectedImage(imageUrl) // Set the state with the URL
    }
  }

  const postData = () => {
    const formData = new FormData();
    formData.append('channelName', channelName)
    formData.append('channelType', channelType)
    formData.append('channelImage', channelImage)
    formData.append('inserted_by', decrypt(localStorage.getItem('name')))


    // for (const pair of formData.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }

    // console.log(formData)

    fetch(constants.url + 'ott/add_channel', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        x_access_token: localStorage.getItem('token')
      },
      body: formData
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <div className='content'>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <CardHeader className='d-flex align-items-center justify-content-between'>
              <CardTitle tag='h5' style={{ color: '#007bff' }}>
                Channel Creation
              </CardTitle>
              <div className=''>
                <Link className='btn btn-primary' to={'/admin/channel'}>
                  All Channel
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
                      <label>Channel Name*</label>
                      <Input
                        type='text'
                        name='channel_name'
                        id='channel_name'
                        placeholder='Channel Name'
                        required
                        defaultValue={channelName}
                        onChange={e => setChannelName(e.target.value)}
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col md='6'>
                    <FormGroup>
                      <label>Channel Type*</label>
                      <Input
                        type='select'
                        name="channel_type"
                        id="channel_type"
                        defaultValue={channelType}
                        onChange={e => setChannelType(e.target.value)}
                      >
                        {typeData.map((v, i) => {
                          return (
                            <option key={i} value={v.id}>{v.name}</option>
                          )
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md='6'>
                    {/* <FormGroup> */}
                    <label>Channel Image*</label>
                    <Input
                      name='channel_image'
                      id='channel_image'
                      placeholder='Channel Image'
                      // autoComplete="off"
                      defaultValue={channelImage}
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
  );
}

export default ChannelCreation;
