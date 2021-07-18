#!/usr/bin/env bash

set -o errexit

app="/app/search-engine"

cd "${app}" && npm install
cd "${app}" && npm run start