
import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

import SubUserRoutes from "SubUserRoutes";
import profile from "img/transperson.png";
import decrypt from "../../utils/Functions/decrypt";
import Modal_contact_us from "Modal_contact_us";
class DemoNavbarSubUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      color: "transparent",
      top_value: "",
      top_menu_name: "",
      profile_name: "",
      routes: props.routes,
     contact_open:false
    } 
    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.sidebarToggle = React.createRef();
  }
  contact_clicker=()=>{
    this.setState({contact_open:false});
  }
  contact_display=()=>{
    this.setState({contact_open:true});
  }

  contact_us_click = () => {
    this.setState({ color: "transparent", isOpen: false });
    // this.setState({ isOpen: false , color: "transparent"});
    // window.open("https://cableguy.in/contact.html", "_blank");
    this.contact_display();
  };

  logout_click = () => {
    this.setState({ isOpen: false, color: "transparent" });
    window.location.replace("/sign-in");
  };

  my_profile_click = () => {
    this.setState({ color: "transparent", isOpen: false });
    // this.props.history.push({
    //   pathname: "/subuser/user-profile",
    // });
  };

  toggle() {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent",
      });
    } else {
      this.setState({
        color: "dark",
      });
    }
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  dropdownToggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  // top_menu = () => {
  //   // {this.props.routes.map((prop, key) => {

  //   //   if(window.location.pathname=="/subuser/dashboard")
  //   //   {
  //   //   return(
  //   //     <NavbarBrand href="/">Dashboard</NavbarBrand>
  //   //   );
  //   //   }
  //   //  })};

  //   if (window.location.pathname === "/subuser/dashboard") {
  //     return (
  //       // <NavbarBrand href="">Dashboard</NavbarBrand>
  //       <NavbarBrand>Dashboard</NavbarBrand>
  //     );
  //   } else if (window.location.pathname === "/subuser/user-profile") {
  //     return <NavbarBrand>My Profile</NavbarBrand>;
  //   } else if (window.location.pathname === "/subuser/channel_subscription") {
  //     return <NavbarBrand>Channel Subscription</NavbarBrand>;
  //   } else if (window.location.pathname === "/subuser/quick_pay") {
  //     return <NavbarBrand>Quick Pay</NavbarBrand>;
  //   } else if (window.location.pathname === "/subuser/payment_history") {
  //     return <NavbarBrand>Payment History</NavbarBrand>;
  //   } else if (window.location.pathname === "/subuser/tickets") {
  //     return <NavbarBrand>My Tickets</NavbarBrand>;
  //   } else if (window.location.pathname === "/subuser/newplan") {
  //     return <NavbarBrand>Channel Subscription</NavbarBrand>;
  //   } else {
  //     return <NavbarBrand>Dashboard</NavbarBrand>;
  //   }
  //   // else{
  //   //   return(
  //   //     <NavbarBrand href="/"></NavbarBrand>
  //   //    );
  //   // }
  // };
  getBrand() {
    var brandName = "Dashboard";
    if (window.location.pathname == "/subuser/assigned-task/uat") {
      brandName = "Assigned Task";
    }
    // else if(window.location.pathname == "/subuser/oldplan")
    // {
    //   brandName = "Activate Expired Plans";
    // }
    else {
      SubUserRoutes.map((prop, key) => {
        {prop.sub_menu.map((prop, key) => {
          if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
            brandName = prop.name;
          }
        })};
        if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
          brandName = prop.name;
        }
        return null;
      });
     
      
    }
    return brandName;
  }
  openSidebar() {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  }
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  updateColor() {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "dark",
      });
    } else {
      this.setState({
        color: "transparent",
      });
    }
  }
  componentDidMount() {
    
    window.addEventListener("resize", this.updateColor.bind(this));
    // this.top_menu();
    // alert('a');
    // const c_value = decrypt(localStorage.getItem("Data"));
    // const resp_data = JSON.parse(c_value);
 
  }


  get_name(){
    try{
      var name=decrypt(localStorage.getItem('name'));
    if (name.length > 22) {  
        name= name.substring(0, 22) + "...";
    }
    return name;
  }catch(Exception){}
    // alert(name);
  }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.sidebarToggle.current.classList.toggle("toggled");
    }
  }
  render() {
    return (
      <div>
      <Modal_contact_us contact_open={this.state.contact_open} contact_clicker={this.contact_clicker}/>
  

      {/* // add or remove classes depending if we are on full-screen-maps page or not */}
      <Navbar
        // style={{width:"100%"}}
        color={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "dark"
            : this.state.color
        }
        expand="lg"
        className={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
              (this.state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={this.sidebarToggle}
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand>{this.getBrand()}</NavbarBrand>
            {/* {this.top_menu()} */}
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            {/* <form>
              <InputGroup className="no-border">
                <Input placeholder="Search..." />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </form> */}

            <Nav navbar>
              <NavItem onClick={() => this.my_profile_click()}>
                <Link to="#" className="nav-link btn-magnify">
                  <img
                    alt="..."
                    className="img-fluid"
                    style={{ height: "30px", paddingBottom: "5px" }}
                    src={profile}
                  />
                  <p className=""> {this.get_name()}</p>
                </Link>
              </NavItem>
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen}
                toggle={(e) => this.dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="nc-icon nc-bell-55" />
                  <p>
                    <span className="d-lg-none d-md-block">Help</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    style={{ cursor: "pointer" }}
                    tag="a"
                    onClick={() => this.contact_us_click()}
                  >
                    Contact Us
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    style={{ cursor: "pointer" }}
                    onClick={() => this.logout_click()}
                  >
                    Logout
                  </DropdownItem>
                  {/* <DropdownItem tag="a">Something else here</DropdownItem> */}
                </DropdownMenu>
              </Dropdown>
              {/* <NavItem>
                <Link to="#pablo" className="nav-link btn-rotate">
                  <i className="nc-icon nc-settings-gear-65" />
                  <p>
                    <span className="d-lg-none d-md-block">Account</span>
                  </p>
                </Link>
              </NavItem> */}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      </div>
    );
  }
}

export default DemoNavbarSubUser;
