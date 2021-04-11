import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerWithByEmailAndPassword } from '../../common/store/action'

import './LoginForm.css'

class RegisterForm extends Component {

    state = {
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
        shortPassword: false,
        emptyPassword: false,
        wrongEmail: false,
        wrongConfirm: false
    };

    

    handleSubmit = e => {
        e.preventDefault();
        let formData = {
            email: this.state.email.trim(),
            password: this.state.password.trim(),
        };
        if(!this.validateForm()) {
            this.props.registerWithByEmailAndPassword(formData);
        } else {
            alert("Enter a correct email or password!")
        }
    }

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
            console.log("EMAIL IS EMPTY")
            error++;
        } else if (!this.validateEmail()) {
            console.log("EMAIL IS NOT VALIDATE!");
            error++;
        } else if (!this.validatePassword()) {
            console.log("PASSWORD IS NOT VALIDATE!");
            error++;
        } else if (!this.confirmPassword()) {
            console.log("PASSWORD IS NOT CONFIRMED!");
            error++;
        };
        return error;
    }

    validateEmail = () => {
        const emailTest = () => {
            const regEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; //eslint-disable-line
            return regEx.test(this.state.email);
        };
        if(!emailTest()) {
            this.setState(prevState => ({...prevState, wrongEmail: true}));
            return false;
        } else {
            return true;
        };
    };

    validatePassword = () => {
        if (!this.state.password.length) {
            this.setState(prevState => ({...prevState, emptyPassword: true}));
            return false;
        } else if (this.state.password.length < 6) {
            this.setState(prevState => ({...prevState, shortPassword: true}));
            return false;
        } else {
            return true;
        };
    };

    confirmPassword = () => {
        if (this.state.password !== this.state.confirmPassword) {
            this.setState(prevState => ({...prevState, wrongConfirm: true}));
            return false;
        } else {
            return true;
        };
    };

    render() {
        const {
            loginLoader
        } = this.props;
        return (
            <div className="login-form shadow">
                <form onSubmit={this.handleSubmit}>
                    <div className={
                        this.state.wrongEmail ? "form-input error" : (!this.state.wrongEmail && this.state.email.length) ? "form-input success" : "form-input"
                    }>
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
                                    this.setState(prevState => ({...prevState, wrongEmail: false}));
                                    let value = e.target.value;
                                    e.target.value = value;
                                }}
                            />
                        </label>
                        {
                            this.state.wrongEmail &&
                            <span className="text-danger"
                            >Enter a correct email!</span>
                        }
                    </div>
                    <div className={this.state.shortPassword || this.state.emptyPassword || (this.state.wrongConfirm && this.state.emptyPassword) ? "form-input error" : (this.state.password.length && !this.state.shortPassword && !this.state.emptyPassword) ? "form-input success" : "form-input"}>
                        <label htmlFor="">Password:
                            <input type="password"
                                className="shadow"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.inputHandler}
                                disabled={loginLoader}
                                onFocus={() => {
                                    this.setState(prevState => ({...prevState, emptyPassword: false, shortPassword: false, password: ''}));
                                }}
                                onBlur={() => this.validatePassword()}
                            />
                        </label>
                        {
                            (this.state.shortPassword || this.state.emptyPassword) &&
                            <span className="text-danger"
                            >Password must contains 6 characters or more!</span>
                        }
                    </div>
                    <div className={(this.state.confirmPassword.length && !this.state.wrongConfirm) ? "form-input success" : this.state.wrongConfirm ? "form-input error" : "form-input"}>
                        <label htmlFor="">Confirm Password:
                            <input type="password"
                                className="shadow"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.inputHandler}
                                disabled={loginLoader}
                                onFocus={() => {
                                    this.setState(prevState => ({...prevState, wrongConfirm: false, confirmPassword: ''}));
                                }}
                                onBlur={() => this.confirmPassword()}
                            />
                        </label>
                        {
                            (this.state.wrongConfirm && this.state.password.length) &&
                            <span className="text-danger"
                            >Please confirm a password!</span>
                        }
                    </div>
                    <div className="form-input form-check">
                        <div className="remember-me">
                            <input type="checkbox"
                                id="remeberme"
                                className="form-check-input shadow"
                                name="agree"
                                value={this.state.rememberMe}
                                onChange={this.inputHandler}
                                disabled={loginLoader}
                            />
                            <label className="form-check-label" htmlFor="remeberme">I want to check this app!</label>
                        </div>
                    </div>
                    <div className="button-input">
                        {
                            !loginLoader ? 
                                <button className="btn btn-success" disabled={!this.state.agree}>Register</button>
                            : <div className="spinner-border text-success" role="status"></div>
                        }
                    </div>
                </form>
            </div>
        );
    };
};

const mapDispatchToProps = {
    registerWithByEmailAndPassword
}

const mapStateToProps = state => ({
    loginLoader: state.app.loginLoader
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterForm);