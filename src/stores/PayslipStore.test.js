import { PayslipStore } from './PayslipStore';

describe("during create", function() {
  it('should store payslip to be created', () => {
    var payslipStore = new PayslipStore();
    var payslip = "coconuts";
    const getInstance = jest.fn();
    const createPayslip = jest.fn();
    getInstance.mockReturnValue({createPayslip: createPayslip});
    payslipStore.getInstance = getInstance;

    payslipStore.create(payslip);

    expect(payslipStore.payslip).toEqual(payslip);
  });

  it('should delegate to source', () => {
    var payslipStore = new PayslipStore();
    const getInstance = jest.fn();
    const createPayslip = jest.fn();
    getInstance.mockReturnValue({createPayslip: createPayslip});
    payslipStore.getInstance = getInstance;

    payslipStore.create("coconuts");

    expect(createPayslip).toHaveBeenCalled();
  });
});
