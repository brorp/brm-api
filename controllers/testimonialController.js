const pagination = require("../helpers/pagination");
const TestimonialService = require('../services/testimonials')

class TestimonialController {
    static post = async(req, res, next) => {
        try {
            let params = req.parameters;
            params = params.permit(
                "title",
                "description",
                { 'documents': [
                        "id",
                        "file_type",
                        "file_name",
                        "url",
                        "key"             
                    ] 
                }
            ).value()

            let data = await TestimonialService.create(params, next);
            if(data) {
                res.status(201).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    static all = async(req,res,next) => {
        try {
            let { page, limit } = req.query
            let data = await TestimonialService.all(req.query, next);
            if (data) {
                res.status(200).json(pagination(data, { page, limit }));
            }
        } catch (error) {
            next(error)
        }
    }

    static detail = async(req,res,next) => {
        try {
            let { id } = req.params;
            let blog = await TestimonialService.detail(id, next);
            if (blog) {
                res.status(200).json(blog);
            }
        } catch (error) {
            next(error)
        }
    }

    static update = async(req, res, next) => {
        try {
            let {id} = req.params
            let params = req.parameters;
            params = params.permit(
                "title",
                "description",
                { 'documents': [
                        "id",
                        "file_type",
                        "file_name",
                        "url",
                        "key"             
                    ] 
                }
            ).value()

            let data = await TestimonialService.update(id, params, next);
            if(data) {
                res.status(201).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    static delete = async(req,res,next) => {
        try {
            params = req.params.id
            let data = await TestimonialService.delete(params, next);
            if (data) {
                res.status(200).json({message: "Success Delete"});
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TestimonialController