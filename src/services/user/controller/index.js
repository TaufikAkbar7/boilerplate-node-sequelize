const bcrypt = require("bcrypt");
const { generateToken } = require("../../../helpers/jwt");
const { User } = require("../../../sequelize/models");

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 8);

    try {
        const result = await User.create({
            name,
            email,
            password: hashPassword,
        });

        // delete key password
        delete result.dataValues.password;

        return res.status(201).json({
            status: 201,
            message: "Berhasil",
            data: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: error,
        });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    const result = await User.findOne({
        where: { email: email },
    });

    // check if user exist
    if (!result) {
        return res.status(404).json({
            message: "User not found!",
        });
    }

    // compare password
    const isPasswordValid = bcrypt.compareSync(password, result.password);

    // checking if password was valid and send response accordingly
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password!",
        });
    }

    // delete key password
    delete result.dataValues.password;

    return res.status(200).json({
        status: 200,
        message: "Berhasil",
        data: result,
        accessToken: generateToken(result),
    });
};
