import mongoose from 'mongoose';
const {Schema} = mongoose;

const todoScema = new Schema({
    title:{
        type:String,
        required:[true, "Please Provide the Title"],
        minLength:[3, "{VALUE} is not a valid title"],
        unique:[true, '{VALUE} is already saved, Please try different title']
    },
    body:{
        type:String,
        required: [true, "Please provide the Body"]
    },
    status:{
        type:Boolean,
        required:[true, 'Please provide the status']
    }
})

export const Todos = mongoose.model('todo', todoScema)


