import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import { requestTIme, logger } from './middlewares.js';
import serverRouter from './routes/servers.js';

const __dirname = path.resolve();
const isProd = process.env.NODE_ENV === 'production';
dotenv.config({ path: isProd ? '.env.prod' : '.env.dev' });

const PORT = process.env.PORT ?? 3000;

const app = express();

// This parameter required to use the EJS engine
app.set('view engine', 'ejs');

// This parameter is required to assign a folder containing templates
app.set('views', path.resolve(__dirname, 'templates'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(requestTIme);
app.use(logger);

app.use(serverRouter);

app.get('/', (req, res) => {
  res.render('index', { title: 'Main page', active: 'main' });
});

app.get('/features', (req, res) => {
  res.render('features', { title: 'Features pages', active: 'features' });
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
