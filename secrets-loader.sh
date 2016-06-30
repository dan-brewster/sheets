#!/bin/bash

# Load the S3 secrets file contents into the environment variables
declare -a dbs=($(aws s3 cp s3://dbrewster-sheets/db.txt - | cut -d '=' -f2))
export RDS_DB_HOST=${dbs[0]}
export RDS_DB_USER=${dbs[1]}
export RDS_DB_PASS=${dbs[2]}
