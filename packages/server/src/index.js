
import express from 'express';
import cors from 'cors';
import router from './routers';
require('dotenv').config();
const db = require('./db/models');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/api',router)



const checkDB = async () => {try {
  await db.sequelize.authenticate()
  console.log('connection has been established successfully')
} catch (error) {
  console.error('unable to authenticate:', error.message)
}}

checkDB()

app.listen(PORT, ()=>console.log('listening on port '+PORT))