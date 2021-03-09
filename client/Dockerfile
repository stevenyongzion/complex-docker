FROM node:14 as builder

# Specify the directory inside the image in which all commands will run 
WORKDIR /app 

# Copy package files and install dependencies 
COPY package*.json ./ 
RUN npm install 

# Copy all of the app files into the image 
# Note that for development environment, and mapped with volumes
# the below is not really needed
COPY ./ ./ 

# Now build production version of react files
RUN npm run build

# docker build -t simple-node .
# docker run --rm -p 3000:3000 simple-node

# start of different phase
FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html