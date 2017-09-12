#!/bin/bash

source bash/common.sh

npm install

CI=true npm test
unit=$?
echo_result "Unit Tests" $unit
