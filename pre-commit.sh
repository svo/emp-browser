#!/bin/bash

source bash/common.sh

npm install

CI=true npm test
tests=$?
echo_result "Tests" $tests
