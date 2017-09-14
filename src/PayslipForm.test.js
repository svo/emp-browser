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

it('should have correct month state', () => {
  const div = document.createElement('div');
  var payslipForm = ReactDOM.render(<PayslipForm year={1976} month={3} />, div);
  expect(payslipForm.state.month).toEqual("APRIL");
});
