import { createI18n } from "vue-i18n";

// 中文语言包
const zh = {
  home: {
    heroTitle: "这里是您公司的主Slogan",
    heroSubtitle: "这里是您的副Slogan",
    searchTitle: "快速查询",
    aboutTitle: "关于我们",
    contactTitle: "联系我们",
  },
  navigation: {
    home: "首页",
    tracking: "货物追踪",
    service: "业务介绍",
    news: "资讯中心",
    about: "关于我们",
    login: "注册/登录",
  },
  tracking: {
    title: "货物追踪",
    placeholder: "请输入订单号",
    search: "查询",
    history: "历史记录",
    searchType: {
      order: "订单号查询",
      container: "箱号查询",
      bill: "提单号查询",
    },
    result: {
      title: "追踪结果",
      orderNumber: "订单号",
      status: "当前状态",
      estimatedDelivery: "预计送达时间",
    },
  },
  service: {
    title: "业务介绍",
    subtitle: "了解我们为您提供的专业物流解决方案",
    booking: "订舱服务",
    customs: "报关服务",
    warehouse: "仓储服务",
  },
  news: {
    title: "资讯中心",
    search: "搜索资讯关键词",
    dateRange: "时间范围",
    category: "分类",
    readMore: "查看详情",
    downloadPdf: "下载PDF",
  },
  about: {
    title: "关于我们",
    subtitle: "了解上海沃行信息技术有限公司的历程、愿景与价值观",
    company: "公司简介",
    history: "发展历程",
    culture: "企业文化",
    contact: "联系我们",
  },
  footer: {
    address: "地址",
    workingHours: "工作时间",
    privacy: "隐私政策",
    terms: "用户协议",
    copyright: "版权所有",
  },
};

// 英文语言包
const en = {
  home: {
    heroTitle: "Your company's main slogan",
    heroSubtitle: "Your secondary slogan",
    searchTitle: "Quick Search",
    aboutTitle: "About Us",
    contactTitle: "Contact Us",
  },
  navigation: {
    home: "Home",
    tracking: "Cargo Tracking",
    service: "Services",
    news: "News",
    about: "About Us",
    login: "Register/Login",
  },
  tracking: {
    title: "Cargo Tracking",
    placeholder: "Enter order number",
    search: "Search",
    history: "History",
    searchType: {
      order: "Order Number",
      container: "Container Number",
      bill: "Bill of Lading",
    },
    result: {
      title: "Tracking Result",
      orderNumber: "Order Number",
      status: "Current Status",
      estimatedDelivery: "Estimated Delivery",
    },
  },
  service: {
    title: "Our Services",
    subtitle: "Learn about our professional logistics solutions",
    booking: "Booking Service",
    customs: "Customs Service",
    warehouse: "Warehouse Service",
  },
  news: {
    title: "News Center",
    search: "Search keywords",
    dateRange: "Date Range",
    category: "Category",
    readMore: "Read More",
    downloadPdf: "Download PDF",
  },
  about: {
    title: "About Us",
    subtitle: "Learn about Shanghai Waltech Information Technology Co., Ltd.",
    company: "Company Profile",
    history: "History",
    culture: "Corporate Culture",
    contact: "Contact Us",
  },
  footer: {
    address: "Address",
    workingHours: "Working Hours",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    copyright: "All Rights Reserved",
  },
};

// 日文语言包
const jp = {
  home: {
    heroTitle: "会社のメインスローガン",
    heroSubtitle: "副スローガン",
    searchTitle: "クイック検索",
    aboutTitle: "会社概要",
    contactTitle: "お問い合わせ",
  },
  navigation: {
    home: "ホーム",
    tracking: "貨物追跡",
    service: "サービス紹介",
    news: "ニュース",
    about: "会社概要",
    login: "登録/ログイン",
  },
  tracking: {
    title: "貨物追跡",
    placeholder: "注文番号を入力",
    search: "検索",
    history: "履歴",
    searchType: {
      order: "注文番号",
      container: "コンテナ番号",
      bill: "B/L番号",
    },
    result: {
      title: "追跡結果",
      orderNumber: "注文番号",
      status: "現在のステータス",
      estimatedDelivery: "配達予定日",
    },
  },
  service: {
    title: "サービス紹介",
    subtitle: "プロフェッショナルな物流ソリューションについて",
    booking: "予約サービス",
    customs: "通関サービス",
    warehouse: "倉庫サービス",
  },
  news: {
    title: "ニュースセンター",
    search: "キーワード検索",
    dateRange: "日付範囲",
    category: "カテゴリ",
    readMore: "詳細を見る",
    downloadPdf: "PDFをダウンロード",
  },
  about: {
    title: "会社概要",
    subtitle: "上海沃行情報技術有限公司の歴史とビジョン",
    company: "会社プロフィール",
    history: "沿革",
    culture: "企業文化",
    contact: "お問い合わせ",
  },
  footer: {
    address: "住所",
    workingHours: "営業時間",
    privacy: "プライバシーポリシー",
    terms: "利用規約",
    copyright: "無断複写・転載を禁じます",
  },
};

const i18n = createI18n({
  legacy: false, // 使用Composition API
  locale: localStorage.getItem("preferredLanguage") || "zh",
  fallbackLocale: "zh",
  messages: {
    zh,
    en,
    jp,
  },
});

export default i18n;
