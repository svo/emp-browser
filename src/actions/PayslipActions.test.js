import PayslipActions from './PayslipActions';

jest.mock('downloadjs', () => {
  return jest.fn((data, filename, mime) => 'downloadjs-result');
});

it('should create payload for create', () => {
  var details = {first_name: "Sean",
    last_name: "Van Osselaer",
    annual_salary: 175000,
    month: new Date('2017-04'),
    super_rate: 9};

  expect(PayslipActions.createPayload(details)).toEqual({
    "first_name": "Sean",
    "last_name": "Van Osselaer",
    "annual_salary": 175000,
    "year": 2017,
    "month": "APRIL",
    "super_rate": 9
  });
})

it('should create', () => {
  var details = {
    "first_name": "Sean",
    "last_name": "Van Osselaer",
    "annual_salary": 175000,
    "year": 2017,
    "month": "APRIL",
    "super_rate": 9
  }
  const createPayload = jest.fn();
  createPayload.mockReturnValue(details)
  PayslipActions.createPayload = createPayload;

  expect(PayslipActions.create(details)).toEqual(details);
})

it('should extract location from created payslip response', () => {
  var location = '/payslip/bob';
  var response = {
    headers: {
      location: location
    }
  };

  expect(PayslipActions.payslipCreated(response)).toEqual(location);
});

it('should download payslip data', () => {
  var location = '/coconuts';
  var details = {
    "location": location
  }

  expect(PayslipActions.download(details)).toEqual(location);
})

it('should process download data', () => {
  expect(PayslipActions.payslipDownloaded({data: 'bob'})).toEqual('downloadjs-result');
});
