import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebaseui from 'firebaseui';
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state ={
      user:{},
      credential:undefined
    }
  }

  signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var me = this;
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      localStorage.setItem('token_',token);
      // The signed-in user info.
      var user = result.user;
      me.setState({user: {
            name: result.user.displayName,
            email: result.user.email,
            accounttype: 'free'
          }});
          me.setState({credential:result.credential});
      console.log(result.user);
      me.props.dispatch({
        type: 'LOGIN_WITH_GOOGLE',
        payload: {
          isLoggedin: true,
          user: {
            name: result.user.displayName,
            email: result.user.email,
            accounttype: 'free'
          }
        }
      });
      //save Data into firestore
      var userRef = firebase.database().ref("user/");
      userRef.set({
        name: result.user.displayName,
        email: result.user.email,
        accounttype: 'free'
      })
        .then(function (docRef) {
          console.log("saved user info ");
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      // ...
    }).catch(function (error) {
      console.log(error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  };

  signOut() {
    // Sign out of Firebase.
    firebase.auth().signOut();
    this.props.dispatch({
      type: 'LOGIN_WITH_GOOGLE',
      payload: {
        isLoggedin: false,
        changeAccountType: false
      }
    });
  };

  changeAccount() {
    setTimeout(() => window.open("http://localhost:8080?test="+ JSON.stringify(this.state.credential), "", "width=800,height=800"), 1000);
    this.props.dispatch({
      type: 'CHANGE_ACCOUNT_TYPE',
      payload: {
        changeAccountType: true,
        user: this.state.user,
        credential: this.state.credential
      }
    })
  }


  render() {
    const responseGoogle = (response) => {
      console.log('response', response);
    }
    const getUserInfo = () => {
      if (this.props.isLoggedin) {
        return (
          <p>
            <button onClick={() => this.signOut()} >SignOut</button>
            <br />
            <h4>UserName: {this.props.user.name}</h4>
            <h4>Email: {this.props.user.email}</h4>
            <h4>AccountType: {this.props.accounttype}</h4>
            <button onClick={() => this.changeAccount()} >Change Account Type</button>
          </p>
        )
      }

    }
    return (
      <div id="firebaseui-auth-container" style={loginStyle} >
        {
          !this.props.isLoggedin && <button onClick={() => this.signIn()} >Signin</button>

        }
        {
          getUserInfo()
        }
      </div>
    );
  }
}

const loginStyle = {
  marginTop: '45%',
  textAlign: 'center'
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    isLoggedin: state.count.isLoggedin,
    user: state.count.user,
    accounttype: state.count.accounttype
  };
};

export default connect(mapStateToProps)(Login);
