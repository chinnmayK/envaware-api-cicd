#!/bin/bash
set -e

echo "===== APPLICATION START ====="

cd /opt/envaware

nohup npm start > app.log 2>&1 &

echo "Application started"
