const jwt = require('jsonwebtoken');

const genneralAccessToken = async (payload) => {
  const access_token = jwt.sign(
    { payload },
    'access_token',
    { expiresIn: '1h'}  //expiresIn thời gian token hết hạn
  );

  return access_token;
};

const genneralRefreshToken = async (payload) => {
  const access_token = jwt.sign(
    { payload },
    'refresh_token',
    { expiresIn: '365d'} //expiresIn thời gian token hết hạn
  );

  return access_token;
};

module.exports = {
  genneralAccessToken,
  genneralRefreshToken
}