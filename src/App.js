import React, { Component } from 'react';
import './App.css';
import { Jumbotron } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import PayslipForm from './components/PayslipForm';

class App extends Component {
  render() {
    return (
      <Jumbotron>
        <div className='container'>
          <h1>EMP</h1>
          <p>Create your payslips conveniently</p>

          <PayslipForm now={new Date()} />
        </div>
      </Jumbotron>
    );
  }
}

export default App;
