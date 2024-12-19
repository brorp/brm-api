const { Companies, sequelize } = require("../models/index")
const { Op } = require("sequelize");

class CompanyService {
    static get = async (params, next) => {
        try {
            let com = await Companies.findAll();

            return com[0];
        } catch (error) {
            next(error)
        }
    }

    static update = async (params, next) => {
        try {
            await Companies.update(params, {
                where: {
                    id: {
                        [Op.ne]: null
                    }
                }
            });

            return true
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CompanyService