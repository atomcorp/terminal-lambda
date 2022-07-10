export type WindowsTerminalThemeType = {
  name: string;
  black: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  purple: string;
  cyan: string;
  white: string;
  brightBlack: string;
  brightRed: string;
  brightGreen: string;
  brightYellow: string;
  brightBlue: string;
  brightPurple: string;
  brightCyan: string;
  brightWhite: string;
  background: string;
  foreground: string;
  cursorColor?: string;
  selectionBackground?: string;
};

export type WindowsTerminalThemeWithMetaType = WindowsTerminalThemeType & {
  meta: ThemeMeta;
};

type CreditSource = {
  name: string;
  link: string;
};

export type CreditType = {
  themeNames: string[];
  sources: CreditSource[];
  notes?: string;
};

type ThemeMeta = { isDark: boolean; credits: creditType[] | null };

export type GithubDirResponseType = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
};

export type RgbType = [number, number, number];
