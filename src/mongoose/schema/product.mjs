import mongoose, { Schema } from "mongoose";


const productSchema = new Schema({

    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },

    price: {
        type : mongoose.Schema.Types.String,
        required: true,
    }
});


export const productModel = mongoose.model('Product', productSchema);