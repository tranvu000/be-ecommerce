const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(' ')[1]  // tách beare ra khỏi token, nhớ truyền beare token vào header: token: Beare ...
  jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
    if (err) {
      return res.status(404).json({
        message: 'The authemtication',
        status: 'ERROR'
      })
    };

    const { payload } = user;          //nếu có user thì sẽ lấy payload trong cái user
    if (payload?.isAdmin) {        // kiểm tra nếu true thì có quyền đi tiếp còn false thì không
      next();
    } else {
      return res.status(404).json({
        message: 'The authemtication',
        status: 'ERROR'
      })
    }
  });
};
/**tham số trong verify
 *  token:  chính là cái token access_token
 *  'shhhhh': là 1 cái key ACCESS_TOKEN = access_token
 *  function(err, decoded): trả về 1 cái function nếu
 *      err: nếu nó là không phải thì trả về err
 *      decoded (user): nếu có thì nó sẽ trả về 1 cái decoded -. thông tin mà bạn gửi lên
 * 
 *  */
module.exports = authMiddleware;