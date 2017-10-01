import names from 'date-names';
import download from 'downloadjs';
import alt from '../alt';

class PayslipActions {
  createPayload(details) {
    return {first_name: details.first_name,
      last_name: details.last_name,
      annual_salary: parseInt(details.annual_salary, 10),
      year: details.month.getFullYear(),
      month: names.months[details.month.getMonth()].toUpperCase(),
      super_rate: parseFloat(details.super_rate)}
  }

  create(details) {
    return this.createPayload(details);
  }

  payslipCreated(response) {
    return response.headers.location;
  }

  payslipCreateFailed(error) {
  }

  download(state) {
    return state.location;
  }

  payslipDownloaded(response) {
    return download(response.data, 'payslip.pdf', 'application/pdf');
  }

  payslipDownloadFailed(error) {
  }
}

export default alt.createActions(PayslipActions);
