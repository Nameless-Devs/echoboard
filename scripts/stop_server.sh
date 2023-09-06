echo "Checking if echoboard is running..."

#if pgrep -f echoboard-0.0.1-SNAPSHOT.jar > /dev/null; then
#    echo "Echoboard is running. Attempting to stop..."
#    sudo pkill -f echoboard-0.0.1-SNAPSHOT.jar
#
#    if [ $? -eq 0 ]; then
#        echo "Successfully stopped echoboard."
#    else
#        echo "Failed to stop echoboard, but marking it as successful."
#    fi
#
#else
#    echo "Echoboard is not running."
#fi
