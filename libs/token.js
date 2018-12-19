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
    create(id, type) {
        let expDate = setExpDate(type);

        return jwt.sign(
            { iss: id },
            JWT_SECRET,
            { algorithm: JWT_ALG, expiresIn: expDate}
        )
    },

    decode: (token, cb) => {
        jwt.verify(token, config.jwt.secret, cb);
    }
}