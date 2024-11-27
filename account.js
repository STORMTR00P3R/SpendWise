// got rid of refecenscs to DOM to make it work anywherew
// simple budge
// just off location
// compound budget
// based of yearly salery

class Account {
  constructor() {
    this._balance = (2500.0).toFixed(2);
  }

  updateBalance(amount, type) {
    if (type == "loss") {
      this._balance -= amount;
    } else {
      this._balance += amount;
    }

    this._balance = this._balance;
  }

  get balance() {
    return this._balance;
  }

  set balance(value) {
    this._balance = value;
  }

  updateLocation(state) {
    this._balance = state.average;
  }
}
