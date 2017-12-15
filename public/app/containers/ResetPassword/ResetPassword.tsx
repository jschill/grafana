import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { BackendSrv } from './../../core/services/backend_srv';
import PageHeader from './../../core/components/PageHeader/PageHeader';
import dataFetch, { loginPing } from './../../utils/dataFetch';
import config from 'app/core/config';
import qs from 'qs';

const MODES = {
    RESET: 'reset',
    SEND: 'send',
    EMAIL_SENT: 'email-sent'
};

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendResetEmail = this.sendResetEmail.bind(this);
        // this.submitReset = this.submitReset.bind(this);

        const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

        this.navModel = {
            main: {
                icon: 'gicon gicon-branding',
                subTitle: 'Reset your Grafana password',
                breadcrumbs: [
                  { title: 'Login', url: '/login' },
                  { title: 'Reset Password' },
                ]
            }
        };

        this.state = {
            mode: params.code ? MODES.RESET : MODES.SEND,
            formModel: params.code ? {
                code: params.code
            } : {} // TODO: Readability
        };
    }

    sendResetEmail() {
        // TODO!
        // if (!$scope.sendResetForm.$valid) {
        //     return;
        // }
        dataFetch.post('/api/user/password/send-reset-email', this.state.formModel).then(() => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    mode: 'email-sent'
                };
            });
        });
    }




    // TODO!?
    // submitReset() {
    //     // TODO!
    //     //if (!$scope.resetForm.$valid) { return; }

    //     // TODO!
    //     // if (this.state.formModel.newPassword !== this.state.formModel.confirmPassword) {
    //     //     $scope.appEvent('alert-warning', ['New passwords do not match', '']);
    //     //     return;
    //     // }

    //     dataFetch.post('/api/user/password/reset', this.state.formModel).then(function() {
    //         $location.path('login');
    //     });
    // };



    handleInputChange (evt) {
        // const target = evt.target;
        // switch (target.name) {
        //     case 'username':
        //         this.setState(prevState => {
        //             return {
        //                 ...prevState,
        //                 loginData: {
        //                     ...prevState.loginData,
        //                     user: target.value
        //                 }

        //             }
        //         });
        //         break;
        //     case 'password':
        //         this.setState(prevState => {
        //             return {
        //                 ...prevState,
        //                 loginData: {
        //                     ...prevState.loginData,
        //                     password: target.value
        //                 }

        //             }
        //         });
        //         break;
        //     default:
        //         debugger;
        //         break;
        // }
    }

//     handleFormChange () {

//     }




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
                        <h3 className="p-b-1">Reset password</h3>
                        {this.state.mode === MODES.SEND ?
                            <form name="sendResetForm" className="login-form gf-form-group">
                                <div className="gf-form">
                                    <span className="gf-form-label width-7">User</span>
                                    <input type="text"
                                        name="username"
                                        value={this.state.formModel.userOrEmail}
                                        className="gf-form-input max-width-14"
                                        required
                                        placeholder="email or username" />
                                </div>
                                <div className="gf-form-button-row">
                                    <button type="submit" className="btn btn-success" onClick={this.sendResetEmail}>
                                        Reset Password
                                    </button>
                                    <Link to="/login" className="btn btn-inverse">
                                        Back
                                    </Link>
                                </div>
                            </form>
                        : null}

                        {this.state.mode === MODES.EMAIL_SENT ?
                            <div>
                                An email with a reset link as been sent to the email address. <br />
                                You should receive it shortly.
                                <div className="p-t-1">
                                    <Link to="/login" className="btn btn-success p-t-1">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPassword;
