import alt from '../alt';
import { PayslipSource } from '../sources/PayslipSource';
import PayslipActions from '../actions/PayslipActions';

export class PayslipStore {
  constructor() {
    this.payslip = undefined;

    try {
      this.registerAsync(PayslipSource);
      this.bindListeners({
        create: PayslipActions.CREATE,
        created: PayslipActions.PAYSLIP_CREATED
      });
    } catch (e) {
    }
  }

  create(payslip) {
    this.payslip = payslip;
    this.getInstance().createPayslip();
  }

  created(location) {
    this.payslip.location = location;
  }
}

export default alt.createStore(PayslipStore, 'PayslipStore');

