import React, { Component } from 'react';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = { presentations: [], };
  }

  async componentDidMount() {
    try {
      const result = await fetch('http://localhost:5000/api/schedule/');
      console.log(result);
      const presentations = await result.json();
      console.log(presentations);
      this.setState({
        presentations: presentations,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        {this.state.presentations.map(item => (
          <div key={item}>
            <h1>{item}</h1>
            <span>{item}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default Home;
