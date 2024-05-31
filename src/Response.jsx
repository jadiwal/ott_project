import React from "react";
import decrypt from "./utils/Functions/decrypt";
import success_gif from "img/success_new_gif.gif"
import error_img from "img/error.png"
import {Button} from "reactstrap";


var ps;

class Response extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      green_box: 'none',
      red_box: 'none'
    };
  }

  componentWillMount() {
    //  this.props.history.index=0;
  }

  navigate = () => {

    var name = decrypt(localStorage.getItem('name'));

    if (name == 'ADMIN') {

      // this.props.history.push({
      //   pathname: "/admin/dashboard"
      // })
      window.location.replace("/admin/dashboard");
    }
    else {

      // this.props.history.push({
      //   pathname: "/subuser/dashboard"
      // })
      
      window.location.replace("/subuser/dashboard");
    }

  }

  componentDidMount() {
    var msg = this.props.match.params.msg;
    // alert(msg);
    if (msg == "success") {
      this.setState({ green_box: 'block' });
    }
    else if (msg == "error") {
      this.setState({ red_box: 'block' });
    }
    else {
      this.setState({ red_box: 'block' });
    }




  }


  render() {
    return (
      <div id="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <center>
          <div style={{ display: this.state.green_box, }}>
            {/* <div className="dot"></div>
          <div className="dot two"></div>
          <div className="face">
            <div className="eye"></div>
            <div className="eye right"></div>
            <div className="mouth happy"></div>
          </div>
          <div className="shadow scale"></div>
          <div className="message"><h1 className="alert" id="h111">Successfully Done</h1></div>
          <button className="button-box" onClick={()=>this.navigate()}><h1 id="h111" className="green">continue</h1></button> */}

            <h5 style={{ fontWeight: 'bold' }}>Successfully Done</h5>
            <img
              src={success_gif}
              style={{ height: '250px' }}
              className="img-fluid"
            ></img><br />
            <Button
              size="lg"
              className="btn-round"
              color="success"
              onClick={() => this.navigate()}
            >
              Continue
                    </Button>
          </div>
          <div style={{ display: this.state.red_box }}>
            <h5 style={{ fontWeight: 'bold' }}>Something Went Wrong</h5>
            <img
              src={error_img}
              style={{ height: '250px', padding: '70px' }}
              className="img-fluid"
            ></img><br />
            <Button
              size="lg"
              className="btn-round"
              color="secondary"
              onClick={() => this.navigate()}
            >
              Try Again
                    </Button>
            {/* <div className="dot"></div>
          <div className="dot two"></div>
          <div className="face2">
            <div className="eye"></div>
            <div className="eye right"></div>
            <div className="mouth sad"></div>
          </div>
          <div className="shadow move"></div>
          <div className="message"><h1 id="h111" className="alert">Error!</h1><p style={{fontSize:'12px'}}>Something went wrong.</p>
          </div>
          <button className="button-box" onClick={()=>this.navigate()}><h1 id="h111" className="red">Try again</h1></button> */}
          </div>
        </center>
      </div>
    );
  }
}

export default Response;
