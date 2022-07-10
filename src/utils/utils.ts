import { RgbType } from "../types";

const GITHUB_HOST = "api.github.com";

export const ITERM_TERMINAL_THEMES_PATH =
  "/repos/mbadolato/iTerm2-Color-Schemes/contents/windowsterminal";

export const CUSTOM_THEMES_PATH =
  "/repos/atomcorp/themes/contents/app/src/custom-colour-schemes.json";
export const GENERATED_CREDITS_PATH =
  "/repos/atomcorp/themes/contents/app/src/credits.json";
export const MANUAL_CREDITS_PATH =
  "/repos/atomcorp/themes/contents/credits/manual-credits.json";

const btoa = (str: string) => Buffer.from(str, "binary").toString("base64");
const headers = {
  "User-Agent": "Windows Terminal Themes",
  Authorization: `Basic ${btoa(`atomcorp:${process.env.GITHUB_TOKEN}`)}`,
  Accept: "application/vnd.github.v3.raw",
};

export const getParams = (path: string) => ({
  hostname: GITHUB_HOST,
  path,
  method: "GET",
  headers,
  port: 443,
});

const luminance = (r: number, g: number, b: number) => {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const contrast = (rgb1: RgbType, rgb2: RgbType) => {
  var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

const hexToRgb = (hex: string): RgbType => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
};

export const getIsDark = (hex: string) =>
  contrast([255, 255, 255], hexToRgb(hex)) > 4;
