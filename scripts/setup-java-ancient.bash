#!/usr/bin/env bash

# For REALLY REALLY old ass forge packs.

FILEURL=https://github.com/HenryFBP/minecraft-server-gcp/releases/download/jdk-7-linux-64/jdk-7u80-linux-x64.tar.gz
FILENAME=jdk-7u80-linux-x64.tar.gz

pushd /tmp/

curl -L $FILEURL --output $FILENAME

tar -xzvf $FILENAME

sudo mkdir -p /opt/java/
sudo cp -r ./jdk1.7.0_80/ /opt/java/jdk1.7.0_80

ls -lash /opt/java

echo "Done :)"

popd