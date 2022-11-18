const { APP_TOKEN_SECRET } = require("./env");
const jsonwebtoken = require("jsonwebtoken");

exports.generateToken = (user) => {
    return jsonwebtoken.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        APP_TOKEN_SECRET,
        {
            expiresIn: 86400,
        }
    );
};
