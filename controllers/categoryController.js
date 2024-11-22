const pagination = require("../helpers/pagination");
const CategoryService = require('../services/categories.js')

class CategoryController {
    static post = async(req, res, next) => {
        try {
            let params = req.parameters;
            params = params.permit(
                "title"
            ).value()

            let data = await CategoryService.create(params, next);
            if(data) {
                res.status(201).json({message: "Success Create"})
            }
        } catch (error) {
            next(error)
        }
    }

    static all = async(req,res,next) => {
        try {
            let data = await CategoryService.all({}, next);
            if (data) {
                res.status(200).json(data);
            }
        } catch (error) {
            next(error)
        }
    }

    static delete = async(req,res,next) => {
        try {
            let { id } = req.params;
            let admin = await CategoryService.delete(id, next);
            if (admin) {
                res.status(200).json({message: "Success Delete"});
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoryController