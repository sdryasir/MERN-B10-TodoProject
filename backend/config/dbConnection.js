import mongoose from 'mongoose'



const connectDB = async()=>{
    await mongoose.connect(process.env.DB_URI, (con)=>{
        console.log(`Database Connection is Successful ${con}`)
    })
}

export default connectDB


