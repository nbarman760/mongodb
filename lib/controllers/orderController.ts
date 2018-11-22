import * as mongoose from 'mongoose';
import { OrderSchema } from "../models/orderModel";
import { ItemSchema } from "../models/itemModel";
import { Request, Response } from 'express';

const Item = mongoose.model('Item', ItemSchema);
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
    public store(req: Request, res: Response){
        let params=req.body;
        let items = req.body.product_id;
        let qtys = req.body.qty;
        let orderDetails=[];
        for(var i=0; i<items.length; i++){
             orderDetails[i]['product_id'] = items[i];
             orderDetails[i]['orderQty'] = qtys[i];
        }
        let data = { personName: req.body.name, phone: req.body.phone, orderDetails: orderDetails, orderAmt: req.body.total_amt, status: 'done', adVance: 0 };
        res.send(data);
    }


}