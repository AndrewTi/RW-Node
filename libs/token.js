const jwt = require('jsonwebtoken');

const { JWT_ALG, JWT_SECRET, JWT_EXP, JWT_EXP_EXT, JWT_EXP_MOBILE } = process.env;

const setExpDate = type => {
    let expDate = null;

    switch(type) {
        case 'extension':
            expDate = JWT_EXP_EXT;
        break;

        case 'mobile':
            expDate = JWT_EXP_MOBILE;
        break;

        default: 
            expDate = JWT_EXP;
    }

    return expDate;
}

module.exports = {
    /**
     * 
     * @param {String} id 
     * @param {String=} type 
     * 
     * @returns {Object}
     */
    create(id, type = null) {
        let expDate = +setExpDate(type);

        const token = jwt.sign(
            { iss: id },
            JWT_SECRET,
            { algorithm: JWT_ALG, expiresIn: expDate}
        )

        return { token, expDate };
    },

    /**
     * 
     * @param {String} token 
     * @param {Function} cb 
     */
    decode(token, cb) {
        jwt.verify(token, JWT_SECRET, cb);
    }
}