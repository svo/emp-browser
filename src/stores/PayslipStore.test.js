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

describe("during download", function() {
  it('should store payslip to be downloadd', () => {
    var payslipStore = new PayslipStore();
    var location = "coconuts";
    const getInstance = jest.fn();
    const downloadPayslip = jest.fn();
    getInstance.mockReturnValue({downloadPayslip: downloadPayslip});
    payslipStore.getInstance = getInstance;

    payslipStore.download(location);

    expect(payslipStore.location).toEqual(location);
  });

  it('should delegate to source', () => {
    var payslipStore = new PayslipStore();
    const getInstance = jest.fn();
    const downloadPayslip = jest.fn();
    getInstance.mockReturnValue({downloadPayslip: downloadPayslip});
    payslipStore.getInstance = getInstance;

    payslipStore.download("coconuts");

    expect(downloadPayslip).toHaveBeenCalled();
  });
});
