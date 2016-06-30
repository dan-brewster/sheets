#!/bin/bash

# Load the S3 secrets file contents into the local variables
declare -a dbs=($(aws s3 cp s3://dbrewster-sheets/db.txt - | cut -d '=' -f2))

node index.js ${dbs[0]} ${dbs[1]} ${dbs[2]}
