import React from 'react';
import ReactDOM from 'react-dom';
import PayslipForm from './PayslipForm';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <PayslipForm year={2017} month={1} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

describe("properties", function() {
  it('should have correct year property', () => {
    const div = document.createElement('div');
    var payslipForm = ReactDOM.render(<PayslipForm year={1976} month={3} />, div);
    expect(payslipForm.props.year).toEqual(1976);
  });

  it('should have correct month property', () => {
    const div = document.createElement('div');
    var payslipForm = ReactDOM.render(<PayslipForm year={1976} month={3} />, div);
    expect(payslipForm.props.month).toEqual(3);
  });

});

describe("state", function() {
  it('should have correct month state', () => {
    const div = document.createElement('div');
    var payslipForm = ReactDOM.render(<PayslipForm year={1976} month={3} />, div);
    expect(payslipForm.state.month).toEqual("APRIL");
  });
});

describe("validation", function() {
  describe("of first name", function() {
    it('should report invalid first name', () => {
      const div = document.createElement('div');
      var payslipForm = ReactDOM.render(<PayslipForm year={1976} month={3} />, div);

      expect(payslipForm.validFirstName()).toEqual('error')
    });

    it('should report valid first name', () => {
      const div = document.createElement('div');
      var payslipForm = ReactDOM.render(<PayslipForm year={1976} month={3} />, div);

      payslipForm.setState({first_name: "Sean"});

      expect(payslipForm.validFirstName()).toEqual('success')
    });
  });

  describe("of last name", function() {
    it('should report invalid last name', () => {
      const div = document.createElement('div');
      var payslipForm = ReactDOM.render(<PayslipForm year={1976} month={3} />, div);

      expect(payslipForm.validLastName()).toEqual('error')
    });

    it('should report valid last name', () => {
      const div = document.createElement('div');
      var payslipForm = ReactDOM.render(<PayslipForm year={1976} month={3} />, div);

      payslipForm.setState({last_name: "Van Osselaer"});

      expect(payslipForm.validLastName()).toEqual('success')
    });
  });

  describe("of annual salary", function() {
    it('should report invalid annual salary if not provided', () => {
      const div = document.createElement('div');
      var payslipForm = ReactDOM.render(<PayslipForm year={1976} month={3} />, div);

      expect(payslipForm.validAnnualSalary()).toEqual('error')
    });

    it('should report invalid annual salary for decimal values', () => {
      const div = document.createElement('div');
      var payslipForm = ReactDOM.render(<PayslipForm year={1976} month={3} />, div);

      payslipForm.setState({annual_salary: "1.01"});

      expect(payslipForm.validAnnualSalary()).toEqual('error')
    });

    it('should report valid annual salary', () => {
      const div = document.createElement('div');
      var payslipForm = ReactDOM.render(<PayslipForm year={1976} month={3} />, div);

      payslipForm.setState({annual_salary: "1"});

      expect(payslipForm.validAnnualSalary()).toEqual('success')
    });
  });
});
