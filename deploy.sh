#!/bin/bash
# Deploy script - ensures local and Vercel are always in sync
# Usage: ./deploy.sh [commit message]

set -e

echo "🔄 Syncing Local → GitHub → Vercel..."

# 1. Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo "📝 Staging all changes..."
    git add -A

    # Get commit message
    MSG="${1:-Auto-sync deployment}"
    echo "💾 Committing: $MSG"
    git commit -m "$MSG

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
fi

# 2. Push to GitHub
echo "📤 Pushing to GitHub..."
git push github master

# 3. Deploy to Vercel Production
echo "🚀 Deploying to Vercel Production..."
DEPLOY_URL=$(npx vercel --prod --yes 2>&1 | grep -oE "https://officefrontend[^[:space:]]+" | head -1)

if [[ -z "$DEPLOY_URL" ]]; then
    echo "❌ Vercel deployment failed!"
    exit 1
fi

echo "✅ Deployed: $DEPLOY_URL"

# 4. Update alias
echo "🔗 Updating alias office-lxp.vercel.app..."
npx vercel alias "$DEPLOY_URL" office-lxp.vercel.app

echo ""
echo "✅ Sync Complete!"
echo "   Local:  http://localhost:3000/login"
echo "   Vercel: https://office-lxp.vercel.app/login"
