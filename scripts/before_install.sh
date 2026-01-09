#!/bin/bash
set -e

echo "===== BEFORE INSTALL ====="
echo "User: $(whoami)"
echo "PWD: $(pwd)"

# Ensure target directory exists
if [ ! -d /opt/envaware ]; then
  echo "Creating /opt/envaware"
  mkdir -p /opt/envaware
fi

# Stop existing Node app safely
if pgrep -f "node" > /dev/null; then
  echo "Stopping existing Node process"
  pkill -f "node" || true
else
  echo "No running Node process found"
fi

# Clean old files safely
echo "Cleaning old deployment files"
rm -rf /opt/envaware/* || true

echo "BeforeInstall completed successfully"
