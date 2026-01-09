require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Health endpoint (for monitoring)
app.get("/health", (req, res) => {
  res.json({
    status: "UP"
  });
});

// Environment info endpoint (API style)
app.get("/env", (req, res) => {
  res.json({
    app: process.env.APP_NAME || "EnvAware API",
    environment: process.env.APP_ENV || "unknown",
    version: process.env.APP_VERSION || "unknown",
    deployedAt: process.env.DEPLOY_TIME || "unknown"
  });
});

// Web page (HTML)
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>EnvAware App</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f6f8;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .card {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          width: 400px;
        }
        h1 {
          text-align: center;
          color: #333;
        }
        .item {
          margin: 10px 0;
          font-size: 16px;
        }
        .label {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 EnvAware App</h1>
        <div class="item"><span class="label">Health:</span> ✅ UP</div>
        <div class="item"><span class="label">Environment:</span> ${process.env.APP_ENV}</div>
        <div class="item"><span class="label">Version:</span> ${process.env.APP_VERSION}</div>
        <div class="item"><span class="label">Deployed At:</span> ${process.env.DEPLOY_TIME}</div>
      </div>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`EnvAware app running on port ${PORT}`);
});
