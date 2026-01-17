#! /usr/bin/env bash

docker build -t threejs-dashboard .
docker run -d -p5173:5173 threejs-dashboard