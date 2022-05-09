import Address from '../value-object/address';
import CustomerValidateFactory from '../factory/customer.validator.factory';

export default class Customer {

  private _id: string = "";
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get Address(): Address {
    return this._address;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  validate() {
   CustomerValidateFactory.create().validate(this);
  }

  changeName(name: string) {
    this._name = name;
  }

  isActive(): boolean {
    return this._active;
  }

  active() {
    if(!this._address) {
      throw new Error("Address is mandatory to activate a customer");
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  set Address(address: Address) {
    this._address = address;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += +points;
  }


}