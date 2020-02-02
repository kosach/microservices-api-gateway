
#!/bin/bash

NETWORK_NAME="test-microservices-network"
if [ $(docker network ls|grep -c $NETWORK_NAME) = 0 ]
then 
   docker network create $NETWORK_NAME;
   echo "Created network $NETWORK_NAME"
fi
docker build -f Dockerfile.dev -t main-geatway-test .
docker run --rm --name main-geatway-test -it  -p 3000:3000 -v /app/node_modules -v $PWD:/app --net=$NETWORK_NAME main-geatway-test