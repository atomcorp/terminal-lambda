import { getIsDark } from "../src/utils/utils";
import {
  setThemesWithMeta,
  getValidThemes,
  getUniqueThemes,
} from "../src/handleResponse";
import themes from "./themes-with-meta.json";
import {
  WindowsTerminalThemeType,
  WindowsTerminalThemeWithMetaType,
} from "../src/types";

describe("getIsDark should produce light or dark themes from hexes", () => {
  it("should produce the same isDark boolean result as the existing test data", () => {
    themes.forEach((theme) => {
      expect(getIsDark(theme.background)).toEqual(theme.meta.isDark);
    });
  });
});

describe("it should handle adding meta properly", () => {
  const theme3024Day = {
    name: "3024 Day",
    black: "#090300",
    red: "#db2d20",
    green: "#01a252",
    yellow: "#fded02",
    blue: "#01a0e4",
    purple: "#a16a94",
    cyan: "#b5e4f4",
    white: "#a5a2a2",
    brightBlack: "#5c5855",
    brightRed: "#e8bbd0",
    brightGreen: "#3a3432",
    brightYellow: "#4a4543",
    brightBlue: "#807d7c",
    brightPurple: "#d6d5d4",
    brightCyan: "#cdab53",
    brightWhite: "#f7f7f7",
    background: "#f7f7f7",
    foreground: "#4a4543",
    cursorColor: "#4a4543",
    selectionBackground: "#a5a2a2",
  };
  const themeGrass = {
    name: "Grass",
    black: "#000000",
    red: "#bb0000",
    green: "#00bb00",
    yellow: "#e7b000",
    blue: "#0000a3",
    purple: "#950062",
    cyan: "#00bbbb",
    white: "#bbbbbb",
    brightBlack: "#555555",
    brightRed: "#bb0000",
    brightGreen: "#00bb00",
    brightYellow: "#e7b000",
    brightBlue: "#0000bb",
    brightPurple: "#ff55ff",
    brightCyan: "#55ffff",
    brightWhite: "#ffffff",
    background: "#13773d",
    foreground: "#fff0a5",
    cursorColor: "#8c2800",
    selectionBackground: "#b64926",
  };
  const themeWarmNeon = {
    name: "WarmNeon",
    black: "#000000",
    red: "#e24346",
    green: "#39b13a",
    yellow: "#dae145",
    blue: "#4261c5",
    purple: "#f920fb",
    cyan: "#2abbd4",
    white: "#d0b8a3",
    brightBlack: "#fefcfc",
    brightRed: "#e97071",
    brightGreen: "#9cc090",
    brightYellow: "#ddda7a",
    brightBlue: "#7b91d6",
    brightPurple: "#f674ba",
    brightCyan: "#5ed1e5",
    brightWhite: "#d8c8bb",
    background: "#404040",
    foreground: "#afdab6",
    cursorColor: "#30ff24",
    selectionBackground: "#b0ad21",
  };
  const theme3024Night = {
    name: "3024 Night",
    black: "#090300",
    red: "#db2d20",
    green: "#01a252",
    yellow: "#fded02",
    blue: "#01a0e4",
    purple: "#a16a94",
    cyan: "#b5e4f4",
    white: "#a5a2a2",
    brightBlack: "#5c5855",
    brightRed: "#e8bbd0",
    brightGreen: "#3a3432",
    brightYellow: "#4a4543",
    brightBlue: "#807d7c",
    brightPurple: "#d6d5d4",
    brightCyan: "#cdab53",
    brightWhite: "#f7f7f7",
    background: "#090300",
    foreground: "#a5a2a2",
    cursorColor: "#a5a2a2",
    selectionBackground: "#4a4543",
  };
  const source3024 = {
    themeNames: ["3024 Day", "3024 Night"],
    sources: [
      {
        name: "0x3024",
        link: "https://github.com/0x3024",
      },
    ],
    notes:
      "The 3024 Day and 3024 Night themes were created by [0x3024](https://github.com/0x3024)",
  };
  const metaWarmNeon = {
    themeNames: ["WarmNeon"],
    sources: [
      { name: "PyCharm", link: "http://www.jetbrains.com/pycharm/" },
      { name: "firewut", link: "https://github.com/firewut" },
    ],
    notes: "A test string.",
  };
  const themeWarmNeonWithMeta =
    themeWarmNeon as WindowsTerminalThemeWithMetaType;
  themeWarmNeonWithMeta.meta = {
    isDark: true,
    credits: [
      { name: "PyCharm", link: "http://www.jetbrains.com/pycharm/" },
      { name: "firewut", link: "https://github.com/firewut" },
    ],
  };
  const theme3024DayWithMeta = theme3024Day as WindowsTerminalThemeWithMetaType;
  theme3024DayWithMeta.meta = {
    isDark: false,
    credits: [{ name: "0x3024", link: "https://github.com/0x3024" }],
  };
  const theme3024NightWithMeta =
    theme3024Night as WindowsTerminalThemeWithMetaType;
  theme3024NightWithMeta.meta = {
    isDark: true,
    credits: [{ name: "0x3024", link: "https://github.com/0x3024" }],
  };
  const themeGrassWithMeta = themeGrass as WindowsTerminalThemeWithMetaType;
  themeGrassWithMeta.meta = {
    isDark: true,
    credits: null,
  };
  const themePeppermint = {
    name: "Peppermint",
    black: "#353535",
    red: "#e74669",
    green: "#89d287",
    yellow: "#dab853",
    blue: "#449fd0",
    purple: "#da62dc",
    cyan: "#65aaaf",
    white: "#b4b4b4",
    brightBlack: "#535353",
    brightRed: "#e4859b",
    brightGreen: "#a3cca2",
    brightYellow: "#e1e487",
    brightBlue: "#6fbce2",
    brightPurple: "#e586e7",
    brightCyan: "#96dcdb",
    brightWhite: "#dfdfdf",
    background: "#000000",
    foreground: "#c8c8c8",
  };

  it("should add credit sources to credit themes", () => {
    const themes = [theme3024Day, themeGrass];
    const credits = [source3024];
    expect(setThemesWithMeta(themes, credits)).toEqual([
      theme3024DayWithMeta,
      themeGrassWithMeta,
    ]);
  });
  it("should add sources with multiple credits to multiple themes", () => {
    const themes = [theme3024Day, themeGrass, theme3024Night];
    const credits = [source3024];
    expect(setThemesWithMeta(themes, credits)).toEqual([
      theme3024DayWithMeta,
      themeGrassWithMeta,
      theme3024NightWithMeta,
    ]);
  });
  it("should validate themes so they always have the essential keys", () => {
    const validThemes = [
      theme3024Day,
      themeGrass,
      theme3024Night,
      themePeppermint,
    ];
    expect(getValidThemes(validThemes)).toEqual(validThemes);
    const invalidTheme = {
      name: "Invalid theme",
    } as WindowsTerminalThemeType;
    const validAndInvalidThemes = [
      theme3024Day,
      themeGrass,
      invalidTheme,
      theme3024Night,
      themePeppermint,
    ];
    expect(getValidThemes(validAndInvalidThemes)).toEqual(validThemes);
  });
  it("should test multiple sources get applied to theme", () => {
    const themes = [theme3024Day, themeGrass, theme3024Night, themeWarmNeon];
    const credits = [source3024, metaWarmNeon];
    expect(setThemesWithMeta(themes, credits)).toEqual([
      theme3024DayWithMeta,
      themeGrassWithMeta,
      theme3024NightWithMeta,
      themeWarmNeonWithMeta,
    ]);
  });
  it("should stop duplicate themes from the different sources", () => {
    const themesSourceA = [theme3024Day, theme3024Night, themeWarmNeon];
    const themessourceB = [themeGrass, theme3024Night];
    expect(getUniqueThemes(themesSourceA, themessourceB)).toEqual([
      theme3024Day,
      theme3024Night,
      themeWarmNeon,
      themeGrass,
    ]);
  });
});
