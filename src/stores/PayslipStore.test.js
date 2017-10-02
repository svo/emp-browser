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

  it('should set payslip', () => {
    var payslipStore = new PayslipStore();
    const getInstance = jest.fn();
    const createPayslip = jest.fn();
    const payslip = {coconuts: true};
    getInstance.mockReturnValue({createPayslip: createPayslip});
    payslipStore.getInstance = getInstance;

    payslipStore.create(payslip);

    expect(payslipStore.payslip).toEqual(payslip);
  });

  it('should reset error state', () => {
    var payslipStore = new PayslipStore();
    const getInstance = jest.fn();
    const createPayslip = jest.fn();
    getInstance.mockReturnValue({createPayslip: createPayslip});
    payslipStore.getInstance = getInstance;

    payslipStore.create("coconuts");

    expect(payslipStore.error).toEqual(undefined);
  });

  it('should set error to message on failure', () => {
    const message = 'coconuts';
    var payslipStore = new PayslipStore();

    payslipStore.createFailed({message: message});

    expect(payslipStore.error).toEqual(message);
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

  it('should set location', () => {
    var payslipStore = new PayslipStore();
    const location = "coconuts";
    const getInstance = jest.fn();
    const downloadPayslip = jest.fn();
    getInstance.mockReturnValue({downloadPayslip: downloadPayslip});
    payslipStore.getInstance = getInstance;

    payslipStore.download(location);

    expect(payslipStore.location).toEqual(location);
  });

  it('should set error to message on failure', () => {
    const message = 'coconuts';
    var payslipStore = new PayslipStore();

    payslipStore.downloadFailed({message: message});

    expect(payslipStore.error).toEqual(message);
  });
});
