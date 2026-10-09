#!/bin/bash

echo "======================================"
echo "    DMF Website Automated Deploy      "
echo "======================================"

# 1. Go to project root
cd /root/demo1 || { echo "Directory /root/demo1 not found! Aborting."; exit 1; }

# 2. Stash any local changes on the server safely
echo "=> Stashing any local changes to prevent conflicts..."
git stash

# 3. Pull latest code from GitHub
echo "=> Pulling latest code from origin main..."
git pull origin main

# 4. Backend Setup
echo "=> Setting up Backend..."
cd backend || exit 1

echo "=> Running Preflight Check..."
node scripts/preflight.js
if [ $? -ne 0 ]; then
  echo "=> Preflight check failed! Aborting deployment. Please fix backend/.env variables."
  exit 1
fi

echo "=> Installing backend dependencies..."
npm install --omit=dev

echo "=> Restarting PM2 process..."
# Restarts all running PM2 processes and loads the latest environment variables
pm2 restart all --update-env

# 5. Frontend Setup
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

echo "======================================"
echo "      Deployment Successful!          "
echo "======================================"
