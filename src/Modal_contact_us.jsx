import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import contact_img from 'img/gmail.png';


const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    open
  } = props;
  useEffect(() => {
  },[props]);
  const [modal, setModal] = useState(props.contact_open);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal scrollable  isOpen={props.contact_open} toggle={props.contact_clicker} className={className}>
        <ModalHeader toggle={props.contact_clicker}>Contact Us</ModalHeader>
        <ModalBody>
     
        {/* <div id="contact_modal_div">   */}
        <center> 
        {/* <h4 style={{color:'#ff5c5c'}}>GET IN TOUCH</h4> */}
         <img src={contact_img} className="img-fluid" style={{height:'60px',margin:'auto'}}/>
        </center>
        {/* </div> */}
        {/* <br></br> */}
        <p style={{color:'#ff5c5c'}}><i style={{color:'#000000'}} className="fa fa-envelope" aria-hidden="true"/> Email :</p>
        <p>info@cableguy.in</p>
        <hr/>
        <p style={{color:'#ff5c5c'}}><i style={{color:'#000000'}} className="fa fa-phone" aria-hidden="true"/> Contact Number :</p>
        <p>9702499222</p>
        <hr/>
        <p style={{color:'#ff5c5c'}}><i style={{color:'#000000'}} className="fa fa-laptop" aria-hidden="true"/> Website :</p>
        <p>www.cableguy.in</p>
        <hr/>
        <p style={{color:'#ff5c5c'}}><i style={{color:'#000000'}} className="fa fa-map-marker" aria-hidden="true"/> Address :</p>
        <p>Mumbai , Bhayander East</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" style={{backgroundColor:'#ff5c5c'}} onClick={props.contact_clicker}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default ModalExample;