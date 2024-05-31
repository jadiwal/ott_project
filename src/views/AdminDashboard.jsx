
import constants from "utils/constants";
import React from "react";
import moment from "moment";
// react plugin used to create charts
import {Table} from 'reactstrap';
import { Doughnut, Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// core components
// Deepak
import {
  dashboard24HoursPerformanceChart,
  // dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx";
import Loader from "Loader/Loaderimage.jsx"

class DashboardNew extends React.Component {

  my_all_task=()=>{
    this.props.history.push({
      pathname: "/admin/office-task/all"
  });
}

my_task_uat=()=>{
  this.props.history.push({
    pathname: "/admin/office-task/uat"
});
}

my_pending_task=()=>{
  this.props.history.push({
    pathname: "/admin/office-task/pending"
});
}


my_completed_task=()=>{
  this.props.history.push({
    pathname: "/admin/office-task/completed"
});
}

assigned_total=()=>{
  this.props.history.push({
    pathname: "/admin/assigned-task/all"
});
}

view_mso_report=()=>{
  this.props.history.push({
    pathname: "/admin/mso-details"
  });
}

view_payment__received_report=()=>{
  this.props.history.push({
    pathname: "/admin/received-report-payment"
  });
}
view_payment_paid_report=()=>{
  this.props.history.push({
    pathname: "/admin/paid-report-payment"
  });
}

view_pending_paid_report=()=>{
  this.props.history.push({
    pathname: "/admin/pending-report-payment"
  });
}

assigned_uat=()=>{
this.props.history.push({
  pathname: "/admin/assigned-task/uat"
});
}

assigned_pending=()=>{
this.props.history.push({
  pathname: "/admin/assigned-task/pending"
});
}


assigned_completed=()=>{
this.props.history.push({
  pathname: "/subuser/assigned-task/completed"
});
}

   dashboardEmailStatisticsChart_pending = {
    data: canvas => {
      return {
        labels:  [this.state.my_task_pending+this.state.my_task_completed+this.state.my_task_uat, this.state.my_task_completed,this.state.my_task_uat, this.state.my_task_pending],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            // backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
            backgroundColor: ["#fcc468", "#6bd098","#4acccd", "#ef8157"],
            // backgroundColor: ["#fbc658 ", "#6bd098", "#ef8157 "],
  
            borderWidth: 0,
            data: [this.state.my_task_pending+this.state.my_task_completed+this.state.my_task_uat, this.state.my_task_completed,this.state.my_task_uat, this.state.my_task_pending]
          }
        ]
      };
    },
    options: {
      legend: {
        display: true
      },
  
      pieceLabel: {
        render: "percentage",
        fontColor: ["white"],
        precision: 2
      },
  
      tooltips: {
        enabled: true
      },
  
      scales: {
        yAxes: [
          {
            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: "rgba(255,255,255,0.05)"
            }
          }
        ],
  
        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false
            }
          }
        ]
      }
    }
  };
  dashboardEmailStatisticsChart_completed = {
    data: canvas => {
      return {
        labels: [this.state.assigned_completed+this.state.assigned_pending+this.state.assigned_uat, this.state.assigned_completed, this.state.assigned_uat,this.state.assigned_pending],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            // backgroundColor: ["#e3e3e3", "#6bd098 ", "#fcc468", "#ef8157"],
            // backgroundColor: ["#fbc658 ", "#6bd098", "#ef8157 "],
            backgroundColor: ["#fcc468", "#6bd098","#4acccd", "#ef8157"],
  
            borderWidth: 0,
            data: [this.state.assigned_completed+this.state.assigned_pending+this.state.assigned_uat, this.state.assigned_completed,this.state.assigned_uat, this.state.assigned_pending]
          }
        ]
      };
    },
    options: {
      legend: {
        display: true
      },
  
      pieceLabel: {
        render: "percentage",
        fontColor: ["white"],
        precision: 2
      },
  
      tooltips: {
        enabled: true
      },
  
      scales: {
        yAxes: [
          {
            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: "rgba(255,255,255,0.05)"
            }
          }
        ],
  
        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false
            }
          }
        ]
      }
    }
  };



  payment_statistics = {
    data: canvas => {
      return {
        labels: [Math.round(this.state.payment_pending*100)/100, this.state.payment_received,this.state.payment_paid],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            // backgroundColor: ["#e3e3e3", "#6bd098 ", "#fcc468", "#ef8157"],
            // backgroundColor: ["#fbc658 ", "#6bd098", "#ef8157 "],
            backgroundColor: ["#fcc468", "#6bd098", "#ef8157"],
  
            borderWidth: 0,
            data: [Math.round(this.state.payment_pending*100)/100, this.state.payment_received,this.state.payment_paid]
          }
        ]
      };
    },
    options: {
      legend: {
        display: true
      },
  
      pieceLabel: {
        render: "percentage",
        fontColor: ["white"],
        precision: 2
      },
  
      tooltips: {
        enabled: true
      },
  
      scales: {
        yAxes: [
          {
            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: "rgba(255,255,255,0.05)"
            }
          }
        ],
  
        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false
            }
          }
        ]
      }
    }
  };


  mso_statistics = {
    data: canvas => {
      return {
        labels: [this.state.mso_pending+this.state.mso_attended, this.state.mso_attended,this.state.mso_pending],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            // backgroundColor: ["#e3e3e3", "#6bd098 ", "#fcc468", "#ef8157"],
            // backgroundColor: ["#fbc658 ", "#6bd098", "#ef8157 "],
            backgroundColor: ["#fcc468", "#6bd098", "#ef8157"],
  
            borderWidth: 0,
            data: [this.state.mso_pending+this.state.mso_attended, this.state.mso_attended,this.state.mso_pending]
          }
        ]
      };
    },
    options: {
      legend: {
        display: true
      },
  
      pieceLabel: {
        render: "percentage",
        fontColor: ["white"],
        precision: 2
      },
  
      tooltips: {
        enabled: true
      },
  
      scales: {
        yAxes: [
          {
            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: "rgba(255,255,255,0.05)"
            }
          }
        ],
  
        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false
            }
          }
        ]
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
         alertmessage:'',
         modal:false,
         token:'',
         items:[],
         image:'',
         header_msg:'Error',
         my_task_total:0,
         my_task_pending:0,
         my_task_uat:0,
         my_task_completed:0,
         assigned_total:0,
         assigned_pending:0,
         assigned_completed:0,
         assigned_uat:0,
         cif_in_total:0,
         cif_in_pending:0,
         cif_in_paid:0,
         cif_out_total:0,
         cif_out_pending:0,
         cif_out_paid:0,
         payment_received:0,
         payment_paid:0,
         payment_pending:0,
         mso_attended:0,
         mso_pending:0,
         loader:'none'
        }; 
  }

  componentDidMount()
  {
    // this.setState({loader:'block'});
    //   fetch(constants.get_assigned_tasks_admin,
    //   {
    //     method: "POST",
    //     headers: {
    //      'Content-Type': 'application/json',
    //    },
    //     body:JSON.stringify({})
    // })
    //     .then(res => res.json())
    //     .then(
    //       (result) => {
    //         // console.log(result);
    //         var data=result.data;
    //         this.setState({items:result.data1})
    //         for(var i=0;i<data.length;i++)
    //         {
    //             if(data[i].status=='PENDING')
    //             {
    //               this.setState({my_task_pending:data[i].counts});
    //             }
    //             if(data[i].status=='COMPLETED')
    //             {
    //               this.setState({my_task_completed:data[i].counts});
    //             }
    //             if(data[i].status=='UAT')
    //             {
    //               this.setState({my_task_uat:data[i].counts});
    //             }
    //         }
    //         var data2=result.data2;
    //         for(var i=0;i<data2.length;i++)
    //         {
    //           if(data2[i].mode=='PAID')
    //           {
    //             this.setState({payment_paid:Math.round(data2[i].count*100)/100});
    //           }
    //           if(data2[i].mode=='RECEIVED')
    //           {
    //             this.setState({payment_received:Math.round(data2[i].count*100)/100});
    //           }
    //           if(data2[i].mode=='PAID-PENDING')
    //           {
    //             this.setState({payment_pending:Math.round(data2[i].count*100)/100});
    //           }
    //           if(data2[i].mode=='ATTENDED')
    //           {
    //             this.setState({mso_attended:data2[i].count});
    //           }
    //           if(data2[i].mode=='PENDING')
    //           {
    //             this.setState({mso_pending:data2[i].count});
    //           }
    //         }
    //         this.setState({
    //           loader:'none'
    //         });

    //       },
    //       (error) => {
    //         this.setState({
    //           loader:'none'
    //         });
    //         // console.log(error);
    //       }
    //     )
  }


  render() {
    return (
      <>
        <div className="content" style={{display: 'none'}}>
        <Loader show={this.state.loader}/>
        <h5>OFFICE TASK</h5>
          {/* <hr/> */}
          <Row>
         
            <Col md="3">
            <Card className="card-stats" onClick={()=>this.my_all_task()} style={{cursor:'pointer'}}>
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-chart-pie-36 text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total</p>
                        <CardTitle tag="p">{this.state.my_task_pending+this.state.my_task_completed+this.state.my_task_uat}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats" style={{textAlign:'left',display:'flex',alignItems:'center',cursor:'pointer'}} >
                <i className="nc-icon nc-bullet-list-67 text-warning"  /> View All Task
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="3">
            <Card className="card-stats" onClick={()=>this.my_completed_task()} style={{cursor:'pointer'}}>
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-check-2 text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Completed</p>
                        <CardTitle tag="p">{this.state.my_task_completed}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats" style={{textAlign:'left',display:'flex',alignItems:'center',cursor:'pointer'}} >
                    <i className="nc-icon nc-bullet-list-67 text-success" /> View Completed Task
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="3">
            <Card className="card-stats" onClick={()=>this.my_task_uat()} style={{cursor:'pointer'}}>
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-primary">
                        <i className="nc-icon nc-zoom-split text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">UAT</p>
                        <CardTitle tag="p">{this.state.my_task_uat}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats" style={{textAlign:'left',display:'flex',alignItems:'center',cursor:'pointer'}} >
                    <i className="nc-icon nc-zoom-split text-primary" /> View UAT Task
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="3">
              <Card className="card-stats" onClick={()=>this.my_pending_task()} style={{cursor:'pointer'}}>
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-simple-remove text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Pending</p>
                        <CardTitle tag="p">{this.state.my_task_pending}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats" style={{textAlign:'left',display:'flex',alignItems:'center'}} >
                    <i className="nc-icon nc-bullet-list-67 text-danger" /> View Pending Task
                  </div>
                </CardFooter>
              </Card>
            </Col>
          
          </Row>
          {/* <h5>ASSIGNED TASK</h5>
          <Row>
         
         <Col md="3">
         <Card className="card-stats" onClick={()=>this.assigned_total()} style={{cursor:'pointer'}}>
             <CardBody>
               <Row>
                 <Col md="4" xs="5">
                   <div className="icon-big text-center icon-warning">
                     <i className="nc-icon nc-single-copy-04 text-warning" />
                   </div>
                 </Col>
                 <Col md="8" xs="7">
                   <div className="numbers">
                     <p className="card-category">Total</p>
                     <CardTitle tag="p">{this.state.assigned_pending+this.state.assigned_completed+this.state.assigned_uat}</CardTitle>
                     <p />
                   </div>
                 </Col>
               </Row>
             </CardBody>
             <CardFooter>
               <hr />
               <div className="stats" style={{textAlign:'left',display:'flex',alignItems:'center',cursor:'pointer'}} >
             <i className="nc-icon nc-bullet-list-67 text-warning"  /> View All Task
               </div>
             </CardFooter>
           </Card>
         </Col>
         <Col md="3">
         <Card className="card-stats" onClick={()=>this.assigned_completed()} style={{cursor:'pointer'}}>
             <CardBody>
               <Row>
                 <Col md="4" xs="5">
                   <div className="icon-big text-center icon-warning">
                     <i className="nc-icon nc-check-2 text-success" />
                   </div>
                 </Col>
                 <Col md="8" xs="7">
                   <div className="numbers">
                     <p className="card-category">Completed</p>
                     <CardTitle tag="p">{this.state.assigned_completed}</CardTitle>
                     <p />
                   </div>
                 </Col>
               </Row>
             </CardBody>
             <CardFooter>
               <hr />
               <div className="stats" style={{textAlign:'left',display:'flex',alignItems:'center',cursor:'pointer'}} >
                 <i className="nc-icon nc-bullet-list-67 text-success" /> View Completed Task
               </div>
             </CardFooter>
           </Card>
         </Col>
         <Col md="3">
            <Card className="card-stats" onClick={()=>this.assigned_uat()} style={{cursor:'pointer'}}>
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-primary">
                        <i className="nc-icon nc-zoom-split text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">UAT</p>
                        <CardTitle tag="p">{this.state.assigned_uat}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats" style={{textAlign:'left',display:'flex',alignItems:'center',cursor:'pointer'}} >
                    <i className="nc-icon nc-zoom-split text-primary" /> View UAT Task
                  </div>
                </CardFooter>
              </Card>
            </Col>
         <Col md="3">
           <Card className="card-stats" onClick={()=>this.assigned_pending()} style={{cursor:'pointer'}}>
             <CardBody>
               <Row>
                 <Col md="4" xs="5">
                   <div className="icon-big text-center icon-warning">
                     <i className="nc-icon nc-simple-remove text-danger" />
                   </div>
                 </Col>
                 <Col md="8" xs="7">
                   <div className="numbers">
                     <p className="card-category">Pending</p>
                     <CardTitle tag="p">{this.state.assigned_pending}</CardTitle>
                     <p />
                   </div>
                 </Col>
               </Row>
             </CardBody>
             <CardFooter>
               <hr />
               <div className="stats" style={{textAlign:'left',display:'flex',alignItems:'center'}} >
                 <i className="nc-icon nc-bullet-list-67 text-danger" /> View Pending Task
               </div>
             </CardFooter>
           </Card>
         </Col>
       
       </Row>
         */}
        
          <Row style={{display:'none'}}>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Users Behavior</CardTitle>
                  <p className="card-category">24 Hours performance</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" /> Updated 3 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Office Task Statistics</CardTitle>
                  <p className="card-category">Overall Performance</p>
                </CardHeader>
                <CardBody>
                  <Doughnut
                    data={this.dashboardEmailStatisticsChart_pending.data}
                    options={this.dashboardEmailStatisticsChart_pending.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-warning" /> All{" "}
                    <i className="fa fa-circle text-success" /> Completed{" "}
                    <i className="fa fa-circle text-primary" /> UAT{" "}
                    <i className="fa fa-circle text-danger" /> Pending{" "}
                    {/* <i className="fa fa-circle text-gray" /> Unopened */}
                  </div>
                  <hr />
                  <div className="stats" onClick={()=>this.my_all_task()} style={{textAlign:'left',display:'flex',alignItems:'center',cursor:'pointer'}} >
                  <i className="nc-icon nc-chart-pie-36 text-warning"  /> View All Task
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Payments</CardTitle>
                  <p className="card-category">Payment Summary</p>
                </CardHeader>
                <CardBody>
                  <Doughnut
                    data={this.payment_statistics.data}
                    options={this.payment_statistics.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                  <i className="fa fa-circle text-warning" /> Pending{" "}
                    <i className="fa fa-circle text-success" /> Received{" "}
                    <i className="fa fa-circle text-danger" /> Paid{" "}
                    {/* <i className="fa fa-circle text-gray" /> Unopened */}
                  </div>
                  <hr />
                  <div className="stats" style={{textAlign:'left',display:'flex',alignItems:'center'}} >
                    
                 <span  onClick={()=>this.view_pending_paid_report()} style={{textAlign:'left',display:'flex',alignItems:'center',cursor:'pointer'}}> <i className="nc-icon nc-credit-card text-warning"  />Pending Report</span>
                 <span  onClick={()=>this.view_payment__received_report()} style={{textAlign:'left',display:'flex',alignItems:'center',cursor:'pointer',marginLeft:'10px'}}> <i className="nc-icon nc-credit-card text-success"  />Received</span>
                 <span  onClick={()=>this.view_payment_paid_report()} style={{textAlign:'left',display:'flex',alignItems:'center',cursor:'pointer',marginLeft:'10px'}}> <i className="nc-icon nc-credit-card text-danger"  />Paid</span>
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">MSO</CardTitle>
                  <p className="card-category">MSO Summary</p>
                </CardHeader>
                <CardBody>
                  <Doughnut
                    data={this.mso_statistics.data}
                    options={this.mso_statistics.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-warning" /> Total{" "}
                    <i className="fa fa-circle text-success" /> Attended{" "}
                    <i className="fa fa-circle text-danger" /> Pending{" "}
                    {/* <i className="fa fa-circle text-gray" /> Unopened */}
                  </div>
                  <hr />
                  <div className="stats" onClick={()=>this.view_mso_report()} style={{textAlign:'left',display:'flex',alignItems:'center',cursor:'pointer'}} >
                  <i className="nc-icon nc-credit-card text-warning"  /> View MSO Report
                  </div>
                </CardFooter>
              </Card>
            </Col>
       <Col md="8" style={{display:'none'}}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                  <p className="card-category">Line Chart with Points</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboardNASDAQChart.data}
                    options={dashboardNASDAQChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <div className="chart-legend">
                    <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                    <i className="fa fa-circle text-warning" /> BMW 5 Series
                  </div>
                  <hr />
                  <div className="card-stats">
                    <i className="fa fa-check" /> Data information certified
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
          <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h6">Employee Task Summary</CardTitle>
                 
                </CardHeader>
                <CardBody>
                  {/* <Pie
                    data={this.dashboardEmailStatisticsChart_completed.data}
                    options={this.dashboardEmailStatisticsChart_completed.options}
                  /> */}
                  <div className="table-responsive">
                  <Table
                  striped
                bordered
                  size="sm"
                  >
                    <thead className="text-primary" style={{backgroundColor:'#2c2c2c'}}>
                    <tr style={{color:'#ffffff'}}>
                        <th style={{textAlign:'left'}}>NAME</th>
                        <th style={{textAlign:'left'}}>COMPLETED</th>
                        <th style={{textAlign:'left'}}>UAT</th>
                        <th style={{textAlign:'left'}}>PENDING</th>
                        <th style={{textAlign:'left'}}>TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                        {this.state.items.map((item,key) => (
                          <tr key={key}>
                        <td>
          {item.user}
           
           </td>
           <td>
          {item.completed}
           
           </td>
           <td>
          {item.uat}
           
           </td>
           <td>
          {item.pending}
           
           </td>
           <td>
           {item.counts}
           
           </td>
                      </tr>
          ))}
                   
                    </tbody>
                  </Table>
                  </div>
                </CardBody>
              
              </Card>
            </Col>
       
           
          </Row>
          
        </div>
      </>
    );
  }
}

export default DashboardNew;
