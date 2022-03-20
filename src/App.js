import URLS from "./URLS";
import Home from "./Pages/App/Home";
import Register from "./Pages/Register/Register";
import Signin from "./Pages/Signin/Signin";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import {connect} from 'react-redux';
import {signin} from './redux/actions/signinpage';

const mapDispatchToProps = dispatch => ({
  setLogin: (login, id) => dispatch(signin(login, id))
});

const mapStateToProps = state => ({
  loggedin: state.changeLoginState.loggedin,
  id: state.changeLoginState.id,
});

const App = ({setLogin, loggedin, id}) => {
    return (
        <Router>
            <Switch>
                <Route exact path={URLS.HOME}>
                    <Home signout={setLogin} loggedin={loggedin} id={id}/>
                </Route>
                <Route exact path={URLS.REGISTER}>
                    <Register setLogin={setLogin}/>
                </Route>
                <Route exact path={URLS.SIGNIN}>
                    <Signin loggedin={loggedin} login={setLogin}/>
                </Route>
                <Redirect to={URLS.HOME}/>
            </Switch>
        </Router>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
