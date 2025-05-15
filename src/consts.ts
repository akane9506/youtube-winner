type AvailableLanguagesType = "en" | "zh";
type AvailableThemesType = "light" | "dark";
type LanguageMenuType = { key: AvailableLanguagesType; text: string };

const THEME_KEY = "youtube_winner_theme";
const LANGUAGE_KEY = "youtube_winner_language";

const DRAW_DELAY = 1000;
const DEFAULT_COMMENTS_PER_PAGE = 12;
const COMMENTS_NUM_BOUNDS = [6, 30];

const LANGUAGE_MENU: LanguageMenuType[] = [
  { key: "en", text: "EN" },
  { key: "zh", text: "中文" },
];

const CONTENTS = {
  search: {
    en: {
      title: "Search Video Comments",
      inputLabel: "YouTube video url or id",
      button: "Search",
      buttonLoading: "Searching...",
      instruction:
        "Instruction: For video url https://www.youtube.com/watch?v=abcd1234, both of the following inputs are accepted:",
      examples: ["provide full url", "provide video id only"],
      exampleInputs: ["https://www.youtube.com/watch?v=abcd1234", "abcd1234"],
      workflowTitle: "Lottery Workflow",
      workflow: ["input video id", "select comments", "fetch data", "draw winners"],
      filters: ["Date Range"],
      numComments: "per page",
    },
    zh: {
      title: "搜索视频评论",
      inputLabel: "YouTube 视频链接或 id",
      button: "开始搜索",
      buttonLoading: "搜索中...",
      instruction:
        "输入说明: 对于视频链接 https://www.youtube.com/watch?v=abcd1234, 以下两种输入都可以:",
      examples: ["输入完整视频链接", "仅输入视频 id"],
      exampleInputs: ["https://www.youtube.com/watch?v=abcd1234", "abcd1234"],
      workflowTitle: "抽奖流程",
      workflow: ["输入视频 id", "选择评论", "获取数据", "抽奖"],
      numComments: "每页",
    },
  },
  sidebar: {
    en: ["Video Info", "Filters"],
    zh: ["视频信息", "筛选"],
  },
  filters: {
    zh: ["日期范围", "包含关键字", "排除重复用户", "开始抽奖"],
    en: ["Date Range", "Include Keywords", "Exclude Duplicated Users", "Start Draw"],
  },
  tab: {
    en: ["Comments", "Users"],
    zh: ["评论", "用户"],
  },
  modal: {
    en: {
      tiers: ["Gold", "Silver", "Bronze"],
      winners: "Winners",
      actions: ["Cancel", "Draw", "Drawing..."],
      tabs: ["By Tiers", "By Winners"],
    },
    zh: {
      tiers: ["金奖", "银奖", "铜奖"],
      winners: "获奖者",
      actions: ["取消", "抽奖", "抽奖中..."],
      tabs: ["按奖项", "按获奖者"],
    },
  },
  header: {},
};

export {
  THEME_KEY,
  LANGUAGE_KEY,
  LANGUAGE_MENU,
  CONTENTS,
  DRAW_DELAY,
  DEFAULT_COMMENTS_PER_PAGE,
  COMMENTS_NUM_BOUNDS,
  // types
  type AvailableLanguagesType,
  type AvailableThemesType,
};
