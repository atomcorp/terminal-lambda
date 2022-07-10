import { APIGatewayProxyEvent } from "aws-lambda";

import handleResponse from "./handleResponse";
import handleRequests from "./handleRequests";
import putObjectToS3 from "./utils/uploadToS3";

exports.handler = async (event: APIGatewayProxyEvent) => {
  const responses = await handleRequests();
  const data = handleResponse(responses);

  putObjectToS3(data);
};
