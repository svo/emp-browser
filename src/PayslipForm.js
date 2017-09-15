import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

class PayslipForm extends Component {

  static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);

    var date = new Date(this.props.year, this.props.month);
    var locale = "en-au";
    var month = date.toLocaleString(locale, { month: "long" });

    this.state = {
      month: month.toUpperCase(),
      first_name: "",
      last_name: "",
      annual_salary: 0
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleAnnualSalaryChange = this.handleAnnualSalaryChange.bind(this);
  }

  validFirstName() {
    const length = this.state.first_name.length;
    return (length > 0) ? 'success' : 'error';
  }

  validLastName() {
    const length = this.state.last_name.length;
    return (length > 0) ? 'success' : 'error';
  }

  validAnnualSalary() {
    var value = parseFloat(this.state.annual_salary);

    if (typeof value === 'number' &&
      isFinite(value) &&
      Math.floor(value) === value &&
      value > 0) {

      return 'success';
    } else {
      return 'error';
    }
  }

  handleFirstNameChange(e) {
    this.setState({ first_name: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ last_name: e.target.value });
  }

  handleAnnualSalaryChange(e) {
    this.setState({ annual_salary: e.target.value });
  }

  render() {
    return (
      <form>
        <FormGroup controlId="first_name" validationState={this.validFirstName()}>
          <ControlLabel>First Name</ControlLabel>
          <FormControl type="text"
            placeholder="Sean"
            value={this.state.first_name}
            onChange={this.handleFirstNameChange} />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="last_name" validationState={this.validLastName()}>
          <ControlLabel>Last Name</ControlLabel>
          <FormControl type="text"
            placeholder="Van Osselaer"
            value={this.state.last_name}
            onChange={this.handleLastNameChange} />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="annual_salary" validationState={this.validAnnualSalary()}>
          <ControlLabel>Annual Salary</ControlLabel>
          <FormControl type="number"
            placeholder="175000"
            value={this.state.annual_salary}
            onChange={this.handleAnnualSalaryChange} />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="year">
          <ControlLabel>Year</ControlLabel>
          <FormControl type="text"
                       defaultValue={this.props.year}
                       placeholder={this.props.year} />
        </FormGroup>
        <FormGroup controlId="month">
          <ControlLabel>Month</ControlLabel>
          <FormControl componentClass="select" placeholder="..."
              defaultValue={this.state.month}>
            <option value="JANUARY">January</option>
            <option value="FEBRUARY">February</option>
            <option value="MARCH">March</option>
            <option value="APRIL">April</option>
            <option value="MAY">May</option>
            <option value="JUNE">June</option>
            <option value="JULY">July</option>
            <option value="AUGUST">August</option>
            <option value="SEPTEMBER">September</option>
            <option value="OCTOBER">October</option>
            <option value="NOVEMBER">November</option>
            <option value="DECEMBER">December</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="super_rate">
          <ControlLabel>Super Rate</ControlLabel>
          <FormControl type="text" placeholder="..."
            defaultValue="9"/>
        </FormGroup>
      </form>
    );
  }
}

export default PayslipForm;
