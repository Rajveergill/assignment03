'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3()

module.exports.upload = (event) => {
  
  event.Records.forEach((record) => {
    const filename = record.s3.object.key;
    const eventType = record.eventName;
    const eventTime = record.eventTime;
    const filesize = record.s3.object.size;

    const params = {
      TableName: 'rajveer',
      Item: {
        id: uuid.v1(),
        name: filename,
        size: filesize,
      }
    }

    dynamoDb.put(params, (err, res) => {
      if (err) {
        console.log(err);
        return;
        
      }
      
    })

  });
};