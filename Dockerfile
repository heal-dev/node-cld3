# Start from a Ubuntu 20.04 image
FROM ubuntu:20.04

# Avoid timezone interactive dialog
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary packages

RUN apt-get update
RUN apt-get install -y libprotobuf-dev
RUN apt-get install -y protobuf-compiler
RUN apt-get install -y cmake
RUN apt-get install -y git
RUN apt-get install -y build-essential

# Clone the CLD3 code from the GitHub repository
WORKDIR /opt
RUN git clone https://github.com/google/cld3.git

# Go to the cld3 directory and create a new build directory
WORKDIR /opt/cld3
RUN mkdir build

# Change to the build directory, run CMake, and then run make
WORKDIR /opt/cld3/build
RUN cmake .. && make

# Run tests
CMD ["./language_identifier_main", "./getonescriptspan_test", "./language_identifier_features_test"]
