import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';


class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit(e) {
        e.preventDefault();
        Promise.all([
        //   this.props.setupSocket(),
          this.props.login(this.state),
        ]).then(() => console.log("all resolved"));
    }
    update(type) {
        return e => {
            this.setState({[type]: e.currentTarget.value})
        }
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
    componentWillUnmount(){
        this.props.removeErrors();
    }
    render() {
        return (
            <>
                <section>
                        <div>
                            <div id="user-account-form">
                                <div className="flex space-between mb-11 relative">
                                    <p className="login-title">Log in</p>
                                <p className="toggle-session">New to RPSkill? <Link to="/signup">Sign Up</Link></p>
                                </div>
                                <form className="flex center column" onSubmit={this.handleSubmit}>
                                        <input
                                            className="mb"
                                            placeholder="Email"
                                            type="text"
                                            value={this.state.email}
                                            onChange={this.update('email')}
                                        />
                                        <input
                                            className="mb"
                                            placeholder="Password"
                                            type="password"
                                            value={this.state.password}
                                            onChange={this.update('password')}
                                        />
                                    <input className="submit-button" type="submit" value="Log In"/>
                                    {this.renderErrors()}
                                </form>
                            </div>
                        </div>
                </section>
            </>
        )
    }
}


export default Login;

