#!/bin/bash

echo "Starting XXXXXXX docker-cmd"

echo "XXXXXXXYYYYYYYY docker-cmd BEGIN Sleep"
sleep 5
echo "XXXXXXXYYYYYYYY docker-cmd END Sleep"

hostname -I

docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' redis

redis-cli -h localhost PING

redis-cli -h localhost DBSIZE

redis-cli -h localhost --stat

redis-cli -h localhost --bigkeys

redis-cli -h localhost --scan | head -10

redis-cli -h localhost --intrinsic-latency 5

echo "Starting XXXXXXXYYYYYYYY"

# Install StreamReader for Time-Series
# cat gears/timeseries.py | redis-cli -h redis -x RG.PYEXECUTE

# Install StreamReader for Orders
# cat gears/orders.py | redis-cli -h redis -x RG.PYEXECUTE

# Run Simulation
echo "Starting Customers & Orders simulation"
# npm run simulation redis
npm run simulation 
