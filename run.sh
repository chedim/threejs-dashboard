#! /usr/bin/env bash

docker build -t threejs-dashboard .
(docker stop threejs-dashboard && echo "Stopped.") || echo "Failed to stop."
(docker rm threejs-dashboard && echo "Destroyed.") || echo "Failed to destroy."
(docker run --name threejs-dashboard -d -p5173:5173 threejs-dashboard &&
  echo "Launched on port 5173") || echo "Failed to launch"