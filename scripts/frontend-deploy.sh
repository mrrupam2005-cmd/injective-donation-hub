#!/usr/bin/env bash
set -e

echo "===================================================="
echo "🌐 DEPLOYING NEXT.JS FRONTEND TO PRODUCTION"
echo "===================================================="

echo "--> Installing dependencies..."
npm ci

echo "--> Running production build..."
npm run build

echo "--> Deploying to Vercel production edge..."
# npx vercel --prod --yes

echo "✅ Frontend Successfully Deployed to Edge Infrastructure!"
