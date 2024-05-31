import React, { useState, useEffect } from 'react'
import Loader from 'Loader/Loaderimage'
import Modalcableguy from 'Modalcableguy'
import error_img from 'img/error.png'
import success_img from 'img/success.png'
import decrypt from 'utils/Functions/decrypt'
import constants from 'utils/constants'
// import Label from "reactstrap/lib/Label";
// import BoothTable from './BoothTable'
// import ModalBoothUpdate from './ModalBoothUpdate'
import { Card } from 'reactstrap'
import CardBody from 'reactstrap/lib/CardBody'
import CardHeader from 'reactstrap/lib/CardHeader'
import encrypt from 'utils/Functions/encrypt'
import ContentTable from './ContentTable'
import ModalContentUpdate from './ModalContentUpdate'
// import ModalContentUpdate from './ModalContentUpdate'

const Content = () => {
  const [header, setHeader] = useState('')
  const [modal, setModal] = useState(false)
  const [alertmessage, setAlertmessage] = useState('')
  const [alert_img, setAlert_img] = useState(null)
  const [loader, setLoader] = useState('none')

  const [contentData, setContentData] = useState([])

  const [item, setItem] = useState([])

  const [modal_update, setModal_update] = useState(false)

  const modal_update_close = () => {
    setItem([])
    setModal_update(false)
  }

  const modal_update_show = items_ => {
    //   alert(id);
    setModal_update(true)
    setItem(items_)
  }

  const modal_close = () => {
    setModal(!modal)
    if (header.toUpperCase() === 'SUCCESS') {
      window.location.reload()
    }
  }

  // http://192.168.1.113:9200/ott/all_lang

  const getContent = () => {
    setLoader('block')
    fetch(constants.url + 'ott/all_content', {
      method: 'get',
      headers: {
        x_access_token: localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(
        result => {
          // console.log(result);
          // console.log(object);
          if (result.success === true) {
            setLoader('none')
            setContentData(result.data)
          } else {
            setContentData([])
            setHeader('Error')
            setAlert_img(error_img)
            setLoader('none')
            setModal(true)
            setAlertmessage(result.msg)
          }
        },
        error => {
          setContentData([])
          console.log(error)
          setHeader('Error')
          setAlert_img(error_img)
          setLoader('none')
          setModal(true)
          setAlertmessage('Something went wrong')
        }
      )
  }

  const modalUpdateContent = (
    id,
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
  ) => {
    setLoader('block')
    const formData = new FormData()
    formData.append('id', id)
    formData.append('name', contentName)
    formData.append('oldImage', oldContentImg)
    formData.append('oldPoster', oldPosterImg)
    formData.append('trailer', trailer)
    formData.append('oldBanner', oldContentBanner)
    formData.append('type', type)
    formData.append('content_lcn_no', contentLcnNo)
    formData.append('subscription', subscription)
    formData.append('description', description)
    formData.append('status', status)
    formData.append('position', position)
    formData.append('content_release_date', contentRealiseDate)
    formData.append('ua', minimunAge)
    formData.append('url', url)
    formData.append('genre', JSON.stringify(selectedGenre))
    formData.append('language', JSON.stringify(selectedLanguage))
    formData.append('ott', JSON.stringify(selectedOtt))
    formData.append('subtitle', JSON.stringify(selectedSubtitle))
    if (newContentImg) {
      formData.append('update_content_image', newContentImg)
    }
    if (newContentBanner) {
      formData.append('update_content_banner', newContentBanner)
    }
    if (newContentPoster) {
      formData.append('update_content_poster', newContentPoster)
    }
    formData.append('updated_by', decrypt(localStorage.getItem('name')))

    if (contentName && contentName !== '') {
      if (url && url !== '') {
        if (type && type !== '') {
          if (contentLcnNo && contentLcnNo !== '') {
            if (position && position !== '') {
              if (selectedOtt && selectedOtt.length !== 0) {
                if (selectedLanguage && selectedLanguage.length !== 0) {
                  if (selectedGenre && selectedGenre.length !== 0) {
                    fetch(constants.url + 'ott/update_content', {
                      method: 'post',
                      headers: {
                        // 'Content-Type': 'application/json',
                        x_access_token: localStorage.getItem('token')
                      },
                      body: formData
                    })
                      .then(res => res.json())
                      .then(
                        result => {
                          // console.log(result);
                          if (result.success === true) {
                            setHeader('Success')
                            setAlert_img(success_img)
                            setLoader('none')
                            setAlertmessage(result.msg)
                            setModal(true)
                          } else {
                            setHeader('Error')
                            setAlert_img(error_img)
                            setLoader('none')
                            setAlertmessage(result.msg)
                            setModal(true)
                          }
                        },
                        error => {
                          console.log(error)
                          setHeader('Error')
                          setAlert_img(error_img)
                          setLoader('none')
                          setAlertmessage('Something went wrong')
                          setModal(true)
                        }
                      )
                  } else {
                    setHeader('Error')
                    setAlert_img(error_img)
                    setLoader('none')
                    setAlertmessage('Please Select Atleast One Genre')
                    setModal(true)
                  }
                } else {
                  setHeader('Error')
                  setAlert_img(error_img)
                  setLoader('none')
                  setAlertmessage('Please Select Atleast One Language')
                  setModal(true)
                }
              } else {
                setHeader('Error')
                setAlert_img(error_img)
                setLoader('none')
                setAlertmessage('Please Select Atleast one Ott App')
                setModal(true)
              }
            } else {
              setHeader('Error')
              setAlert_img(error_img)
              setLoader('none')
              setAlertmessage('Please Give Movie Position')
              setModal(true)
            }
          } else {
            setHeader('Error')
            setAlert_img(error_img)
            setLoader('none')
            setAlertmessage('Please Give Content LCN No')
            setModal(true)
          }
        } else {
          setHeader('Error')
          setAlert_img(error_img)
          setLoader('none')
          setAlertmessage('Please Select Movie Type')
          setModal(true)
        }
      } else {
        setHeader('Error')
        setAlert_img(error_img)
        setLoader('none')
        setAlertmessage('Please Give Movie Url')
        setModal(true)
      }
    } else {
      setHeader('Error')
      setAlert_img(error_img)
      setLoader('none')
      setAlertmessage('Please Give Movie Name')
      setModal(true)
    }
  }

  useEffect(() => {
    getContent()
  }, [])

  return (
    <div className='content'>
      <Loader show={loader} />
      <Modalcableguy
        header={header}
        open_v={modal}
        clicker={modal_close}
        alert_msg={alertmessage}
        img={alert_img}
      />
      <Card className='bg-transparent' style={{ boxShadow: 'none' }}>
        {/* <CardHeader>
        ALL BOOTH
        <hr />
        </CardHeader> */}
        <CardBody>
          <ContentTable
            data={contentData}
            modal_update_show={modal_update_show}
          />
        </CardBody>
      </Card>

      <ModalContentUpdate
        item={item}
        modal_update={modal_update}
        modal_update_close={modal_update_close}
        modalUpdateContent={modalUpdateContent}
      />
    </div>
  )
}

export default Content
