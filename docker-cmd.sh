
redis-cli PING

redis-cli DBSIZE

redis-cli --stat

redis-cli --bigkeys

redis-cli --scan | head -10

redis-cli --intrinsic-latency 5


# Install StreamReader for Time-Series
cat gears/timeseries.py | redis-cli -h redis -x RG.PYEXECUTE

# Install StreamReader for Orders
cat gears/orders.py | redis-cli -h redis -x RG.PYEXECUTE

# Run Simulation
echo "Starting Customers & Orders simulation"
npm run simulation redis