import mongoose from 'mongoose';
const {Schema} = mongoose;


const userScema = new Schema({
    fullName:{
        type:String,
        required:[true, "Please Provide the Name"],
        minLength:[3, "{VALUE} is not a valid Name"],
    },
    userName:{
        type:String,
        required: [true, "Please provide the username"],
        unique:[true, '{VALUE} is already saved, Please try different username'],
        minLength:[3, "username requires atleast 3 characters"],
        maxLength:[15, "username requires 15 characters at max"],
    },
    email:{
        type:String,
        required:[true, 'Please provide the Email'],
        unique:[true, '{VALUE} is already saved, Please try different email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:[true, 'Please provide the password'],
        minLength:[8, "password requires atleast 8 characters"],
    },
    avatar:{
        type:String,
    },

})

export const User = mongoose.model('user', userScema)


