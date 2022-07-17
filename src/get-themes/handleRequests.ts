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
} from "../types";

const itermFileNamesRequestParams = getParams(ITERM_TERMINAL_THEMES_PATH);
const customThemesParams = getParams(CUSTOM_THEMES_PATH);
const generatedCreditsRequestParams = getParams(GENERATED_CREDITS_PATH);
const manualCreditsRequestParams = getParams(MANUAL_CREDITS_PATH);

const requests = (githubToken: string) => {
  const httpRequestWithToken = httpRequest(githubToken);
  return Promise.all([
    httpRequestWithToken<GithubDirResponseType[]>(
      itermFileNamesRequestParams
    ).then(
      async (response) =>
        await Promise.all(
          response
            .map((itermDirFile) => itermDirFile.name)
            .slice(0, 5)
            .map((fileName, i) =>
              httpRequestWithToken<WindowsTerminalThemeType>(
                getParams(
                  `${ITERM_TERMINAL_THEMES_PATH}/${encodeURI(fileName)}`
                )
              )
            )
        )
    ),
    httpRequestWithToken<WindowsTerminalThemeType[]>(customThemesParams),
    httpRequestWithToken<CreditType[]>(generatedCreditsRequestParams),
    httpRequestWithToken<CreditType[]>(manualCreditsRequestParams),
  ]);
};

export default requests;
