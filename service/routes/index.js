var express = require('express');
var router = express.Router();

var { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
var { ScanCommand, QueryCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

/* GET home page. */
router.get('/', async function(req, res, next) {
  const items = await getTags()
  res.render('index', { title: 'Tagged Artist Works Videos', items });
});

module.exports = router;

async function getTags() {
  const client = new DynamoDBClient({region: "us-east-1"});
  const docClient = DynamoDBDocumentClient.from(client);

  const command = new ScanCommand({
    TableName: "tagger",
    ConsistentRead: false,
  });
  // const command = new QueryCommand({
  //   TableName: "tagger",
  //   KeyConditionExpression:
  //     "pk = :pk",
  //   ExpressionAttributeValues: {
  //     ":pk": "75356",
  //   },
  //   ConsistentRead: false,
  // });

  const response = await docClient.send(command);
  console.log(response);
  return response.Items;
};