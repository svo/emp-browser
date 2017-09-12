import React from 'react';
import ReactDOM from 'react-dom';
import PayslipForm from './PayslipForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PayslipForm />, div);
});
