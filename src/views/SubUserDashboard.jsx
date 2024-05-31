
import constants from "utils/constants";
import React from "react";
import moment from "moment";
// react plugin used to create charts
import { Line, Pie,Doughnut } from "react-chartjs-2";
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
import {
  dashboard24HoursPerformanceChart,
  // dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx";
import Loader from "Loader/Loaderimage.jsx"
import decrypt from "../utils/Functions/decrypt";

class Dashboard extends React.Component {

  my_all_task=()=>{
    this.props.history.push({
      pathname: "/subuser/my-task/all"
  });
}

my_task_uat=()=>{
  this.props.history.push({
    pathname: "/subuser/my-task/uat"
});
}

my_pending_task=()=>{
  this.props.history.push({
    pathname: "/subuser/my-task/pending"
});
}


my_completed_task=()=>{
  this.props.history.push({
    pathname: "/subuser/my-task/completed"
});
}

assigned_total=()=>{
  this.props.history.push({
    pathname: "/subuser/assigned-task/all"
});
}

assigned_uat=()=>{
this.props.history.push({
  pathname: "/subuser/assigned-task/uat"
});
}

assigned_pending=()=>{
this.props.history.push({
  pathname: "/subuser/assigned-task/pending"
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
         loader:'none'
        }; 
  }

  componentDidMount()
  {
    this.setState({loader:'block'});
    var name=decrypt(localStorage.getItem('name'));
      fetch(constants.get_assigned_tasks,
      {
        method: "POST",
        headers: {
         'Content-Type': 'application/json',
       },
        body:JSON.stringify({username:name})
    })
        .then(res => res.json())
        .then(
          (result) => {
            // console.log(result);
            var data=result.data;
            var my_total=0;
            var other_total=0;
            for(var i=0;i<data.length;i++)
            {
              if(data[i].flag=='my')
              {
                if(data[i].status=='PENDING')
                {
                  this.setState({my_task_pending:data[i].counts});
                }
                if(data[i].status=='COMPLETED')
                {
                  this.setState({my_task_completed:data[i].counts});
                }
                if(data[i].status=='UAT')
                {
                  this.setState({my_task_uat:data[i].counts});
                }
              }
              if(data[i].flag=='other')
              {
                if(data[i].status=='PENDING')
                {
                  this.setState({assigned_pending:data[i].counts});
                }
                if(data[i].status=='COMPLETED')
                {
                  this.setState({assigned_completed:data[i].counts});
                } 
                if(data[i].status=='UAT')
                {
                  this.setState({assigned_uat:data[i].counts});
                }
              }
            }
            this.setState({
              loader:'none'
            });

          },
          (error) => {
            this.setState({
              loader:'none'
            });
            // console.log(error);
          }
        )
  }


  render() {
    return (
      <>
        <div className="content">
        <Loader show={this.state.loader}/>
        <h5>MY TASK</h5>
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
          <h5>ASSIGNED TASK</h5>
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
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">My Task Statistics</CardTitle>
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
                  <i className="nc-icon nc-chart-pie-36 text-warning"  /> View All My Task
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Assigned Task Statistics</CardTitle>
                  <p className="card-category">Overall Performance</p>
                </CardHeader>
                <CardBody>
                  <Doughnut
                    data={this.dashboardEmailStatisticsChart_completed.data}
                    options={this.dashboardEmailStatisticsChart_completed.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                  <i className="fa fa-circle text-warning" /> All{" "}
                    <i className="fa fa-circle text-success" /> Completed{" "}
                    <i className="fa fa-circle text-primary" /> UAT{" "}
                    <i className="fa fa-circle text-danger" /> Pending{" "}
                  </div>
                  <hr />
                  <div className="stats" onClick={()=>this.assigned_total()} style={{textAlign:'left',display:'flex',alignItems:'center',cursor:'pointer'}} >
                <i className="nc-icon nc-single-copy-04 text-warning"  /> View All Assigned Task
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
        </div>
      </>
    );
  }
}

export default Dashboard;
