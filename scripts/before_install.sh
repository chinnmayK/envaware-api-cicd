#!/bin/bash
set -e

echo "===== BEFORE INSTALL ====="

# Stop any running app
pkill -f "node src/index.js" || true

# Clean old files
rm -rf /opt/envaware/*

echo "Cleaned previous deployment"
