import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const PORT = process.env.PORT || 8080;

const app = express();

dotenv.config({path:'config.env'});

app.use(bodyParser.json({limit: "30mb", extended : true }));
app.use(bodyParser.urlencoded({limit: "30mb", extended : true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser : true, useUnifiedTopology:true})
    .then(()=> app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`)))
    .catch((error) => console.log(error.message))



