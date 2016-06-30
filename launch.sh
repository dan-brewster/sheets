#!/bin/bash

# Load the S3 secrets file contents into the local variables
declare -a dbs=($(aws s3 cp s3://dbrewster-sheets/db.txt - | cut -d '=' -f2))

docker run -p 3000:3000 -e "RDS_DB_HOST=${dbs[0]}" -e "RDS_DB_USER=${dbs[1]}" -e "RDS_DB_PASS=${dbs[2]}" sheets2:latest
