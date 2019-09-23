import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Button } from 'react-bootstrap';
const axios = require('axios');

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = { presentations: [], username: '', password: '' };
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:5000/api/presentation/');
      console.log(response);
      const presentations = response.data;
      this.setState({
        presentations
      });
    } catch (error) {
      console.error(error);
    }
  }

  onSubmit = e => {
    e.preventDefault();
    console.error("Not implemented!!!");
  }

  render() {
    return (
      <Form className="Registration" onSubmit={this.onSubmit}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Почта</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" onChange={e => this.setState({username: e.target.value})}/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="Пароль" onChange={e => this.setState({password: e.target.value})}/>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Выбрать презентации</Form.Label>
          <Form.Control as="select" multiple>
            { this.state.presentations.map(item => (
              <option key={item.title}>{item.title}</option>
            )) }
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={(e) => this.login(e)}>
          Зарегистрироваться
        </Button>
      </Form>
    );
  }
}


const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
