import reactApp from './react-app';
import angularApp from './app';

const isSignedIn = window.grafanaBootData.user.isSignedIn;

if (!isSignedIn) {
    reactApp();
} else {
    angularApp.init();
}
