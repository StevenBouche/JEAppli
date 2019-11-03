FROM node:12.11.1
# Create app directory
WORKDIR /server
# Install app dependencies
COPY package*.json /server/

RUN npm install --save

# Copy app source code
COPY . /server/

#Expose port and start application
EXPOSE 8080
CMD [ "npm", "start" ]
