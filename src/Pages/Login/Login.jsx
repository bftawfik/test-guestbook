import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withUser } from "../../Context/UserProvider";
import { PATHES } from "../../Constants/routes";
import { login, authenticate, getAuthCookie } from "../../Service/Service";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: ""
    };

    this.password1Ref = React.createRef();
    this.password2Ref = React.createRef();
  }

  emailChangeHandler = value => {
    const { email } = this.state;
    if (email !== value) this.setState({ email: value });
  };

  passwordChangeHandler = () => {
    const { password } = this.state;
    if (password !== this.password1Ref.current.value)
      this.setState({ password: this.password1Ref.current.value });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { user } = this.props;

    login({
      email: email,
      password: password
    }).then(res => {
       const { id, username, email } = res.data.user;
       user.login({ id: id, username: username, email: email }, res.data.token);
    });
  };

  componentDidMount() {
    const { user } = this.props;
    const token = getAuthCookie("coformatiqueGuestbook");
    if (token) {
      authenticate(token)
        .then(res => {
          user.login(res.data, token);
        })
        .catch(err => {
          user.logout();
        });
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1>Login</h1>
          <p>Please fill in this form to login.</p>
        </header>
        <form onSubmit={this.onSubmitHandler}>
          <label for="email">
            <b>E-mail</b>
          </label>
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            required
            onChange={event => this.emailChangeHandler(event.target.value)}
          />

          <label for="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
            ref={this.password1Ref}
            onChange={this.passwordChangeHandler}
          />

          <button type="submit">Login</button>
        </form>
        <footer>
          <p>
            Don't have an account? <Link to={PATHES.REGISTER}> Register</Link>.
          </p>
        </footer>
      </div>
    );
  }
}
export default withUser(Login);
