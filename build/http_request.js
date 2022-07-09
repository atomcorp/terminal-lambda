"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const httpRequest = (params) => {
    return new Promise(function (resolve, reject) {
        const req = https_1.default.request(params, function (res) {
            // reject on bad status
            if (res.statusCode && (res.statusCode < 200 || res.statusCode >= 300)) {
                return reject(new Error("statusCode=" + res.statusCode));
            }
            // cumulate data
            const body = [];
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
exports.default = httpRequest;
