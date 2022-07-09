import { APIGatewayProxyEvent } from "aws-lambda";

import { requests } from "./utils";

const helloworld = "Hello World! I am listening";

const myFunc = (str: string) => str;

console.log(myFunc(helloworld));

try {
  requests().then((results) => {
    console.log("Results: ", results);
  });
} catch (error) {
  console.error("Error start !!!!!!!!!!!");
  console.error(error);
  console.error("Error end !!!!!!!!!!");
}

exports.handler = async (event: APIGatewayProxyEvent) => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
