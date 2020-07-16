import React from "react";
import {Router, Route, Switch} from 'react-router-dom';
import history from "../history/history"
import Header from "./header/Header";
import Signup from "./Login&Signup/Signup"
import Login from "./Login&Signup/Login"
import ForgotPassword from "./Login&Signup/ForgotPassword"
import UpdatePassword from "./Login&Signup/UpdatePassword"
import SecurePage from "./SecurePage/SecurePage"
import "../Style/App.css"

const App = () => {
    return (
        <Router history={history}>
            <div className="ui container App">
                <Header/>
                <Switch>
                    <Route exact path="/signup">
                        <Signup/>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/forgot-password">
                        <ForgotPassword/>
                    </Route>
                    <Route exact path="/update-password">
                        <UpdatePassword/>
                    </Route>
                    <Route exact path="/secure">
                        <SecurePage/>
                    </Route>
                </Switch>
            </div>
        </Router>

    );
};

export default App;