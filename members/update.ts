'use strict';

import {updateItem} from './databaseManager';

export const handler = async (event) => {
  const data = JSON.parse(event.body);
  const itemId = event.pathParameters.id;

  console.log(`Member ID to be updated: ${itemId}`);
  try {
    const result = await updateItem(itemId, data);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }
  catch (err) {
    console.log(`There was an error updating Member ${itemId}. Error: ${err}`);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the member item.',
    }
  }

};