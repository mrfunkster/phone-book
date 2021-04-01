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
    }

    

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
            error++;
        } else if(!this.state.password.length || this.state.password.length < 6) {
            error ++
        };
        return error;
    }

    render() {
        const {
            loginLoader
        } = this.props;
        return (
            <div className="login-form shadow">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-input">
                        <label htmlFor="">Email:
                            <input type="email"
                                className="shadow"
                                placeholder="Email"
                                name="email"
                                value={this.state.email}
                                onChange={this.inputHandler}
                                disabled={loginLoader}
                            />
                        </label>
                    </div>
                    <div className="form-input">
                        <label htmlFor="">Password:
                            <input type="password"
                                className="shadow"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.inputHandler}
                                disabled={loginLoader}
                            />
                        </label>
                    </div>
                    <div className="form-input">
                        <label htmlFor="">Confirm Password:
                            <input type="password"
                                className="shadow"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.inputHandler}
                                disabled={loginLoader}
                            />
                        </label>
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