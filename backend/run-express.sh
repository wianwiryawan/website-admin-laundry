#!/bin/bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

# Use specific Node version
nvm use lts/jod

# Run your Next.js app
dotenvx run -- npx tsx app.ts
