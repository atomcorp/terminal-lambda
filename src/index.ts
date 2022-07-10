import { APIGatewayProxyEvent } from "aws-lambda";
import handleResponse from "./handleResponse";

import requests from "./requests";

const helloworld = "Hello World! I am listening";

const myFunc = (str: string) => str;

console.log(myFunc(helloworld));

const test = async () => {
  try {
    const responses = await requests();
    const data = handleResponse(responses);
    console.log(data);
  } catch (error) {
    console.error("Error start !!!!!!!!!!!");
    console.error(error);
    console.error("Error end !!!!!!!!!!");
  }
};

exports.handler = async (event: APIGatewayProxyEvent) => {
  const content = await test();
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify(content),
  };

  return response;
};
