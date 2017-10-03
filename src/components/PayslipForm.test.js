import React from 'react';
import ReactDOM from 'react-dom';
import PayslipForm from './PayslipForm';
import PayslipActions from '../actions/PayslipActions';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <PayslipForm now={new Date(1976, 3)} />
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

  it('should have correct location default', () => {
    const div = document.createElement('div');

    var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

    expect(payslipForm.state.location).toEqual(undefined);
  });

  it('should have correct error default', () => {
    const div = document.createElement('div');

    var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

    expect(payslipForm.state.error).toEqual(undefined);
  });

  it('should set location on change', () => {
    const div = document.createElement('div');
    const location = 'coconuts';
    var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

    payslipForm.onChange({payslip: {location: location}});
    expect(payslipForm.state.location).toEqual(location);
  });

  it('should set error on change', () => {
    const div = document.createElement('div');
    const error = 'bob';
    var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

    payslipForm.onChange({payslip: {},
      error: error});
    expect(payslipForm.state.error).toEqual(error);
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

  it("should be invalid month valid", () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

      payslipForm.setState({super_rate: 9,
        annual_salary: 175000,
        first_name: "Sean",
        last_name: "Van Osselaer"});
      const validMonth = jest.fn();
      validMonth.mockReturnValue('error');
      payslipForm.validMonth = validMonth;

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

  describe("of date", function() {
    it('should report valid for July 2012', () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date('2012-07')} />, div);

      expect(payslipForm.validMonth()).toEqual('success');
    });

    it('should report invalid for June 2012', () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date('2012-06')} />, div);

      expect(payslipForm.validMonth()).toEqual('error');
    });

    it('should report invalid when no month supplied', () => {
      const div = document.createElement('div');

      var payslipForm = ReactDOM.render(<PayslipForm now={new Date(2017, NaN)} />, div);

      expect(payslipForm.validMonth()).toEqual('error');
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

describe("on download", function() {
  it('should call download action', () => {
    const mockAction = jest.fn();
    const state = {annual_salary: 175000,
      first_name: "Sean",
      last_name: "Van Osselaer",
      month: new Date(),
      super_rate: 9,
      location: "/coconuts"};
    var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />,
      document.createElement('div'));
    PayslipActions.download = mockAction;
    payslipForm.setState(state);

    payslipForm.handleDownloadClick();

    expect(mockAction).toBeCalledWith(state);
  });

  it('should reset component', () => {
    const mockState = jest.fn();
    const mockDefaultState = jest.fn();
    const defaultState = {coconuts: true};
    mockDefaultState.mockReturnValue(defaultState);
    PayslipActions.download = jest.fn();
    var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />,
      document.createElement('div'));
    payslipForm.defaultState = mockDefaultState;
    payslipForm.setState = mockState;

    payslipForm.handleDownloadClick();

    expect(mockState).toBeCalledWith(defaultState);
  });
});

describe("change handling", function() {
  describe("first name", function() {
    it('should set first name', () => {
      const div = document.createElement('div');
      const newValue = 'coconuts';
      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

      payslipForm.handleFirstNameChange({target: {value: newValue}});


      expect(payslipForm.state.first_name).toEqual(newValue);
    });

    it('should reset error', () => {
      const div = document.createElement('div');
      const newValue = 'coconuts';
      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);
      payslipForm.setState({error: "bob"});

      payslipForm.handleFirstNameChange({target: {value: newValue}});

      expect(payslipForm.state.error).toEqual(undefined);
    });
  });

  describe("last name", function() {
    it('should set last name', () => {
      const div = document.createElement('div');
      const newValue = 'coconuts';
      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

      payslipForm.handleLastNameChange({target: {value: newValue}});


      expect(payslipForm.state.last_name).toEqual(newValue);
    });

    it('should reset error', () => {
      const div = document.createElement('div');
      const newValue = 'coconuts';
      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);
      payslipForm.setState({error: "bob"});

      payslipForm.handleLastNameChange({target: {value: newValue}});

      expect(payslipForm.state.error).toEqual(undefined);
    });
  });

  describe("annual salary", function() {
    it('should set annual salary', () => {
      const div = document.createElement('div');
      const newValue = '175000';
      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

      payslipForm.handleAnnualSalaryChange({target: {value: newValue}});


      expect(payslipForm.state.annual_salary).toEqual(newValue);
    });

    it('should reset error', () => {
      const div = document.createElement('div');
      const newValue = '175000';
      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);
      payslipForm.setState({error: "bob"});

      payslipForm.handleAnnualSalaryChange({target: {value: newValue}});

      expect(payslipForm.state.error).toEqual(undefined);
    });
  });

  describe("month", function() {
    it('should set month', () => {
      const div = document.createElement('div');
      const newValue = '1976-04';
      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

      payslipForm.handleMonthChange({target: {value: newValue}});


      expect(payslipForm.state.month).toEqual(new Date(newValue));
    });

    it('should reset error', () => {
      const div = document.createElement('div');
      const newValue = '1976-04';
      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);
      payslipForm.setState({error: "bob"});

      payslipForm.handleMonthChange({target: {value: newValue}});

      expect(payslipForm.state.error).toEqual(undefined);
    });
  });

  describe("super rate", function() {
    it('should set super rate', () => {
      const div = document.createElement('div');
      const newValue = '10';
      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);

      payslipForm.handleSuperRateChange({target: {value: newValue}});


      expect(payslipForm.state.super_rate).toEqual(newValue);
    });

    it('should reset error', () => {
      const div = document.createElement('div');
      const newValue = '1976-04';
      var payslipForm = ReactDOM.render(<PayslipForm now={new Date()} />, div);
      payslipForm.setState({error: "bob"});

      payslipForm.handleSuperRateChange({target: {value: newValue}});

      expect(payslipForm.state.error).toEqual(undefined);
    });
  });

});
