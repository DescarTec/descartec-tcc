#!/bin/bash
docker-compose down

sudo rm -rf .mysql-data

docker-compose up -d --build --force-recreate