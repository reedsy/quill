#!/bin/bash

VERSION=$(node -p "require('./packages/quill/package.json').version")

git config --local user.email "github@reedsy.com"
git config --local user.name "GitHub Action"
git fetch --tags

VERSION_COUNT=$(git tag --list $VERSION | wc -l)

if [ $VERSION_COUNT -gt 0 ]
then
  echo "Version $VERSION already deployed."
  exit 0
else
  echo "Deploying version $VERSION"
fi

git tag $VERSION
git push origin refs/tags/$VERSION

npm run build:quill
npm publish packages/quill/dist
