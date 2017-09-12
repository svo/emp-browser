#!/bin/bash

source bash/common.sh

npm install react-scripts

CI=true npm test
unit=$?
echo_result "Unit Tests" $unit
