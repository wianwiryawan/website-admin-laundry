#!/bin/bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

# Use specific Node version
nvm use

# Run your Next.js app
dotenvx run -- npx nodemon --watch . --ext ts,js --exec tsx app.ts
