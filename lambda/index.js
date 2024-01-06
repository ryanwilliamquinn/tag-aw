console.log('Loading function');

import { BatchWriteItemCommand, DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";


export const handler = async (event, context, callback) => {
    console.log("event?", event.body, event.body.title, event.body.video, event.body.tags)
    const message = JSON.parse(event.body)
    console.log("message", message, message.title, message.video, message.tags)
    
    const client = new DynamoDBClient({});
    const docClient = DynamoDBDocumentClient.from(client);
    
    const validTags = ["Flow", "Quality", "Tension"]
    const filteredTags = message.tags.filter(tag => validTags.includes(tag))
    
    if (filteredTags.length == 0) {
      callback(null, {statusCode:'200', body: "{}"})
      return
    }
  
    const command = new PutCommand({
      TableName: "tagger",
      Item: {
        pk: message.lessonId,
        sk: message.videoId,
        title: message.title,
        video: message.video,
        tags: filteredTags,
      },
    });
    
    console.log("the command", command)

  const response = await docClient.send(command);
  
  console.log("ddb response", response)

  callback(null, {statusCode:'200', body: "{}"})
