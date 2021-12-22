import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import sgMail from '@sendgrid/mail';

import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import petitionRoutes from './routes/petitionRoutes.js';
import decisionMakerRoutes from './routes/decisionMakerRoutes.js';

dotenv.config();
sgMail.setApiKey(process.env.MAIL_API_KEY);
const app = express();

const __dirname = path.resolve();

app.set('view engine', 'html');

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/public', express.static(path.join(__dirname, 'uploads')));

app.use('/user', userRoutes);
app.use('/', petitionRoutes);
app.use('/decision-maker', decisionMakerRoutes);

const PORT = process.env.PORT || 5000;

//database connection
connectDB()
    .then((connection) => {
        console.log(`MongoDB Connected: ${connection.connection.host}`);
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((error) => console.log(error.message));


