import React, {Component} from 'react';
import {connect} from 'react-redux';
import Login from '../login/Login';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={popupStyle}>
        <Login />
      </div>
    );
  }
}

const popupStyle = {
  padding: '10px',
  minWidth: '500px',
  minHeight: '500px'
}


export default connect()(App);
