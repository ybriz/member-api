'use strict';

import * as databaseManager from './databaseManager';

export const handler = async (event) => {

  const itemId = event.pathParameters.id;
  console.log(itemId)
  try {
    const result = await databaseManager.getItem(itemId);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }
  catch (err) {
    console.log(err)
    return {
      statusCode: err.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t fetch the member item.',
    }
  }

};
