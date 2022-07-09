"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const helloworld = "Hello World! I am listening";
const myFunc = (str) => str;
console.log(myFunc(helloworld));
try {
    (0, utils_1.requests)().then((results) => {
        console.log("Results: ", results);
    });
}
catch (error) {
    console.error("Error start !!!!!!!!!!!");
    console.error(error);
    console.error("Error end !!!!!!!!!!");
}
exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify("Hello from Lambda!"),
    };
    return response;
});
