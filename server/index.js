import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const CONNECTION_URL = 'mongodb+srv://WooSung:fPYL0Z1vtBbEvl88@cluster0.evhysaf.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json({limit: "30mb", extended : true }));
app.use(bodyParser.urlencoded({limit: "30mb", extended : true }));
app.use(cors());

app.use('/posts', postRoutes);

mongoose.connect(CONNECTION_URL, { useNewUrlParser : true, useUnifiedTopology:true})
    .then(()=> app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`)))
    .catch((error) => console.log(error.message))



