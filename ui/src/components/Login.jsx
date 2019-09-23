import React, {Component} from "react";
import {connect} from "react-redux";
import { Form, Button } from 'react-bootstrap';
import {Link, Redirect} from "react-router-dom";
import {auth} from "../actions";


class Login extends Component {
    state = {
        username: "",
        password: "",
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/presentations/" />
        }
        return (
          <div>
            <legend>Вход</legend>
            {this.props.errors.length > 0 && (
              <ul>
                {this.props.errors.map(error => (
                  <li key={error.field}>{error.message}</li>
                ))}
              </ul>
            )}
            <p>
              <Form className="Registration" onSubmit={this.onSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Почта</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" id="username"
                  onChange={e => this.setState({username: e.target.value})}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control type="password" placeholder="Пароль" id="password"
                  onChange={e => this.setState({password: e.target.value})}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Вход
                </Button>
              </Form>
            </p>
            <p>
              <Link to="/presentations/register">Регистрация</Link>
            </p>
          </div>
        )
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return {field, message: state.auth.errors[field]};
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => {
            return dispatch(auth.login(username, password));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
