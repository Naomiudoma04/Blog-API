const router = require('express').Router();
const {createUser, getUsers, getUser, updateUser, deleteUser} = require('../controllers/userController.js');

router.post('/createUser', createUser);
router.get('/userList', getUsers);
router.get('/getUser/:id', getUser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;