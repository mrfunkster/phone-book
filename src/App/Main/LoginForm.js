import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authWithEmailAndPassword } from '../../common/store/action';

import './LoginForm.css'

class LoginForm extends Component {

    state = {
        email: "",
        password: "",
        rememberMe: true
    }

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