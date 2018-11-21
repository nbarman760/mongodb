import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const ItemSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a first name'
    },
    amt: {
        type: Number,
        required: 'Enter a last name'
    },
    qty:{
        type: Number,
        required: 'Enter atleast 0'
    },
    status:{
        type: String
    },
    description:{
      type: String
    },
    thumbnail:{
        type: String,
        default: 'https://img.freepik.com/free-vector/medicine-elements-background_23-2147772710.jpg?size=338&ext=jpg'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});