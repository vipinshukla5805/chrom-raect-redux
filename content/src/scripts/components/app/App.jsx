import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAL6iCPNPhby63-HVT_Y8ZApuk66QffR58",
  authDomain: "login-f2cc4.firebaseapp.com",
  databaseURL: "https://login-f2cc4.firebaseio.com",
  projectId: "login-f2cc4",
  storageBucket: "login-f2cc4.appspot.com",
  messagingSenderId: "820901225418"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);
  }

  changeAccountType() {
    this.props.dispatch({ type: 'CHANGE_TO_ACCOUNT_PRO', payload: { accountype: 'Pro', user: this.props.user } });
    // 
    var crde = firebase.auth.GoogleAuthProvider.credential(this.props.credentials.idToken, this.props.credentials.accessToken);
    //save Data into firestore
    firebase.auth().signInWithCredential(crde).then(function () {
      var userRef = firebase.database().ref("user/");
      userRef.update({
        accounttype: 'Pro'
      })
        .then(function (docRef) {
          console.log("Updated user info", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    });
  }

  render() {
    return (
      <div>
        {this.props.changeAccountType &&
          <div style={container}>
            <div style={boxStyle} >
              <button style={btn}>Free</button>
            </div>
            <div style={boxStyle} >
              <button style={btn} onClick={() => this.changeAccountType()} >Pro</button>
            </div>
          </div>
        }
      </div>
    );
  }
}
const boxStyle = {
  width: '200px',
  height: '200px',
  border: '1px solid black',
  zIndex: 99999,
  backgroundColor: '#ccccc',
  display: 'inline-block',
  marginLeft: '50px'
}
const btn = {
  bottom: '10px',
  marginTop: '70%',
  marginLeft: '45%',
  display: 'inline-block'
}
const container = {
  display: 'inline-block'
}
const mapStateToProps = (state) => {
  return {
    isLoggedin: state.count.isLoggedin,
    user: state.count.user,
    changeAccountType: state.count.changeAccountType,
    credentials: state.count.credential
  };
};

export default connect(mapStateToProps)(App);
