import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    discordId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    accessToken: { type: mongoose.SchemaTypes.String, required: true },
    refreshToken: { type: mongoose.SchemaTypes.String, required: true },
})

export default mongoose.model('users', UserSchema)