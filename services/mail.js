const {Transport, contactUsTemplate, jobTemplate} = require('../config/nodemailer')

class MailService {
    static sendContactusMail = async (param, next) => {
        try {
            if(!param) {
                throw {code: 404, message: 'need params'}
            }

            let params = {
                email: param.email,
                name: param.name,
                subject: param.subject,
                body: param.body
            }

            Transport.sendMail(
                contactUsTemplate(params),
                (error) => {
                  if (error) {
                    throw {
                        code: 400,
                        name: "error sending mail",
                    };
                  } else {
                    console.log(`email sent to ${param.email}`);
                  }
                }
            );

            return true
        } catch (error) {
            next(error);
        }
    }
}

module.exports = MailService