'use strict';

import * as databaseManager from './databaseManager';

export const handler = async (event) => {
  const data = JSON.parse(event.body);
  console.log(event.pathParameters.id)
  try {
    const result = await databaseManager.updateItem(event.pathParameters.id, data);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }
  catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the member item.',
    }
  }

};