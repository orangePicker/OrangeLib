cp -rf ./package.json /root/myFiles/libServer/
cp -rf ./.env /root/myFiles/libServer/
cp -rf ./dist/ /root/myFiles/libServer/
cd /root/myFiles/libServer/
npm install
pm2 restart main