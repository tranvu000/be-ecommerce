const jwt = require('jsonwebtoken');
require('dotenv').config();

const genneralAccessToken = async (payload) => {
  const access_token = jwt.sign(
    { payload },
    process.env.ACCESS_TOKEN,
    { expiresIn: '1h'}
  );

  return access_token;
};

const genneralRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    { payload },
    process.env.REFRESH_TOKEN,
    { expiresIn: '365d'}
  );

  return refresh_token;
};

// thêm phần phân quyền: nghĩa là chỉ có thằng admin mới có quyền xóa được tài khoản user thôi: tạo thêm 1 authMiddleware


module.exports = {
  genneralAccessToken,
  genneralRefreshToken
}