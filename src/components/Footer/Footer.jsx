
import React from "react";
import moment from "moment";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <Row>
            <nav className="footer-nav" style={{display:'none'}}>
              <ul>
                <li>
                  <a href="https://www.cableguy.in/" target="_blank">
                    CaTv Digitalas Plaform
                  </a>
                </li>
                <li>
                  <a href="https://www.cableguy.in/cgnewaboutus.html" target="_blank">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.cableguy.in/cgnewprivacypolicy.html"
                    target="_blank"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </nav>
            <div className="credits ml-auto">
              <div className="copyright">
                {/* &copy; {new Date().getFullYear()} made with{" "} */}
                &copy; {2023} CaTv Digital Plaform Made With{" "}
                <i className="fa fa-heart heart" style={{color:'#ff5c5c'}} />
              </div>
            </div>
          </Row>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
