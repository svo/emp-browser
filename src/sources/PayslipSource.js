import axios from 'axios';
import PayslipActions from '../actions/PayslipActions';

export const PayslipSource = {
  createPayslip: {
    remote(state) {
      return axios.post('/payslip', state.payslip);
    },

    success: PayslipActions.payslipCreated,
    error: PayslipActions.payslipCreateFailed,

    shouldFetch(state) {
      return true;
    }
  },

  downloadPayslip: {
    remote(state) {
      return axios({url: state.location,
        method: 'get',
        responseType: 'blob'});
    },

    success: PayslipActions.payslipDownloaded,
    error: PayslipActions.payslipDownloadFailed,

    shouldFetch(state) {
      return true;
    }
  }
};
