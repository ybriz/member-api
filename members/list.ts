'use strict';

import * as databaseManager from './databaseManager';

export const handler = async () => {
  try {
    const result = await databaseManager.list();
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  }
  catch (err) {
    console.log(err)
    return {
      statusCode: err.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t fetch the members.',
    };
  }
};

