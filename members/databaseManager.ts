'use strict';

import { DynamoDB } from 'aws-sdk';
let dynamo = new DynamoDB.DocumentClient();

const TABLE_NAME = process.env.DYNAMODB_TABLE;

export const initializateDynamoClient = newDynamo => {
  dynamo = newDynamo;
};

export const saveItem = async (data) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      itemId: data.itemId,
      id: data.id,
      gender: data.gender,
      name: data.name,
      location: data.location,
      email: data.email,
      login: data.login,
      dob: data.dob,
      registered: data.registered,
      phone: data.phone,
      cell: data.cell,
      picture: data.picture,
      nat: data.nat
    }
  };

  await dynamo.put(params).promise();

  return data.itemId;
};

export const getItem = async (itemId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      itemId: itemId
    }
  };

  const res = await dynamo.get(params).promise();
  console.log(res)
  return res.Item;
};

export const deleteItem = async (itemId) => {
  const params = {
    Key: {
      itemId: itemId
    },
    TableName: TABLE_NAME
  };

  await dynamo.delete(params).promise();

  return true;
};

export const updateItem = async (itemId, data) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      itemId: itemId,
    },
    ExpressionAttributeNames: {
      '#member_name': 'name',
      '#member_location': 'location',
    },
    ExpressionAttributeValues: {
      ':gender': data.gender,
      ':name': data.name,
      ':location': data.location,
      ':email': data.email,
      ':login': data.login,
      ':dob': data.dob,
      ':registered': data.registered,
      ':phone': data.phone,
      ':cell': data.cell,
      ':picture': data.picture,
      ':nat': data.nat
    },
    UpdateExpression: `SET #member_name = :name, gender = :gender, #member_location = :location, email = :email, 
                          login = :login, dob = :dob, registered = :registered, phone = :phone, cell = :cell, picture = :picture, nat = :nat`,
    ReturnValues: 'ALL_NEW' as const
  };
  const result = await dynamo.update(params).promise();

  return result.Attributes;
};

export const list = async () => {
  const params = {
    TableName: TABLE_NAME,
  };

  const result = await dynamo.scan(params).promise();

  return result.Items;
};

