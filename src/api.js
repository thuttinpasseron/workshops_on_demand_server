var cors = require('cors'),
  router = express.Router(),
  dotenv = require('dotenv');

import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import workshopRoutes from '../routes/workshops';
import customerRoutes from '../routes/customers';
import studentRoutes from '../routes/students';
import challengeRoutes from '../routes/challenges';
// import userRoutes from '../routes/users';
// import loginRoutes from '../routes/login';
import emailsRoutes from '../routes/emails';
import runCronJobs from '../modules/CheckCustomers';
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const fromEmailAddress = process.env.FROM_EMAIL_ADDRESS;
const prodApiUrl = process.env.PRODUCTION_API_SERVER;
const apiPort = process.env.API_PORT;

const app = express();
app.use(cors());
app.use(compression());
app.use(morgan('tiny'));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '20mb',
  })
);
app.use(bodyParser.json({ limit: '20mb' }));

// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'HPE Dev Workshops-On-Demand API',
      version: '1.0.0',
      description: 'HPE Dev Workshops-On-Demand API documentation',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'HPEDEV',
        url: 'https://hpedev.io',
        email: fromEmailAddress,
      },
    },
    servers: [
      {
        url: `http://localhost:${apiPort}/api`,
        description: 'Local (development) server',
      },
      {
        url: prodApiUrl,
        description: 'Main (production) server',
      },
    ],
  },
  apis: ['./models/*.js', './routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);
router.use('/api/docs', swaggerUi.serve);
router.get(
  '/api/docs',
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  })
);

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.get('/', (req, res) => {
  res.json({
    hello: 'hi',
  });
});

router.get('/test', (req, res) => {
  res.json({
    hello: 'test',
  });
});

// Model routes
app.use('/api', workshopRoutes);
app.use('/api', studentRoutes);
app.use('/api', customerRoutes);
app.use('/api', challengeRoutes);
// app.use('/api', userRoutes);
// app.use('/api', loginRoutes);
app.use('/api', emailsRoutes);

app.use(express.json());
app.use('', router);
app.listen(apiPort, () => {
  console.log(`HPE Workshops On Demand API listening on port ${apiPort}!`); // eslint-disable-line no-console
  runCronJobs();
});

module.exports = app;
