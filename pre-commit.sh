#!/bin/bash

source bash/common.sh

CI=true npm test
unit=$?
echo_result "Unit Tests" $unit
