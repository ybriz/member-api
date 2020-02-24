'use strict';

import {list}  from './databaseManager';

export const handler = async () => {
  try {
    const result = await list();
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  }
  catch (err) {
    console.log(`There was an error retrieving Members. Error: ${err}`)
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t fetch the members.',
    };
  }
};

