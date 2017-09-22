#!/bin/bash

source bash/common.sh

npm install

sed -i 's/-odgn\.3//g' package.json
sed -i 's/odgn-//g' package.json
sed -i 's/odgn-//g' src/alt.js
npm install
yarn build
build=$?
echo_result "Build" $build

git checkout src/alt.js
git checkout package.json

