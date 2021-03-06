<!--
title: MEMBER
description: This example deploy a serverless API with TypeScript and DynamoDB.
-->

# requirements
* serverless framework
* Java Runtime Engine (JRE) version 6.x or newer

# compiling

You can compile the project in this directory by running

`npm install`

then

`serverless deploy`

# using the API

Load postman collection and update URLs according to your deployment to test endpoints.

# testing

You can test the project in this directory using dynamodb-local following instructions on:

https://www.npmjs.com/package/serverless-dynamodb-local

Run

`sls dynamodb install`

then

`sls dynamodb start --migrate`

In a new console run

`npm test`