import PayslipActions from './PayslipActions';

jest.mock('downloadjs', () => {
  return jest.fn((data, filename, mime) => 'downloadjs-result');
});

it('should create payload for create', () => {
  const details = {first_name: 'Sean',
    last_name: 'Van Osselaer',
    annual_salary: 175000,
    month: new Date('2017-04'),
    super_rate: 9};

  expect(PayslipActions.createPayload(details)).toEqual({
    first_name: 'Sean',
    last_name: 'Van Osselaer',
    annual_salary: 175000,
    year: 2017,
    month: 'APRIL',
    super_rate: 9});
})

it('should create', () => {
  const details = {
    first_name: 'Sean',
    last_name: 'Van Osselaer',
    annual_salary: 175000,
    year: 2017,
    month: 'APRIL',
    super_rate: 9};
  const createPayload = jest.fn();
  createPayload.mockReturnValue(details);
  PayslipActions.createPayload = createPayload;

  expect(PayslipActions.create(details)).toEqual(details);
})

it('should extract location from created payslip response', () => {
  const location = '/payslip/bob';
  const response = {
    headers: {
      location: location
    }
  };

  expect(PayslipActions.payslipCreated(response)).toEqual(location);
});

it('should download payslip data', () => {
  const location = '/coconuts';
  const details = {
    location: location
  };

  expect(PayslipActions.download(details)).toEqual(location);
})

it('should process download data', () => {
  expect(PayslipActions.payslipDownloaded({data: 'bob'})).toEqual('downloadjs-result');
});

it('should return error on create failure', () => {
  const error = {message: 'bob'};
  expect(PayslipActions.payslipCreateFailed(error)).toEqual(error);
});

it('should return error on download failure', () => {
  const error = {message: 'bob'};
  expect(PayslipActions.payslipDownloadFailed(error)).toEqual(error);
});
