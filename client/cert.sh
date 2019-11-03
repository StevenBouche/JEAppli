#/bin/bash

rm -f ./node_modules/webpack-dev-server/ssl/server.pem
cp ./cert/server.pem ./node_modules/webpack-dev-server/ssl/server.pem
cat ./node_modules/webpack-dev-server/ssl/server.pem
