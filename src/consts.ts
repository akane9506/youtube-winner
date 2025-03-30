type AvailableLanguagesType = "en" | "zh";
type AvailableThemesType = "light" | "dark";
type LanguageMenuType = { key: AvailableLanguagesType; text: string };

const THEME_KEY = "youtube_draw_theme";
const LANGUAGE_KEY = "youtube_draw_language";

const LANGUAGE_MENU: LanguageMenuType[] = [
  { key: "en", text: "EN" },
  { key: "zh", text: "中文" },
];

const CONTENTS = {
  search: {
    en: {
      title: "Search Video Comments and Likes",
      inputLabel: "YouTube video url or id",
      button: "Search",
      instruction:
        "Instruction: For video url https://www.youtube.com/watch?v=abcd1234, both of the following inputs are accepted:",
      examples: ["provide full url", "provide video id only"],
      exampleInputs: ["https://www.youtube.com/watch?v=abcd1234", "abcd1234"],
    },
    zh: {
      title: "搜索视频评论与点赞",
      inputLabel: "YouTube 视频链接或 id",
      button: "开始搜索",
      instruction:
        "输入说明: 对于视频链接 https://www.youtube.com/watch?v=abcd1234, 以下两种输入都可以:",
      examples: ["输入完整视频链接", "仅输入视频 id"],
      exampleInputs: ["https://www.youtube.com/watch?v=abcd1234", "abcd1234"],
    },
  },
  header: {},
};

export {
  THEME_KEY,
  LANGUAGE_KEY,
  LANGUAGE_MENU,
  CONTENTS,
  type AvailableLanguagesType,
  type AvailableThemesType,
};
