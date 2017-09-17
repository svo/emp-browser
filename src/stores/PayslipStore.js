import alt from '../alt';
import PayslipActions from '../actions/PayslipActions';

export class PayslipStore {
  constructor() {
    this.location = undefined;

    try {
      this.bindListeners({
        create: PayslipActions.CREATE
      });
    } catch (e) {
      console.log("unable to bind listeners");
    }
  }

  create(location) {
    this.location = location;
  }
}

export default alt.createStore(PayslipStore, 'PayslipStore');

