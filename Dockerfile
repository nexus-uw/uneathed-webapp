FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --silent

# Bundle app source
COPY . /usr/src/app

RUN npm run build --silent

EXPOSE 9080
CMD [ "npm", "start" ]

