import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import otp_sms from './img/otp_sms.png';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
  } from "reactstrap";


const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    open
  } = props;
  useEffect(() => {
  },[props]);
  const [modal, setModal] = useState(props.open_v);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={props.open_v} toggle={props.clicker} className={className} centered={true}>
        <ModalHeader toggle={props.clicker}>Verification</ModalHeader>
        <ModalBody>
        <center>
        <img src={otp_sms} className="img-fluid" style={{height:'50px'}}/>
        <br/><br/>
        <p>OTP has been sent to {props.otp_mobile}</p>
        </center>
        <Form
        onSubmit={props.otp_submit}
        >
                   <div className="container">
                        {/* <Col  md="5">
                        <FormGroup>
                          <label>Company (disabled)</label>
                          <Input
                            defaultValue="Creative Code Inc."
                            disabled
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col> */}
                      <div className="row justify-content-center">
    <div className="col-md-6">
  
                          <FormGroup>
                            <label style={{textAlign:'left',color:'#ff5c5c',fontWeight:'bold'}}>Enter OTP</label>
                            <Input
                            required="true"
                            autoComplete="off"
                              placeholder="Enter Here"
                              type="number"
                              onChange={props.otp_value}
                            />
                          </FormGroup>
                          <center>
                          <Button
                  type="submit"
                  // id="loginbutton"
                  // value="button"
                  className="btn"
                  // color="secondary"
                  style={{
                    textAlign: "center",
                    backgroundColor:"#ff5c5c"
                  }}
                  // onClick={() =>this.loginrequest()}
                >
                Submit
                 </Button>
                 </center>
                    </div>
                    </div>
                        </div>
                    </Form>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="secondary" onClick={props.clicker}>Close</Button>
        </ModalFooter> */}
      </Modal>
    </div>
  );
}
export default ModalExample;