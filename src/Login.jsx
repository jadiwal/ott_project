import React, { useState } from 'react'
import { Component } from 'react'
import './Login/Login_web.css'
import cableguy from './img/CATV.png'
import Modalcableguy from 'Modalcableguy'
import Modal_otp from 'Modal_otp'
import constants from 'utils/constants'
import error_img from './Login/error.png'
import encrypt from 'utils/Functions/encrypt.js'
import Loader from './Loader/Loaderimage.jsx'
import MacAddress from 'get-mac-address'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label
} from 'reactstrap'
import Modal_contact_us from 'Modal_contact_us'
import encrypt_key_loop from 'utils/Functions/encrypt_key_loop'
import decrypt_key_loop from 'utils/Functions/decrypt_key_loop'
import delete_cache from './global/clear_browser_cache'
const axios = require('axios')

class Login extends Component {
  constructor (props) {
    // alert(a);
    super(props)
    this.state = { mode: 'M' }
    this.state = { otp_value: '' }
    this.state = { captcha: '' }
    this.state = { in_captcha: '' }
    this.state = { apivalue: '' }
    this.state = { books: '' }
    this.state = { show: 'N' }
    this.state = { alert_title: 'none' }
    this.state = { alertmessage: 'none' }
    this.state = { modal: false }
    this.state = { otp_modal: false }
    this.state = { otp_mobile: '' }
    this.state = { otp_id: '' }
    this.state = { subsid: '' }
    this.state = { loader: 'none' }
    this.state = { contact_open: '' }
    this.state = { password: '' }
    this.state = { username: '' }
    this.state = { value: '' }
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  myChangeHandlerpassword = event => {
    this.setState({ password: event.target.value })
  }

  myChangeHandlerusername = event => {
    this.setState({ username: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.loginrequest()
  }

  handle_otp_submit = event => {
    event.preventDefault()
    this.otp_verify()
  }
  myChangeHandler_otp_value = event => {
    this.setState({ otp_value: event.target.value })
  }
  modal_close = () => {
    this.setState({ modal: false })
  }
  otp_modal_close = () => {
    this.setState({ otp_modal: false })
  }
  contact_clicker = () => {
    this.setState({ contact_open: false })
  }
  contact_display = () => {
    this.setState({ contact_open: true })
  }

  loginrequest = () => {
    var username = document.getElementById('id').value
    var password = document.getElementById('pass').value
    // console.log(constants.url + '/authenticate')
    if (!username == '' && !password == '') {
      fetch(constants.url + 'authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: username, password: password })
      })
        .then(res => res.json())
        .then(
          result => {
            //console.log(result)
            if (result.success == true) {
              var user_type = result.user_type
              if (user_type == 'admin') {
                window.location.replace('/admin/dashboard')
              } else {
                window.location.replace('/subuser/dashboard')
              }
              localStorage.setItem('flag', encrypt('Y'))
              localStorage.setItem('user_type', encrypt(user_type))
              var expiry = new Date()
              expiry.setHours(expiry.getHours() + 6)
              localStorage.setItem(
                'session_expired_time',
                encrypt(expiry.toString())
              )
              localStorage.setItem('name', encrypt(username.toUpperCase()))
              localStorage.setItem('token', result.token)
              try {
                window.Android.sendData(
                  username,
                  password,
                  document.getElementById('remember_me').checked
                )
              } catch (e) {}
            } else {
              this.setState({
                modal: true,
                loader: 'none',
                show: 'block',
                alertmessage: result.msg
              })
            }
          },
          error => {
            this.setState({
              modal: true,
              loader: 'none',
              show: 'block',
              alertmessage: 'Something Went Wrong'
            })
            console.log(error)
          }
        )

      this.setState({
        loader: 'block'
      })
    } else {
      this.state.modal = true
      // this.Captcha();
      this.setState({
        alertmessage: 'Please Enter All Details',
        loader: 'none',
        show: 'block'
      })
    }
  }

  forgot_password = () => {
    this.props.history.push({
      pathname: '/subuser/dashboard'
    })
  }

  getUserIP = onNewIP => {
    //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection =
      window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection
    var pc = new myPeerConnection({
        iceServers: []
      }),
      noop = function () {},
      localIPs = {},
      ipRegex =
        /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
      key

    function iterateIP (ip) {
      if (!localIPs[ip]) onNewIP(ip)
      localIPs[ip] = true
    }

    //create a bogus data channel
    pc.createDataChannel('')

    // create offer and set local description
    pc.createOffer()
      .then(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
          if (line.indexOf('candidate') < 0) return
          line.match(ipRegex).forEach(iterateIP)
        })

        pc.setLocalDescription(sdp, noop, noop)
      })
      .catch(function (reason) {
        // An error occurred, so handle the failure to connect
      })

    //listen for candidate events
    pc.onicecandidate = function (ice) {
      if (
        !ice ||
        !ice.candidate ||
        !ice.candidate.candidate ||
        !ice.candidate.candidate.match(ipRegex)
      )
        return
      ice.candidate.candidate.match(ipRegex).forEach(iterateIP)
    }
  }

  componentDidMount () {
    // alert(new Date().toISOString());
    // this.Captcha();
    localStorage.clear()
    localStorage.setItem('flag', encrypt('N'))
    delete_cache()
    // alert(getMAC());
    // console.log(getMAC());

    //   this.getUserIP(function(ip){
    //     alert("Got IP! :" + ip);
    // });
  }

  render () {
    let button
    if (this.state.show == 'Y') {
      var style = { display: 'block' }
      button = <UserGreeting name='CableGuy' name1='CATV' display='block' />
    } else {
      var style = { display: 'none' }
      button = <UserGreeting name='CableGuy' name1='CATV' display='none' />
    }

    function UserGreeting (props) {
      return (
        <div
          className='modal'
          tabindex='-1'
          role='dialog'
          id='myModal'
          style={{ display: this.state.show }}
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Modal title</h5>
                <button
                  type='button'
                  class='close'
                  data-dismiss='modal'
                  aria-label='Close'
                  onClick={this.hidealert}
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <p>Modal body text goes here.</p>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-primary'>
                  Save changes
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                  onClick={this.hidealert}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    function getMoviesFromApiAsync () {
      return fetch('https://facebook.github.io/react-native/movies.json')
        .then(response => response.json())
        .then(responseJson => {
          return responseJson.movies
          // console.log(responseJson.movies);
        })
        .catch(error => {
          console.error(error)
        })
    }

    return (
      // <div className="Login" onLoad={this.Captcha}>
      <div className='Login'>
        <Modal_contact_us
          contact_open={this.state.contact_open}
          contact_clicker={this.contact_clicker}
        />

        <Loader show={this.state.loader} />

        {/* {this.s_modal(this.state.modal)} */}

        <Modalcableguy
          header='Error'
          open_v={this.state.modal}
          clicker={this.modal_close}
          alert_msg={this.state.alertmessage}
          img={error_img}
        />

        <Modal_otp
          open_v={this.state.otp_modal}
          clicker={this.otp_modal_close}
          otp_mobile={this.state.otp_mobile}
          otp_value={this.myChangeHandler_otp_value}
          otp_submit={this.handle_otp_submit}
        />

        <div className='container-fluid' id='cf'>
          <div className='row' id='r'>
            {/* for right side */}
            <div className='col-md-5' id='right'>
              <img src={cableguy} className='img-fluid' id='cglogo'></img>
              {/* <form id="formmaina" className="contact_form" role="form" method="post" onsubmit="return Submitt();"> */}
              <form
                id='formmain'
                className='contact_form'
                autoComplete='off'
                // action=""
                onSubmit={this.handleSubmit}
                // method="post"
                //  action="http://localhost:3000/products/loginreact/"
              >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={cableguy}
                    className='img-fluid'
                    id='vendorimage'
                  ></img>
                  <br />
                </div>
                <marquee>
                  <label
                    id='label'
                    style={{
                      fontSize: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      textAlign: 'center',
                      color: '#000000',
                      marginBottom: '20px'
                    }}
                  >
                    Welcome To{' '}
                    <span style={{ color: '#ff5c5c', paddingLeft: '7px' }}>
                      {' '}
                      CaTv Digital Platform
                    </span>
                  </label>
                </marquee>

                <div
                  className='group'
                  style={{
                    left: '0',
                    right: '0',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <FormGroup>
                    <Input
                      type='text'
                      placeholder='Username'
                      name='id'
                      id='id'
                      autoComplete='off'
                      value={this.state.username}
                      // onChange={this.myChangeHandlervalue}
                    ></Input>
                  </FormGroup>
                </div>
                <br></br>

                <div
                  className='group'
                  style={{
                    left: '0',
                    right: '0',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <FormGroup>
                    <Input
                      type='password'
                      placeholder='Password'
                      name='pass'
                      id='pass'
                      // autoComplete="off"
                      autoComplete='false'
                      value={this.state.password}
                      // onChange={this.myChangeHandlerpassword}
                    ></Input>
                  </FormGroup>
                </div>
                <div
                  className='group'
                  id='remember_me_group'
                  style={{
                    marginTop: '5px',
                    display: 'none',
                    justifyContent: 'center',
                    left: '0',
                    right: '0',
                    textAlign: 'center'
                  }}
                >
                  <FormGroup check>
                    <Label id='label_remember_me' check>
                      <Input
                        id='remember_me'
                        name='remember_me'
                        type='checkbox'
                      />{' '}
                      Remember Me
                    </Label>
                  </FormGroup>
                </div>
                {/* <h1>Hello {this.state.value}</h1> */}
                <div
                  style={{
                    marginTop: '20px',
                    left: '0',
                    right: '0',
                    textAlign: 'center',
                    display: 'none',
                    justifyContent: 'center'
                  }}
                >
                  <strike
                    style={{
                      color: 'black',
                      fontFamily: 'sans-serif',
                      fontWeight: '600',
                      marginTop: '0px'
                    }}
                  >
                    <p
                      style={{
                        fontSize: '15px',
                        fontWeight: 'bold'
                      }}
                      id='captcha'
                    >
                      C A T V
                    </p>
                  </strike>
                  <i
                    id='captchaicon'
                    className='fa fa-refresh fa-2x'
                    aria-hidden='true'
                    style={{
                      marginLeft: '15px',
                      color: '#2c2c2c',
                      fontSize: '20px'
                    }}
                    onClick={() => this.Captcha()}
                  ></i>
                </div>
                <div
                  className='group'
                  style={{
                    left: '0',
                    right: '0',
                    display: 'none',
                    justifyContent: 'center'
                  }}
                >
                  <i
                    className='fa fa-arrow-right fa-2x'
                    aria-hidden='true'
                    style={{
                      left: '0',
                      right: '0',
                      color: '#2c2c2c',
                      fontSize: '20px'
                    }}
                  ></i>
                  <input
                    type='text'
                    placeholder='Enter Captcha'
                    name='incaptcha'
                    id='incaptcha'
                    autoComplete='off'
                    onChange={this.myChangeHandlercaptcha}
                  />
                </div>
                {/* <h1>Hello {this.state.captcha}</h1> */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    type='submit'
                    // id="loginbutton"
                    // value="button"
                    className='btn'
                    // color="secondary"
                    style={{
                      marginTop: '20px',
                      width: '200px',
                      left: '0',
                      right: '0',
                      textAlign: 'center',
                      backgroundColor: '#F47216'
                    }}
                    // onClick={() =>this.loginrequest()}
                  >
                    SIGN IN
                  </Button>
                </div>
                <div
                  className='bottom'
                  id='bottom'
                  style={{ textAlign: 'center' }}
                >
                  <p id='copyrights'>
                    <a
                      href='https://www.cableguy.in'
                      target='_blank'
                      style={{
                        fontFamily:
                          'Montserrat,Helvetica Neue,Arial, sans-serif'
                      }}
                    >
                      {/* Copyrights © {new Date().getFullYear()} CableGuy CATV | All Rights Reserved. */}
                      © 2023 CaTv Digital Platform | All Rights Reserved.
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
