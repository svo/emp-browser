import React, { Component } from 'react';
import './App.css';
import { Jumbotron } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends Component {
  render() {
    return (
      <Jumbotron>
        <div className='container'>
          <h1>EMP</h1>
          <p>Create your payslips conveniently</p>
        </div>
      </Jumbotron>
    );
  }
}

export default App;
