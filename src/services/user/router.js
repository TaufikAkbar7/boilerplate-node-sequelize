const express = require("express");
const { signin, signup } = require("./controller");
const { validationSignIn, validationSignUp } = require("./validations");
const validate = require("../../helpers/validate");

const router = express.Router();
const basePath = "/users";

router.post(`${basePath}/sign_in`, validate(validationSignIn), signin);
router.post(`${basePath}/sign_up`, validate(validationSignUp), signup);

module.exports = router;
