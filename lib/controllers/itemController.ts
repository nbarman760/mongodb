import * as mongoose from 'mongoose';
import { ItemSchema } from "../models/itemModel";
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as empty from 'is-empty';
const Item = mongoose.model('Item', ItemSchema);
var moment = require('moment');
export class ItemController {
    public getItems(req: Request, res: Response) {
        Item.find({}, (err, item) => {
            if (err) {
                res.send(err);
            }
            // res.json(order);
            console.log(item);
            res.render('item/index', {items: item, moment: moment});
        });
    }

    public addItem(req: Request, res: Response) {
        res.render('item/create');
    }
    async store(req: Request, res: Response){
        let params = { name: req.body.name, amt: req.body.amt, status: req.body.status, qty: req.body.qty, description:req.body.description       };
        let newItem = new Item(params);

        newItem.save((err, item) => {
            if (err) {
                res.send(err);
            }
            res.redirect('/item');
        });

    }

    async getAllItem(req: Request, res: Response){
        fs.stat('./data/allitems.json', (exists) => {
            if (exists == null) {
                fs.readFile('./data/allitems.json', 'utf8', function(err, data) {
                    if (err) {
                        console.log(err);
                    }
                    if(empty(data)){
                        res.status(200).send({
                            error: true,
                            msg: "No data found"
                        });
                    }else{
                        res.status(200).send({
                            error: false,
                            msg: "success",
                            items:JSON.parse(data)
                        });
                    }

                });

            } else if (exists.code === 'ENOENT') {

                Item.find({}, (err, items)=>{
                    if(err){
                        res.json(err);
                    }

                    fs.writeFile('./data/allitems.json', JSON.stringify(items), function(err) {
                        if (err) {
                            console.log(err);
                        }
                        console.log('read file');
                        //incomplete logic for sending response
                        res.status(200).send({
                            error: false,
                            msg: "success",
                            items: items
                        });
                    });
                });

            }
        });
    }
}