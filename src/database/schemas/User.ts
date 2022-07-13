import mongoose, { ObjectId, Schema } from "mongoose";

export interface User {
    id:ObjectId;
    discordId:string;
    accessToken:string;
    refreshToken:string;
}

const UserSchema = new Schema<User>({
    discordId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    accessToken: { type: mongoose.SchemaTypes.String, required: true },
    refreshToken: { type: mongoose.SchemaTypes.String, required: true },
})

export default mongoose.model('users', UserSchema)