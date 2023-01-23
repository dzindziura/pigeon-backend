const bcrypt = require('bcryptjs');
const User = require('../model/User.js');
const jwt = require('jsonwebtoken');

const registration = async (req, res) => {
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
        res.status(500).json({
            messae: "Не вдалось зареэструватись",
        });
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
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

        const { password, ...userData } = user._doc;

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

const getUser = async (req, res) => {
    const filter = {};
    const user = await User.find(filter);
    res.json(user);
}

const setNewAvatar = async (req, res) => {
    try {
        await User.findOneAndUpdate({ email: req.body.email }, { avatar: `uploads/${req.file.originalname}` });
        res.json({
            url: `uploads/${req.file.originalname}`
        })
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    registration, 
    login, 
    setNewAvatar, 
    getUser
}