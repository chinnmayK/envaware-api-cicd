require('dotenv').config();
const express = require('express');

const app = express();

const APP_NAME = process.env.APP_NAME || 'Unknown App';
const APP_ENV = process.env.APP_ENV || 'unknown';
const APP_VERSION = process.env.APP_VERSION || '0.0.0';
const DEPLOY_TIME = process.env.DEPLOY_TIME || 'unknown';
const PORT = process.env.PORT || 3000;

/* Startup Logs */
console.log('==============================');
console.log(`Starting ${APP_NAME}`);
console.log(`Environment : ${APP_ENV}`);
console.log(`Version     : ${APP_VERSION}`);
console.log(`Deployed At : ${DEPLOY_TIME}`);
console.log('==============================');

/* Routes */
app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.get('/env', (req, res) => {
  res.json({
    app: APP_NAME,
    environment: APP_ENV,
    version: APP_VERSION,
    deployedAt: DEPLOY_TIME
  });
});

/* Start Server */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
