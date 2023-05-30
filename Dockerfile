# Start from a base Ubuntu image with build essentials
FROM node:20

# Install the necessary dependencies
RUN apt-get update && apt-get install -y \
    clang \
    git \
    cmake \
    protobuf-compiler \
    libprotobuf-dev

# Set Clang as the default compiler
ENV CC=/usr/bin/clang
ENV CXX=/usr/bin/clang++

WORKDIR /build
COPY . .

RUN npm install
RUN npm run setup
RUN npm run rebuild
