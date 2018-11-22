import { Request, Response} from "express";
import { OrderController } from "../controllers/orderController";

export class OrderRoutes {
    public orderController: OrderController = new OrderController();
    public routes(app): void {

        app.route('/order').get(this.orderController.getOrders)
        app.route('/order/add').get(this.orderController.addOrder);
        app.route('/order/store').post(this.orderController.store);

    }
}