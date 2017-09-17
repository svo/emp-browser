import PayslipActions from './PayslipActions';

it('should create', () => {
  expect(PayslipActions.create({coconuts: true})).toEqual("/");
});
