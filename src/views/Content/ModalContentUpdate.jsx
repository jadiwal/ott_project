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

const ModalContentUpdate = props => {
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

  const { className } = props
  const [contentName, setContentName] = useState(props.item.name)
  const [url, setUrl] = useState(props.item.url)
  const [trailer, setTrailer] = useState(props.item.trailer)
  const [type, setType] = useState(props.item.type)
  const [genre, setGenre] = useState(props.item.genre)
  const [language, setLanguage] = useState(props.item.language)
  const [subtitle, setSubtitle] = useState(props.item.subtitle)
  const [description, setDescription] = useState(props.item.description)
  const [ottApp, setOttApp] = useState(props.item.ottData)
  const [contentLcnNo, setContentLcnNo] = useState(props.item.content_lcn_no)
  const [subscription, setSubscription] = useState(props.item.subscription)
  const [position, setPostion] = useState(props.item.position)
  const [minimunAge, setMinimumAge] = useState(props.item.ua)
  const [contentRealiseDate, setContentRealiseDate] = useState(
    props.item.content_release_date
  )
  const [status, setStatus] = useState(props.item.status)
  const [newContentPoster, setNewContentPoster] = useState()
  const [selectedPoster, setSelectedPoster] = useState(null)
  const [changePoster, setChangePoster] = useState(false)

  const handlePosterChange = event => {
    setNewContentPoster(event.target.files[0])
    const file = event.target.files[0] // Get the first selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file) // Create a URL for the selected image
      setSelectedPoster(imageUrl) // Set the state with the URL
    }
  }
  const PosterCancelHandler = () => {
    setNewContentPoster(null)
    setSelectedPoster(null)
    setChangePoster(false)
  }
  useEffect(() => {
    setContentName(props.item.name)
    setOldContentImg(props.item.image)
    setOldContentBanner(props.item.banner)
    setOldPosterImg(props.item.poster_img)
    setUrl(props.item.url)
    setTrailer(props.item.trailer)
    setType(props.item.type)
    setGenre(props.item.genre)
    setLanguage(props.item.language)
    setSubtitle(props.item.subtitle)
    setDescription(props.item.description)
    // setSelectedOtt(props.item.ottData)
    setContentLcnNo(props.item.content_lcn_no)
    setSubscription(props.item.subscription)
    setPostion(props.item.position)
    setMinimumAge(props.item.ua)
    setContentRealiseDate(props.item.content_release_date)
    setStatus(props.item.status)
  }, [props.item])

  useEffect(() => {
    if (props.item.ottData && props.item.ottData.length !== 0) {
      const extractedIds = props.item.ottData.map(item => `${item.id}`)
      setSelectedOtt(extractedIds)
    }
    if (props.item.genreData && props.item.genreData.length !== 0) {
      const extractedIds = props.item.genreData.map(item => `${item.id}`)
      setSelectedGenre(extractedIds)
    }
    if (props.item.langData && props.item.langData.length !== 0) {
      const extractedIds = props.item.langData.map(item => `${item.id}`)
      setSelectedLanguage(extractedIds)
    }
    if (props.item.subtitleData && props.item.subtitleData.length !== 0) {
      const extractedIds = props.item.subtitleData.map(item => `${item.id}`)
      setSelectedSubtitle(extractedIds)
    }
  }, [props.item.ottData])

  const [oldContentImg, setOldContentImg] = useState(props.item.image)
  const [newContentImg, setNewContentImg] = useState()
  const [selectedContentImage, setSelectedContentImage] = useState(null)
  const [changeContentImg, setChangeContentImg] = useState(false)

  const handleContentImageChange = event => {
    setNewContentImg(event.target.files[0])
    const file = event.target.files[0] // Get the first selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file) // Create a URL for the selected image
      setSelectedContentImage(imageUrl) // Set the state with the URL
    }
  }
  const contentImgCancelHandler = () => {
    setNewContentImg(null)
    setSelectedContentImage(null)
    setChangeContentImg(false)
  }

  const [oldContentBanner, setOldContentBanner] = useState(props.item.banner)
  const [oldPosterImg, setOldPosterImg] = useState(props.item.poster_img)
  const [newContentBanner, setNewContentBanner] = useState()
  const [selectedContentBanner, setSelectedContentBanner] = useState(null)
  const [changeContentBanner, setChangeContentBanner] = useState(false)

  const handleContentBannerChange = event => {
    setNewContentBanner(event.target.files[0])
    const file = event.target.files[0] // Get the first selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file) // Create a URL for the selected image
      setSelectedContentBanner(imageUrl) // Set the state with the URL
    }
  }
  const contentBannerCancelHandler = () => {
    setNewContentBanner(null)
    setSelectedContentBanner(null)
    setChangeContentBanner(false)
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
    var temp = selectedOtt
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
    setSelectedOtt([...temp])
  }

  const [allGenreData, setAllGenreData] = useState()
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
          console.log(result)
          // console.log(object);
          if (result.success === true) {
            setLoader('none')
            setAllGenreData(result.data)
          } else {
            setAllGenreData([])
            setHeader('Error')
            setAlert_img(error_img)
            setLoader('none')
            setModal(true)
            setAlertmessage(result.msg)
          }
        },
        error => {
          setAllGenreData([])
          console.log(error)
          setHeader('Error')
          setAlert_img(error_img)
          setLoader('none')
          setModal(true)
          setAlertmessage('Something went wrong')
        }
      )
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

  const [allLanguageData, setAllLanguageData] = useState()
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
          console.log(result)
          // console.log(object);
          if (result.success === true) {
            setLoader('none')
            setAllLanguageData(result.data)
          } else {
            setAllLanguageData([])
            setHeader('Error')
            setAlert_img(error_img)
            setLoader('none')
            setModal(true)
            setAlertmessage(result.msg)
          }
        },
        error => {
          setAllLanguageData([])
          console.log(error)
          setHeader('Error')
          setAlert_img(error_img)
          setLoader('none')
          setModal(true)
          setAlertmessage('Something went wrong')
        }
      )
  }

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

  useState(() => {
    getAllOtt()
    getAllGenre()
    getAllLanguage()
  }, [])

  console.log(selectedOtt)
  // console.log(props && props.item.ottData ? [...props.item.ottData.id] : null)

  const postData = () => {
    props.modalUpdateContent(
      props.item.id,
      contentName,
      contentLcnNo,
      url,
      trailer,
      subscription,
      position,
      description,
      minimunAge,
      type,
      contentRealiseDate,
      status,
      selectedOtt,
      selectedGenre,
      selectedLanguage,
      selectedSubtitle,
      oldContentImg,
      oldPosterImg,
      newContentImg,
      oldContentBanner,
      newContentBanner,
      newContentPoster
    )
  }

  return (
    <div>
      <Loader show={loader} />
      <Modalcableguy
        header={header}
        open_v={modal}
        clicker={modal_close}
        alert_msg={alertmessage}
        img={alert_img}
      />
      <Modal
        isOpen={props.modal_update}
        toggle={props.modal_update_close}
        className={className}
        // centered={true}
        backdrop='static'
        size='xl'
      >
        <ModalHeader toggle={props.modal_update_close}>
          UPDATE LANGUAGE
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={event => {
              event.preventDefault()
              postData()
            }}
          >
            <Row>
              <Col>
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
                            onChange={e => setSubscription(e.target.value)}
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
                  <label>Description *</label>
                  <Input
                    type='textarea'
                    name='description'
                    id='description'
                    style={{ minHeight: '190px' }}
                    placeholder='Description'
                    defaultValue={description}
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
                        defaultValue={minimunAge}
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
                        defaultValue={type}
                        onChange={e => setType(e.target.value)}
                        // required
                      >
                        {/* <select style={{ height: '40px' }} className='form-control'> */}
                        <option>Select</option>
                        <option value='movie'>Movie</option>
                        <option value='web_series'>Web Series</option>
                        <option value='ott'>Ott</option>
                        <option value='game'>Game</option>
                        <option value='education'>Education</option>
                        <option value='medical'>Medical</option>
                        <option value='music'>Music</option>
                        <option value='fm_radio'>Fm Radio</option>
                        <option value='magazine'>Magazine</option>
                        <option value='audiobook'>AudioBook</option>
                        <option value='podcast'>Podcast</option>
                        <option value='newspapar'>Newspapar</option>
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
                        defaultValue={contentRealiseDate}
                        onChange={e => setContentRealiseDate(e.target.value)}
                        // required
                      ></Input>
                    </FormGroup>
                  </Col>
                </Row>
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
                            defaultChecked={status == 'Active' ? true : null}
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
                            defaultChecked={status == 'Block' ? true : null}
                            onChange={e => setStatus(e.target.value)}
                          />
                          Block
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col md='6'>
                <FormGroup>
                  <label>Select Ott*</label>
                  <div className='multiselect w-100'>
                    <div
                      className='selectBox'
                      onClick={() => setOttVisible(!isOttVisible)}
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
                          {allOttData &&
                            allOttData.length !== 0 &&
                            allOttData.map((item, index) => {
                              return (
                                <>
                                  <FormGroup key={index} check>
                                    <Label check>
                                      <Input
                                        type='checkbox'
                                        id={index}
                                        defaultChecked={
                                          selectedOtt &&
                                          selectedOtt.includes(`${item.id}`)
                                        }
                                        defaultValue={`${item.id}`}
                                        className='mr-2'
                                        onClick={selectOttHandler}
                                      />
                                      {item.name}
                                    </Label>
                                  </FormGroup>
                                </>
                              )
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col md='6'>
                <FormGroup>
                  <label>Select Genre*</label>
                  <div className='multiselect w-100'>
                    <div
                      className='selectBox'
                      onClick={() => setGenreVisible(!isGenreVisible)}
                    >
                      <select
                        style={{ height: '40px' }}
                        className='form-control'
                      >
                        <option>
                          {!selectedGenre ||
                            (selectedGenre.length == 0 && 'Select')}{' '}
                          {allGenreData &&
                            allGenreData.length !== 0 &&
                            allGenreData.map(
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
                          {allGenreData &&
                            allGenreData.length !== 0 &&
                            allGenreData.map((item, index) => {
                              return (
                                <>
                                  <FormGroup key={index} check>
                                    <Label check>
                                      <Input
                                        type='checkbox'
                                        id={index}
                                        defaultChecked={
                                          selectedGenre &&
                                          selectedGenre.includes(`${item.id}`)
                                        }
                                        defaultValue={`${item.id}`}
                                        className='mr-2'
                                        onClick={selectGenreHandler}
                                      />
                                      {item.name}
                                    </Label>
                                  </FormGroup>
                                </>
                              )
                            })}
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
                      onClick={() => setLanguageVisible(!isLanguageVisible)}
                    >
                      <select
                        style={{ height: '40px' }}
                        className='form-control'
                      >
                        <option>
                          {!selectedLanguage ||
                            (selectedLanguage.length == 0 && 'Select')}{' '}
                          {allLanguageData &&
                            allLanguageData.length !== 0 &&
                            allLanguageData.map(
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
                          {allLanguageData &&
                            allLanguageData.length !== 0 &&
                            allLanguageData.map((item, index) => {
                              return (
                                <>
                                  <FormGroup key={index} check>
                                    <Label check>
                                      <Input
                                        type='checkbox'
                                        id={index}
                                        defaultChecked={
                                          selectedLanguage &&
                                          selectedLanguage.includes(
                                            `${item.id}`
                                          )
                                        }
                                        defaultValue={`${item.id}`}
                                        className='mr-2'
                                        onClick={selectLanguageHandler}
                                      />
                                      {item.name}
                                    </Label>
                                  </FormGroup>
                                </>
                              )
                            })}
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
                      onClick={() => setSubtitleVisible(!isSubtitleVisible)}
                    >
                      <select
                        style={{ height: '40px' }}
                        className='form-control'
                      >
                        <option>
                          {!selectedSubtitle ||
                            (selectedSubtitle.length == 0 && 'Select')}{' '}
                          {allLanguageData &&
                            allLanguageData.length !== 0 &&
                            allLanguageData.map(
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
                          {allLanguageData &&
                            allLanguageData.length !== 0 &&
                            allLanguageData.map((item, index) => {
                              return (
                                <>
                                  <FormGroup key={index} check>
                                    <Label check>
                                      <Input
                                        type='checkbox'
                                        id={index}
                                        defaultChecked={
                                          selectedSubtitle &&
                                          selectedSubtitle.includes(
                                            `${item.id}`
                                          )
                                        }
                                        defaultValue={`${item.id}`}
                                        className='mr-2'
                                        onClick={selectSubtitleHandler}
                                      />
                                      {item.name}
                                    </Label>
                                  </FormGroup>
                                </>
                              )
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                </FormGroup>
              </Col>
              {changeContentImg == false ? (
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
                          src={constants.url + oldContentImg}
                        />
                      </FormGroup>
                    </Col>
                    <Col md='6' className='text-right'>
                      <Button
                        type='button'
                        onClick={() => {
                          setChangeContentImg(true)
                        }}
                      >
                        Change
                      </Button>
                    </Col>
                  </Row>
                </Col>
              ) : null}
              {changeContentImg ? (
                <>
                  <Col md='6'>
                    <Row>
                      <Col>
                        <label>Select Image</label>
                        <Input
                          type='file'
                          name='content_image'
                          id='content_image'
                          required
                          onChange={handleContentImageChange}
                        />
                      </Col>
                      <Col className='text-right'>
                        <Button
                          onClick={() => {
                            contentImgCancelHandler()
                          }}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  {selectedContentImage && (
                    <>
                      <Col md='6'>
                        <FormGroup>
                          <img
                            src={selectedContentImage}
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
              {changeContentBanner == false ? (
                <Col md='6'>
                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <label>Banner Image</label> <br />
                        <img
                          style={{
                            maxHeight: '200px',
                            maxWidth: '200px',
                            minHeight: '199px',
                            minWidth: '199px'
                          }}
                          src={constants.url + oldContentBanner}
                        />
                      </FormGroup>
                    </Col>
                    <Col md='6' className='text-right'>
                      <Button
                        type='button'
                        onClick={() => {
                          setChangeContentBanner(true)
                        }}
                      >
                        Change
                      </Button>
                    </Col>
                  </Row>
                </Col>
              ) : null}
              {changeContentBanner ? (
                <>
                  <Col md='6'>
                    <Row>
                      <Col>
                        <label>Select Banner</label>
                        <Input
                          type='file'
                          name='content_banner'
                          id='content_banner'
                          required
                          onChange={handleContentBannerChange}
                        />
                      </Col>

                      <Col className='text-right'>
                        <Button
                          onClick={() => {
                            contentBannerCancelHandler()
                          }}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  {selectedContentBanner && (
                    <>
                      <Col md='6'>
                        <FormGroup>
                          <img
                            src={selectedContentBanner}
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
            <Row>
              <Col>
              {changePoster == false ? (
                <Col md='6'>
                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <label>Poster Image</label> <br />
                        <img
                          style={{
                            maxHeight: '200px',
                            maxWidth: '200px',
                            minHeight: '199px',
                            minWidth: '199px'
                          }}
                          src={constants.url + oldPosterImg}
                        />
                      </FormGroup>
                    </Col>
                    <Col md='6' className='text-right'>
                      <Button
                        type='button'
                        onClick={() => {
                          setChangePoster(true)
                        }}
                      >
                        Change
                      </Button>
                    </Col>
                  </Row>
                </Col>
              ) : null}
              {changePoster ? (
                <>
                  <Col md='6'>
                    <Row>
                      <Col>
                        <label>Select Poster Image</label>
                        <Input
                          type='file'
                          name='poster_img'
                          id='poster_img'
                          required
                          onChange={handlePosterChange}
                        />
                      </Col>

                      <Col className='text-right'>
                        <Button
                          onClick={() => {
                            PosterCancelHandler()
                          }}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  {selectedPoster && (
                    <>
                      <Col md='6'>
                        <FormGroup>
                          <img
                            src={selectedPoster}
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
              </Col>
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
export default ModalContentUpdate
