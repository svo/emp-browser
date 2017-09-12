import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class PayslipForm extends Component {
  render() {
    return (
      <form>
        <FormGroup controlId="first_name">
          <ControlLabel>First Name</ControlLabel>
          <FormControl type="text" placeholder="..." />
        </FormGroup>
        <FormGroup controlId="last_name">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl type="text" placeholder="..." />
        </FormGroup>
        <FormGroup controlId="annual_salary">
          <ControlLabel>Annual Salary</ControlLabel>
          <FormControl type="text" placeholder="..." />
        </FormGroup>
        <FormGroup controlId="year">
          <ControlLabel>Year</ControlLabel>
          <FormControl type="text" placeholder="..." />
        </FormGroup>
        <FormGroup controlId="month">
          <ControlLabel>Month</ControlLabel>
          <FormControl type="text" placeholder="..." />
        </FormGroup>
        <FormGroup controlId="super_rate">
          <ControlLabel>Super Rate</ControlLabel>
          <FormControl type="text" placeholder="..." />
        </FormGroup>
      </form>
    );
  }
}

export default PayslipForm;
