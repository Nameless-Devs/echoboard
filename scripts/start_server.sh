#!/bin/bash

SOURCE_FILE="/home/ec2-user/env/secrets.yml"

echo "Attempting to Start server..."

DEPLOYMENT_DIR="/opt/codedeploy-agent/deployment-root/ff76af6c-87aa-4059-89ac-8e079c93601e/"
cd "$DEPLOYMENT_DIR" || exit

LATEST_DIR=$(ls -td */ | head -n 1)
cd "$LATEST_DIR" || exit

cd deployment-archive/ || exit

cp "$SOURCE_FILE" src/main/resources/

echo "Attempting to create the package..."
sudo mvn clean package

cd target || exit

echo "Starting the Java application..."
nohup java -jar echoboard-0.0.1-SNAPSHOT.jar > app.log 2>&1 &
