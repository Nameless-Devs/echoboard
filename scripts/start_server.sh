#!/bin/bash

SOURCE_FILE="/home/ec2-user/env/secrets.yml"

echo "Attempting to Start server..."

DEPLOYMENT_ROOT="/opt/codedeploy-agent/deployment-root"

UUID_DIR=$(find "$DEPLOYMENT_ROOT" -maxdepth 1 -type d | grep -E "([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})")

if [ -z "$UUID_DIR" ]; then
    echo "No UUID directory found under $DEPLOYMENT_ROOT"
    exit 1
else
    cd "$UUID_DIR" || exit
fi

LATEST_DIR=$(ls -td */ | head -n 1)
cd "$LATEST_DIR" || exit

cd deployment-archive/ || exit

echo "Attempting to copy secrets to correct directory..."
cp "$SOURCE_FILE" src/main/resources/

echo "Attempting to create the package..."
sudo mvn clean package

cd target || exit

echo "Finding the .jar file..."

JAR_FILE=$(find . -name "*.jar" -maxdepth 1)

if [ -z "$JAR_FILE" ]; then
    echo "No .jar file found in the target directory!"
    exit 1
fi

# Running the .jar file
echo "Starting the Java application $JAR_FILE..."
nohup java -jar "$JAR_FILE" > app.log 2>&1 &
