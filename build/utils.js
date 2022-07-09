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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requests = void 0;
const http_request_1 = __importDefault(require("./http_request"));
const GITHUB_HOST = "api.github.com";
const ITERM_TERMINAL_THEMES_PATH = "/repos/mbadolato/iTerm2-Color-Schemes/contents/windowsterminal";
const CUSTOM_THEMES_PATH = "/repos/atomcorp/themes/contents/app/src/custom-colour-schemes.json";
const GENERATED_CREDITS_PATH = "/repos/atomcorp/themes/contents/app/src/credits.json";
const MANUAL_CREDITS_PATH = "/repos/atomcorp/themes/contents/credits/manual-credits.json";
const btoa = (str) => Buffer.from(str, "binary").toString("base64");
const headers = {
    "User-Agent": "Windows Terminal Themes",
    Authorization: `Basic ${btoa(`atomcorp:${process.env.GITHUB_TOKEN}`)}`,
    Accept: "application/vnd.github.v3.raw",
};
const getParams = (path) => ({
    hostname: GITHUB_HOST,
    path,
    method: "GET",
    headers,
    port: 443,
});
const itermFileNamesRequestParams = getParams(ITERM_TERMINAL_THEMES_PATH);
const customThemesParams = getParams(CUSTOM_THEMES_PATH);
const generatedCreditsRequestParams = getParams(GENERATED_CREDITS_PATH);
const manualCreditsRequestParams = getParams(MANUAL_CREDITS_PATH);
const getItermThemeFiles = (fileNames) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Promise.all(fileNames.map((fileName, i) => (0, http_request_1.default)(getParams(`${ITERM_TERMINAL_THEMES_PATH}/${encodeURI(fileName)}`))));
});
const requests = () => Promise.all([
// httpRequest<{ name: string }[]>(itermFileNamesRequestParams).then(
//   async (response) => {
//     const themes = await getItermThemeFiles(
//       response.map((themeFile) => themeFile.name)
//     );
//     return themes;
//   }
// ),
// httpRequest(customThemesParams),
// httpRequest(generatedCreditsRequestParams),
]);
exports.requests = requests;
