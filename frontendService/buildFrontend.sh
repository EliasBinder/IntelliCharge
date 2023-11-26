#!/bin/bash

# Clear public folder
cd ./public || exit
rm -rf *
cd ..

# Build react frontend in frontend folder
cd ../frontend || exit
npm install
npm run build

# Copy build folder to backend folder
cp -r ./dist/* ../frontendService/public