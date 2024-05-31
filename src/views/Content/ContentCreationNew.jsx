import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import './ContentCreation.css'
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
import encrypt from 'utils/Functions/encrypt'
import ModalContentOttData from './ModalContentOttData'
// import LocationSelect from "components/ReusableComponent/LocationSelect";

const ContentCreationNew = () => {
  const [header, setHeader] = useState('')
  const [modal, setModal] = useState(false)
  const [alertmessage, setAlertmessage] = useState('')
  const [alert_img, setAlert_img] = useState(null)
  const [loader, setLoader] = useState('none')

  const modal_close = () => {
    setModal(!modal)
    if (header.toUpperCase() == 'SUCCESS') {
      window.location.reload()
    }
  }

  const [allOttData, setAllOttData] = useState()
  const getAllOtt = () => {
    setLoader('block')
    fetch(constants.url + 'ott/ott_app', {
      method: 'get',
      headers: {
        x_access_token: localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(
        result => {
          // console.log(result)
          // console.log(object);
          if (result.success === true) {
            setLoader('none')
            setAllOttData(result.data)
          } else {
            setAllOttData([])
            setHeader('Error')
            setAlert_img(error_img)
            setLoader('none')
            setModal(true)
            setAlertmessage(result.msg)
          }
        },
        error => {
          setAllOttData([])
          console.log(error)
          setHeader('Error')
          setAlert_img(error_img)
          setLoader('none')
          setModal(true)
          setAlertmessage('Something went wrong')
        }
      )
  }

  const [AllGenre, setAllGenre] = useState()
  const getAllGenre = () => {
    setLoader('block')
    fetch(constants.url + 'ott/all_genre', {
      method: 'get',
      headers: {
        x_access_token: localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(
        result => {
          //console.log(result)
          // console.log(object);
          if (result.success === true) {
            setLoader('none')
            setAllGenre(result.data)
          } else {
            setAllGenre([])
            setHeader('Error')
            setAlert_img(error_img)
            setLoader('none')
            setModal(true)
            setAlertmessage(result.msg)
          }
        },
        error => {
          setAllGenre([])
          console.log(error)
          setHeader('Error')
          setAlert_img(error_img)
          setLoader('none')
          setModal(true)
          setAlertmessage('Something went wrong')
        }
      )
  }

  const [AllLanguage, setAllLanguage] = useState()
  const getAllLanguage = () => {
    setLoader('block')
    fetch(constants.url + 'ott/all_lang', {
      method: 'get',
      headers: {
        x_access_token: localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(
        result => {
          //console.log(result)
          // console.log(object);
          if (result.success === true) {
            setLoader('none')
            setAllLanguage(result.data)
          } else {
            setAllLanguage([])
            setHeader('Error')
            setAlert_img(error_img)
            setLoader('none')
            setModal(true)
            setAlertmessage(result.msg)
          }
        },
        error => {
          setAllLanguage([])
          console.log(error)
          setHeader('Error')
          setAlert_img(error_img)
          setLoader('none')
          setModal(true)
          setAlertmessage('Something went wrong')
        }
      )
  }

  useState(() => {
    getAllOtt()
    getAllGenre()
    getAllLanguage()
  }, [])

  const [contentName, setContentName] = useState('')
  const [contentImage, setContentImage] = useState('')
  const [contentBanner, setContentBanner] = useState('')
  const [url, setUrl] = useState()
  const [trailer, setTrailer] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState()
  const [contentLcnNo, setContentLcnNo] = useState('')
  const [subscription, setSubscription] = useState('paid')
  const [position, setPostion] = useState()
  const [minimunAge, setMinimumAge] = useState()
  const [contentRealiseDate, setContentRealiseDate] = useState()

  const [selectedContenImage, setSelectedContentImage] = useState(null)
  const [selectedContenBannerImage, setSelectedContentBannerImage] =
    useState(null)

  const handleContentImageChange = event => {
    setContentImage(event.target.files[0])
    const file = event.target.files[0] // Get the first selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file) // Create a URL for the selected image
      setSelectedContentImage(imageUrl) // Set the state with the URL
    }
  }

  const handleContentBannerImageChange = event => {
    setContentBanner(event.target.files[0])
    const file = event.target.files[0] // Get the first selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file) // Create a URL for the selected image
      setSelectedContentBannerImage(imageUrl) // Set the state with the URL
    }
  }

  const postData = () => {
    setLoader('block')

    const formData = new FormData()
    formData.append('name', contentName)
    formData.append('content_image', contentImage)
    formData.append('content_banner', contentBanner)
    formData.append('trailer', trailer)
    formData.append('type', type)
    formData.append('content_lcn_no', contentLcnNo)
    formData.append('subscription', subscription)
    formData.append('description', description)
    formData.append('status', 'Active')
    formData.append('position', position)
    formData.append('content_release_date', contentRealiseDate)
    formData.append('ua', minimunAge)
    formData.append('url', url)
    formData.append('ott', JSON.stringify(selectedOtt))
    formData.append('genre', JSON.stringify(selectedGenre))
    formData.append('language', JSON.stringify(selectedLanguage))
    formData.append('subtitle', JSON.stringify(selectedSubtitle))
    formData.append('inserted_by', decrypt(localStorage.getItem('name')))

    // const data = {};
    // formData.forEach((value, key) => {
    // data[key] = value
    // console.log(`Key: ${key}, Value: ${value}`);
    // });
    // console.log(data);

    if (contentName && contentName !== '') {
      fetch(constants.url + 'ott/add_content_test', {
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

  const [isGenreVisible, setGenreVisible] = useState(false)
  const divGenreRef = useRef(null)

  useEffect(() => {
    function handleGenreClickOutside (event) {
      if (divGenreRef.current && !divGenreRef.current.contains(event.target)) {
        // Clicked outside the div, hide it
        setGenreVisible(false)
      }
    }

    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleGenreClickOutside)

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleGenreClickOutside)
    }
  }, [])

  const [selectedGenre, setSelectedGenre] = useState([])
  const selectGenreHandler = e => {
    var temp = selectedGenre
    if (temp.length == 0) {
      if (e.target.checked == true) {
        temp.push(e.target.value)
      }
    } else {
      var tempIndex = temp.indexOf(e.target.value)
      if (tempIndex == -1) {
        temp.push(e.target.value)
      } else {
        temp.splice(tempIndex, 1)
      }
    }
    setSelectedGenre([...temp])
  }

  const [isOttVisible, setOttVisible] = useState(false)
  const divOttRef = useRef(null)

  useEffect(() => {
    function handleOttClickOutside (event) {
      if (divOttRef.current && !divOttRef.current.contains(event.target)) {
        // Clicked outside the div, hide it
        setOttVisible(false)
      }
    }

    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleOttClickOutside)

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOttClickOutside)
    }
  }, [])

  const [selectedOtt, setSelectedOtt] = useState([])
  const selectOttHandler = e => {
    console.log('called')
    var temp = selectedOtt
    if (temp.length == 0) {
      if (e.target.checked == true) {
        console.log(e.target.checked + ' = ' + e.target.value)
        modelContentOttAppDataShow(e.target.value)
        temp.push(e.target.value)
      }
    } else {
      var tempIndex = temp.indexOf(e.target.value)
      if (tempIndex == -1) {
        temp.push(e.target.value)
        modelContentOttAppDataShow(e.target.value)
      } else {
        temp.splice(tempIndex, 1)
      }
    }
    setSelectedOtt([...temp])
  }

  console.log(selectedOtt)

  const [isLanguageVisible, setLanguageVisible] = useState(false)
  const divLanguageRef = useRef(null)

  useEffect(() => {
    function handleLanguageClickOutside (event) {
      if (
        divLanguageRef.current &&
        !divLanguageRef.current.contains(event.target)
      ) {
        // Clicked outside the div, hide it
        setLanguageVisible(false)
      }
    }

    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleLanguageClickOutside)

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleLanguageClickOutside)
    }
  }, [])

  const [selectedLanguage, setSelectedLanguage] = useState([])
  const selectLanguageHandler = e => {
    var temp = selectedLanguage
    if (temp.length == 0) {
      if (e.target.checked == true) {
        temp.push(e.target.value)
      }
    } else {
      var tempIndex = temp.indexOf(e.target.value)
      if (tempIndex == -1) {
        temp.push(e.target.value)
      } else {
        temp.splice(tempIndex, 1)
      }
    }
    setSelectedLanguage([...temp])
  }

  const [isSubtitleVisible, setSubtitleVisible] = useState(false)
  const divSubtitleRef = useRef(null)

  useEffect(() => {
    function handleSubtitleClickOutside (event) {
      if (
        divSubtitleRef.current &&
        !divSubtitleRef.current.contains(event.target)
      ) {
        // Clicked outside the div, hide it
        setSubtitleVisible(false)
      }
    }

    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleSubtitleClickOutside)

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleSubtitleClickOutside)
    }
  }, [])

  const [selectedSubtitle, setSelectedSubtitle] = useState([])
  const selectSubtitleHandler = e => {
    var temp = selectedSubtitle
    if (temp.length == 0) {
      if (e.target.checked == true) {
        temp.push(e.target.value)
      }
    } else {
      var tempIndex = temp.indexOf(e.target.value)
      if (tempIndex == -1) {
        temp.push(e.target.value)
      } else {
        temp.splice(tempIndex, 1)
      }
    }
    setSelectedSubtitle([...temp])
  }

  const [modelContentOttAppData, setModelContentOttAppData] = useState(false)
  const [item, setItem] = useState([])

  const modelContentOttAppDataClose = () => {
    setItem([])
    setModelContentOttAppData(false)
  }

  const modelContentOttAppDataShow = items_ => {
    setModelContentOttAppData(true)
    setItem(items_)
  }

  console.log(modelContentOttAppData)
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
        <ModalContentOttData
          modelContentOttAppData={modelContentOttAppData}
          modelContentOttAppDataClose={modelContentOttAppDataClose}
          handleContentImageChange={handleContentImageChange}
          selectedContenImage={selectedContenImage}
          handleContentBannerImageChange={handleContentBannerImageChange}
          selectedContenBannerImage={selectedContenBannerImage}
        />
        <div className='row'>
          <div className='col-md-12'>
            <Card>
              <CardHeader className='d-flex align-items-center justify-content-between'>
                <CardTitle tag='h5' style={{ color: '#007bff' }}>
                  Content Creation
                </CardTitle>
                <div className=''>
                  <Link className='btn btn-primary' to={'/admin/content'}>
                    All Content
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
                        <label>Content Name*</label>
                        <Input
                          type='text'
                          name='content_name'
                          id='content_name'
                          placeholder='Content Name'
                          // autoComplete="off"
                          defaultValue={contentName}
                          required
                          onChange={e => setContentName(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <label>Select Ott*</label>
                        <div className='multiselect w-100'>
                          <div
                            className='selectBox'
                            onClick={() => {
                              setOttVisible(!isOttVisible)
                            }}
                          >
                            <select
                              style={{ height: '40px' }}
                              className='form-control'
                            >
                              <option>
                                {!selectedOtt ||
                                  (selectedOtt.length == 0 && 'Select')}{' '}
                                {allOttData &&
                                  allOttData.length !== 0 &&
                                  allOttData.map(
                                    item =>
                                      selectedOtt &&
                                      selectedOtt.includes(`${item.id}`) &&
                                      `${item.name}, `
                                  )}
                              </option>
                            </select>
                            <div className='overSelect'></div>
                          </div>
                          {isOttVisible && (
                            <div className={`selectOptionDiv`}>
                              <div
                                ref={divOttRef}
                                className='d-flex flex-column pt-2'
                              >
                                {allOttData && allOttData.length !== 0
                                  ? allOttData.map((item, index) => {
                                      return (
                                        <>
                                          <FormGroup key={index} check>
                                            <Label check>
                                              <Input
                                                type='checkbox'
                                                id={index}
                                                defaultValue={item.id}
                                                defaultChecked={
                                                  selectedOtt &&
                                                  selectedOtt.includes(
                                                    `${item.id}`
                                                  )
                                                }
                                                className='mr-2'
                                                onClick={selectOttHandler}
                                              />{' '}
                                              {item.name}
                                            </Label>
                                          </FormGroup>
                                        </>
                                      )
                                    })
                                  : null}
                              </div>
                            </div>
                          )}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <label>Content LCN No*</label>
                        <Input
                          type='text'
                          name='content_lcn_no'
                          id='content_lcn_no'
                          placeholder='Content LCN No'
                          // autoComplete="off"
                          defaultValue={contentLcnNo}
                          required
                          onChange={e => setContentLcnNo(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <label>Content Url*</label>
                        <Input
                          type='text'
                          name='content_url'
                          id='content_url'
                          placeholder='Content URL'
                          // autoComplete="off"
                          defaultValue={url}
                          required
                          onChange={e => setUrl(e.target.value)}
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
                          defaultValue={trailer}
                          required
                          onChange={e => setTrailer(e.target.value)}
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
                        </Row>
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
                          defaultValue={position}
                          required
                          onChange={e => setPostion(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <label>Select Genre*</label>
                        <div className='multiselect w-100'>
                          <div
                            className='selectBox'
                            onClick={() => {
                              setGenreVisible(!isGenreVisible)
                            }}
                          >
                            <select
                              style={{ height: '40px' }}
                              className='form-control'
                            >
                              <option>
                                {!selectedGenre ||
                                  (selectedGenre.length == 0 && 'Select')}{' '}
                                {AllGenre &&
                                  AllGenre.length !== 0 &&
                                  AllGenre.map(
                                    item =>
                                      selectedGenre &&
                                      selectedGenre.includes(`${item.id}`) &&
                                      `${item.name}, `
                                  )}
                              </option>
                            </select>
                            <div className='overSelect'></div>
                          </div>
                          {isGenreVisible && (
                            <div className={`selectOptionDiv`}>
                              <div
                                ref={divGenreRef}
                                className='d-flex flex-column pt-2'
                              >
                                {AllGenre && AllGenre.length !== 0
                                  ? AllGenre.map((item, index) => {
                                      return (
                                        <>
                                          <FormGroup key={index} check>
                                            <Label check>
                                              <Input
                                                type='checkbox'
                                                id={index}
                                                defaultValue={item.id}
                                                defaultChecked={
                                                  selectedGenre &&
                                                  selectedGenre.includes(
                                                    `${item.id}`
                                                  )
                                                }
                                                className='mr-2'
                                                onClick={selectGenreHandler}
                                              />{' '}
                                              {item.name}
                                            </Label>
                                          </FormGroup>
                                        </>
                                      )
                                    })
                                  : null}
                              </div>
                            </div>
                          )}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <label>Select Language*</label>
                        <div className='multiselect w-100'>
                          <div
                            className='selectBox'
                            onClick={() => {
                              setLanguageVisible(!isLanguageVisible)
                            }}
                          >
                            <select
                              style={{ height: '40px' }}
                              className='form-control'
                            >
                              <option>
                                {!selectedLanguage ||
                                  (selectedLanguage.length == 0 &&
                                    'Select')}{' '}
                                {AllLanguage &&
                                  AllLanguage.length !== 0 &&
                                  AllLanguage.map(
                                    item =>
                                      selectedLanguage &&
                                      selectedLanguage.includes(`${item.id}`) &&
                                      `${item.name}, `
                                  )}
                              </option>
                            </select>
                            <div className='overSelect'></div>
                          </div>
                          {isLanguageVisible && (
                            <div className={`selectOptionDiv`}>
                              <div
                                ref={divLanguageRef}
                                className='d-flex flex-column pt-2'
                              >
                                {AllLanguage && AllLanguage.length !== 0
                                  ? AllLanguage.map((item, index) => {
                                      return (
                                        <>
                                          <FormGroup key={index} check>
                                            <Label check>
                                              <Input
                                                type='checkbox'
                                                id={index}
                                                defaultValue={item.id}
                                                defaultChecked={
                                                  selectedLanguage &&
                                                  selectedLanguage.includes(
                                                    `${item.id}`
                                                  )
                                                }
                                                className='mr-2'
                                                onClick={selectLanguageHandler}
                                              />{' '}
                                              {item.name}
                                            </Label>
                                          </FormGroup>
                                        </>
                                      )
                                    })
                                  : null}
                              </div>
                            </div>
                          )}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <label>Select Subtitle*</label>
                        <div className='multiselect w-100'>
                          <div
                            className='selectBox'
                            onClick={() => {
                              setSubtitleVisible(!isSubtitleVisible)
                            }}
                          >
                            <select
                              style={{ height: '40px' }}
                              className='form-control'
                            >
                              <option>
                                {!selectedSubtitle ||
                                  (selectedSubtitle.length == 0 &&
                                    'Select')}{' '}
                                {AllLanguage &&
                                  AllLanguage.length !== 0 &&
                                  AllLanguage.map(
                                    item =>
                                      selectedSubtitle &&
                                      selectedSubtitle.includes(`${item.id}`) &&
                                      `${item.name}, `
                                  )}
                              </option>
                            </select>
                            <div className='overSelect'></div>
                          </div>
                          {isSubtitleVisible && (
                            <div className={`selectOptionDiv`}>
                              <div
                                ref={divSubtitleRef}
                                className='d-flex flex-column pt-2'
                              >
                                {AllLanguage && AllLanguage.length !== 0
                                  ? AllLanguage.map((item, index) => {
                                      return (
                                        <>
                                          <FormGroup key={index} check>
                                            <Label check>
                                              <Input
                                                type='checkbox'
                                                id={index}
                                                defaultValue={item.id}
                                                defaultChecked={
                                                  selectedSubtitle &&
                                                  selectedSubtitle.includes(
                                                    `${item.id}`
                                                  )
                                                }
                                                className='mr-2'
                                                onClick={selectSubtitleHandler}
                                              />{' '}
                                              {item.name}
                                            </Label>
                                          </FormGroup>
                                        </>
                                      )
                                    })
                                  : null}
                              </div>
                            </div>
                          )}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <label>Description *</label>
                        <Input
                          type='textarea'
                          name='description'
                          id='description'
                          style={{ minHeight: '190px' }}
                          placeholder='Description'
                          values={description}
                          onChange={e => setDescription(e.target.value)}
                          // required
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <Row>
                        <Col md='12' sm='12' xl='12' xs='12'>
                          <FormGroup>
                            <label>Age Limitation *</label>
                            <Input
                              type='select'
                              name='minimumAge'
                              id='minimumAge'
                              placeholder='minimumAge'
                              values={minimunAge}
                              onChange={e => setMinimumAge(e.target.value)}
                              // required
                            >
                              {/* <select style={{ height: '40px' }} className='form-control'> */}
                              <option>Select</option>
                              <option value={'8+'}>8+</option>
                              <option value={'12+'}>12+</option>
                              <option value={'16+'}>16+</option>
                              <option value={'18+'}>18+</option>
                              {/* </select> */}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md='12' sm='12' xl='12' xs='12'>
                          <FormGroup>
                            <label>Content Type *</label>
                            <Input
                              type='select'
                              name='content_type'
                              id='content_type'
                              placeholder='content_type'
                              values={type}
                              onChange={e => setType(e.target.value)}
                              // required
                            >
                              {/* <select style={{ height: '40px' }} className='form-control'> */}
                              <option>Select</option>
                              <option value={'Movie'}>Movies</option>
                              <option value={'Web Series'}>Web Series</option>
                              {/* </select> */}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md='12' sm='12' xl='12' xs='12'>
                          <FormGroup>
                            <label>Content Realise Date*</label>
                            <Input
                              type='date'
                              name='content_realise_date'
                              id='content_realise_date'
                              placeholder='content_realise_date'
                              values={contentRealiseDate}
                              onChange={e =>
                                setContentRealiseDate(e.target.value)
                              }
                              // required
                            ></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col md='6' className=''>
                      {/* <FormGroup> */}
                      <label>Content Thumbnail*</label>
                      <Input
                        name='content_thumbnail'
                        id='content_thumbnail'
                        required
                        type='file'
                        accept='image/*' // Allow only image files
                        onChange={handleContentImageChange}
                      ></Input>
                      {/* </FormGroup> */}
                    </Col>
                    {selectedContenImage && (
                      <>
                        <Col md='6'>
                          <div>
                            <img
                              src={selectedContenImage}
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
                        accept='image/*' // Allow only image files
                        onChange={handleContentBannerImageChange}
                      ></Input>
                      {/* </FormGroup> */}
                    </Col>
                    {selectedContenBannerImage && (
                      <>
                        <Col md='6'>
                          <div>
                            <img
                              src={selectedContenBannerImage}
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

export default ContentCreationNew
