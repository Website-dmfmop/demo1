#!/usr/bin/env bash
# ==============================================================================
# DMF Website - Safe Production Deployment Script
# ==============================================================================
# Usage on Production Server:
#   cd /root/demo1
#   ./deploy.sh
# ==============================================================================

set -eo pipefail

TARGET_BRANCH="main"
BACKEND_PROCESS_NAME="dmfmop-api"
FRONTEND_DEST="/var/www/dmfmop-frontend"
LOCAL_HEALTH_URL="http://127.0.0.1:5000/api/health"
PUBLIC_HEALTH_URL="https://dmfmop.org/api/health"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "======================================================================"
echo " [DMF DEPLOY] Starting Production Deployment"
echo " Date: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
echo " Working Directory: $SCRIPT_DIR"
echo "======================================================================"

# ------------------------------------------------------------------------------
# STEP 1: SAFETY CHECK - PROTECT LOCAL UNTRACKED FILES
# ------------------------------------------------------------------------------
echo -e "\n[1/7] Checking environment and protecting persistent files..."

if [ ! -f "backend/.env" ]; then
    echo "❌ FATAL: backend/.env not found!"
    echo "Deployment aborted before making any changes."
    exit 1
fi

if [ ! -d "backend/uploads" ]; then
    echo "⚠️ Warning: backend/uploads directory does not exist. Creating..."
    mkdir -p backend/uploads/public backend/uploads/private
fi

# Discard ONLY tracked generated files that frequently conflict on VPS builds
# Never deletes untracked files like backend/.env or backend/uploads
git checkout -- build/ package-lock.json backend/package-lock.json 2>/dev/null || true

# ------------------------------------------------------------------------------
# STEP 2: SAFE GIT SYNC
# ------------------------------------------------------------------------------
echo -e "\n[2/7] Fetching latest code from origin/${TARGET_BRANCH}..."
git fetch origin "$TARGET_BRANCH"

CURRENT_COMMIT=$(git rev-parse --short HEAD)
TARGET_COMMIT=$(git rev-parse --short "origin/$TARGET_BRANCH")

echo "Current commit: $CURRENT_COMMIT"
echo "Target commit:  $TARGET_COMMIT"

if [ "$CURRENT_COMMIT" = "$TARGET_COMMIT" ]; then
    echo "Repository is already up to date with origin/$TARGET_BRANCH."
else
    # Fast-forward only to prevent accidental merge conflicts or code loss
    git merge "origin/$TARGET_BRANCH" --ff-only
    echo "Merged latest commits successfully."
fi

# ------------------------------------------------------------------------------
# STEP 3: PRODUCTION ENVIRONMENT PREFLIGHT CHECK
# ------------------------------------------------------------------------------
echo -e "\n[3/7] Running production environment preflight..."
cd backend
node scripts/preflight.js
cd ..

# ------------------------------------------------------------------------------
# STEP 4: DEPENDENCY CHECK (Only install if package.json changed)
# ------------------------------------------------------------------------------
echo -e "\n[4/7] Checking dependencies..."
if [ "$CURRENT_COMMIT" != "$TARGET_COMMIT" ] && git diff --name-only "$CURRENT_COMMIT" "$TARGET_COMMIT" | grep -q "backend/package.json"; then
    echo "backend/package.json changed. Running npm install in backend/..."
    (cd backend && npm install --omit=dev)
else
    echo "Backend dependencies unchanged."
fi

if [ "$CURRENT_COMMIT" != "$TARGET_COMMIT" ] && git diff --name-only "$CURRENT_COMMIT" "$TARGET_COMMIT" | grep -q "^package.json"; then
    echo "Root package.json changed. Running npm install..."
    npm install
else
    echo "Frontend dependencies unchanged."
fi

# ------------------------------------------------------------------------------
# STEP 5: BUILD & VALIDATE FRONTEND
# ------------------------------------------------------------------------------
echo -e "\n[5/7] Building frontend static assets..."
npm run build

if [ ! -f "build/index.html" ]; then
    echo "❌ FATAL: Frontend build failed to generate build/index.html!"
    echo "Deployment aborted. Production backend and live site left untouched."
    exit 1
fi
echo "Frontend build completed successfully."

# ------------------------------------------------------------------------------
# STEP 6: RESTART BACKEND WITH UPDATED ENVIRONMENT & VERIFY LOCAL HEALTH
# ------------------------------------------------------------------------------
echo -e "\n[6/7] Restarting backend process '${BACKEND_PROCESS_NAME}'..."
pm2 restart "$BACKEND_PROCESS_NAME" --update-env

echo "Waiting for backend to bind and connect to database..."
HEALTHY=0
for i in {1..10}; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$LOCAL_HEALTH_URL" || true)
    if [ "$STATUS" = "200" ]; then
        HEALTHY=1
        echo "✓ Backend responded with HTTP 200 OK after ${i}s."
        break
    fi
    sleep 1
done

if [ "$HEALTHY" -ne 1 ]; then
    echo -e "\n❌ FATAL: Local backend health check failed ($LOCAL_HEALTH_URL returned $STATUS)."
    echo "Showing recent error logs for $BACKEND_PROCESS_NAME:"
    pm2 logs "$BACKEND_PROCESS_NAME" --err --lines 20 --nostream
    echo -e "\nDEPLOYMENT ABORTED: Frontend files were NOT deployed to prevent serving a broken site."
    exit 1
fi

# ------------------------------------------------------------------------------
# STEP 7: DEPLOY FRONTEND TO NGINX DIRECTORY & VERIFY PUBLIC SITE
# ------------------------------------------------------------------------------
echo -e "\n[7/7] Deploying frontend to Nginx webroot ($FRONTEND_DEST)..."
rm -rf "${FRONTEND_DEST:?}"/*
cp -a build/. "$FRONTEND_DEST"/

echo "Verifying public health endpoint ($PUBLIC_HEALTH_URL)..."
PUBLIC_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PUBLIC_HEALTH_URL" || true)
if [ "$PUBLIC_STATUS" = "200" ]; then
    echo "✓ Public health check returned HTTP 200 OK."
else
    echo "⚠️ Warning: Public health check returned HTTP $PUBLIC_STATUS. Please inspect Nginx configuration."
fi

echo -e "\n======================================================================"
echo " ✅ DEPLOYMENT COMPLETED SUCCESSFULLY"
echo " Live Version: $(git rev-parse --short HEAD) ($(git log -1 --pretty=%s))"
echo "======================================================================"
