cd /opt/codedeploy-agent/deployment-root/24553424-6f4c-4566-940a-5dcf5b9ca470/ || exit
cd "$(ls -td */ | head -n 1)" || exit
cd deployment-archive/ || exit
sudo mvn clean package
cd target || exit
nohup java -jar echoboard-0.0.1-SNAPSHOT.jar > app.log 2>&1 &