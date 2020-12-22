import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.waiting) {
      const { email, password } = this.state;
      let user = {
        email,
        password,
      };
      this.setState({ waiting: true });
      this.props.login(user);
    }

    // Promise.all([
    //     this.props.login(this.state),
    //     // this.props.setupSocket(),
    // ]).then(() => console.log('all resolved'));
  }

  update(type) {
    return (e) => {
      this.setState({ [type]: e.currentTarget.value });
    };
  }

  renderErrors() {
    return (
      <ul>
        {Object.values(this.props.errors).map((error, i) => (
          <li className="error-message" key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  componentWillUnmount() {
    this.props.removeErrors();
  }

  render() {
    const waiting = this.state.waiting ? "waiting" : "";
    return (
      <>
        <section>
          <div>
            <div id="user-account-form">
              <div className="flex space-between mb-11 relative">
                <p className="login-title">Log in</p>
                <p className="toggle-session">
                  New to RPSkill? <Link to="/signup">Sign Up</Link>
                </p>
              </div>
              <form className="flex center column" onSubmit={this.handleSubmit}>
                <input
                  className="mb"
                  placeholder="Email"
                  type="text"
                  value={this.state.email}
                  onChange={this.update("email")}
                />
                <input
                  className="mb"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.update("password")}
                />
                <input
                  className={`submit-button ${waiting}`}
                  type="submit"
                  value="Log In"
                />
                {this.renderErrors()}
              </form>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Login;
