import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withUser } from "../../Context/UserProvider";
import { PATHES } from "../../Constants/routes";
import { addUser } from "../../Service/Service";

class Register extends Component {
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

  usernameChangeHandler = value => {
    const { username } = this.state;
    if (username !== value) this.setState({ username: value });
  };

  emailChangeHandler = value => {
    const { email } = this.state;
    if (email !== value) this.setState({ email: value });
  };

  passwordChangeHandler = () => {
    const { password } = this.state;

    if (this.password1Ref.current.value === this.password2Ref.current.value) {
      if (password !== this.password1Ref.current.value)
        this.setState({ password: this.password1Ref.current.value });
    }
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const { username, email, password } = this.state;
    const { user } = this.props;

    addUser({
      username: username,
      email: email,
      password: password
    }).then(res => {
      const { id, username, email } = res.data.user;
      user.login({ id: id, username: username, email: email }, res.data.token);
    });
  };

  render() {
    return (
      <div>
        <header>
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
        </header>
        <form onSubmit={this.onSubmitHandler}>
          <label htmlFor="username">
            <b>User name</b>
          </label>
          <input
            type="text"
            placeholder="User name"
            name="username"
            required
            onChange={event => this.usernameChangeHandler(event.target.value)}
          />

          <label htmlFor="email">
            <b>E-mail</b>
          </label>
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            required
            onChange={event => this.emailChangeHandler(event.target.value)}
          />

          <label htmlFor="psw">
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

          <label htmlFor="psw-repeat">
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="psw-repeat"
            required
            ref={this.password2Ref}
            onChange={this.passwordChangeHandler}
          />
          <button type="submit">Register</button>
        </form>
        <footer>
          <p>
            Already have an account? <Link to={PATHES.LOGIN}> Login</Link>.
          </p>
        </footer>
      </div>
    );
  }
}

export default withUser(Register);
