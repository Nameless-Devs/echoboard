cd /opt/codedeploy-agent/deployment-root/24553424-6f4c-4566-940a-5dcf5b9ca470/d-53095TBFO/deployment-archive/ || exit
sudo mvn clean package
cd target || exit
nohup java -jar echoboard-0.0.1-SNAPSHOT.jar > app.log 2>&1 &