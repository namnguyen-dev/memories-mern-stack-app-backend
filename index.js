import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4000;

const MONGODB_CONNECTION_URL = `mongodb+srv://${process.env.MONGODB_KEY}@cluster0.8hirh.mongodb.net/memories_mern_project?retryWrites=true&w=majority`;

mongoose
  .connect(MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('MongoDB error');
    console.log(err.message);
  });
   