import { PayslipSource } from './PayslipSource';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe("create payslip", function() {
  it('should be set to fetch', () => {
    expect(PayslipSource.createPayslip.shouldFetch({})).toEqual(true);
  });

  it('should create remote resource', async () => {
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
