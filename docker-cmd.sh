#!/bin/bash

echo "Starting XXXXXXX docker-cmd"

echo "XXXXXXXYYYYYYYY docker-cmd BEGIN Sleep"
sleep 5
echo "XXXXXXXYYYYYYYY docker-cmd END Sleep"

hostname -I

# docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' redis

# echo "using localhost XXXXXXXYYYYYYYY"

# redis-cli -h localhost PING

# redis-cli -h localhost DBSIZE

# redis-cli -h localhost --stat

# redis-cli -h localhost --bigkeys

# redis-cli -h localhost --scan | head -10

# redis-cli -h localhost --intrinsic-latency 5

echo "using redis XXXXXXXYYYYYYYY"

redis-cli -h redis PING

redis-cli -h redis DBSIZE

# redis-cli -h redis --stat

redis-cli -h redis --bigkeys

redis-cli -h redis --scan | head -10

redis-cli -h redis --intrinsic-latency 5

# echo "using no-host-alias XXXXXXXYYYYYYYY"

# redis-cli PING

# redis-cli DBSIZE

# # redis-cli --stat

# redis-cli --bigkeys

# redis-cli --scan | head -10

# redis-cli --intrinsic-latency 5

echo "Starting XXXXXXXYYYYYYYY"

# Install StreamReader for Time-Series
cat gears/timeseries.py | redis-cli -x RG.PYEXECUTE

# Install StreamReader for Orders
cat gears/orders.py | redis-cli -x RG.PYEXECUTE

# Run Simulation
echo "Starting Customers & Orders simulation"
# npm run simulation redis
npm run simulation 
