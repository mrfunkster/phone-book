import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authWithEmailAndPassword } from '../../common/store/action';

import './LoginForm.css'

class LoginForm extends Component {

    state = {
        email: "",
        password: "",
        rememberMe: true,
        emailEmpty: false,
        emailWrong: false,
        passwordEmpty: false,
        passwordShort: false
    };

    handleSubmit = e => {
        e.preventDefault();
        let formData = {
            email: this.state.email.trim(),
            password: this.state.password.trim(),
            rememberMe: this.state.rememberMe
        };
        if(!this.validateForm()) {
            this.props.authWithEmailAndPassword(formData);
        } else {
            alert("Enter a correct email or password!")
        };
    };

    inputHandler = e => {
        e.persist();
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    clearState = () => {
        this.setState({
            email: "",
            password: ""
        });
    };

    validateForm = () => {
        let error = 0;
        if(!this.state.email.length) {
            error++;
        } else if (!this.validateEmail()) { 
            error++;
        } else if(!this.validatePassword()) {
            error ++
        };
        return error;
    }

    validatePassword = () => {
        if (!this.state.password.length) {
            this.setState(prevState => ({...prevState, passwordEmpty: true}));
            return false;
        } else if (this.state.password.length < 6) {
            this.setState(prevState => ({...prevState, passwordShort: true}));
            return false;
        } else {
            return true;
        };
    };

    validateEmail = () => {
        const emailTest = () => {
            const regEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; //eslint-disable-line
            return regEx.test(this.state.email);
        };
        if(!emailTest()) {
            this.setState(prevState => ({...prevState, emailWrong: true}));
            return false;
        };
    };

    render() {
        const {
            loginLoader
        } = this.props;
        return (
            <div className="login-form shadow">
                <form onSubmit={this.handleSubmit}>
                    <div className={this.state.emailWrong ? "form-input error" : "form-input"}>
                        <label htmlFor="">Email:
                            <input type="email"
                                className="shadow"
                                placeholder="Email"
                                name="email"
                                value={this.state.email}
                                onChange={this.inputHandler}
                                disabled={loginLoader}
                                onBlur={() => this.validateEmail()}
                                onFocus={e => {
                                    this.setState(prevState => ({...prevState, emailWrong: false}));
                                    let value = e.target.value;
                                    e.target.value = value;
                                }}
                            />
                        </label>
                        {
                            this.state.emailWrong &&
                            <span className="text-danger"
                            >Enter a correct email!</span>
                        }
                    </div>
                    <div className={(this.state.passwordShort || this.state.passwordEmpty) ? "form-input error" : "form-input"} >
                        <label htmlFor="">Password:
                            <input type="password"
                                className="shadow"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.inputHandler}
                                disabled={loginLoader}
                                onBlur={() => this.validatePassword()}
                                onFocus={(e) => {
                                    this.setState(prevState => ({...prevState, passwordEmpty: false, passwordShort: false, password: ''}));
                                }}
                            />
                        </label>
                        {
                            (this.state.passwordShort || this.state.passwordEmpty) &&
                            <span className="text-danger"
                            >Password must contains 6 characters or!</span>
                        }
                    </div>
                    <div className="form-input form-check">
                        <div className="remember-me">
                            <input type="checkbox"
                                id="remeberme"
                                className="form-check-input shadow"
                                name="rememberMe"
                                checked={this.state.rememberMe}
                                onChange={this.inputHandler}
                                disabled={loginLoader}
                            />
                            <label className="form-check-label" htmlFor="remeberme">Remember Me</label>
                        </div>
                    </div>
                    <div className="button-input">
                        {
                            !loginLoader ? 
                                <button className="btn btn-success">Login</button>
                            : <div className="spinner-border text-success" role="status"></div>
                        }
                    </div>
                </form>
            </div>
        );
    };
};

const mapDispatchToProps = {
    authWithEmailAndPassword
}

const mapStateToProps = state => ({
    loginLoader: state.app.loginLoader
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);