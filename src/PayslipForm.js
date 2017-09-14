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
      month: month.toUpperCase()
    };
  }

  render() {
    return (
      <form>
        <FormGroup controlId="first_name">
          <ControlLabel>First Name</ControlLabel>
          <FormControl type="text" placeholder="Sean" />
        </FormGroup>
        <FormGroup controlId="last_name">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl type="text" placeholder="Van Osselaer" />
        </FormGroup>
        <FormGroup controlId="annual_salary">
          <ControlLabel>Annual Salary</ControlLabel>
          <FormControl type="text" placeholder="175000" />
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
