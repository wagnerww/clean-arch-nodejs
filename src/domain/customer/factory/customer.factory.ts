import {v4 as uuid } from 'uuid';
import Customer from '../entity/customer';
import Addrress from '../value-object/address';

export default class CustomerFactory {

  public static create(name: string): Customer {
    return new Customer(uuid(), name);
  }

  public static createWithAdderss(name: string, address: Addrress): Customer {
    const customer = new Customer(uuid(), name);
    customer.changeAddress(address);
    return customer;
  }
}