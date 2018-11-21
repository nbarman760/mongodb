import { Request, Response} from "express";
import { ItemController } from "../controllers/itemController";

export class ItemRoutes {
    public itemController: ItemController = new ItemController();

    public routes(app): void {

        app.route('/item').get(this.itemController.getItems)
        app.route('/item/add').get(this.itemController.addItem);
        app.route('/item/store').post(this.itemController.store);
        app.route('/item/getitems').get(this.itemController.getAllItem);
    }
}
