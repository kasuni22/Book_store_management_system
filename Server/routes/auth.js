import express, { Router } from 'express'
import {Admin} from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const router = express.Router();

router.post('/login', async (req, res) => {
    const {username, password, role} = req.body;
    if (role === 'admin') {
        const admin = await Admin.findOne({username})
        if(!admin) {
            return res.json({message: "admin not registered"})
        } 
        const validPassword = await bcrypt.compare(password, admin.password)
        if(!validPassword) {
            return res.json({message: "wrong password"})
        }
        const token = jwt.sign({username: admin.username, role: 'admin'},process.env.Admin_Key)
        res.cookie('token', token, {httpOnly: true, secure: true})
        return res.json({login: true, role: 'admin'})
    } else if (role === 'student') {

    } else {

    }
})

export {router as AdminRouter}