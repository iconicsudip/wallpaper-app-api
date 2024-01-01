import express from 'express';
import * as dotenv from 'dotenv';
import mainRoutes from './routers';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000;
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

app.use('/',mainRoutes);

app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  const db = await mongoose.connect(MONGO_URI)
  if(db.connection.readyState === 1){
    console.log("Connected to Database")
  }

});

