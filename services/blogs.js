const { Blogs, Documents, Categories, sequelize } = require("../models/index");
const { Op, Sequelize } = require("sequelize");
const DocumentService = require("./documents");

class BlogService {
    static all = async (params, next) => {
        try {
            let where = {}
            let limit = params.limit || 5;
            let offset = (params.page - 1) * limit || 0;
            if (params.keyword) {
                where = {
                    [Op.or]: {
                        author: {
                            [Op.iLike]: `%${params.keyword}%`
                        },
                        content: {
                            [Op.iLike]: `%${params.keyword}%`
                        },
                        title: {
                            [Op.iLike]: `%${params.keyword}%`
                        },
                        meta_tag: {
                            [Op.iLike]: `%${params.keyword}%`
                        }
                    }
                }
            }

            if (params.category) {
                where = {
                    category_id: params.category_id
                }
            }

            if (params.status) {
                where = {
                    status: params.status
                }
            }

            let blog = await Blogs.findAndCountAll({
                where,
                include: [
                    {
                        model: Documents, 
                        as: 'documents', 
                    },
                    {
                        model: Categories,
                        attributes: ["title"]
                    }
                ],
                distinct: true,
                order: [['createdAt', 'DESC']],
                limit,
                offset
            });

            let blogs = blog.rows.map((blog) => {
                const categoryName = blog.Category.title || null; // Extract 'name' from Categories
                return {
                    id: blog.id,
                    title: blog.title,
                    author: blog.author,
                    content: blog.content,
                    meta_tag: blog.meta_tag,
                    meta_description: blog.meta_description,
                    status: blog.status,
                    category_id: categoryName, // Include category as 'category_id'
                    documents: blog.documents, // Include documents as-is
                };
            });

            return blogs;

        } catch (error) {
            next(error)
        }
    }

    static detail = async (id, next) => {
        try {
            if(!id) {
                throw {code: 404, message: 'need params or id'}
            }

            let blog = await Blogs.findOne({
                where: {id},
                include: [
                    {
                        model: Documents, 
                        as: 'documents', 
                    },
                ], 
            })

            if (!blog ){
                throw {code: 404, message: 'data not found'}
            }

            return blog
        } catch (error) {
            next(error)
        }
    }

    static create = async (params, next) => {
        const transaction = await sequelize.transaction();
        try {
            if(!params) {
                throw {code: 404, message: 'need params'}
            }
            
            let blog = await Blogs.create(params, {
                returning: true,
                transaction
            })

            let docParams = {
                documents: params.documents,
                reference_id: blog.id,
                reference_type: "blogs"
            }
            let document = await DocumentService.upsert(docParams, transaction, next);

            if(!document) {
                throw {code: 400, message: 'no documents found'}
            }
            
            let res = await Blogs.findOne({
                where: {id: blog.id},
                include: [
                    {
                        model: Documents, 
                        as: 'documents', 
                    },
                ],
                transaction
            })

            await transaction.commit();
            return res
        } catch (error){
            await transaction.rollback();
            next(error)
        }
    }

    static update = async (id, params, next) => {
        const transaction = await sequelize.transaction();
        try {
            if(!params || !id) {
                throw {code: 404, message: 'need params or id'}
            }

           let blog = await Blogs.update(params, {
                where: {id}, 
                returning:true
            }, {transaction})

            let docParams = {
                documents: params.documents,
                reference_id: blog[1][0].id,
                reference_type: "blogs"
            }

            let document = await DocumentService.upsert(docParams, transaction, next);
            if(!document) {
                throw {code: 400, message: 'no documents found'}
            }

            let res = await Blogs.findOne({
                where: {id: blog[1][0].id},
                include: [
                    {
                        model: Documents, 
                        as: 'documents', 
                    },
                ], 
            })

            await transaction.commit();
            return res
        } catch (error) {
            await transaction.rollback();
            next(error)
        }
    }

    static update_status = async (id, params, next) => {
        try {
            if(!id) {
                throw {code: 404, message: 'need params id'}
            }

            await Blogs.update({status: params.status},{where: {id}})

            return true
        } catch (error) {
            next(error)
        }
    }

    static getMore = async(id, next) => {
        try {
            if(!id) {
                throw {code: 404, message: 'need params id'}
            }

            let existingBlog = await Blogs.findOne({
                where: {id}
            })

            if (!existingBlog) {
                throw {code: 404, message: 'data not found'}
            }

            let blog = {}

            blog = await Blogs.findOne({
                where: {
                    [Op.and]: [
                        {
                            id: {[Op.not]: id}
                        },
                        {
                            createdAt: {[Op.lt]: existingBlog.createdAt}
                        },
                        {
                            category_id: existingBlog.category_id
                        }
                    ]
                },
                include: [
                    {
                        model: Documents, 
                        as: 'documents', 
                    },
                ], 
                order: [['createdAt', 'DESC']],
                limit: 1
            })

            if (!blog) {
                blog = await Blogs.findOne({
                    where: {
                        [Op.and]: [
                            {
                                id: {[Op.not]: id}
                            },
                            {
                                createdAt: {[Op.lt]: existingBlog.createdAt}
                            }
                        ]
                    },
                    include: [
                        {
                            model: Documents, 
                            as: 'documents', 
                        },
                    ], 
                    order: [['createdAt', 'ASC']],
                    limit: 1
                })
            }

            return blog
        } catch (error) {
            next(error)
        }
    }
}

module.exports = BlogService