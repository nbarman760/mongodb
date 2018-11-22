import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const OrderSchema = new Schema({
    personName: {
        type: String,
        required: 'Enter a first name'
    },
    phone:{
        type: Number,
        required: 'Phone number required'
    },
    orderAmt: {
        type: Number,
        required: 'Enter a last name'
    },
    adVance:{
        type: Number,
        required: 'Enter atleast 0'
    },
    status:{
        type: String
    },
    orderDetails:[
        {
            product_id: {
                type: String
            },
            orderQty: {
                type: Number
            }
        }
      ],
    created_date: {
        type: Date,
        default: Date.now
    }
});