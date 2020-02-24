'use strict';

import {deleteItem} from './databaseManager';

export const handler = async (event) => {
  const itemId = event.pathParameters.id;

  try {
    const member = await deleteItem(itemId);
    
    if(member.Attributes){
      return {
        statusCode: 200,
        body: JSON.stringify(member.Attributes),
      }
    }

    return {
      statusCode: 204
    }
  }
  catch (err) {
    console.log(`There was an error deleting Member ${itemId}. Error: ${err}`)
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'There was an error deleting the Member.',
    }
  }

};
