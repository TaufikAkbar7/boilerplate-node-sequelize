const jwt = require("jsonwebtoken");
const { APP_TOKEN_SECRET } = require("../helpers/env");

exports.verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (authorization && authorization.split(" ")[0] === "Bearer") {
            jwt.verify(
                authorization.split(" ")[1],
                APP_TOKEN_SECRET,
                (err, decode) => {
                    if (err) {
                        // if token not verify return error
                        return res.status(401).send({
                            message: "Unauthorized!",
                        });
                    }
                    req.userId = decode.id;
                    req.userRoleId = decode.roleId;
                    next();
                }
            );
        } else {
            // return err when user not send token
            return res.status(403).send({
                message: "No token provided!",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: error,
        });
    }
};
