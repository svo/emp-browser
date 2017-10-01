import { PayslipSource } from './PayslipSource';
import axios from 'axios';
import request from 'request';
import MockAdapter from 'axios-mock-adapter';

describe("create payslip", function() {
  it('should be set to fetch', () => {
    expect(PayslipSource.createPayslip.shouldFetch({})).toEqual(true);
  });

  describe("contract", function() {
    it('should have created resonse status', () => {
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

    it('should have location header', () => {
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
          expect(response.headers.location).toEqual('/payslip/{payslip_id}');
        }
      });
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

describe("download payslip", function() {
  it('should be set to fetch', () => {
    expect(PayslipSource.downloadPayslip.shouldFetch({})).toEqual(true);
  });

  describe("contract", function() {
    it('should have ok resonse status', () => {
      var url = 'http://localhost:8081/payslip/1fc61616-eae4-4fe0-a6a3-5d51fb7dca81';
      var options = {
          method: 'get',
          url: url
      };

      request(options, function (error, response, body) {
        if (error) {
          fail();
        } else {
          expect(response.statusCode).toEqual(200);
        }
      });
    });

    it('should have file response', () => {
      var url = 'http://localhost:8081/payslip/1fc61616-eae4-4fe0-a6a3-5d51fb7dca81';
      var options = {
          method: 'get',
          url: url
      };

      request(options, function (error, response, body) {
        if (error) {
          fail();
        } else {
          expect(response.headers['content-type']).toEqual('application/octet-stream');
        }
      });
    });
  });

  it('should download remote resource', () => {
    var location = '/payslip/1fc61616-eae4-4fe0-a6a3-5d51fb7dca81';
    var state = {location: location};
    var body = 'coconuts';
    var mockAxios = new MockAdapter(axios);
    mockAxios.onGet(location).reply(200, body);

    PayslipSource.downloadPayslip.remote(state).then(function(response) {
      expect(response.data).toEqual(body);
    });
  });
});
