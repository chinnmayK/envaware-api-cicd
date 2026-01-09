#!/bin/bash
set -e

echo "===== AFTER INSTALL ====="

cd /opt/envaware

# Install dependencies
npm install --production

# Create runtime env file
cat <<EOF > .env
APP_NAME=EnvAware API
APP_ENV=production
APP_VERSION=1.0.0
DEPLOY_TIME=$(date)
PORT=3000
EOF

echo "Environment variables written"
