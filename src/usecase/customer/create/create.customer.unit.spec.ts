import CreateCustomerUseCase from './create.customer.usecase';

const input = {
  name: "John",
  addrress: {
    street: "Street",
    number: 123,
    zip: "Zip",
    city: "City",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit Test create customer use case", () => {
    it("should create a customer", async() => {
      const customerRepository = MockRepository();
      const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

      const output = await customerCreateUseCase.execute(input);

      expect(output).toEqual({
        id: expect.any(String),
        name: input.name,
        address: {
          street: input.addrress.street,
          number: input.addrress.number,
          zip: input.addrress.zip,
          city: input.addrress.city,
        }
      })
    });
});