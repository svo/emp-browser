import { PayslipSource } from './PayslipSource';
import axios from 'axios';
import request from 'request';
import MockAdapter from 'axios-mock-adapter';

describe("create payslip", function() {
  it('should be set to fetch', () => {
    expect(PayslipSource.createPayslip.shouldFetch({})).toEqual(true);
  });

  it('should adhere to contract', () => {
    var payslip = {
      "first_name": "Sean",
      "last_name": "Van Osselaer",
      "annual_salary": 175000,
      "year": 2017,
      "month": "APRIL",
      "super_rate": 9
    };
    var url = 'http://localhost:8081/payslip';
    var options = {
        method: 'post',
        body: payslip,
        json: true,
        url: url
    };

    request(options, function (error, response, body) {
      if (error) {
        fail();
      } else {
        expect(response.statusCode).toEqual(201);
      }
    });
  });

  it('should create remote resource', () => {
    var location = 'bob';
    var payslip = {coconuts: true}
    var state = {payslip: payslip};
    var mockAxios = new MockAdapter(axios);
    mockAxios.onPost('/payslip', payslip).reply(201, '', {'location': location});

    PayslipSource.createPayslip.remote(state).then(function(response) {
      expect(response.headers.location).toEqual(location);
    });
  });
});
