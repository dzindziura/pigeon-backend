import bcrypt from 'bcryptjs'
import User from '../model/User.js';
import jwt from 'jsonwebtoken'

export const registration = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
        const doc = new User({
            email: req.body.email,
            name: req.body.name,
            passwordHash: hash,
        });
    
        const user = await doc.save();
    
        const token = await jwt.sign(
            {
                _id: user._id,
            }, 
                'secretToken',
            {
                expiresIn: "30d",
            },
        );
    
        const { passwordHash, ...userData } = user._doc
    
        res.json({
            ...userData,
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            messae: "Не вдалось зареэструватись",
         });
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.status(404).json({
                message: "Not found"
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);

        if(!isValidPass){
            return res.status(404).json({
                message: "Не правильний логін або пароль"
            })
        }
        const token = await jwt.sign(
            {
                _id: user._id,
            },
            'secretToken',
            {
                expiresIn: "30d",
            },
        );

        const {password, ...userData} = user._doc;

        res.json({
            ...userData,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            messae: "Не вдалось увійти",
         });
    }
}
