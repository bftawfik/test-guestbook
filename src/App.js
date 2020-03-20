import React, { Component } from "react";
import Router from "./Router";
import UserProvider from "./Context/UserProvider";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        loggedIn: true,
        toggleUser: user => {
          this.setState({
            user: { ...user, loggedIn: !user.loggedIn }
          });
        }
      }
    };
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
