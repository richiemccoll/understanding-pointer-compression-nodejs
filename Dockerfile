# Use an official Ubuntu base image
FROM ubuntu:latest

# Update the package list and install required dependencies
RUN apt-get update && \
    apt-get install -y git python3 make g++ curl

# Set the working directory
WORKDIR /app

# Ensure the buffer size is not too small as the Node.js repo is large
RUN git config --global http.postBuffer 1048576000

# Clone the Node.js repository from GitHub
RUN git clone --depth 1 https://github.com/nodejs/node.git

# Enter the Node.js directory
WORKDIR /app/node

# Checkout the latest stable version
RUN git checkout $(git describe --tags $(git rev-list --tags --max-count=1))

# Run the configure command with pointer compression flag
RUN ./configure --experimental-enable-pointer-compression

# Build Node.js using 4 parallel jobs
RUN make -j4

# Create a directory to store external files
RUN mkdir /app/files

# Set the entrypoint for the container
ENTRYPOINT ["./node"]
