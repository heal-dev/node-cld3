# Start from a base Ubuntu image
FROM node:20

# Install the necessary dependencies
RUN apt-get update && apt-get install -y \
    git \
    cmake \
    protobuf-compiler \
    clang \
    libprotobuf-dev

WORKDIR /build
COPY . .

RUN npm install
CMD ["npm", "run", "test"]
