import Address from '../../../domain/customer/value-object/address';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import {InputCreateCustomerDto, OutputCreateCustomerDto} from './create.customer.dto';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';

export default class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAdderss(
      input.name,
      new Address(
        input.addrress.street,
        input.addrress.number,
        input.addrress.zip,
        input.addrress.city,
    ));

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip,
      }
    }
  }
}