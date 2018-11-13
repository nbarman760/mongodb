import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';
import { Request, Response } from 'express';

const Contact = mongoose.model('Contact', ContactSchema);
var moment = require('moment');
export class ContactController {
    public addNewContact(req: Request, res: Response) {
        let params = { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, phone: req.body.phone, company:req.body.company, address:{
               po: req.body.po, district: req.body.district, state: req.body.state, country: req.body.country
            }
        };
        let newContact = new Contact(params);

        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
             res.redirect('/contact');
        });

    }
    public getContacts (req: Request, res: Response) {

        Contact.find({}, (err, contact) => {
            if(err){
                res.send(err);
            }
           // res.json(contact);
            console.log(contact);
            res.render('contact/index', {contacts: contact, moment: moment });
        });
    }

    public addContact(req: Request, res: Response){
        res.render('contact/add');
    }

    public deleteContact (req: Request, res: Response) {
        Contact.remove({ _id: req.params.contactId }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!'});
        });
    }

}