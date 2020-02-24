'use strict';

require('./config');

import {expect} from 'chai';

import * as AWS from 'aws-sdk';
import * as databaseManager from '../members/databaseManager';

beforeEach(() => {
  const dynamo = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  });

  databaseManager.initializateDynamoClient(dynamo);
});


describe('Test database integration', () => {
  let item = {
    itemId: 'itemId',
    gender: "male",
    name: {
      title: "mr",
      first: "brad",
      last: "gibson"
    },
    location: {
      street: "9278 new road",
      city: "kilcoole",
      state: "waterford",
      postcode: "93027",
      coordinates: {
        latitude: "20.9267",
        longitude: "-7.9310"
      },
      timezone: {
        offset: "-3:30",
        description: "Newfoundland"
      }
    },
    email: "brad.gibson@example.com",
    login: {
      uuid: "155e77ee-ba6d-486f-95ce-0e0c0fb4b919",
      username: "silverswan131",
      password: "firewall",
      salt: "TQA1Gz7x",
      md5: "dc523cb313b63dfe5be2140b0c05b3bc",
      sha1: "7a4aa07d1bedcc6bcf4b7f8856643492c191540d",
      sha256: "74364e96174afa7d17ee52dd2c9c7a4651fe1254f471a78bda0190135dcd3480"
    },
    dob: {
      date: "1993-07-20T09:44:18.674Z",
      age: 28
    },
    registered: {
      date: "2002-05-21T10:59:49.966Z",
      age: 17
    },
    phone: "011-962-7516",
    cell: "081-454-0666",
    id: {
      name: "PPS",
      value: "0390511T"
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/75.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/75.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/75.jpg"
    },
    nat: "IE"
  };

  it('save a member', async () => {
    const result = await databaseManager.saveItem(item);

    expect(result).to.be.equal('itemId');
  });

  it('get a member', async () => {
    const result = await databaseManager.getItem('itemId');

    expect(result.itemId).to.be.equal(item.itemId);
    expect(result.name).to.be.eql(item.name);
    expect(result.email).to.be.equal(item.email);
  });

  it('update a member', async () => {
    item.email = "test@email.com";
    const result = await databaseManager.updateItem('itemId', item);

    expect("test@email.com").to.be.equal(result.email);
  });

  it('delete a member', async () => {
    await databaseManager.deleteItem('itemId');
    const member = await databaseManager.getItem('itemId');
    
    expect(member).to.be.null;
  });
});
