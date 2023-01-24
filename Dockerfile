FROM node:18.12.1-alpine3.17
WORKDIR /usr/src/app
COPY . .
RUN yarn
#CMD [ "yarn", "production" ]
CMD if [ "$NODE_ENV" = "stage" ] ; then ["yarn", "stage"]; else CMD["yarn", "stage"] ; fi