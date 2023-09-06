echo "Attempting to stop echoboard..."
sudo pkill -f echoboard-0.0.1-SNAPSHOT.jar || { echo "Process not found or other error encountered"; true; }