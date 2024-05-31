
import SubUserDashboard from "views/SubUserDashboard";
import Login from "Login.jsx";
import ChangePassword from "views/ChangePassword";
import dashboard_icon from 'img/dashboard_menu_icon.png'
import blue_password from 'img/passwordorange.png'
import red_logout from 'img/redlogout.png'


var SubUserRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: dashboard_icon,
    component: SubUserDashboard,
    layout: "/subuser",
    sub_menu:[]
  },
  // {
  //   // pro: true,
  //   path: "/tickets",
  //   name: "My Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: Tickets,
  //   layout: "/subuser"
  // },
  // {
  //   path: "/newplan",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-bank",
  //   component: NewPlan,
  //   layout: "/subuser"
  // },
  // {
  //   path: "#",
  //   name: "My Task",
  //   icon: task_x,
  //   component: '',
  //   layout: "",
  //   sub_menu:[{
  //     name:"All Task",
  //     component: MyTask,
  //     path: "/my-task/all",
  //    layout: "/subuser"
  //   },
 
  // {
  //   name:"Completed Task",
  //   component: MyTask,
  //   path: "/my-task/completed",
  //  layout: "/subuser"
  // }, 
  // {
  //   name:"UAT Task",
  //   component: MyTask,
  //   path: "/my-task/uat",
  //  layout: "/subuser"
  // },
  // {
  //   name:"Pending Task",
  //   component: MyTask,
  //   path: "/my-task/pending",
  //  layout: "/subuser"
  // }
  // ]
  // },
  
  // {
  //   path: "#",
  //   name: "Assigned Task",
  //   icon: task_y,
  //   component: '',
  //   layout: "",
  //   sub_menu:[{
  //     name:"Create Task",
  //      component: CreateCase,
  //      path: "/create-task",
  //     layout: "/subuser"
  //   },
  // {
  //   name:"Update Task",
  //   component: AssignedTask,
  //   path: "/assigned-task/all",
  //  layout: "/subuser"
  // }
  // ]
  // },
  // {
  //   path: "#",
  //   name: "Attendance",
  //   icon: attendance_report,
  //   // icon: "fa fa-credit-card-alt",
  //   component: '',
  //   layout: "",
  //   sub_menu:[{
  //     name:"Check In",
  //     component: Attendance,
  //   path: "/attendance/check-in",
  //  layout: "/subuser"
  //   },
  // {
  //   name:"Check Out",
  //   component: Attendance,
  //   path: "/attendance/check-out",
  //  layout: "/subuser"
  // },
  // {
  //   name:"Summary Report",
  //    component: AttendanceSummary,
  //   path: "/attendance-summary",
  //  layout: "/subuser"
  // },
  // {
  //   name:"Monthly Attendance Report",
  //    component: MonthlyAttendance,
  //   path: "/attendance-summary-monthly",
  //  layout: "/subuser"
  // }
  // ]
  // },
  {
    path: "/change-password",
    name: "Change Password",
    // icon: "nc-icon nc-diamond",
     icon: blue_password,
    component: ChangePassword,
    layout: "/subuser",
    sub_menu:[]
  },

  
  // {
  //   path: "/attendance",
  //   name: "Attendance",
  //   icon: "nc-icon nc-tile-56",
  //   component: Attendance,
  //   layout: "/subuser",
  //   sub_menu:[]
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/subuser"
  // },
  
  {
    // path: "/",
    name: "Logout",
    icon: red_logout,
    component: Login,
    layout: "/sign-in",
    sub_menu:[]
  }
  ,
  
 
];
export const a='a';
export default SubUserRoutes;
