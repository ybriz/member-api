'use strict'

import * as uuid from 'uuid'
import {saveItem} from './databaseManager';

export const handler = async (event: { body: string; }) => {
  const data = JSON.parse(event.body);
  
  data.itemId = uuid.v1();

  try {
    const result = await saveItem(data);

    return {
      statusCode: 201,
      body: result
    }
  }
  catch (err) {
    console.log(`There was an error creating the new Member. Error: ${err}`);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the member item.',
    }
  }

};
