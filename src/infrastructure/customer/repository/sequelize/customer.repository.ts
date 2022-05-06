import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import CustomerRepositoryInterface from '../../../../domain/customer/repository/customer-repository.interface';
import CustomerModel from './customer.model';

export default class ProductRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      zipCode: entity.Address.zip,
      city: entity.Address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    })
  }

  async update(entity: Customer): Promise<void> {
    
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.Address.street,
        number: entity.Address.number,
        zipCode: entity.Address.zip,
        city: entity.Address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where:{
        id: entity.id,
        },
      }
    )
  }
  
  async find(id: string): Promise<Customer> {
    let customerModel: CustomerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });  
    } catch (error) {
      throw new Error("Customer not found");
    }
    
    const customer = new Customer(id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipCode,
      customerModel.city,
    );
    
    customer.changeAddress(address);

    return customer;

  }
  
  async findAll(): Promise<Customer[]> {
    const customersModels = await CustomerModel.findAll();
    return customersModels.map((customerModel) => {
     let customer = new Customer(customerModel.id, customerModel.name);
     customer.addRewardPoints(customerModel.rewardPoints);
     const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipCode,
      customerModel.city,
     );

     customer.changeAddress(address);
     if(customerModel.active) {
      customer.active();
     }
     return customer;
    });
  }
}