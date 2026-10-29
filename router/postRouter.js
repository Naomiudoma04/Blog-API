const router = require('express').Router();
const {createPost, getPosts, getPost, updatePost, deletePost} = require('../controllers/postController');

router.post('/createPost/:userId', createPost);
router.get('/postList', getPosts);
router.get('/getPost/:postId', getPost);
router.put('/updatePost/:postId', updatePost);
router.delete('/deletePost/:postId', deletePost);


module.exports = router;
