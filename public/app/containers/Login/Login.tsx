import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dataFetch, { loginPing } from './../../utils/dataFetch';
import config from 'app/core/config';
import qs from 'qs';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.oauth = config.oauth;
        this.oauthEnabled = Object.keys(config.oauth).length > 0;
        this.disableLoginForm = config.disableLoginForm;
        this.disableUserSignUp = config.disableUserSignUp;
        this.loginHint = config.loginHint;
        this.loginForm = null;
        this.state = {
            loginData: {
                email: '',
                password: '',
                user: '',
            }
        };
    }

    handleSubmit (evt) {
        evt.preventDefault();
        dataFetch.post('/login', this.state.loginData).then(function(result) {
            const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

            if (params.redirect && params.redirect[0] === '/') {
                window.location.href = config.appSubUrl + params.redirect;
            } else if (result.redirectUrl) {
                window.location.href = result.redirectUrl;
            } else {
                window.location.href = config.appSubUrl + '/';
            }
        }).catch(error => {
            const { status, data } = error.response;
            if (status === 401) {
                alert(data.message);
                return loginPing().then(() => {
                    return false;
                });
            } else {
                alert(data.message); // TODO
            }
        });
    }

    handleInputChange (evt) {
        const target = evt.target;
        switch (target.name) {
            case 'username':
                this.setState(prevState => {
                    return {
                        ...prevState,
                        loginData: {
                            ...prevState.loginData,
                            user: target.value
                        }

                    };
                });
                break;
            case 'password':
                this.setState(prevState => {
                    return {
                        ...prevState,
                        loginData: {
                            ...prevState.loginData,
                            password: target.value
                        }

                    };
                });
                break;
            default:
                break;
        }
    }

    isFormValid (formEl) {
        return formEl.checkValidity();
    }

    render() {
        console.log('this.loginForm', this.loginForm);
        const isFormValid = this.loginForm && this.isFormValid(this.loginForm);
        return (
            <div className="login container">
                <div className="login-content">
                    <div className="login-branding">
                        <img className="logo-icon" src="public/img/grafana_icon.svg" alt="Grafana" />
                        <i className="icon-gf icon-gf-grafana_wordmark"></i>
                        <p>React edition</p>
                    </div>
                    <div className="login-inner-box">
                        {!this.disableLoginForm ?
                            <form ref={el => { this.loginForm = el; }}
                                name="loginForm"
                                method="post"
                                className="login-form-group gf-form-group"
                                onSubmit={this.handleSubmit}>
                                <div className="login-form">
                                    <input type="text"
                                        name="username"
                                        onChange={this.handleInputChange}
                                        className="gf-form-input login-form-input"
                                        required
                                        placeholder="email" />
                                </div>
                                <div className="login-form">
                                    <input type="password" name="password"
                                        onChange={this.handleInputChange}
                                        className="gf-form-input login-form-input"
                                        required ng-model="formModel.password" id="inputPassword" placeholder="password" />
                                </div>
                                <div className="login-button-group">
                                    <button type="submit" className={`btn btn-large p-x-2 ${isFormValid ? 'btn-primary' : 'btn-inverse' }`}>
                                        Log In
                                    </button>
                                    <div className="small login-button-forgot-password">
                                        <Link to="/user/password/send-reset-email">Forgot your password?</Link>
                                    </div>
                                </div>
                            </form>
                        : null }
                        {this.oauthEnabled ?
                            <div className="text-center login-divider" ng-show="oauthEnabled">
                                <div>
                                    <div className="login-divider-line">
                                    </div>
                                </div>
                                <div>
                                    <span className="login-divider-text">
                                        <span ng-hide="disableLoginForm">or</span>
                                    </span>
                                </div>
                                <div>
                                    <div className="login-divider-line">
                                    </div>
                                </div>
                            </div>
                        : null }
                        <div className="clearfix"></div>
                        <div className="login-oauth text-center" ng-show="oauthEnabled">
                            {this.oauth.google ?
                                <a className="btn btn-medium btn-service btn-service--google login-btn" href="login/google" target="_self">
                                    <i className="btn-service-icon fa fa-google" />
                                    Sign in with Google
                                </a>
                            : null}
                            {this.oauth.github ?
                                <a className="btn btn-medium btn-service btn-service--github login-btn" href="login/github" target="_self">
                                    <i className="btn-service-icon fa fa-github" />
                                    Sign in with GitHub
                                </a>
                            : null}
                            {this.oauth.grafana_com ?
                                <a className="btn btn-medium btn-inverse btn-service btn-service--grafanacom login-btn"
                                    href="login/grafana_com"
                                    target="_self">
                                    <i className="btn-service-icon" />
                                    Sign in with Grafana.com
                                </a>
                            : null}

                            {this.oauth.generic_oauth ?
                                <a className="btn btn-medium btn-inverse btn-service btn-service--oauth login-btn"
                                    href="login/generic_oauth"
                                    target="_self">
                                    <i className="btn-service-icon fa fa-sign-in" />
                                    Sign in with ##oauth.generic_oauth.name
                                </a>
                            : null}
                        </div>
                        <div className="login-signup-box">
                            <div className="login-signup-title p-r-1">
                                New to Grafana?
                            </div>
                            <Link to="/signup" className="btn btn-medium btn-signup btn-p-x-2">Sign Up</Link>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}

export default Login;
