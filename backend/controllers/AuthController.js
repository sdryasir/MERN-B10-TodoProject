import { User } from '../model/userSchema.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const loginUser = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        if (!email) {
            return next(new Error('Please provide email'))
        }
        if (!password) {
            return next(new Error('Please provide password'))
        }

        const user = await User.findOne({ email })

        if (!user) {
            return next(new Error('User with this email not found, Please create account to continue'))
        }

        const isMatched = await bcrypt.compare(password, user.password);



        if (!isMatched) {
            return next(new Error('Password is incorrect'));
        }


        const token = await jwt.sign({user:user}, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true}).json({
            user
        })
        //Authorization token (JWT Token)


    } catch (err) {
        next(err)
    }
}
export const createUser = async (req, res, next) => {

    const originalname = Date.now() + '-' + req.file.originalname;
    req.body.avatar = originalname;

    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;
        const user = await User.create(req.body);
        if (user) {
            res.json({
                message: 'new user has been created',
            })
        }
    } catch (err) {
        next(err)
    }
}


export const logoutUser  = (req, res, next)=>{
    res.clearCookie('token', { httpOnly: true}).json({
        message:'Logged Out'
    })
}
