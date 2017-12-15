import ReactDOM from 'react-dom';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import withProps from './hoc/withProps';
import Login from './containers/Login/Login';
import SignUp from './containers/SignUp/SignUp';
import ResetPassword from './containers/ResetPassword/ResetPassword';

const grafanaBootData = {grafanaBootData: window.grafanaBootData};

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/login" component={withProps(Login, grafanaBootData)}  />
            <Route exact path="/signup" component={withProps(SignUp, grafanaBootData)}  />
            <Route exact path="/user/password/send-reset-email" component={withProps(ResetPassword, grafanaBootData)}  />
            {/* // <Route path="/about" component={About}/>
            // <Route path="/topics" component={Topics} /> */}
        </Switch>
    </Router>
);

const appElement = document.querySelector('react-app');
if (appElement) {
    ReactDOM.render((
        <App />
    ), appElement);
}

export default App;
