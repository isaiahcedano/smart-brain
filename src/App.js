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
import {useState} from 'react';

const App = () => {
    const [loggedIn, setLogin] = useState([false, ""]);

    return (
        <Router>
            <Switch>
                <Route exact path={URLS.HOME}>
                    <Home signout={setLogin} loggedin={loggedIn} id={loggedIn[1]}/>
                </Route>
                <Route exact path={URLS.REGISTER}>
                    <Register setLogin={setLogin}/>
                </Route>
                <Route exact path={URLS.SIGNIN}>
                    <Signin loggedIn={loggedIn} login={setLogin}/>
                </Route>

                <Redirect to={URLS.HOME}/>
            </Switch>
        </Router>
    );
};

export default App;