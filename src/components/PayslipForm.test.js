import React from 'react';
import ReactDOM from 'react-dom';
import PayslipForm from './PayslipForm';
import PayslipActions from '../actions/PayslipActions';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <PayslipForm now={new Date()} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

describe("properties", function() {
  it('should have correct now property', () => {
    var now = new Date();
    const div = document.createElement('div');

    var payslipForm = ReactDOM.render(<PayslipForm now={now} />, div);

    expect(payslipForm.props.now).toEqual(now);
  });
});

describe("state", function() {
  it('should have correct first name default', () => {
    const div = document.createElement('div');

    var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

    expect(payslipForm.state.first_name).toEqual("");
  });

  it('should have correct last name default', () => {
    const div = document.createElement('div');

    var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

    expect(payslipForm.state.last_name).toEqual("");
  });

  it('should have correct annual salary default', () => {
    const div = document.createElement('div');

    var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

    expect(payslipForm.state.annual_salary).toEqual(0);
  });

  it('should have correct month state', () => {
    const div = document.createElement('div');
    var now = new Date();

    var payslipForm = ReactDOM.render(<PayslipForm now={now} />, div);

    expect(payslipForm.state.month).toEqual(now);
  });
});

describe("validation", function() {
  it("should be valid", () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

      payslipForm.setState({super_rate: 9,
        annual_salary: 175000,
        first_name: "Sean",
        last_name: "Van Osselaer"});

      expect(payslipForm.valid()).toEqual(true);
  });

  it("should be invalid if super rate invalid", () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

      const validSuper = jest.fn();
      validSuper.mockReturnValue('error');
      payslipForm.validSuperRate = validSuper;

      expect(payslipForm.valid()).toEqual(false);
  });

  it("should be invalid if annual salary invalid", () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

      payslipForm.setState({super_rate: 9});
      const validAnnualSalary = jest.fn();
      validAnnualSalary.mockReturnValue('error');
      payslipForm.validAnnualSalary = validAnnualSalary;

      expect(payslipForm.valid()).toEqual(false);
  });

  it("should be invalid if first name invalid", () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

      payslipForm.setState({super_rate: 9,
        annual_salary: 175000});
      const validFirstName = jest.fn();
      validFirstName.mockReturnValue('error');
      payslipForm.validFirstName = validFirstName;

      expect(payslipForm.valid()).toEqual(false);
  });

  it("should be invalid if last name invalid", () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

      payslipForm.setState({super_rate: 9,
        annual_salary: 175000,
        first_name: "Sean"});
      const validLastName = jest.fn();
      validLastName.mockReturnValue('error');
      payslipForm.validLastName = validLastName;

      expect(payslipForm.valid()).toEqual(false);
  });

  describe("of first name", function() {
    it('should report invalid first name', () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

      expect(payslipForm.validFirstName()).toEqual('error')
    });

    it('should report valid first name', () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);
      payslipForm.setState({first_name: "Sean"});

      expect(payslipForm.validFirstName()).toEqual('success')
    });
  });

  describe("of last name", function() {
    it('should report invalid last name', () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

      expect(payslipForm.validLastName()).toEqual('error')
    });

    it('should report valid last name', () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);
      payslipForm.setState({last_name: "Van Osselaer"});

      expect(payslipForm.validLastName()).toEqual('success')
    });
  });

  describe("of annual salary", function() {
    it('should report invalid annual salary if not provided', () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

      expect(payslipForm.validAnnualSalary()).toEqual('error')
    });

    it('should report invalid annual salary for decimal values', () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);
      payslipForm.setState({annual_salary: "1.01"});

      expect(payslipForm.validAnnualSalary()).toEqual('error')
    });

    it('should report invalid annual salary for negative', () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);
      payslipForm.setState({annual_salary: "-1"});

      expect(payslipForm.validAnnualSalary()).toEqual('error')
    });

    it('should report valid annual salary', () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);
      payslipForm.setState({annual_salary: "1"});

      expect(payslipForm.validAnnualSalary()).toEqual('success')
    });
  });

  describe("of super rate", function() {
    it('should report invalid super rate if not provided', () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);
      payslipForm.setState({super_rate: 51});

      expect(payslipForm.validSuperRate()).toEqual('error')
    });

    it('should report invalid super rate for negative', () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);
      payslipForm.setState({super_rate: "-1"});

      expect(payslipForm.validSuperRate()).toEqual('error')
    });

    it('should report valid super rate for 0', () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);
      payslipForm.setState({super_rate: "0"});

      expect(payslipForm.validSuperRate()).toEqual('success')
    });

    it('should report valid super rate for 50', () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);
      payslipForm.setState({super_rate: "10"});

      expect(payslipForm.validSuperRate()).toEqual('success')
    });
  });
});

describe("on create", function() {
  it('should call create action', () => {
    const mockAction = jest.fn();
    const state = {annual_salary: 175000,
      first_name: "Sean",
      last_name: "Van Osselaer",
      month: new Date(),
      super_rate: 9};
    var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />,
      document.createElement('div'));
    PayslipActions.create = mockAction;
    payslipForm.setState(state);

    payslipForm.handleCreateClick();

    expect(mockAction).toBeCalledWith(state);
  });
});
