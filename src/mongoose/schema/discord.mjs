import mongoose, { Schema } from "mongoose";

const discordSchema = new Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required :true,
        unique: true
    },
    discordId:{
        type: mongoose.Schema.Types.String,
        required :true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required :true,
        unique: true
    }
});

export const discordModel = mongoose.model('DiscordUser', discordSchema);