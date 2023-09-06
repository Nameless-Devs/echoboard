SOURCE_FILE="/home/ec2-user/env/secrets.yml"

echo "Attempting to Start server..."
cd /opt/codedeploy-agent/deployment-root/24553424-6f4c-4566-940a-5dcf5b9ca470/ || exit
echo "Attempting find the latest directory..."
cd "$(ls -td */ | head -n 1)" || exit
cd deployment-archive/ || exit
sudo mkdir "target"
echo "Attempting to copy secrets..."
cd target || exit
cp $SOURCE_FILE ./
cd ..
echo "Attempting to create the package..."
sudo mvn clean package
cd target || exit
echo "Staring the java file..."
nohup java -jar echoboard-0.0.1-SNAPSHOT.jar > app.log 2>&1 &