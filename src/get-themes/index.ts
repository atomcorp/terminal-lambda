import { APIGatewayProxyEvent } from "aws-lambda";

import handleResponse from "./handleResponse";
import handleRequests from "./handleRequests";
import putObjectToS3 from "./utils/uploadToS3";
import secretManager from "./utils/secret-manager";

exports.handler = () => {
  secretManager(async (githubToken: string) => {
    if (githubToken) {
      const responses = await handleRequests(githubToken);
      const data = handleResponse(responses);

      putObjectToS3(data);
    } else {
      throw new Error("Unauthorized");
    }
  });
};
