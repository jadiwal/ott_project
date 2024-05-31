
import React from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import decrypt from "../../utils/Functions/decrypt";
var ps;

class Sidebar extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      color: "transparent"
    };
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  main_page_click = () => {
    var name = decrypt(localStorage.getItem('name'));
    if (name == 'ADMIN') {
      this.props.history.push({
        pathname: "/admin/dashboard"
      });
    }
    else {
      this.props.history.push({
        pathname: "/subuser/dashboard"
      });
    }
  }

  toogle_close_all_click = () => {
    var menus = document.querySelectorAll('[id=dropdown-container]')
    for (var j = 0; j < menus.length; j++) {
      if (menus[j].style.display = 'block') {
        menus[j].style.display = 'none';
      }
    }
    var caret = document.querySelectorAll('[id=rotate-lefty]')
    for (var a = 0; a < caret.length; a++) {
      caret[a].className="fa fa-angle-left";
  }
  }
  componentDidMount() {

    
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function () {
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
          var caret_ = this.querySelector('[id=rotate-lefty]')
          caret_.className="fa fa-angle-left";
        } else {
          var menus = document.querySelectorAll('[id=dropdown-container]')
          for (var j = 0; j < menus.length; j++) {
            if (menus[j].style.display = 'block') {
              menus[j].style.display = 'none';
            }
          }
          var caret = document.querySelectorAll('[id=rotate-lefty]')
          for (var a = 0; a < caret.length; a++) {
            caret[a].className="fa fa-angle-left";
        }
          var caret_ = this.querySelector('[id=rotate-lefty]')
          caret_.className="fa fa-angle-down";
          dropdownContent.style.display = "block";
        }
      });
    }
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          {/* <a
            href="https://www.creative-tim.com"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a> */}
          <center>
            {/* <a
            href="https://www.televize.in"
            target="_blank"
            className="simple-text logo-normal"
          > */}
            {/* CableGuy CATV */}
            <img onClick={() => this.main_page_click()} src={require("img/CATV.png").default} style={{  width : "100px" }} alt="react-logo" />
            {/* </a> */}
          </center>
        </div>
        <div className="sidebar-wrapper" ref={this.sidebar} style={{ paddingBottom: '20px' }}>
          <Nav>
            
            {this.props.routes.map((prop, key) => {

              if (!prop.sub_menu.length > 0) {


                return (
                  <div className="sidenav" key={key}>
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={prop.icon} style={{ height: '20px', paddingRight: '5px' }} />
                        <p onClick={()=>this.toogle_close_all_click()}>{prop.name}</p>
                      </div>
                    </NavLink>
                 
                  </div>
                )

              }
              else {
                return (
                  <div className="sidenav" key={key}>
                    <div
                      className="nav-link"
                    >
                      <div className="dropdown-btn" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={prop.icon} style={{ height: '20px', paddingRight: '5px' }} />
                        <p>{prop.name}</p>
                        <i data-toggle="collapser" style={{ width: '10%', textAlign: 'right' }} id="rotate-lefty" className="fa fa-angle-left"></i>
                      </div>
                      <div className="dropdown-container" id="dropdown-container">
                        {prop.sub_menu.map((prop, key) => {
                          return (
                            <NavLink
                            key={key}
                              style={{ padding: '0', margin: '0' }}
                              to={prop.layout + prop.path}
                              className="nav-link"
                              activeClassName="active"
                            >
                              <p onClick={()=>this.toogle_close_all_click()} style={{ fontSize: '12px' }}>{prop.name}</p>
                            </NavLink>
                          )
                        })}
                      </div>


                    </div>
                  </div>

                )
              }
            }
            )};

          
          </Nav>

        </div>

      </div>
    );
  }
}

export default Sidebar;
