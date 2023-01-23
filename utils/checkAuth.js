const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.body.token;
    console.log(req.body)
    if(token){
        try {
            const decoded = jwt.verify(token, 'secretToken');

            req.userId = decoded._id;
            next();
        } catch (error) {
            res.status(403).json({
                message: 'Нема доступа',
            })
        }
    }else{
        res.status(403).json({
            message: 'Error auth'
        })
    }
}