import Login from 'Login.jsx'
import ChangePassword from 'views/ChangePassword'
import AdminDashboard from 'views/AdminDashboard'
import dashboard_icon from 'img/dashboard_menu_icon.png'
import language_icon from 'img/language.png'
import genre_icon from 'img/genre.png'
import ott_icon from 'img/ott.png'
import blue_password from 'img/passwordorange.png'
import red_logout from 'img/redlogout.png'
import Language from 'views/Language/Language'
import Genre from 'views/Genre/Genre'
import OttApp from 'views/OttApp/OttApp'
import Content from 'views/Content/Content'
import Channel from 'views/Channel/Channel'
import channel from 'img/ch1.svg'
import Singer from 'views/Singer/Singer'
import ContentCreationNew from 'views/Content/ContentCreationNew'

var AdminRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: dashboard_icon,
    component: AdminDashboard,
    layout: '/admin',
    sub_menu: []
  },
  {
    path: '/ott',
    name: 'OTT Platform Names',
    icon: ott_icon,
    component: OttApp,
    layout: '/admin',
    sub_menu: []
  },
  {
    path: '/channel',
    name: 'All Channels',
    icon: channel,
    component: Channel,
    layout: '/admin',
    sub_menu: []
  },
  // {
  //   path: '/singer',
  //   name: 'Singers',
  //   icon: channel,
  //   component: Singer,
  //   layout: '/admin',
  //   sub_menu: []
  // },
  {
    path: '/language',
    name: 'Language',
    icon: language_icon,
    component: Language,
    layout: '/admin',
    sub_menu: []
  },
  {
    path: '/genre',
    name: 'Genre',
    icon: genre_icon,
    component: Genre,
    layout: '/admin',
    sub_menu: []
  },
  {
    path: '/content',
    name: 'Content',
    icon: language_icon,
    component: Content,
    layout: '/admin',
    sub_menu: []
  },
  // {
  //   path: '/add-content-new',
  //   name: 'Content Creation New',
  //   icon: language_icon,
  //   component: ContentCreationNew,
  //   layout: '/admin',
  //   sub_menu: []
  // },

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
  //   name: "Office Task",
  //   icon: task_x,
  //   component: "",
  //   layout: "",
  //   sub_menu: [
  //     {
  //       name: "All Task",
  //       component: OfficeTask,
  //       path: "/office-task/all",
  //       layout: "/admin",
  //     },

  //     {
  //       name: "Completed Task",
  //       component: OfficeTask,
  //       path: "/office-task/completed",
  //       layout: "/admin",
  //     },
  //     {
  //       name: "UAT Task",
  //       component: OfficeTask,
  //       path: "/office-task/uat",
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Pending Task",
  //       component: OfficeTask,
  //       path: "/office-task/pending",
  //       layout: "/admin",
  //     },
  //   ],
  // },

  // {
  //   path: "#",
  //   name: "Master New",
  //   icon: white_admin,
  //   component: "",
  //   layout: "",
  //   sub_menu: [
  //     {
  //       name: "All Client",
  //       component: AllClient,
  //       path: "/all-client",
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Client Creation",
  //       component: ClientCreateForm,
  //       path: "/client-create-from",
  //       layout: "/admin",
  //     },
  //   ],
  // },

  // {
  //   path: "#",
  //   name: "Master",
  //   icon: white_admin,
  //   component: "",
  //   layout: "",
  //   sub_menu: [
  //     {
  //       name: "Create User",
  //       component: CreateUser,
  //       path: "/create-user",
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Create Client",
  //       component: CreateClient,
  //       path: "/create-client",
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Create Task Type",
  //       component: CreateTaskType,
  //       path: "/create-task-type",
  //       layout: "/admin",
  //     },
  //     {
  //       name: "MSO Details",
  //       component: MsoDetails,
  //       path: "/mso-details",
  //       layout: "/admin",
  //     },
  //   ],
  // },

  // {
  //   path: "#",
  //   name: "Client Payments",
  //   icon: billing,
  //   component: "",
  //   layout: "",
  //   sub_menu: [
  //     {
  //       name: "Client Payment Received",
  //       component: ClientPaymentReceived,
  //       path: "/client-payment-received",
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Generate Client Bill",
  //       component: GenerateClientBill,
  //       path: "/generate-client-bill",
  //       layout: "/admin",
  //     },
  //   ],
  // },

  // {
  //   layout: "",
  //   name: "Payments",
  //   icon: billing,
  //   // icon: "fa fa-credit-card-alt",
  //   component: "",
  //   path: "#",
  //   sub_menu: [
  //     {
  //       name: "Received",
  //       component: PaymentReceived,
  //       path: "/payment-received",
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Paid",
  //       component: PaymentPaid,
  //       path: "/payment-paid",
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Pending",
  //       component: PaymentPending,
  //       path: "/payment-pending",
  //       layout: "/admin",
  //     },
  //     // {
  //     //   name:"Cif Old Report",
  //     //   component: CifSummary,
  //     //   path: "/summary-cif-report",
  //     //  layout: "/admin"
  //     // }
  //   ],
  // },
  // {
  //   layout: "",
  //   name: "Attendance",
  //   icon: attendance_report,
  //   // icon: "fa fa-credit-card-alt",
  //   component: "",
  //   path: "#",
  //   sub_menu: [
  //     {
  //       name: "Check In",
  //       component: Attendance,
  //       path: "/attendance/check-in",
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Check Out",
  //       component: Attendance,
  //       path: "/attendance/check-out",
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Daily Attendance Report",
  //       component: AttendanceSummaryAdmin,
  //       path: "/attendance-summary",
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Monthly Attendance Report",
  //       component: MonthlyAttendanceAdmin,
  //       path: "/attendance-summary-monthly",
  //       layout: "/admin",
  //     },
  //   ],
  // },

  // {
  //   path: "#",
  //   name: "Reports",
  //   icon: billing,
  //   component: "",
  //   layout: "",
  //   sub_menu: [
  //     {
  //       name: "Client Outstanding Report",
  //       component: ClientOutstandingReport,
  //       path: "/client-outstanding-report",
  //       layout: "/admin",
  //     },
  //   ],
  // },

  {
    path: '/change-password',
    name: 'Change Password',
    // icon: "nc-icon nc-diamond",
    icon: blue_password,
    component: ChangePassword,
    layout: '/admin',
    sub_menu: []
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
    name: 'Logout',
    icon: red_logout,
    component: Login,
    layout: '/sign-in',
    sub_menu: []
  }
]
export const a = 'a'
export default AdminRoutes
