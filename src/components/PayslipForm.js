import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import format from 'date-format';
import PayslipActions from '../actions/PayslipActions';
import PayslipStore from '../stores/PayslipStore';

class PayslipForm extends Component {

  static propTypes = {
    now: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      annual_salary: 0,
      month: this.props.now,
      super_rate: 9
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleAnnualSalaryChange = this.handleAnnualSalaryChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleSuperRateChange = this.handleSuperRateChange.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getInitialState() {
    return PayslipStore.getState();
  }

  componentDidMount() {
    PayslipStore.listen(this.onChange);
  }

  componentWillUnmount() {
    PayslipStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({location: state.payslip.location});
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

  validSuperRate() {
    var value = parseFloat(this.state.super_rate);

    if (typeof value === 'number' &&
      isFinite(value) &&
      value >= 0 &&
      value <= 50) {

      return 'success';
    } else {
      return 'error';
    }
  }

  valid() {
    return this.validSuperRate() === 'success' &&
      this.validAnnualSalary() === 'success' &&
      this.validFirstName() === 'success' &&
      this.validLastName() === 'success';
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

  handleMonthChange(e) {
    this.setState({ month: new Date(e.target.value) });
  }

  handleSuperRateChange(e) {
    this.setState({ super_rate: e.target.value });
  }

  handleCreateClick() {
    PayslipActions.create(this.state);
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
          <FormControl type="month"
            value={format('yyyy-MM', this.state.month)}
            onChange={this.handleMonthChange} />
        </FormGroup>
        <FormGroup controlId="super_rate" validationState={this.validSuperRate()}>
          <ControlLabel>Super Rate</ControlLabel>
          <FormControl type="number"
            placeholder="9"
            value={this.state.super_rate}
            onChange={this.handleSuperRateChange} />
          <FormControl.Feedback />
        </FormGroup>
        <ButtonGroup>
          <Button bsStyle="primary" onClick={this.handleCreateClick}>
            Create
          </Button>
          <Button bsStyle="success" href={this.state.location}
            disabled={this.state.location === undefined}>
            Download
          </Button>
        </ButtonGroup>
      </form>
    );
  }
}

export default PayslipForm;
