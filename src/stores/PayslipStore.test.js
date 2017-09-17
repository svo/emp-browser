import { PayslipStore } from './PayslipStore';

it('should set location', () => {
  var payslipStore = new PayslipStore();

  payslipStore.create("coconuts");

  expect(payslipStore.location).toEqual("coconuts");
});
