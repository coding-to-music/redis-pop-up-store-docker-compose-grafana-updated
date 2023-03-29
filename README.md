# redis-pop-up-store-docker-compose-grafana-updated

# 🚀 Pop-up store demo using @RedisTimeSeries, @RedisGears, and Redis plugins for Grafana 🚀

https://github.com/coding-to-music/redis-pop-up-store-docker-compose-grafana-updated

From / By https://github.com/RedisGrafana/redis-pop-up-store (This is the original)

https://github.com/ajeetraina/redis-pop-up-store  (this is 11 commits back)

https://redis.com/blog/3-real-life-apps-built-with-redis-data-source-for-grafana/

https://github.com/ajeetraina/awesome-compose (interesting, related)


## Environment variables:

```java

```

## user interfaces:

- Grafana http://localhost:3000

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/redis-pop-up-store-docker-compose-grafana-updated.git
git push -u origin main
```

# Pop-up store demo using RedisTimeSeries, RedisGears and Redis plugins for Grafana</h1>

![Pop-up](https://github.com/RedisGrafana/redis-pop-up-store/blob/master/images/pop-up-dashboard.png)

[![Grafana 8](https://img.shields.io/badge/Grafana-8-orange)](https://www.grafana.com)
[![Redis Data Source](https://img.shields.io/badge/dynamic/json?color=blue&label=Redis%20Data%20Source&query=%24.version&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins%2Fredis-datasource)](https://grafana.com/grafana/plugins/redis-datasource) [![Redis Application](https://img.shields.io/badge/dynamic/json?color=blue&label=Redis%20Application&query=%24.version&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins%2Fredis-app)](https://grafana.com/grafana/plugins/redis-app)

## Introduction

The Pop-up store is using [Redis Streams](https://redis.io/topics/streams-intro), [RedisTimeSeries](https://oss.redis.com/redistimeseries/), [RedisGears](https://oss.redis.com/redisgears/) and [Redis plugins](https://redisgrafana.github.io) to visualize data pipeline in Grafana.

![Diagram](https://github.com/RedisGrafana/redis-pop-up-store/blob/master/images/pop-up.png)

- Node.js script adds random data to Customers and Orders streams
- RedisGears is using `StreamReader` to watch all `queue:` keys and adding Time-Series samples
- Another RedisGears script completes orders
  - adding data to `queue:complete` stream
  - deleting client's ordering
  - decreasing product amount
  - trimming Orders queue
- Grafana query streams and Time-Series keys every 5 seconds to display samples using Grafana plugins.

## Demo

Demo is available on [demo.volkovlabs.io](https://demo.volkovlabs.io):

- [Redis Overview dashboard](https://demo.volkovlabs.io/d/TgibHBv7z/redis-overview?orgId=1&refresh=1h)
- [Pop-up Store dashboard](https://demo.volkovlabs.io/d/0LC0Sm7Ml/pop-up-store?orgId=1)

## Requirements

- [Docker](https://docker.com) to start Redis and Grafana.
- [Node.js](https://nodejs.org) to run simulation script.

## Start Redis, Grafana and Application simulation

```
npm run start
```

## Grafana Dashboards

Open Grafana Dashboard using browser http://localhost:3000

## Redis-cli

To start `redis-cli` and look at the keys please run

```
npm run redis-cli
```

## find the ip address inside the docker container for redis

```
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' redis
```

## View processes and what ports they are using via ss -ltnp

```
ss -ltnp
```

Output

```
State                        Recv-Q                       Send-Q            Local Address:Port         Peer Address:Port                       Process           
LISTEN                       0                            511                   127.0.0.1:44335             0.0.0.0:*                           users:(("node",pid=80321,fd=18))                       
LISTEN                       0                            4096                    0.0.0.0:111               0.0.0.0:*      
LISTEN                       0                            4096              127.0.0.53%lo:53                0.0.0.0:*      
LISTEN                       0                            128                     0.0.0.0:22                0.0.0.0:*      
LISTEN                       0                            5                     127.0.0.1:631               0.0.0.0:*      
LISTEN                       0                            4096                       [::]:111                  [::]:*      
LISTEN                       0                            128                        [::]:22                   [::]:*      
LISTEN                       0                            2            [::ffff:127.0.0.1]:3350                    *:*      
LISTEN                       0                            2                             *:3389                    *:*    
```

## List Processes, Ports and PID

```
sudo netstat -nlp 
```

```
sudo lsof -n -P -i +c 13
```
