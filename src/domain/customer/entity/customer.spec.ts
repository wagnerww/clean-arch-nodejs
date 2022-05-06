import Customer from "./customer";
import Address from '../value-object/address';

describe("Customer unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {

    // Arrange
    const customer = new Customer("123", "John");

    // Act
    customer.changeName("Jane");

    // Assert
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {

    // Arrange
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "98910-000", "Tres de Maio");
    customer.Address = address;

    // Act
    customer.active();

    // Assert
    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is undefined when you activate customer", () => {

    expect(() => {
      // Arrange
    const customer = new Customer("1", "Customer 1");

    // Act
    customer.active();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {

    // Arrange
    const customer = new Customer("1", "Customer 1");

    // Act
    customer.deactivate();

    // Assert
    expect(customer.isActive()).toBe(false);
  });

});