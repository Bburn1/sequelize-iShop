
import express from 'express';
import cors from 'cors';
require('dotenv').config();
import router from './routers';
import {errorHandlers} from './middleware';
const db = require('./db/models');



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/api',router)
        
app.use(
  errorHandlers.validationErrorHandler,
  errorHandlers.sequelizeErrorHandler,
  errorHandlers.errorHandler
)





const checkDB = async () => {try {
  await db.sequelize.authenticate()
  console.log('connection has been established successfully')
} catch (error) {
  console.error('unable to authenticate:', error.message)
}}

checkDB()

app.listen(PORT, ()=>console.log('listening on port '+PORT))