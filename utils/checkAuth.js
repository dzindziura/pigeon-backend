import jwt from "jsonwebtoken"

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

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
            message: 'Нема доступа'
        })
    }
}