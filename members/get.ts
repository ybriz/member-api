'use strict';

import {getItem} from './databaseManager';

export const handler = async (event) => {

  const itemId = event.pathParameters.id;
  console.log(`Member ID to be retrieved: ${itemId}`);
  try {
    const result = await getItem(itemId);

    if(result) {
      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    }

    return {
      statusCode: 204
    }
    
  }
  catch (err) {
    console.log(`There was an error retrieving Member ${itemId}. Error: ${err}`)
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t fetch the member item.',
    }
  }

};
