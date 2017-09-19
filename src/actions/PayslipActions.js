import axios from 'axios';
import names from 'date-names';
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
    axios.post('/payslip', this.createPayload(details))
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    return "/";
  }
}

export default alt.createActions(PayslipActions);
