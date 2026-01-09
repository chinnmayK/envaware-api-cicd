#!/bin/bash
set -e

echo "===== AFTER INSTALL ====="
echo "Current user: $(whoami)"
echo "Current directory: $(pwd)"

# Ensure Node & npm are available
export PATH=$PATH:/usr/bin:/usr/local/bin

cd /opt/envaware

echo "Node version:"
node -v

echo "NPM version:"
npm -v

echo "Installing dependencies..."
npm install --production

echo "Creating environment variables file..."

cat <<EOF > .env
APP_NAME=EnvAware API
APP_ENV=production
APP_VERSION=1.0.0
DEPLOY_TIME=$(date)
PORT=3000
EOF

echo "AfterInstall completed successfully"
