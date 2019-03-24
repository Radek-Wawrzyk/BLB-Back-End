import express from 'express';
import { join } from 'path';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import register from 'babel-core/register';
import babelPolyfill from 'babel-polyfill';
import { notFound, catchErrors } from './middlewares/errors';
import cors from 'cors';
import Users from './routes/users';
import Teams from './routes/teams';
import Players from './routes/players';
import Matches from './routes/matches';
import News from './routes/news';

// Connect to database
import dbConfig from './config/database';
import mongoose from 'mongoose';

mongoose.connect(dbConfig.mongoUrl);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

const app = express();

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes config
app.use('/api/users', Users());
app.use('/api/teams', Teams());
app.use('/api/players', Players());
app.use('/api/matches', Matches());
app.use('/api/news', News());

// errors handling
app.use(notFound);
app.use(catchErrors);

// Start
app.listen(4000, () => {
    console.log(`Server is up!`);
});