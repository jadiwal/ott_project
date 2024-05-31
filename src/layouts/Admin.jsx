import React from 'react'
import { Route, Switch, Redirect, Router } from 'react-router-dom'

import DemoNavbarAdmin from 'components/Navbars/DemoNavbarAdmin.jsx'
import Footer from 'components/Footer/Footer.jsx'
import Sidebar from 'components/Sidebar/Sidebar.jsx'
import decrypt from '../utils/Functions/decrypt'

import AdminRoutes from 'AdminRoutes'
import Login from 'Login'
import auto_log_out from 'global/auto_log_out'
import Language from 'views/Language/Language'
import LanguageCreation from 'views/Language/LanguageCreation'
import Genre from 'views/Genre/Genre'
import GenreCreation from 'views/Genre/GenreCreation'
import OttApp from 'views/OttApp/OttApp'
import OttAppCreation from 'views/OttApp/OttAppCreation'
import Content from 'views/Content/Content'
import ContentCreation from 'views/Content/ContentCreation'
import ContentCreationNew from 'views/Content/ContentCreationNew'
import Singer from 'views/Singer/Singer';

var ps

let interval
class Admin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      backgroundColor: 'black',
      activeColor: 'info'
    }
    this.mainPanel = React.createRef()
  }
  expired = () => {
    try {
      var flag = decrypt(localStorage.getItem('flag'))
      if (flag == 'Y') {
        //this function will automatically logout the user to sign-in page after 20 minutes expiry set on login page

        var session_expired_time = decrypt(
          localStorage.getItem('session_expired_time')
        )
        var current_date = new Date()
        if (current_date.getTime() > new Date(session_expired_time).getTime()) {
          window.location.replace('/sign-in')
        }
      } else {
        window.location.replace('/sign-in')
      }
    } catch (Exception) {
      window.location.replace('/sign-in')
    }
  }
  componentDidMount () {
    // console.log(this.props.history);

    setInterval(() => {
      auto_log_out('admin')
    }, 2000)

    if (
      window.location.pathname == '/admin' ||
      window.location.pathname == '/admin/'
    ) {
      this.props.history.push({
        pathname: '/admin/dashboard'
      })
    }
  }
  componentWillUnmount () {}
  componentDidUpdate (e) {
    if (e.history.action === 'PUSH') {
      this.mainPanel.current.scrollTop = 0
      document.scrollingElement.scrollTop = 0
    }
  }
  handleActiveClick = color => {
    this.setState({ activeColor: color })
  }
  handleBgClick = color => {
    this.setState({ backgroundColor: color })
  }
  render () {
    // console.log(this.props);
    return (
      <div className='wrapper'>
        {/* {this.expired()} */}
        <Sidebar
          {...this.props}
          routes={AdminRoutes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />

        <div className='main-panel' ref={this.mainPanel}>
          <DemoNavbarAdmin {...this.props} routes={AdminRoutes} />
          {/* <Progress value={50} max={100} striped animated/> */}

          <Switch>
            {AdminRoutes.map((prop, key) => {
              return (
                <Route
                  {...this.props}
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={prop.layout + prop.path}
                />
              )
            })}
            ;
            <Route path='/admin/language' component={Language} />
            <Route path='/admin/add-language' component={LanguageCreation} />
            <Route path='/admin/genre' component={Genre} />
            <Route path='/admin/add-genre' component={GenreCreation} />
            <Route path='/admin/ott' component={OttApp} />
            <Route path='/admin/add-ott' component={OttAppCreation} />
            <Route path='/admin/content' component={Content} />
            <Route path='/admin/add-content' component={ContentCreation} />
            <Route path='/admin/add-content-new' component={ContentCreationNew} />
            <Route path='/admin/singer' component={Singer} />
            <Route path='*' component={Login} />
          </Switch>
          <Footer fluid />
        </div>
      </div>
    )
  }
}

export default Admin
