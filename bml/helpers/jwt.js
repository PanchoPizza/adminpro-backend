const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id,
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
            if (err) {
                console.log(err);
                reject('no se pudo generar el jwt');

            } else {
                resolve(token);
            }
        });
    });
}

const idToken = (token) => {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    return decoded.id;
}

module.exports = {
    generateJWT,
    idToken
}