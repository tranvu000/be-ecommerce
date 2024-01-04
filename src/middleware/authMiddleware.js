const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(' ')[1]
  jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
    if (err) {
      return res.status(404).json({
        message: 'The authemtication',
        status: 'ERROR'
      })
    };

    const { payload } = user;
    if (payload?.isAdmin) {
    } else {
      return res.status(404).json({
        message: 'The authemtication',
        status: 'ERROR'
      })
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token.split(' ')[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
    if (err) {
      return res.status(404).json({
        message: 'The authemtication',
        status: 'ERROR'
      })
    };

    const { payload } = user;
    if (payload?.isAdmin || payload?.id === userId) {
    } else {
      return res.status(404).json({
        message: 'The authemtication',
        status: 'ERROR'
      })
    }
  });
};

module.exports = {
  authMiddleware,
  authUserMiddleware
};