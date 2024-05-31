import React, { useState, useEffect } from 'react';
import ChannelTable from './ChannelTable';
import constants from 'utils/constants';
import ModalGenreUpdate from './ModalChannelUpdate';
import ModalChannelUpdate from './ModalChannelUpdate';
import error_img from 'img/error.png'
import success_img from 'img/success.png'
import decrypt from 'utils/Functions/decrypt'

const Channel = () => {

    const [channelData, setChannelData] = useState([])
    const [modal_update, setModal_update] = useState(false)
    const [item, setItem] = useState([])
    const [loader, setLoader] = useState('none')
    const [header, setHeader] = useState('')
    const [modal, setModal] = useState(false)
    const [alertmessage, setAlertmessage] = useState('')
    const [alert_img, setAlert_img] = useState(null)
    const [typeData, setTypeData] = useState()

    const modal_update_close = () => {
        setItem([])
        setModal_update(false)
      }
    const modal_update_show = items_ => {
        //   alert(id);
        setModal_update(true)
        setItem(items_)
      }
    const getChannels = () =>{
        setLoader('block');
        fetch(constants.url +  'ott/all_channels', {
            method : 'GET',
            headers:{
                x_access_token : localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then((result) =>{
            setLoader('none')
            setChannelData(result.data)
        })
        .catch((error) =>{
            console.log(error)
            setHeader('Error')
            setAlert_img(error_img)
            setLoader('none')
            setModal(true)
            setAlertmessage('Something went wrong')
        })
    }
   
    const modalUpdateChannel = (
        id,
        langName,
        oldImg,
        newImg
      ) => {
        setLoader('block')
        console.log(" id : " + id + " langName : " + langName + " oldImg : " + oldImg + " newImg : " + newImg  );
        const formData = new FormData()
        formData.append('id', id)
        formData.append('name', langName)
        formData.append('oldImg', oldImg)
        if (newImg) {
          formData.append('update_genre_image', newImg)
        }
        formData.append('updated_by', decrypt(localStorage.getItem('name')))
        
        console.log(constants.url + 'ott/update_genre')
    
        fetch(constants.url + 'ott/update_genre', {
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
        getChannels()
        getTypes()
      }, [])
    return (
        <div className='content'>
        <ChannelTable 
            data = {channelData}
            modal_update_show = {modal_update_show}
        />

        <ModalChannelUpdate
            item={item}
            modal_update={modal_update}
            modal_update_close={modal_update_close}
            modalUpdateChannel={modalUpdateChannel}
            typeData={typeData}
        />
        </div>
    );
}

export default Channel;
