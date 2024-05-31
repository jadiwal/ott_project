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
import OttAppTable from './OttAppTable'
import ModalOttAppUpdate from './ModalOttAppUpdate'
const OttApp = () => {
  const [header, setHeader] = useState('')
  const [modal, setModal] = useState(false)
  const [alertmessage, setAlertmessage] = useState('')
  const [alert_img, setAlert_img] = useState(null)
  const [loader, setLoader] = useState('none')

  const [OttAppData, setOttAppData] = useState([])

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

  const getOttApp = () => {
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
          console.log(result)
          if (result.success === true) {
            setLoader('none')
            setOttAppData(result.data)
          } else {
            setOttAppData([])
            setHeader('Error')
            setAlert_img(error_img)
            setLoader('none')
            setModal(true)
            setAlertmessage(result.msg)
          }
        },
        error => {
          setOttAppData([])
          console.log(error)
          setHeader('Error')
          setAlert_img(error_img)
          setLoader('none')
          setModal(true)
          setAlertmessage('Something went wrong')
        }
      )
  }

  const modalUpdateOttApp = (
    id,
    name,
    lcnNo,
    subscription,
    link,
    status,
    oldImg,
    newImg
  ) => {
    setLoader('block')
    const formData = new FormData()
    formData.append('id', id)
    formData.append('name', name)
    formData.append('lcn_no', lcnNo)
    formData.append('subscription', subscription)
    formData.append('link', link)
    formData.append('status', status)
    formData.append('oldImg', oldImg)
    if (newImg) {
      formData.append('update_ott_image', newImg)
    }
    formData.append('updated_by', decrypt(localStorage.getItem('name')))

    fetch(constants.url + 'ott/update_ott_app', {
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
          console.log(result)
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
    getOttApp()
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
          <OttAppTable
            data={OttAppData}
            modal_update_show={modal_update_show}
          />
        </CardBody>
      </Card>

      <ModalOttAppUpdate
        item={item}
        modal_update={modal_update}
        modal_update_close={modal_update_close}
        modalUpdateOttApp={modalUpdateOttApp}
      />
    </div>
  )
}

export default OttApp
