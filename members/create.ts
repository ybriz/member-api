'use strict'

import * as uuid from 'uuid'
import * as databaseManager from './databaseManager';

export const handler = async (event: { body: string; }) => {
  const data = JSON.parse(event.body);
  
  data.itemId = uuid.v1();

  try {
    const result = await databaseManager.saveItem(data);

    return {
      statusCode: 200,
      body: result
    }
  }
  catch (err) {
    console.log(err);
    return new Error('Couldn\'t create the member item.');
  }

};
