const pagination = require("../helpers/pagination");
const CerticationService = require('../services/certifications')

class CertificationController {
    static post = async(req, res, next) => {
        try {
            let params = req.parameters;
            params = params.permit(
                "title",
                { 'documents': [
                        "id",
                        "file_type",
                        "file_name",
                        "url",
                        "key"             
                    ] 
                }
            ).value()

            let data = await CerticationService.create(params, next);
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
            let data = await CerticationService.all(req.query, next);
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
            let cert = await CerticationService.detail(id, next);
            if (cert) {
                res.status(200).json(cert);
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
                { 'documents': [
                        "id",
                        "file_type",
                        "file_name",
                        "url",
                        "key"             
                    ] 
                }
            ).value()

            let data = await CerticationService.update(id, params, next);
            if(data) {
                res.status(201).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    static delete = async(req,res,next) => {
        try {
            let { id } = req.params;
            let data = await CerticationService.delete(id, next);
            if (data) {
                res.status(200).json({message: "Success Delete"});
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CertificationController