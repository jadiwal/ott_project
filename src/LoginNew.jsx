import React, { useState } from 'react';
import './Login/Login_web.css';
import cableguy from './img/cableguy.png';
import Modalcableguy from 'Modalcableguy';
import Modal_otp from 'Modal_otp';
import constants from 'utils/constants';
import error_img from './Login/error.png';
import encrypt from 'utils/Functions/encrypt.js';
import Loader from './Loader/Loaderimage.jsx';
import {
  Button,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import Modal_contact_us from 'Modal_contact_us';
import delete_cache from './global/clear_browser_cache';

function Login(props) {
  const [show, setShow] = useState('N');
  const [alertmessage, setAlertMessage] = useState('none');
  const [modal, setModal] = useState(false);
  const [otp_modal, setOtpModal] = useState(false);
  const [otp_mobile, setOtpMobile] = useState('');
  const [loader, setLoader] = useState('none');
  const [contact_open, setContactOpen] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const myChangeHandlerpassword = (event) => {
    setPassword(event.target.value);
  };

  const myChangeHandlerusername = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginrequest();
  };

  // const handle_otp_submit = (event) => {
  //   event.preventDefault();
  //   otp_verify();
  // };

  // const myChangeHandler_otp_value = (event) => {
  //   setOtpValue(event.target.value);
  // };

  const modal_close = () => {
    setModal(false);
  };

  // const otp_modal_close = () => {
  //   setOtpModal(false);
  // };

  const contact_clicker = () => {
    setContactOpen(false);
  };

  const loginrequest = () => {
    const username = document.getElementById('id').value;
    const password = document.getElementById('pass').value;
    //console.log(constants.url + '/authenticate');
    if (!username === '' && !password === '') {
      fetch(constants.url + '/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: username, password: password }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            //console.log(result);
            if (result.success === true) {
              const user_type = result.user_type;
              if (user_type === 'admin') {
                window.location.replace('/admin/dashboard');
              } else {
                window.location.replace('/subuser/dashboard');
              }
              localStorage.setItem('flag', encrypt('Y'));
              localStorage.setItem('user_type', encrypt(user_type));
              const expiry = new Date();
              expiry.setHours(expiry.getHours() + 6);
              localStorage.setItem(
                'session_expired_time',
                encrypt(expiry.toString())
              );
              localStorage.setItem('name', encrypt(username.toUpperCase()));
              localStorage.setItem('token', result.token);
              try {
                window.Android.sendData(
                  username,
                  password,
                  document.getElementById('remember_me').checked
                );
              } catch (e) {}
            } else {
              setModal(true);
              setLoader('none');
              setShow('block');
              setAlertMessage(result.msg);
            }
          },
          (error) => {
            setModal(true);
            setLoader('none');
            setShow('block');
            setAlertMessage('Something Went Wrong');
            console.log(error);
          }
        );

      setLoader('block');
    } else {
      setModal(true);
      setAlertMessage('Please Enter All Details');
      setLoader('none');
      setShow('block');
    }
  };

  React.useEffect(() => {
    localStorage.clear();
    localStorage.setItem('flag', encrypt('N'));
    delete_cache();
  }, []);

  let button;
  if (show === 'Y') {
    var style = { display: 'block' };
    button = <UserGreeting name='CableGuy' name1='CATV' display='block' />;
  } else {
    var style = { display: 'none' };
    button = <UserGreeting name='CableGuy' name1='CATV' display='none' />;
  }

  function UserGreeting(props) {
    return (
      <div
        className='modal'
        tabindex='-1'
        role='dialog'
        id='myModal'
        style={{ display: show }}
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
                // onClick={hidealert}
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
                // onClick={hidealert}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='Login'>
      <Modal_contact_us
        contact_open={contact_open}
        contact_clicker={contact_clicker}
      />

      <Loader show={loader} />

      <Modalcableguy
        header='Error'
        open_v={modal}
        clicker={modal_close}
        alert_msg={alertmessage}
        img={error_img}
      />

      {/* <Modal_otp
        open_v={otp_modal}
        clicker={otp_modal_close}
        otp_mobile={otp_mobile}
        otp_value={myChangeHandler_otp_value}
        otp_submit={handle_otp_submit}
      /> */}

      <div className='container-fluid' id='cf'>
        <div className='row' id='r'>
          <div className='col-md-5' id='right'>
            <img src={cableguy} className='img-fluid' id='cglogo'></img>
            <form
              id='formmain'
              className='contact_form'
              autoComplete='off'
              onSubmit={handleSubmit}
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={cableguy} className='img-fluid' id='vendorimage'></img>
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
                    marginBottom: '20px',
                  }}
                >
                  Welcome To{' '}
                  <span style={{ color: '#ff5c5c', paddingLeft: '7px' }}>
                    {' '}
                    CableGuy-OTT.
                  </span>
                </label>
              </marquee>

              <div
                className='group'
                style={{
                  left: '0',
                  right: '0',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <FormGroup>
                  <Input
                    type='text'
                    placeholder='Username'
                    name='id'
                    id='id'
                    autoComplete='off'
                    value={username}
                    onChange={myChangeHandlerusername}
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
                  justifyContent: 'center',
                }}
              >
                <FormGroup>
                  <Input
                    type='password'
                    placeholder='Password'
                    name='pass'
                    id='pass'
                    autoComplete='false'
                    value={password}
                    onChange={myChangeHandlerpassword}
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
                  textAlign: 'center',
                }}
              >
                <FormGroup check>
                  <Label id='label_remember_me' check>
                    <Input id='remember_me' name='remember_me' type='checkbox' />{' '}
                    Remember Me
                  </Label>
                </FormGroup>
              </div>
              <div
                style={{
                  marginTop: '20px',
                  left: '0',
                  right: '0',
                  textAlign: 'center',
                  display: 'none',
                  justifyContent: 'center',
                }}
              >
                <strike
                  style={{
                    color: 'black',
                    fontFamily: 'sans-serif',
                    fontWeight: '600',
                    marginTop: '0px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '15px',
                      fontWeight: 'bold',
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
                    fontSize: '20px',
                  }}
                  // onClick={() => Captcha()}
                ></i>
              </div>
              <div
                className='group'
                style={{
                  left: '0',
                  right: '0',
                  display: 'none',
                  justifyContent: 'center',
                }}
              >
                <i
                  className='fa fa-arrow-right fa-2x'
                  aria-hidden='true'
                  style={{
                    left: '0',
                    right: '0',
                    color: '#2c2c2c',
                    fontSize: '20px',
                  }}
                ></i>
                <input
                  type='text'
                  placeholder='Enter Captcha'
                  name='incaptcha'
                  id='incaptcha'
                  autoComplete='off'
                />
              </div>
              <div
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button
                  type='submit'
                  className='btn'
                  style={{
                    marginTop: '20px',
                    width: '200px',
                    left: '0',
                    right: '0',
                    textAlign: 'center',
                    backgroundColor: '#F47216',
                  }}
                >
                  SIGN IN
                </Button>
              </div>
              <div className='bottom' id='bottom' style={{ textAlign: 'center' }}>
                <p id='copyrights'>
                  <a
                    href='https://www.cableguy.in'
                    target='_blank'
                    style={{
                      fontFamily: 'Montserrat,Helvetica Neue,Arial, sans-serif',
                    }}
                  >
                    Copyrights © 2016 CableGuy | All Rights Reserved.
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
