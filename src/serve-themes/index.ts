import { APIGatewayProxyEvent } from "aws-lambda";
const AWS = require("aws-sdk");

const s3 = new AWS.S3();

async function getObject(bucket: string, objectKey: string) {
  try {
    const params = {
      Bucket: bucket,
      Key: objectKey,
    };

    const data = await s3.getObject(params).promise();

    return data.Body.toString("utf-8");
  } catch (e) {
    throw new Error(`Could not retrieve file from S3: ${e.message}`);
  }
}

// To retrieve you need to use `await getObject()` or `getObject().then()`

exports.handler = async (event: APIGatewayProxyEvent) => {
  const res = await getObject("themesjson", "themes.json");
  return JSON.parse(res);
};
