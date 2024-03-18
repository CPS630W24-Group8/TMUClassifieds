const user = require("./model/user");
const cryptojs = require("crypto-js");

const encrypt = (text) => {
  return cryptojs.enc.Base64.stringify(cryptojs.enc.Utf8.parse(text));
}

const decrypt = (ciphertext) => {
  return cryptojs.enc.Base64.parse(ciphertext).toString(cryptojs.enc.Utf8);
}

// Create a new user in the database
exports.register = async (request, response, next) => {
  const { email, password } = request.body;
  const encryptedPassword = encrypt(password);
  try {
    await user.create({
      email: email,
      password: encryptedPassword
    }).then(user =>
      response.status(200).json({
        message: "User successfully created",
        user,
      })
    );
  } catch (error) {
    console.log(error);
    return response.status(401).json({
      message: "User not successful created",
      error: error.mesage,
    });
  }
}

// Login user
exports.login = async (request, response, next) => {
  const { email, password } = request.body;
  // Check if email and password is provided
  if (!email || !password) {
    return response.status(400).json({
      message: "Email or Password not present",
    })
  }
  const encryptedPassword = encrypt(password);
  try {
    const loginUser = await user.findOne({ email: email, password: encryptedPassword });
    if (!loginUser) {
      return response.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      return response.status(200).json({
        message: "Login successful",
        user: loginUser,
      });
    }
  } catch (error) {
    return response.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
}

// Change user's email address in the database
exports.changeEmail = async (request, response, next) => {
  const { oldEmail, newEmail } = request.body;
  try {
    await user.findOneAndUpdate(
      { email: oldEmail },
      { email: newEmail }
    ).then(user =>
      response.status(200).json({
        message: "Email address successfully changed",
        user,
      })
    );
  } catch (error) {
    return response.status(401).json({
      message: "Email address not successful changed",
      error: error.mesage,
    });
  }
}

// Change user's password in the database
exports.changePassword = async (request, response, next) => {
  const { email, oldPassword, newPassword } = request.body;
  const oldEncryptedPassword = encrypt(oldPassword);
  const newEncryptedPassword = encrypt(newPassword);
  try {
    await user.findOneAndUpdate(
      { email: email, password: oldEncryptedPassword },
      { password: newEncryptedPassword }
    ).then(user =>
      response.status(200).json({
        message: "Password successfully changed",
        user,
      })
    );
  } catch (error) {
    return response.status(401).json({
      message: "Password not successful changed",
      error: error.mesage,
    });
  }
}