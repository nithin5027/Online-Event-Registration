#!/usr/bin/env bash
# Push script for EX-1-AIWEB (run from inside the ex1 folder)
set -e

echo "Initializing git repository and committing files..."

# Initialize repo if not already
if [ ! -d .git ]; then
  git init
fi

git add .
# Use a clear commit message
git commit -m "initial commit: event page + report" || echo "No changes to commit"

git branch -M main

# Set remote (replace if remote already exists)
REMOTE_URL="https://github.com/shahiilr/EX-1-AIWEB.git"
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

echo "Attempting to push to remote 'origin' on branch 'main'..."

git push -u origin main

echo "Push complete (if authentication succeeded)."