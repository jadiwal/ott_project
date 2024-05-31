
import React from "react";
import moment from "moment";
import error_img from '../img/error.png'
import success_img from '../img/success.png'

import Loader from '../Loader/Loaderimage.jsx'
import Modalcableguy from '../Modalcableguy.jsx'
import constants from 'utils/constants'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  FormGroup,
  Form,
  Input,
  CardFooter,
  Col
} from "reactstrap";
import decrypt from "../utils/Functions/decrypt";

class ChangePassword extends React.Component {
  constructor(props) {
    
    super(props);  
    
    this.handleSubmit_check_in = this.handleSubmit_check_in.bind(this);
    this.handleSubmit_check_out = this.handleSubmit_check_out.bind(this);
    this.state = {
    complaint_description:'',
     alertmessage:'',
     modal:false,
     items:[],
     image:'',
     header_msg:'',
     loader:'none',
    }; 
  }
  
  myChangeHandler_complaint_description = event => {
    this.setState({ complaint_description: event.target.value });
  };
  handleSubmit_check_in(event) {
    this.check_in_attendance();
  }
  handleSubmit_check_out(event) {
    this.check_out_attendance();
  }
 componentDidMount()
 {
 }



 check_in_attendance=()=>{

    var old_password=document.getElementById("old_password").value;
    var new_password=document.getElementById("new_password").value;
    var confirm_password=document.getElementById("confirm_password").value;
    // var in_remark=document.getElementById("in_remark").value;

    if(old_password==decrypt(localStorage.getItem('password')))
    {   
        if(new_password==confirm_password)
        {
    this.setState({loader:'block'});
    fetch(constants.change_password,
    {
      method: "POST",
      headers: {
       'Content-Type': 'application/json',
     },
      body:JSON.stringify({
          username:decrypt(localStorage.getItem('name')),
          password:new_password
  })
  })
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(result);
          if(result.STATUS=="0")
          {
            this.props.history.push({
                pathname: "/sign-in"
            });
      }else{
        this.setState({
            loader: "none",
            header_msg:'Error',
            modal: true,
            image:error_img,
            alertmessage: "Something Went Wrong",
          });
      }

        },
        (error) => {
            this.setState({
                loader: "none",
                header_msg:'Error',
                modal: true,
                image:error_img,
                alertmessage: "Something Went Wrong",
              });
        }
      )
        }
        else{
            this.setState({
                loader: "none",
                header_msg:'Error',
                modal: true,
                image:error_img,
                alertmessage: "New Password Does not Match",
              });
        }
    }
    else{
        this.setState({
            loader: "none",
            header_msg:'Error',
            modal: true,
            image:error_img,
            alertmessage: "Old Password is Incorrect",
          });
    }


     
 }




 

  modal_close=()=>{
    this.setState({modal:false});
  }
 
  render() {
    
    return (
      <>
       
       <Loader show={this.state.loader}/>
        <div className="content">
        <Modalcableguy header={this.state.header_msg} open_v={this.state.modal} clicker={this.modal_close} alert_msg={this.state.alertmessage} img={this.state.image}/>
      
      <div className="row justify-content-center">
      <div className="col-md-10">  
            <Card>
                  <CardHeader>
                    <CardTitle tag="h5" style={{ color: "#ff5c5c" }}>
                      Change Password
                    </CardTitle>
                    
                    <hr/>
                  </CardHeader>
                 
                  <CardBody>
                   
                    {/* <center>
                      <img
                        alt="..."
                        className="img-fluid"
                        style={{ height: "80px" }}
                        src={require("../img/greenticket.png")}
                      />
                    </center>
                    <br /> */}
                    {/* <center>
                        <h5>DATE : {moment(new Date()).format('YYYY-MM-DD')}</h5>
                    </center> */}
                    <Form
                     onSubmit={(e) => {this.handleSubmit_check_in(); e.preventDefault();}}>
                    {/* <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Select Complaint Type</label>
                            <Input
                              type="select"
                              name="complaint_id"
                              id="complaint_id"
                            > */}
                              {/* <option value="C">Card Number</option>
                              <option value="S">STB Number</option>
                              <option value="N">Subscriber Code</option>
                              <option value="M">Mobile Number</option> */}
                              {/* {this.state.items.map(a => <option key={a.id} value={a.id}>{a.type}</option>)} */}
                            {/* </Input>
                          </FormGroup>
                        </Col>
                      </Row> */}
                          <div className="row">
                      <div className="col">
                    <FormGroup>
                            <label>Old Password</label>
                            <Input
                              placeholder="Enter Password"
                              type="password"
                              id="old_password"
                              required
                              autoComplete="false"
                            //   value={this.state.complaint_description}
                            //   onChange={this.myChangeHandler_complaint_description}
                            />
                          </FormGroup>
</div>
</div>
<div className="row">
                      <div className="col">
                    <FormGroup>
                            <label>New Password</label>
                            <Input
                              placeholder="Enter New Password"
                              type="password"
                              id="new_password"
                              required
                              autoComplete="false"
                            //   value={this.state.complaint_description}
                            //   onChange={this.myChangeHandler_complaint_description}
                            />
                          </FormGroup>
</div>
</div>
<div className="row">
                      <div className="col">
                    <FormGroup>
                            <label>Confirm Password</label>
                            <Input
                              placeholder="Enter Confirm Password"
                              type="password"
                              id="confirm_password"
                              
                      autoComplete="false"
                              required
                            //   value={this.state.complaint_description}
                            //   onChange={this.myChangeHandler_complaint_description}
                            />
                          </FormGroup>
</div>
</div>
 <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          type="submit"
                          style={{backgroundColor:'#ff5c5c'}}
                        >
                          SUBMIT
                        </Button>
                      </div>
                    </Row>
</Form>
                  </CardBody>
                  {/* <CardFooter>
                  
                  </CardFooter> */}
                </Card>
                </div>
               
                </div>
        </div>
      </>
    );
  }
}

export default ChangePassword;






{/* <Row>
<Col className="ml-auto mr-auto" md="8">
  <Card className="card-upgrade">
    <CardHeader className="text-center">
      <CardTitle tag="h4">Paper Dashboard PRO</CardTitle>
      <p className="card-category">
        Are you looking for more components? Please check our
        Premium Version of Paper Dashboard PRO.
      </p>
    </CardHeader>
    <CardBody>
      <Table responsive>
        <thead>
          <tr>
            <th />
            <th className="text-center">Free</th>
            <th className="text-center">PRO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Components</td>
            <td className="text-center">16</td>
            <td className="text-center">160</td>
          </tr>
          <tr>
            <td>Plugins</td>
            <td className="text-center">4</td>
            <td className="text-center">13</td>
          </tr>
          <tr>
            <td>Example Pages</td>
            <td className="text-center">7</td>
            <td className="text-center">27</td>
          </tr>
          <tr>
            <td>Login, Register, Pricing, Lock Pages</td>
            <td className="text-center">
              <i className="nc-icon nc-simple-remove text-danger" />
            </td>
            <td className="text-center">
              <i className="nc-icon nc-check-2 text-success" />
            </td>
          </tr>
          <tr>
            <td>
              DataTables, VectorMap, SweetAlert, Wizard,
              jQueryValidation, FullCalendar etc...
            </td>
            <td className="text-center">
              <i className="nc-icon nc-simple-remove text-danger" />
            </td>
            <td className="text-center">
              <i className="nc-icon nc-check-2 text-success" />
            </td>
          </tr>
          <tr>
            <td>Mini Sidebar</td>
            <td className="text-center">
              <i className="nc-icon nc-simple-remove text-danger" />
            </td>
            <td className="text-center">
              <i className="nc-icon nc-check-2 text-success" />
            </td>
          </tr>
          <tr>
            <td>Premium Support</td>
            <td className="text-center">
              <i className="nc-icon nc-simple-remove text-danger" />
            </td>
            <td className="text-center">
              <i className="nc-icon nc-check-2 text-success" />
            </td>
          </tr>
          <tr>
            <td />
            <td className="text-center">Free</td>
            <td className="text-center">Just $49</td>
          </tr>
          <tr>
            <td className="text-center" />
            <td className="text-center">
              <Button
                className="btn-round disabled"
                color="default"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                Current Version
              </Button>
            </td>
            <td className="text-center">
              <Button
                className="btn-round"
                color="primary"
                href="https://www.creative-tim.com/product/paper-dashboard-2-pro?ref=pd-free-upgrade-live"
                rel="noopener noreferrer"
                target="_blank"
              >
                Upgrade to PRO
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </CardBody>
  </Card>
</Col>
</Row> */}
