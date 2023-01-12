import express from "express";
import multer from 'multer';
import crypto from 'crypto';
import path from "path";

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
  
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })

const upload = multer({ storage: storage })

import { 
    createUser,
    loginUser
 } from "../controllers/AuthController.js";

const router = express.Router()

router.route('/new').post(upload.single('avatar'), createUser)
router.route('/login').get(loginUser)


export default router
