import { CreditType, WindowsTerminalThemeType } from "./types";
import { getIsDark } from "./utils/utils";

type PropTypes = [
  itermThemes: WindowsTerminalThemeType[],
  customThemes: WindowsTerminalThemeType[],
  generatedCredits: CreditType[],
  manualCredits: CreditType[]
];

const getUniqueThemes = (
  itermThemes: WindowsTerminalThemeType[],
  customThemes: WindowsTerminalThemeType[]
) => [
  ...itermThemes,
  ...customThemes.filter(
    (customTheme) =>
      !itermThemes
        .map((itermTheme) => itermTheme.name)
        .includes(customTheme.name)
  ),
];

const setThemesWithMeta = (
  themes: WindowsTerminalThemeType[],
  credits: CreditType[]
) => {
  return themes.map((theme) => {
    const themeCredit = credits.find((credit) =>
      credit.themeNames.includes(theme.name)
    );
    return {
      ...theme,
      meta: {
        isDark: getIsDark(theme.background),
        credits: themeCredit !== undefined ? themeCredit.sources : null,
      },
    };
  });
};

const handleResponse = (props: PropTypes) => {
  const uniqueThemes = getUniqueThemes(props[0], props[1]);
  const mergedCredits = [...props[2], ...props[3]];
  const themesWithMeta = setThemesWithMeta(uniqueThemes, mergedCredits);
  return themesWithMeta.sort((a, b) =>
    a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
  );
};

export default handleResponse;
