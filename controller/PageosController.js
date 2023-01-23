const Pageons = require("../model/Pageon.js");
const multer = require("multer");
const fileUpload = require("express-fileupload");

const add = async (req, res) => {
    console.log(req.file.originalname)
    try {
        const data = {
            number: req.body.number,
            year: req.body.year,
            urlPhoto: req.file.originalname,
            user: req.body.id
        }
        
        const pigeon = await new Pageons(data);
        await pigeon.save();
        data._id = pigeon._id;
        res.json({
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            messae: "Error add",
         });
    }
}

const getAll = async (req, res) => {
    try {
        const PageonsAll = await Pageons.find({"user": req.params.userId.slice(1)}).populate('user').exec();
        // console.log(PageonsAll)
        res.json({
            data: PageonsAll
        })
    } catch (error) {
        res.status(500).json({
            messae: "Не вдалось знайти",
         });
    }
}

const deletePageos = async (req, res, next) => {
    const id = req.params.id;
    try {
        Pageons.findByIdAndRemove(id)
        .then(() => {
            console.log('1')
            next();
            res.json(true)
        })
        .catch(error => {
            console.log(`Error deleting user by ID: ${error.message}`);
            next();
        });
    } catch (error) {
        res.status(500).json({
            messae: error,
         });
    }

}

module.exports = {
    add,
    getAll,
    deletePageos
}