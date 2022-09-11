import { APIGatewayProxyEvent } from "aws-lambda";
import getObject from "./getObject";

exports.handler = async (event: APIGatewayProxyEvent) => {
  try {
    const res = await getObject("themesjson", "themes.json");
    return JSON.parse(res);
  } catch (e) {
    return `Could not retrieve file`;
  }
};
