import * as mongoose from 'mongoose';
import { OrderSchema } from "../models/orderModel";
import { Request, Response } from 'express';

const Order = mongoose.model('Order', OrderSchema);
var moment = require('moment');
export class OrderController {
    public getOrders (req: Request, res: Response) {
        Order.find({}, (err, order) => {
            if(err){
                res.send(err);
            }
            // res.json(order);
            console.log(order);
            res.render('order/index', {orders: order, moment: moment });
        });
    }
    public addOrder(req: Request, res: Response){
        res.render('order/create');
    }


}