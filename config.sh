#!/bin/bash

BUILD_FOLDER=.dist

mv .next/standalone/ $BUILD_FOLDER/
cp -r .next/static $BUILD_FOLDER/.next
rm $BUILD_FOLDER/server.js
cp -r next.config.mjs $BUILD_FOLDER/
cp serverless.yml $BUILD_FOLDER/
cp server.ts $BUILD_FOLDER/
cp -r public $BUILD_FOLDER/
cd $BUILD_FOLDER
sls deploy