type ThemeBaseData = {
  themeId: string;
  name: string;
};

export type ThemeListItem = ThemeBaseData & {
  image: string;
};

export type ThemeInfo = ThemeBaseData & {
  title: string;
  description: string;
  backgroundColor: string;
};
