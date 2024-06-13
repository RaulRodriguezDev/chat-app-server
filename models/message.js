import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },

})

MessageSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject()
    return object
})

const message = model('Message', MessageSchema)

export default message