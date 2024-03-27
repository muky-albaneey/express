import mongoose, { Schema } from "mongoose";



const UserSchema = new Schema({

    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    title: mongoose.Schema.Types.String,
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },

});


export const UserModel = mongoose.model('User', UserSchema);