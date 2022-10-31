import Pageons from "../model/Pageon.js";

export const add = async (req, res) => {
    try {
        const data = {
            number: req.body.number,
            image: req.body.image,
            year: req.body.year,
            user: req.userId
        }
    
        const pageon = await new Pageons(data);
        await pageon.save();
    
        res.json(req.userId)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            messae: "Не вдалось додати",
         });
    }
}

export const getAll = async (req, res) => {
    try {
        const PageonsAll = await Pageons.find().populate('user').exec();
        console.log(PageonsAll.user)
        res.json({
            data: PageonsAll
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            messae: "Не вдалось знайти",
         });
    }
}

export const deletePageos = async (req, res, next) => {
    const id = req.params.id;
    Pageons.findByIdAndRemove(id)
            .then(() => {
                res.locals.redirect = "/posts";
                next();
            })
            .catch(error => {
                console.log(`Error deleting user by ID: ${error.message}`);
                next();
            });
}