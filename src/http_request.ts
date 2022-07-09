import https from "https";

const httpRequest = (params: https.RequestOptions) => {
  return new Promise(function (resolve, reject) {
    const req = https.request(params, function (res) {
      // reject on bad status
      if (res.statusCode && (res.statusCode < 200 || res.statusCode >= 300)) {
        return reject(new Error("statusCode=" + res.statusCode));
      }
      // cumulate data
      const body: Uint8Array[] = [];
      res.on("data", function (chunk) {
        body.push(chunk);
      });
      res.on("end", () => {
        resolve(JSON.parse(Buffer.concat(body).toString()));
      });
    });
    // reject on request error
    req.on("error", function (err) {
      // This is not a "Second reject", just a different sort of failure
      reject(err);
    });
    // IMPORTANT
    req.end();
  });
};

export default httpRequest;
