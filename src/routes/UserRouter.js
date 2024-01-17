const express = require('express');
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.post('/log-out', userController.logoutUser);
router.put('/update-user/:id', authUserMiddleware, userController.updateUser);
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
router.get('/get-all', authMiddleware, userController.getAllUser);
router.get('/get-details/:id', authUserMiddleware, userController.getDetailsUser);
router.post('/refresh-token', userController.refreshToken);
router.post('/delete-many',authMiddleware, userController.deleteMany);

module.exports = router;