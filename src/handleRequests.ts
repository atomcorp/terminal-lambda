import httpRequest from "./utils/httpRequest";
import {
  CUSTOM_THEMES_PATH,
  GENERATED_CREDITS_PATH,
  getParams,
  ITERM_TERMINAL_THEMES_PATH,
  MANUAL_CREDITS_PATH,
} from "./utils/utils";

import {
  WindowsTerminalThemeType,
  GithubDirResponseType,
  CreditType,
} from "./types";

const itermFileNamesRequestParams = getParams(ITERM_TERMINAL_THEMES_PATH);
const customThemesParams = getParams(CUSTOM_THEMES_PATH);
const generatedCreditsRequestParams = getParams(GENERATED_CREDITS_PATH);
const manualCreditsRequestParams = getParams(MANUAL_CREDITS_PATH);

const getItermThemeFiles = async (fileNames: string[]) =>
  await Promise.all(
    fileNames
      .slice(0, 5)
      .map((fileName, i) =>
        httpRequest<WindowsTerminalThemeType>(
          getParams(`${ITERM_TERMINAL_THEMES_PATH}/${encodeURI(fileName)}`)
        )
      )
  );

const getItermThemesHttpRequest = () =>
  httpRequest<GithubDirResponseType[]>(itermFileNamesRequestParams).then(
    async (response) =>
      await getItermThemeFiles(
        response.map((itermDirFile) => itermDirFile.name)
      )
  );

const requests = () =>
  Promise.all([
    getItermThemesHttpRequest(),
    httpRequest<WindowsTerminalThemeType[]>(customThemesParams),
    httpRequest<CreditType[]>(generatedCreditsRequestParams),
    httpRequest<CreditType[]>(manualCreditsRequestParams),
  ]);

export default requests;
