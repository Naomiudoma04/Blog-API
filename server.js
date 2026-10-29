require('dotenv').config();

const express = require('express')
const userRouter = require('./router/userRouter');
const postRouter = require('./router/postRouter');

const PORT = process.env.PORT;
const app = express()
app.use(express.json());
app.use(userRouter);
app.use(postRouter);
const sequelize = require('./database/database')

const databaseConnection = async()=>{
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  
  app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}
databaseConnection()
