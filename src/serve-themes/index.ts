import { APIGatewayProxyEvent } from "aws-lambda";
import AWS from "aws-sdk";

AWS.config.update({ region: "eu-west-2" });

exports.handler = async (event: APIGatewayProxyEvent) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: "themesjson",
    Key: "themes.json",
  };
  s3.getObject(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
  return {
    status: 200,
    message: JSON.stringify("Hello world"),
  };
};
