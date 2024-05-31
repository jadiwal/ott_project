import React, { useState, useEffect } from 'react'
import moment from 'moment'
import {
  Button,
  FormGroup,
  Form,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from 'reactstrap'
import Loader from 'Loader/Loaderimage.jsx'
import Modalcableguy from 'Modalcableguy.jsx'
import error_img from 'img/error.png'
import constants from 'constants.js'
import decrypt from 'decrypt'
import UsersTable from './UsersTable.js'
import success_img from 'img/success.png'
import ModalUserEdit from './ModalUserEdit.js'

function Users (props) {
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

  const [item, setItem] = useState([])
  const [modal_update, setModal_update] = useState(false)

  const modal_update_close = () => {
    setItem([])
    setModal_update(false)
  }

  const modal_update_show = items_ => {
    setModal_update(true)
    setItem(items_)
  }


  const navigate_ = () => {
    if (decrypt(localStorage.getItem('user_type')) === 'admin') {
      props.history.push({
        pathname: '/user/create-user'
      })
    } else if (decrypt(localStorage.getItem('user_type')) === 'subuser') {
      props.history.push({
        pathname: '/subcompany/create-user'
      })
    }
  }

  const update_details = (
    mobile,
    email,
    sub_company,
    department,
    password,
    user_status
  ) => {
    setLoader('block')

    fetch(constants.url + 'post_edit_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        x_access_token: decrypt(localStorage.getItem('token'))
      },
      body: JSON.stringify({
        login_id: item.login_id,
        mobile_no: mobile,
        email_id: email,
        updated_by: decrypt(localStorage.getItem('name')),
        sub_company_id: sub_company,
        department_id: department,
        password: password,
        user_status: user_status
      })
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.success === true) {
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
          setHeader('Error')
          setAlert_img(error_img)
          setLoader('none')
          setModal(true)
          setAlertmessage('Something Went Wrong')
        }
      )
  }

  const [usersData, setUsersData] = useState([]);

  const fetch_user = () => {
    setLoader('block')
    fetch(constants.url + 'get_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        x_access_token: decrypt(localStorage.getItem('token'))
      },
      body: JSON.stringify({
        parent_company_id: decrypt(localStorage.getItem('company_id'))
      })
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.success === true) {
            setUsersData(result.data)
            setLoader('none')
            setDisplayTable('block')
          } else {
            setUsersData([])
            setLoader('none')
            setHeader('Error')
            setAlert_img(error_img)
            setDisplayTable('none')
            setModal(true)
            setAlertmessage(result.msg)
          }
        },
        error => {
          setUsersData([])
          setLoader('none')
          setHeader('Error')
          setAlert_img(error_img)
          setDisplayTable('none')
          setModal(true)
          setAlertmessage('Something Went Wrong')
        }
      )
  }

  useEffect(() => {
    fetch_user()
  }, [])

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

        <ModalUserEdit
          modal_update={modal_update}
          modal_update_close={modal_update_close}
          update_details={update_details}
          item={item}
        />

        <div>
          <div className='row'>
            <div className='col-md-12'>
              <Card>
                <CardHeader>
                  <CardTitle tag='h5' style={{ color: '#007bff' }}>
                    User Details
                  </CardTitle>
                  <hr />
                </CardHeader>
                <CardBody style={{}}>
                  <UsersTable
                    modal_update_show={modal_update_show}
                    navigate_={navigate_}
                    data={usersData}
                  />
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Users
