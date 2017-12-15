import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { BackendSrv } from './../../core/services/backend_srv';
import PageHeader from './../../core/components/PageHeader/PageHeader';
import dataFetch, { loginPing } from './../../utils/dataFetch';
import config from 'app/core/config';
import qs from 'qs';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.navModel = {
            main: {
                icon: 'gicon gicon-branding',
                subTitle: 'Register your Grafana account',
                breadcrumbs: [
                  { title: 'Login', url: '/login' },
                  { title: 'Sign Up' },
                ]
            }
        };

        this.state = {
            verifyEmailEnabled: false,
            autoAssignOrg: false,
            verifyEmailEnabled: false,
            loginData: {
                code: '',
                orgName: '',
                password: '',
                username: '',
                name: '',
            };
        };
    }

    componentWillMount() {
        dataFetch.get('/api/user/signup/options').then(result => {
            const {
                verifyEmailEnabled,
                autoAssignOrg
            } = result.data;

            this.setState(prevState => {
                return {
                    ...prevState,
                    verifyEmailEnabled: verifyEmailEnabled,
                    autoAssignOrg: autoAssignOrg
                };
            });
        });
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

    handleFormChange () {

    }

    render() {
        const {
            verifyEmailEnabled,
            autoAssignOrg
        } = this.state;
        console.log('verifyEmailEnabled', verifyEmailEnabled);
        console.log('autoAssignOrg', autoAssignOrg);
        return (
            <div>
                <PageHeader model={this.navModel}></PageHeader>

                <div className="page-container page-body">
                    <div className="signup">
                        <h3 className="p-b-1">You're almost there.</h3>
                        <div className="p-b-1">
                            We just need a couple of more bits of<br /> information to finish creating your account.
                        </div>
                        <form name="signUpForm" className="login-form gf-form-group" onChange={this.handleFormChange}>
                            {verifyEmailEnabled ?
                                <div className="gf-form">
                                    <span className="gf-form-label width-9">
                                    Email code<tip>Email verification code (sent to your email)</tip>
                                    </span>
                                    <input type="text" className="gf-form-input max-width-14" ng-model="formModel.code" required />
                                </div>
                            : null}
                            {!autoAssignOrg ?
                                <div className="gf-form">
                                    <span className="gf-form-label width-9">Org. name</span>
                                    <input type="text"
                                        name="orgName"
                                        className="gf-form-input max-width-14"
                                        ng-model="formModel.orgName"
                                        placeholder="Name your organization" />
                                </div>
                            : null}
                            <div className="gf-form">
                                <span className="gf-form-label width-9">Your name</span>
                                <input type="text"
                                    name="name"
                                    className="gf-form-input max-width-14"
                                    ng-model="formModel.name"
                                    placeholder="(optional)" />
                            </div>
                            <div className="gf-form">
                                <span className="gf-form-label width-9">Email</span>
                                <input type="text"
                                    className="gf-form-input max-width-14"
                                    required ng-model="formModel.username"
                                    placeholder="Email"
                                    autoComplete="off" />
                            </div>
                            <div className="gf-form">
                                <span className="gf-form-label width-9">Password</span>
                                <input type="password"
                                    className="gf-form-input max-width-14"
                                    required
                                    ng-model="formModel.password"
                                    id="inputPassword"
                                    placeholder="password"
                                    autoComplete="off" />
                            </div>

                            <div className="signup__password-strength">
                                <password-strength password="formModel.password"></password-strength>
                            </div>

                            <div className="gf-form-button-row p-t-3">
                                <button type="submit" className="btn btn-success" ng-click="ctrl.submit();" ng-disabled="!signUpForm.$valid">
                                Sign Up
                                </button>
                                <Link to="/login" className="btn btn-inverse">
                                    Back
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
