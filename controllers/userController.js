// const { CHAR } = require('sequelize');
const { User, Post, sequelize } = require('../models');


const toTitleCase = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const createUser = async (req, res) => {
  try {
     const { firstName, lastName, email, gender } = req.body;
    const user = await User.findOne({ where: { email:email.toLowerCase() } } );
            if (user) {
            return res.status( 400 ).json( {
                message: "Invalid credentials"
            } );
        }

        const newUser = await User.create( {
            firstName, //toTitleCase(firstName),
            lastName, //: toTitleCase(lastName),
            email:  email.toLowerCase(),
            gender
        } );

    res.status(201).json({
        message: 'User created successfully',
        data:newUser});
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ 
        error: "Something went wrong"

    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
       res.status(200).json({
          message: 'Users retrieved successfully',
          data: users
    });
  } catch (err) {
      res.status(500).json({
         message: 'Error retrieving users',
         error: err.message
    });
  }
};

const getUser = async (req, res) => {
  try {
   const user = await User.findByPk(req.params.id, {
      include: [{
        model: Post,
        as: 'posts',
        attributes: ['title', 'content', 'createdAt']
}]
    });
    if (!user) return res.status(404).json({
         message: 'User not found' 
        });
    res.status(200).json({
        message: 'User retrieved successfully',
        data:user
    });
  } catch (err) {
    res.status(500).json({ 
        message: 'Error retrieving user',
        error: err.message
     });
  }
};

const updateUser = async (req, res) => {
  try {
  const { id } = req.params;
        const { firstName, lastName, email, gender } = req.body;

        const user = await User.findByPk( id );
        if ( !user ) {
            return res.status( 404 ).json( {
                message: 'User not found'
            } );
        }
       const updatedUser = await user.update( { firstName, lastName, email, gender } );
          res.status(200).json({
             message: 'User updated successfully',
             data: updatedUser
         } );
  } catch (err) {
    res.status(500).json({ 
        message: 'Error updating user',
        error: err.message
     });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await sequelize.transaction(async (transaction) => {
      const user = await User.findByPk(req.params.id, { transaction });
      if (!user) return false;

      await Post.destroy({
        where: { userId: user.id },
        transaction
      });
      await user.destroy({ transaction });
      return true;
    });

    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ 
      message: 'User and associated posts deleted'
     });
  } catch (err) {
    res.status(500).json({ 
        message: 'Error deleting user',
        error: err.message
     });
  }
};



module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
