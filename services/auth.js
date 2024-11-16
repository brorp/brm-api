const { signToken } = require('../helpers/jwt')
class AuthService {
    static login = async (params, next) => {

        try {
            let response = {
                email: process.env.BRM_ADMIN_EMAIL,
                pass: process.env.BRM_ADMIN_PASS
            }

            if (response.email != params.email || response.pass != params.password) {
                throw { message: 'Email or Password is incorrect', code: 401 }
            }

            const access_token = signToken({
                id: response.id,
                email: response.email
            })  
            return {
                access_token: access_token
            }

        } catch (error) {
            next(error)
        }

    }


}

module.exports = AuthService