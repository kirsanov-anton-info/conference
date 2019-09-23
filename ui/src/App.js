import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';

import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import './App.css';
import {auth} from "./actions";
import ponyApp from "./reducers";

import Header from './header/Header';
import Home from './home/Home';
import Registration from './registration/Registration';
import PonyNote from "./components/PonyNote";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Login from "./components/Login";

let store = createStore(ponyApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {

    componentDidMount() {
        this.props.loadUser();
    }

    PrivateRoute = ({component: ChildComponent, ...rest}) => {
        return <Route {...rest} render={props => {
            if (this.props.auth.isLoading) {
                return <em>Loading...</em>;
            } else if (!this.props.auth.isAuthenticated) {
                return <Redirect to="/presentations/login" />;
            } else {
                return <ChildComponent {...props} />
            }
        }} />
    }

    render() {
        let {PrivateRoute} = this;
        return (
          <BrowserRouter>
            <Header />
              <div className='App'>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <PrivateRoute exact path="/presentations" component={PonyNote} />
                  <div className='Form'>
                    <Route exact path="/registration" component={Registration} />
                    <Route exact path="/presentations/register" component={Register} />
                    <Route exact path="/presentations/login" component={Login} />
                  </div>
                  <Route component={NotFound} />
                </Switch>
              </div>
          </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUser: () => {
            return dispatch(auth.loadUser());
        }
    }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);

export default class Presentations extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootContainer />
            </Provider>
        )
    }
}











// import React, { Component } from 'react';
// import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
// import Header from './header/Header';
// import Home from './home/Home';
// import Presentations from './presentations/Presentation';
// import Registration from './registration/Registration';
//
//
// export default class App extends Component {
//   render() {
//     return (
//       <BrowserRouter>
//         <Header />
//         <Switch>
//           <Route exact path="/" component={Home} />
//           <Route exact path="/registration" component={Registration} />
//           <Route exact path="/presentations" component={Presentations} />
//         </Switch>
//       </BrowserRouter>
//     )
//   }
// }
