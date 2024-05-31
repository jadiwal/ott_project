

import React from "react";
import moment from "moment";
import { Route, Switch, Redirect, Router } from "react-router-dom";

import DemoNavbarSubUser from "components/Navbars/DemoNavbarSubUser";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import decrypt from "../utils/Functions/decrypt";

import SubUserRoutes from "SubUserRoutes";
import Login from "Login";
import auto_log_out from "global/auto_log_out";
var ps;

let interval;
class SubUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
    };
    this.mainPanel = React.createRef();
  }
  expired = () => {
    try{
      var flag = decrypt(localStorage.getItem("flag"));
      if (flag == "Y") {
        //this function will automatically logout the user to sign-in page after 20 minutes expiry set on login page
  
        var session_expired_time = decrypt(
          localStorage.getItem("session_expired_time")
        );
        var current_date = new Date();
        if (current_date.getTime() > new Date(session_expired_time).getTime()) {
          window.location.replace("/sign-in");
        }
      } else {
        window.location.replace("/sign-in");
      }
    }catch(Exception){ window.location.replace("/sign-in");}
  };
  componentDidMount() {
     setInterval(()=>{
      auto_log_out("emp");
    },2000)

    if (
      window.location.pathname == "/subuser" ||
      window.location.pathname == "/subuser/"
    ) {
      this.props.history.push({
        pathname: "/subuser/dashboard",
      });
    }

}
  componentWillUnmount() {
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = (color) => {
    this.setState({ activeColor: color });
  };
  handleBgClick = (color) => {
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
      <div className="wrapper"
      >
        {/* {this.expired()} */}
        <Sidebar
          {...this.props}
          routes={SubUserRoutes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />

        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbarSubUser {...this.props} routes={SubUserRoutes} />
          {/* <Progress value={50} max={100} striped animated/> */}

          <Switch>
            {SubUserRoutes.map((prop, key) => {
              console.log(prop)
              return (
                <Route
                 {...this.props}
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={prop.layout+prop.path}
                />
              );
            })};
            {/* <Route path="/subuser/create-task" component={CreateCase}/>
            <Route path="/subuser/my-task/:status" component={MyTask}/>
            <Route path="/subuser/attendance/:status" component={Attendance}/>
            <Route path="/subuser/attendance-summary" component={AttendanceSummary}/>
            <Route path="/subuser/mso-details" component={MsoDetails}/>
            <Route path="/subuser/assigned-task/:status" component={AssignedTask}/>
             <Route path="/subuser/attendance-summary-monthly" component={MonthlyAttendance}/> */}
            <Route path="*" component={Login}/>
          </Switch>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default SubUser;
