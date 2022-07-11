// Load the SDK for JavaScript
import AWS from "aws-sdk";
import { WindowsTerminalThemeWithMetaType } from "../../types";

AWS.config.update({ region: "eu-west-2" });

const putObjectToS3 = (data: WindowsTerminalThemeWithMetaType[]) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: "themesjson",
    Key: "themes.json",
    Body: JSON.stringify(data),
  };
  s3.putObject(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
};

export default putObjectToS3;
