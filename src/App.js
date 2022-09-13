import React, { Component } from 'react';
import './App.css';
import { Auth } from 'aws-amplify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navebar from './components/Navebar';
import Welcome from './components/Welcome';
import Signup from './components/Signup';
import About from './components/About';
import Policy from './components/Policy'
import Pageundef from './components/Pageundef';
import Analytics from './components/Auth/Analytics/Analytics';
import Settings from './components/Auth/Settings/Settings';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialFormState = { name: '', about: '' };

class App extends Component {

    state = {
        isAuthenticated: false,
        isAuthenticating: true,
        user: null
    }

    setAuthStatus = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }

    setUser = user => {
        this.setState({ user: user });
    }

    async componentDidMount() {
        try {
            const session = await Auth.currentSession(); /* dont sleep */
            this.setAuthStatus(true);
            //console.log(session);
            const user = await Auth.currentAuthenticatedUser();
            this.setUser(user);
        } catch (error) {
            console.log(error);
        }
        this.setState({ isAuthenticating: false });
    }

    render() {

        const authProps = {
            isAuthenticated: this.state.isAuthenticated,
            user: this.state.user,
            setAuthStatus: this.setAuthStatus,
            setUser: this.setUser
        }

        return (
            <div className="App">
                <Router>
                    <div>
                        <Navebar auth={authProps} />
                        <Switch>
                            <Route exact path="/" render={(props) => <Welcome {...props} auth={authProps} />} />
                            <Route exact path="/signup" render={(props) => <Signup {...props} auth={authProps} />} />
                            <Route exact path="/about" render={(props) => <About {...props} auth={authProps} />} />
                            <Route exact path="/settings" render={(props) => <Settings {...props} auth={authProps} />} />
                            <Route exact path="/analytics" render={(props) => <Analytics {...props} auth={authProps} />} />
                            <Route exact path="/policy" render={(props) => <Policy {...props} auth={authProps} />} />
                            <Route exact path="*">
                                <Pageundef />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;