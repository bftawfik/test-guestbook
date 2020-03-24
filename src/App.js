import React, { Component } from "react";

import Router from "./Router";

import {
  authenticate,
  addAuthCookie,
  getAuthCookie,
  removeAuthCookie
} from "./Service/Service";
import UserProvider from "./Context/UserProvider";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        user.login(res.data, token);
      })
      .catch( err => {
        this.state.user.logout();
      });
    }
  }

  render() {
    const { user } = this.state;    
    return (
      <div className="App">
        <UserProvider value={user}>
          <Router />
        </UserProvider>
      </div>
    );
  }
}

export default App;
