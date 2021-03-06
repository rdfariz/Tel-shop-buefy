const Crypter = require("cryptr");
const crypter = new Crypter("myTotalySecretKey");
const ErrorHandler = require("../utils/errorResponse");
const { register, login } = require("../models/authentication");

// register
exports.register = (req, res, next) => {
  // get all form data
  var data = { ...req.body };

  // encrypt password
  var encryptedPassword = crypter.encrypt(data.password);

  // validasi password and password confirm
  if (data.password !== data.passwordConfirm) {
    return next(new ErrorHandler("konfirmasi password tidak sesuai!", 400));
  }

  // adding encrypted password into data object
  data.password = encryptedPassword;
  delete data.passwordConfirm;

  register(res, next, data);
};

// login
exports.login = (req, res, next) => {
  // get all form data
  var data = { ...req.body };
  login(res, next, data);
};
