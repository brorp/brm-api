const pagination = require("../helpers/pagination");
const BlogService = require('../services/blogs')

class BlogController {
    static post = async(req, res, next) => {
        try {
            let params = req.parameters;
            params = params.permit(
                "author",
                "title",
                "content",
                "category_id",
                {"meta_tag": []},
                "meta_description",
                "status",
                { 'documents': [
                        "id",
                        "file_type",
                        "file_name",
                        "url",
                        "key"             
                    ] 
                }
            ).value()

            let data = await BlogService.create(params, next);
            if(data) {
                res.status(201).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    static all_cms = async(req,res,next) => {
        try {
            let { page, limit } = req.query
            let data = await BlogService.all(req.query, next);
            if (data) {
                res.status(200).json(pagination(data, { page, limit }));
            }
        } catch (error) {
            next(error)
        }
    }

    static all_web = async(req,res,next) => {
        try {
            let { page, limit } = req.query
            let data = await BlogService.all(req.query, "published", next);
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
            let blog = await BlogService.detail(id, next);
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
                "author",
                "title",
                "content",
                "category_id",
                {"meta_tag": []},
                "meta_description",
                "status",
                { 'documents': [
                        "id",
                        "file_type",
                        "file_name",
                        "url",
                        "key"             
                    ] 
                }
            ).value()

            let data = await BlogService.update(id, params, next);
            if(data) {
                res.status(201).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    static update_status = async(req,res,next) => {
        try {
            let params = req.parameters;
            params = params.permit("status").value()
            let data = await BlogService.update_status(req.params.id, params, next);
            if (data) {
                res.status(200).json({message: "Success Update status"});
            }
        } catch (error) {
            next(error)
        }
    }

    static more = async(req,res,next) => {
        try {
            let { id } = req.params;
            let blog = await BlogService.getMore(id, next);
            if (blog) {
                res.status(200).json(blog);
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = BlogController