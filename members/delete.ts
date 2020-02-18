'use strict';

const databaseManager = require('./databaseManager');

export const handler = async (event) => {
  const itemId = event.pathParameters.id;

  try {
    await databaseManager.deleteItem(itemId);
    return {
      statusCode: 200,
      body: JSON.stringify('Member was deleted'),
    }
  }
  catch (err) {
    console.log(err)
    return {
      statusCode: err.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t remove the member item.',
    }
  }

};
