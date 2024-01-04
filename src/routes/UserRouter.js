const express = require('express');
const userController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
router.get('/getAll',authMiddleware, userController.getAllUser);  // list danh sách user, chỉ có thằng isAdmin = true mới lây được list user
router.get('/get-details/:id', userController.getDetailsUser);

module.exports = router;