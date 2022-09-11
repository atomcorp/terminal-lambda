const AWS = require("aws-sdk");

const s3 = new AWS.S3();

async function getObject(bucket: string, objectKey: string) {
  const params = {
    Bucket: bucket,
    Key: objectKey,
  };

  const data = await s3.getObject(params).promise();

  return data.Body.toString("utf-8");
}

export default getObject;
