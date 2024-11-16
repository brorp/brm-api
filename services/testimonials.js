const { Testimonials, Documents, sequelize } = require("../models/index");
const { Op, Sequelize } = require("sequelize");
const DocumentService = require("./documents");

class TestimonialService {
    static all = async (params, next) => {
        try {
            let where = {}
            let limit = params.limit || 5;
            let offset = (params.page - 1) * limit || 0;
            if (params.keyword) {
                where = {
                    [Op.or]: {
                        title: {
                            [Op.iLike]: `%${params.keyword}%`
                        },
                        description: {
                            [Op.iLike]: `%${params.keyword}%`
                        }
                    }
                }
            }

            let test = await Testimonials.findAndCountAll({
                where,
                include: [
                    {
                        model: Documents, 
                        as: 'documents', 
                    },
                ],
                distinct: true,
                order: [['createdAt', 'DESC']],
                limit,
                offset
            });

            return test;

        } catch (error) {
            next(error)
        }
    }

    static detail = async (id, next) => {
        try {
            if(!id) {
                throw {code: 404, message: 'need params or id'}
            }

            let test = await Testimonials.findOne({
                where: {id},
                include: [
                    {
                        model: Documents, 
                        as: 'documents', 
                    },
                ], 
            })

            if (!test ){
                throw {code: 404, message: 'data not found'}
            }

            return test
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
            
            let test = await Testimonials.create(params, {
                returning: true,
                transaction
            })

            let docParams = {
                documents: params.documents,
                reference_id: test.id,
                reference_type: "farmer_testimonials"
            }
            let document = await DocumentService.upsert(docParams, transaction, next);

            if(!document) {
                throw {code: 400, message: 'no documents found'}
            }
            
            let res = await Testimonials.findOne({
                where: {id: test.id},
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

           let test = await Testimonials.update(params, {
                where: {id}, 
                returning:true
            }, {transaction})

            let docParams = {
                documents: params.documents,
                reference_id: test[1][0].id,
                reference_type: "farmer_testimonials"
            }

            let document = await DocumentService.upsert(docParams, transaction, next);
            if(!document) {
                throw {code: 400, message: 'no documents found'}
            }

            let res = await Testimonials.findOne({
                where: {id: test[1][0].id},
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

    static delete = async (id, next) => {
        try {
            if(!id) {
                throw {code: 404, message: 'need params id'}
            }

            await Testimonials.destroy({where: {id}})

            return true
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TestimonialService