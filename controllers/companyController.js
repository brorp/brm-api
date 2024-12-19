const CompanyService = require('../services/companies.js')

class CompanyController {
    static get = async(req,res,next) => {
        try {
            let data = await CompanyService.get({}, next);
            if (data) {
                res.status(200).json(data);
            }
        } catch (error) {
            next(error)
        }
    }

    static update = async(req,res,next) => {
        try {
            let params = req.parameters;
            params = params.permit("name", "address", "email", "phone_number").value()
            let data = await CompanyService.update(params, next);
            if (data) {
                res.status(200).json({message: "Success Update"});
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CompanyController;