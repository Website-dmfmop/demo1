#!/bin/bash

echo "======================================"
echo "    DMF Website Automated Deploy      "
echo "======================================"

TARGET="${1:-all}"

# 1. Go to project root
cd /root/demo1 || { echo "Directory /root/demo1 not found! Aborting."; exit 1; }

# 2. Reset generated build files and stash any local changes safely
echo "=> Cleaning local build artifacts and stashing changes to prevent conflicts..."
git checkout -- build/ 2>/dev/null || true
git clean -fd build/ 2>/dev/null || true
git stash

# 3. Pull latest code from GitHub
echo "=> Pulling latest code from origin main..."
git pull origin main

# 4. Backend Setup (runs when target is 'all' or 'backend')
if [ "$TARGET" = "all" ] || [ "$TARGET" = "backend" ] || [ "$TARGET" = "--backend" ]; then
  echo "=> Setting up Backend..."
  cd /root/demo1/backend || exit 1

  echo "=> Running Preflight Check..."
  node scripts/preflight.js
  if [ $? -ne 0 ]; then
    echo "=> Preflight check failed! Please fix backend/.env variables."
    if [ "$TARGET" = "backend" ] || [ "$TARGET" = "--backend" ]; then
      exit 1
    fi
  else
    echo "=> Installing backend dependencies..."
    npm install --omit=dev

    echo "=> Restarting PM2 process..."
    pm2 restart all --update-env
  fi
fi

# 5. Frontend Setup (runs when target is 'all' or 'frontend')
if [ "$TARGET" = "all" ] || [ "$TARGET" = "frontend" ] || [ "$TARGET" = "--frontend" ]; then
  echo "=> Setting up Frontend..."
  cd /root/demo1 || exit 1

  echo "=> Installing frontend dependencies..."
  npm install

  echo "=> Building frontend (Vite)..."
  npm run build

  echo "=> Deploying to Nginx webroot..."
  # Ensure directory exists and copy files
  mkdir -p /var/www/dmfmop-frontend
  rm -rf /var/www/dmfmop-frontend/*
  cp -a build/. /var/www/dmfmop-frontend/
fi

echo "======================================"
echo "      Deployment Complete!            "
echo "======================================"
