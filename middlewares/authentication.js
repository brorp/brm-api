const{verifyToken} = require('../helpers/jwt')
const{Users} = require('../models/index')

let authentication = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            throw ({name: 'invalidtoken'})
        }
        let token = req.headers.authorization.substring(7)

        const payload = verifyToken(token)

        if(req.headers.authorization.substr(0,6) !== "Bearer"){
            throw ({name: 'invalidtoken'})
        }

        req.user = {
            email: req.params.email
        }
        next()
    } 
    catch (err) {
        next(err)
    }
}

module.exports = authentication