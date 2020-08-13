import React from 'react';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            password2: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(e) {
        e.preventDefault();
        let user = this.state;

        this.props.signup(user);
    };



    update(type) {
        return e => {
            this.setState({ [type]: e.currentTarget.value })
        }
    };

    renderErrors() {
        return(
            <ul>
                {Object.values(this.props.errors).map((error,i) => (
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
    render(){
        
        return (
            <>
                <section id="main-content">
                    <div>
                        <div id="user-account-form">
                            <div className="flex space-between mb-11">
                                <p className="login-title">Sign up</p>
                                <p className="toggle-session">Have an account? <Link to="/login">Log in</Link></p>
                            </div>
                            <form className="flex center column" onSubmit={this.handleSubmit}>
                                    <input
                                        className="mb"
                                        placeholder="Userame"
                                        type="text"
                                        value={this.state.username}
                                        onChange={this.update('username')}
                                    /> 
                                    <input
                                        className="mb"
                                        placeholder="Email"
                                        type="text"
                                        value={this.state.email}
                                        onChange={this.update('email')}
                                    />
                                    <input
                                        placeholder="Password"
                                        className="mb"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.update('password')}
                                    />
                                    <input
                                        placeholder="Confirm Password"
                                        className="mb"
                                        type="password"
                                        value={this.state.password2}
                                        onChange={this.update('password2')}
                                    />
                                <input className="submit-button" type="submit" value="Create Account"/>
                                {this.renderErrors()}
                            </form>
                        </div>
                    </div>
                </section>
            </>
        )}
    
}

export default SignUp;