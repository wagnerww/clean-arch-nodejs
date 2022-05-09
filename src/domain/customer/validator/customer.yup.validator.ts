import * as yup from 'yup';
import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";

export default class CustomeraYupValidator implements ValidatorInterface<Customer> {
  
  validate(entity: Customer): void {
    try {
      
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
          },
          {
            abortEarly: false,  
          }
        );

    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        // Adiciona no notificaition pattern
      })
    }
  }

}