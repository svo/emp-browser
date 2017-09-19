import PayslipActions from './PayslipActions';

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
  expect(PayslipActions.create(details)).toEqual("/");
});
