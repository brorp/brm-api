const MailService = require('../services/mail')

class MailController {
    static post = async(req, res, next) => {
        try {
            let params = req.parameters;
            params = params.permit(
                "name",
                "email",
                "subject",
                "body"
            ).value()

            let data = await MailService.sendContactusMail(params, next);
            if(data) {
                res.status(201).json({message: `Success sent to ${params.email}`})
            }
        } catch (error) {
            next(error)
        }
    }

}

module.exports = MailController