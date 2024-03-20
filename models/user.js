import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    }
})

UserSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject()
    object.uid = _id
    return object
})

const user = model('User', UserSchema)

export default user