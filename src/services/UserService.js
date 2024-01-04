const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser
    try {
      const checkUser = await User.findOne({
        email: email
      });
      if (checkUser !== null) {
        resolve({
          status: 'OK',
          message: 'The email is already'
        })
      };
      const hash = bcrypt.hashSync(password, 10); //hash mật khẩu
      const createdUser = await User.create({
        name,
        email,
        password: hash,
        phone
      })     
      if (createdUser) {
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: createdUser
        })
      }
    } catch (e) {
      reject(e)
    }
  })
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = userLogin
    try {
      const checkUser = await User.findOne({
        email: email
      });
      if (checkUser === null) {
        resolve({
          status: 'OK',
          message: 'The user is not defined'
        })
      };
      const comparePassword = bcrypt.compareSync(password, checkUser.password); //mã hóa mật khẩu đầu vào và so sánh với mã đã lưu
      if (!comparePassword) {
        resolve({
          status: 'OK',
          message: 'The password or user is incorrect'
        })
      }
      // sau khi login thành công thì:
      const access_token =  await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin
      });

      const refresh_token = await genneralRefreshToken({ //sử dụng khi gọi là cái access_token hết hạn, nó sẽ dùng lại cấp lại một cái access_token mới
        id: checkUser.id,
        isAdmin: checkUser.isAdmin
      })
        resolve({
        status: 'OK',
        message: 'SUCCESS',
        access_token,
        refresh_token
      })
    } catch (e) {
      reject(e)
    }
  })
};

module.exports = {
  createUser,
  loginUser,
};