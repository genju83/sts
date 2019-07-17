#!/usr/bin/env sh

# abort on errors
set -e

# build
echo Building. this may take a minute...
yarn build

cd dist

echo Deploying..
git init
git add -A
git commit -m 'deploy'

# deploy
git push -f git@github.com:genju83/sts.git master:gh-pages

cd -
