import httpRequest from "./http_request";

const GITHUB_HOST = "api.github.com";

const ITERM_TERMINAL_THEMES_PATH =
  "/repos/mbadolato/iTerm2-Color-Schemes/contents/windowsterminal/";

const CUSTOM_THEMES_PATH =
  "/repos/atomcorp/themes/contents/app/src/custom-colour-schemes.json";
const GENERATED_CREDITS_PATH =
  "/repos/atomcorp/themes/contents/app/src/credits.json";
const MANUAL_CREDITS_PATH =
  "/repos/atomcorp/themes/contents/credits/manual-credits.json";

const btoa = (str: string) => Buffer.from(str, "binary").toString("base64");
const headers = {
  "User-Agent": "Windows Terminal Themes",
  Authorization: `Basic ${btoa(`atomcorp:${process.env.GITHUB_TOKEN}`)}`,
  Accept: "application/vnd.github.v3.raw",
};

const getParams = (path: string) => ({
  hostname: GITHUB_HOST,
  path,
  method: "GET",
  headers,
  port: 443,
});

const itermRequestParams = getParams(ITERM_TERMINAL_THEMES_PATH);
const customThemesParams = getParams(CUSTOM_THEMES_PATH);
const generatedCreditsRequestParams = getParams(GENERATED_CREDITS_PATH);
const manualCreditsRequestParams = getParams(MANUAL_CREDITS_PATH);

export const requests = () =>
  Promise.all([
    // httpRequest(itermCustomThemesParams),
    // httpRequest(generatedCreditsRequestParams),
  ]);
