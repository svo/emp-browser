import alt from '../alt';
import { PayslipSource } from '../sources/PayslipSource';
import PayslipActions from '../actions/PayslipActions';

export class PayslipStore {
  constructor() {
    this.payslip = undefined;
    this.error = undefined;

    try {
      this.registerAsync(PayslipSource);
      this.bindListeners({
        create: PayslipActions.CREATE,
        created: PayslipActions.PAYSLIP_CREATED,
        createFailed: PayslipActions.PAYSLIP_CREATE_FAILED,
        download: PayslipActions.DOWNLOAD,
        downloaded: PayslipActions.PAYSLIP_DOWNLOADED,
        downloadFailed: PayslipActions.PAYSLIP_DOWNLOAD_FAILED
      });
    } catch (e) {
    }
  }

  create(payslip) {
    this.error = undefined;
    this.payslip = payslip;
    this.getInstance().createPayslip();
  }

  created(location) {
    this.payslip.location = location;
  }

  createFailed(error) {
    this.error = error.message;
  }

  download(location) {
    this.location = location;
    this.getInstance().downloadPayslip();
  }

  downloaded(location) {
    this.payslip.location = undefined;
  }

  downloadFailed(error) {
    this.error = error.message;
  }
}

export default alt.createStore(PayslipStore, 'PayslipStore');

