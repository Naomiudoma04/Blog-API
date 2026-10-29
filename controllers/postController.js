const { Post, User } = require('../models');

const createPost = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { title, content } = req.body;
   
    const post = await Post.create({ title, content, userId: user.id });

    if (!post) {
      return res.status(404).json({
         message: 'Post not found'
         });
    }
    return res.status(201).json({
      message: 'Post created successfully',
      data: post
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};


const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status( 200 ).json( {
            message: `All ${ posts.length } posts retrieved successfully`,
            data: posts
        } );
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving posts',
      error: err.message
    });
  }
};

const getPost = async (req, res) => {
  try {
   const { postId } = req.params;
        const post = await Post.findByPk( postId, {
            include: [ {
                attributes: [ 'firstName', 'lastName', 'email' ],
                model: User,
                as: 'users'
            } ]
        } );
    if (!post) return res.status(404).json({
         message: 'Post not found' 
        });
    res.json({
        message: 'Post retrieved successfully',
        data:post
    });
  } catch (err) {
    res.status(500).json({ 
        message: 'Error retrieving post',
        error: err.message
     });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    const post = await Post.findByPk(postId);

    if (!post) {
      const user = await User.findByPk(postId);
      return res.status(404).json({
        message: user
          ? 'This ID belongs to a user. Use a post ID from GET /postList.'
          : 'Post not found. Use a post ID from GET /postList.'
      });
    }

    const updatedPost = await post.update({ title, content });
    return res.status(200).json({
      message: 'Post updated successfully',
      data: updatedPost
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error updating post',
      error: err.message
    });
  }
};

const deletePost = async (req, res) => {
  const post = await Post.findByPk(req.params.postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  await post.destroy();
  res.json({ 
    message: 'Post deleted' 
});
};


module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
};
