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
import LanguageTable from './LanguageTable'
import ModalLanguageUpdate from './ModalLanguageUpdate'

const Language = () => {
  const [header, setHeader] = useState('')
  const [modal, setModal] = useState(false)
  const [alertmessage, setAlertmessage] = useState('')
  const [alert_img, setAlert_img] = useState(null)
  const [loader, setLoader] = useState('none')

  const [langData, setLangData] = useState([])

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

  const getLanguage = () => {
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
          console.log(result);
          if (result.success === true) {
            setLoader('none')
            setLangData(result.data)
          } else {
            setLangData([])
            setHeader('Error')
            setAlert_img(error_img)
            setLoader('none')
            setModal(true)
            setAlertmessage(result.msg)
          }
        },
        error => {
          setLangData([])
          console.log(error)
          setHeader('Error')
          setAlert_img(error_img)
          setLoader('none')
          setModal(true)
          setAlertmessage('Something went wrong')
        }
      )
  }

  const modalUpdateLanguage = (
    id,
    langName,
    oldImg,
    newImg
  ) => {
    setLoader('block')
    const formData = new FormData()
    formData.append('id', id)
    formData.append('name', langName)
    formData.append('oldImg', oldImg)
    if (newImg) {
      formData.append('update_language_image', newImg)
    }
    formData.append('updated_by', decrypt(localStorage.getItem('name')))

    fetch(constants.url + 'ott/update_lang', {
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
          console.log(result);
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
  }

  useEffect(() => {
    getLanguage()
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
          <LanguageTable
            data={langData}
            modal_update_show={modal_update_show}
          />
        </CardBody>
      </Card>

      <ModalLanguageUpdate
        item={item}
        modal_update={modal_update}
        modal_update_close={modal_update_close}
        modalUpdateLanguage={modalUpdateLanguage}
      />
    </div>
  )
}

export default Language
