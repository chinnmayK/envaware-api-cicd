#!/bin/bash
set -e

echo "===== AFTER INSTALL ====="
echo "User: $(whoami)"
echo "PWD: $(pwd)"

# Ensure correct ownership
echo "Fixing ownership of /opt/envaware"
sudo chown -R ec2-user:ec2-user /opt/envaware

cd /opt/envaware

# Ensure Node & npm path
export PATH=$PATH:/usr/bin:/usr/local/bin

echo "Node version:"
node -v

echo "NPM version:"
npm -v

echo "Installing dependencies..."
npm install --omit=dev

echo "Writing environment variables..."

cat <<EOF > .env
APP_NAME=EnvAware API
APP_ENV=production
APP_VERSION=1.0.1
DEPLOY_TIME=$(date)
PORT=3000
EOF

echo "AfterInstall completed successfully"
