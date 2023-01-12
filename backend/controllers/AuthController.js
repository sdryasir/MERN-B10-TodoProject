import {User} from '../model/userSchema.js'
import bcrypt from 'bcrypt';


export const loginUser = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}
export const createUser = async (req, res, next) => {

    const originalname = Date.now()+'-'+req.file.originalname;
    req.body.avatar = originalname;
    
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;
        const user = await User.create(req.body);
        if(user){
            res.json({
                message: 'new user has been created',
            })
        }
    } catch (err) {
        next(err)
    }
}
