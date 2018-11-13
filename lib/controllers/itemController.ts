import * as mongoose from 'mongoose';
import { ItemSchema } from "../models/itemModel";
import { Request, Response } from 'express';

const Item = mongoose.model('Item', ItemSchema);
var moment = require('moment');
export class ItemController {
    public getItems(req: Request, res: Response) {
        Item.find({}, (err, order) => {
            if (err) {
                res.send(err);
            }
            // res.json(order);
            console.log(order);
            res.render('item/index', {orders: order, moment: moment});
        });
    }

    public addItem(req: Request, res: Response) {
        res.render('item/create');
    }
}