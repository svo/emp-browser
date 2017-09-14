import React from 'react';
import ReactDOM from 'react-dom';
import PayslipForm from './PayslipForm';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <PayslipForm year={2017} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
