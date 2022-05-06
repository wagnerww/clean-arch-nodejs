import Order from '../../../../domain/checkout/entity/order';
import OrderModel from './order.model';
import OrderItemModel from './order-item.model';

export default class OrderRepository{// implements CustomerRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) =>({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      })),
    },
    {
      include: [{ model: OrderItemModel }],
    })
  }

}