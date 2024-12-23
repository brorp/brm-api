const { Categories, sequelize } = require("../models/index")

class CategoryService {
    static all = async (params, next) => {
        try {
            let cat = await Categories.findAll();

            return cat;
        } catch (error) {
            next(error)
        }
    }

    static detail = async (id, next) => {
        try {
            if(!id) {
                throw {code: 404, message: 'need params or id'}
            }

            let cat = await Categories.findOne({where: {id}})
            if (!cat) {
                throw {code: 404, message: 'data not found'}
            }
            return cat
        } catch (error) {
            next(error)
        }
    }

    static create = async (params, next) => {
        try {
            if(!params) {
                throw {code: 404, message: 'need params'}
            }
            let cat = await Categories.create(params)

            return cat
        } catch (error) {
            next(error)
        }
    }

    static update = async (id, params, next) => {
        try {
            if(!params || !id) {
                throw {code: 404, message: 'need params or id'}
            }

            await Categories.update(params, {where: {id}})

            return true
        } catch (error) {
            next(error)
        }
    }

    static delete = async (id, next) => {
        try {
            if(!id) {
                throw {code: 404, message: 'need params id'}
            }

            await Categories.destroy({where: {id}})
            return true
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoryService