import mongoose from 'mongoose'



const connectDB = async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/tododb', (con)=>{
        console.log(`Database Connection is Successful ${con}`)
    })
}

export default connectDB


