import React, { Component } from 'react'
import Home from './Auth/Home/Home';
//import './Signup.css';
import { withAuthenticator } from '@aws-amplify/ui-react'



class Signup extends Component {
  
  
  render() {

    setTimeout(function () {
      window.location.reload(1);
    }, 100000);

    return (
      <div className="Signup">
        <Home />
      </div>
    );
  }
}

export default withAuthenticator(Signup);
