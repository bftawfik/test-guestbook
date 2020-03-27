import React, { Component } from "react";

import Router from "./Router"; 
import Loading from './Components/Loading/Loading';
import {
  authenticate,
  addAuthCookie,
  getAuthCookie,
  removeAuthCookie
} from "./Service/Service";
import UserProvider from "./Context/UserProvider";

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {
        id: undefined,
        username: undefined,
        email: undefined,
        login: (user, token) => {
          addAuthCookie("coformatiqueGuestbook", token);
          this.setState({
            user: {
              ...this.state.user,
              id: user.id,
              username: user.username,
              email: user.email
            }
          });
        },
        logout: () => {          
          removeAuthCookie("coformatiqueGuestbook");
          this.setState({
            user: {
              ...this.state.user,
              id: undefined,
              username: undefined,
              email: undefined
            }
          });
        }
      }
    };
  }

  componentDidMount() {
    const { user } = this.state;
    const token = getAuthCookie("coformatiqueGuestbook") || null;
    if (token) {            
      authenticate(token)
      .then(res => {
        this.toggleLoading();
        user.login(res.data, token);
      })
      .catch( err => {
        this.toggleLoading();
        this.state.user.logout();
      });
    }else{
      this.toggleLoading();
    }
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  }

  render() {
    const { loading, user } = this.state;    
    return (
      <div className="App">
        {loading ? <Loading /> : (
          <UserProvider value={user}>
            <Router />
          </UserProvider>
        )}
      </div>
    );
  }
}

export default App;
