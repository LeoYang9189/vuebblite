import { createI18n } from "vue-i18n";
import { getStoredLanguage, DEFAULT_LANGUAGE } from '@/utils/languageUtils';

// 中文语言包
const zh = {
  common: {
    submit: "提交",
    cancel: "取消",
    confirm: "确认",
    delete: "删除",
    edit: "编辑",
    save: "保存",
    search: "搜索",
    reset: "重置",
    loading: "加载中...",
    noData: "暂无数据",
    success: "操作成功",
    failed: "操作失败",
    pleaseInput: "请输入",
    pleaseSelect: "请选择",
    all: "全部",
    more: "更多",
    yes: "是",
    no: "否",
    enable: "启用",
    disable: "禁用",
    status: "状态",
    actions: "操作",
    remark: "备注",
    createTime: "创建时间",
    updateTime: "更新时间",
    languageChanged: "语言已更改",
    phone: "客服电话",
    email: "邮箱",
  },
  auth: {
    login: "登录",
    register: "注册",
    logout: "退出登录",
    forgotPassword: "忘记密码",
    rememberMe: "记住我",
    loginWith: "使用{0}登录",
    registerWith: "使用{0}注册",
    password: "密码",
    confirmPassword: "确认密码",
    verifyCode: "验证码",
    getVerifyCode: "获取验证码",
    phoneOrEmail: "手机号/邮箱",
    agreeTerms: "我已阅读并同意",
    terms: "用户协议",
    hasAccount: "已有账号？",
    noAccount: "没有账号？",
    phoneOnlyMainland: "仅支持中国大陆的手机号",
    joinExistingCompany: "所在企业已入驻，直接加入企业",
    enterCompanyCode: "请输入企业提供的企业码",
    companyCode: "企业码",
    pleaseAgreeTerms: "请阅读并接受用户协议",
    verifyCodeSent: "验证码已发送",
    verifyCodeSendFailed: "验证码发送失败",
    registerSuccess: "注册成功",
    registerFailed: "注册失败",
    logoutSuccess: "已成功退出登录",
  },
  home: {
    heroTitle: "这里是您公司的主Slogan",
    heroSubtitle: "这里是您的副Slogan，示例文字可以多一点",
    notice: "注意注意！轻量版没有下面搜索框里的运价查询！！其他没差别！！",
    searchTitle: "快速查询",
    aboutTitle: "关于我们",
    contactTitle: "联系我们",
    services: {
      title: "我们的服务",
      wechat: {
        official: "微信公众号",
        miniprogram: "微信小程序",
        qrcode: "二维码"
      },
      customerService: "在线客服",
      booking: {
        title: "订舱服务",
        description: "订舱服务（FCL）及拼箱（LCL）国际运输，我们将提供实时的舱位，并为您跟踪所有的物流动态，并安排最佳运输途径。"
      },
      customs: {
        title: "通关检查",
        description: "凭借广泛深厚的专业水平，以及久经验证的丰富经验，全方位为进出口货物提供保障，通过行政许可程序，确保每一次货物运输都无忧。"
      },
      warehouse: {
        title: "仓库配送",
        description: "我们的仓储网点广泛，在所有重要港口城市都设有仓储网点，不仅如此，同时对于客户的临时需求及时响应，全力升级服务品质，不负每一份信任。"
      }
    }
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
    progress: {
      booking: "订舱 (订舱完成)",
      bl: "提单 (未制发)",
      departure: "离港 (未开始)",
      arrival: "已到港 (未开始)",
    },
    result: {
      title: "追踪结果",
      orderNumber: "订单号",
      status: "当前状态",
      estimatedDelivery: "预计送达时间",
      basicInfo: "基本信息",
      vesselInfo: "船舶信息",
      vesselName: "船名 / 航次",
      portInfo: {
        departure: "起运港",
        destination: "目的港",
        etd: "预计离港时间",
        eta: "预计到港时间",
      },
      containerInfo: {
        type: "箱型",
        number: "箱号",
        seal: "封号",
      },
      cargoInfo: {
        reference: "客户参考号",
        mbl: "MBL No.",
        hbl: "HBL No.",
        pcs: "件数",
        cbm: "体积",
      },
      detailInfo: "详细信息",
      attachments: "附件信息",
      noAttachments: "暂无附件",
    },
  },
  service: {
    title: "业务介绍",
    subtitle: "了解我们的专业物流解决方案",
    overview: "服务概述",
    features: "服务特点",
    process: "服务流程",
    schedule: {
      title: "船期查询",
      byPort: "按港口",
      byVessel: "按船名",
      departurePort: "请输入起运港",
      destinationPort: "请输入目的港"
    },
    price: {
      title: "运价查询",
      departurePort: "请输入起运港",
      destinationPort: "请输入目的港",
      containerInfo: "请输入箱型箱量"
    },
    booking: {
      title: "订舱服务",
      subtitle: "专业高效的货物订舱解决方案，覆盖全球主要港口",
      description: "订舱服务（FCL）及拼箱（LCL）国际运输，我们将提供实时的舱位，并为您跟踪所有的物流动态，并安排最佳运输途径。"
    },
    customs: {
      title: "通关检查",
      subtitle: "专业的通关解决方案，简化您的进出口流程",
      description: "凭借广泛深厚的专业水平，以及久经验证的丰富经验，全方位为进出口货物提供保障，通过行政许可程序，确保每一次货物运输都无忧。"
    },
    warehouse: {
      title: "仓库配送",
      subtitle: "安全可靠的仓储解决方案，满足您的全球仓储需求",
      description: "我们的仓储网点广泛，在所有重要港口城市都设有仓储网点，不仅如此，同时对于客户的临时需求及时响应，全力升级服务品质，不负每一份信任。"
    },
    strength: {
      title: "我们的实力展示",
      facility: {
        title: "现代化仓储设施",
        desc: "我们拥有超过10万平方米的现代化仓储设施，配备先进的货架系统和自动化设备，确保高效的仓储管理。"
      },
      network: {
        title: "全球物流网络",
        desc: "我们与全球超过100个国家和地区建立了紧密的物流合作关系，能够为客户提供全方位的国际物流服务。"
      },
      tech: {
        title: "先进技术系统",
        desc: "我们采用最新的物流管理系统和追踪技术，实现全程可视化管理，为客户提供实时的货物跟踪服务。"
      },
      team: {
        title: "专业服务团队",
        desc: "我们拥有一支经验丰富、专业高效的物流服务团队，能够为客户提供专业的咨询和定制化的物流解决方案。"
      }
    },
    inquiry: {
      title: "需要更多业务咨询？",
      desc: "我们的专业团队随时为您提供详细的业务咨询和定制化解决方案，帮助您解决国际贸易和物流中的各种挑战。",
      button: "联系我们"
    }
  },
  news: {
    title: "资讯中心",
    search: "搜索资讯关键词",
    dateRange: "时间范围",
    category: "分类",
    readMore: "查看详情",
    downloadPdf: "下载PDF",
    imageAlt: "新闻图片",
    categories: {
      all: "全部",
      company: "公司新闻",
      industry: "行业动态",
      policy: "政策解读",
    },
    articles: {
      article1: {
        title: "[货代物流] 非凡十年！直挂云帆济沧海",
        summary: "关心海洋、认识海洋、经略海洋！中国经济的腾飞，与海洋密不可分。"
      },
      article2: {
        title: "[系统更新通知] Cargoware B2B系统资讯模块上线啦",
        summary: "Cargoware B2B系统已更新资讯中心、离线订单查看等功能，欢迎体验！"
      },
      article3: {
        title: "[货代物流] 物流货代汇率跌至近20年低位",
        summary: "欧元也到20年低位了!! 欧元对美元汇率跌至近20年低位"
      },
      article4: {
        title: "[航运动态] 亚洲至美西航线运价双周上涨11.2%",
        summary: "美国西海岸港口拥堵情况继续改善，但随着旺季到来，航运需求有所回升"
      },
      article5: {
        title: "[政策解读] 中国出口管制新规对航运业影响分析",
        summary: "最新发布的出口管制新规将对特定货物的运输产生重要影响，企业需提前准备"
      },
      article6: {
        title: "[行业分析] 集装箱短缺问题持续，何时能够缓解？",
        summary: "全球集装箱短缺问题已持续一年多，本文分析短缺原因及未来缓解时间"
      },
      article7: {
        title: "[货主须知] 如何降低海运延误风险的五大策略",
        summary: "在当前全球供应链不稳定的情况下，货主可采取哪些措施降低延误风险"
      },
      article8: {
        title: "[公司新闻] 我司成功中标某大型国企物流服务项目",
        summary: "经过激烈竞争，我司凭借优质服务和创新解决方案成功中标"
      },
      article9: {
        title: "[技术革新] 区块链技术如何改变传统航运单证流程",
        summary: "区块链技术在航运单证处理中的应用正日益广泛，将大幅提升效率"
      },
      article10: {
        title: "2023年航运业发展趋势分析报告",
        summary: "深入分析2023年全球航运业发展趋势，为企业决策提供参考"
      },
      article11: {
        title: "上海港口集装箱吞吐量再创新高",
        summary: "上海港口2023年集装箱吞吐量突破历史新高，展现强劲发展势头"
      },
      article12: {
        title: "航运业环保新规实施，企业如何应对？",
        summary: "解读最新航运业环保法规，为企业合规运营提供建议"
      },
      article13: {
        title: "日本航线最新运价调整通知",
        summary: "关于中日航线运价调整的最新通知，请相关客户注意"
      },
      article14: {
        title: "全球供应链最新动态与展望",
        summary: "分析当前全球供应链现状，预测未来发展趋势"
      },
      article15: {
        title: "沃行航运荣获2023年度优质服务供应商奖项",
        summary: "公司凭借优质的服务和良好的口碑获得行业认可"
      }
    },
    detail: {
      meta: {
        time: "时间",
        author: "作者",
        source: "来源",
        views: "浏览量"
      },
      hotNews: "热点资讯",
      recommendedNews: "推荐新闻",
      viewMore: "查看更多"
    }
  },
  about: {
    title: "关于我们",
    subtitle: "了解上海沃行信息技术有限公司的历程、愿景与价值观",
    company: "公司简介",
    history: "发展历程",
    culture: "企业文化",
    contact: "联系我们",
    companyAddress: "上海市虹口区周家嘴路699号中垠广场A座9F",
    partners: "合作伙伴",
    partnerLogo: "合作伙伴logo",
    companyProfile: {
      title: "公司简介",
      content: "上海沃行航运有限公司，已正式获中国交通运输部认可，荣膺无船承运人（NVOCC）资质。凭借专业与实力，公司以'上海沃行'之名广为人知，且作为上海航运交易所(Shanghai Shipping Exchange)的正式会员，我们持续专注于海运、空运领域，深耕中国至日本市场，业务规模持续扩展，服务品质稳步提升。",
      vision: "展望未来，我们将坚守初心，致力于优化货物运输流程，不断提升运输效率与服务质量，为全球客户打造更卓越、更高效的物流体验。"
    },
    companyCulture: {
      vision: "企业愿景",
      mission: "企业使命",
      values: "核心价值观",
      visionContent: "成为全球领先的综合物流服务提供商，以创新科技重塑物流行业未来。",
      missionContent: "以卓越的物流服务连接世界，让全球贸易更便捷、更高效。",
      valuesContent: "诚信为本、客户至上、创新驱动、协作共赢、追求卓越。"
    },
    stats: {
      years: "年+",
      experience: "行业经验",
      team: "专业团队",
      clients: "合作客户",
      satisfaction: "客户满意度"
    },
    timeline: {
      "2012": {
        title: "公司成立",
        description: "上海沃行航运有限公司在上海成立，开始提供基础的物流服务。"
      },
      "2015": {
        title: "业务扩展",
        description: "获得无船承运人(NVOCC)资质，业务范围扩展至全国主要港口。"
      },
      "2018": {
        title: "数字化转型",
        description: "引入先进物流管理系统，开启公司数字化转型之路。"
      },
      "2020": {
        title: "全球化布局",
        description: "建立全球物流服务网络，与超过50个国家的物流合作伙伴建立稳定关系。"
      },
      "2023": {
        title: "技术创新",
        description: "推出B2B物流服务平台，为客户提供一站式在线物流解决方案。"
      }
    }
  },
  footer: {
    address: "地址",
    workingHours: "工作时间",
    workingTime: "周一至周五 9:00-18:00",
    privacy: "隐私政策",
    terms: "用户协议",
    cookie: "Cookie政策",
    security: "信息安全",
    copyright: "All Rights Reserved",
    companyName: "版权所有:上海沃行信息技术有限公司",
    icp: "沪ICP备07034486号",
    description: "选择 WallTech B2B 是您业务合作的明智之选。我们致力于为您提供最优质的B2B服务体验。",
  },
  dashboard: {
    title: "工作台",
    profile: "个人资料",
    company: "企业信息",
    orders: "订单管理",
    finance: "财务管理",
    system: "系统管理",
    message: "站内信",
    companyVerification: "企业认证",
    myCompany: "我的企业",
    companyAccount: "企业账户",
    forecastOrders: "预报订单",
    billList: "账单列表",
    foreignBill: "国外账单",
    invoiceList: "发票列表",
    enterpriseManagement: "企业管理",
    verifiedCompanies: "已认证企业",
    pendingCompanies: "待审核企业",
    enterpriseAccounts: "企业账号",
    operationAccounts: "运营账号",
    permissionManagement: "权限管理",
    customConfig: "个性化配置",
    operationManagement: "运营管理",
    newsCategory: "资讯类别",
    newsManagement: "资讯管理",
    inbox: "收件箱",
    messageSettings: "消息设置",
  },
};

// 英文语言包
const en = {
  common: {
    submit: "Submit",
    cancel: "Cancel",
    confirm: "Confirm",
    delete: "Delete",
    edit: "Edit",
    save: "Save",
    search: "Search",
    reset: "Reset",
    loading: "Loading...",
    noData: "No Data",
    success: "Success",
    failed: "Failed",
    pleaseInput: "Please input",
    pleaseSelect: "Please select",
    all: "All",
    more: "More",
    yes: "Yes",
    no: "No",
    enable: "Enable",
    disable: "Disable",
    status: "Status",
    actions: "Actions",
    remark: "Remark",
    createTime: "Create Time",
    updateTime: "Update Time",
    languageChanged: "Language changed",
    phone: "Customer Service",
    email: "Email",
  },
  auth: {
    login: "Login",
    register: "Register",
    logout: "Logout",
    forgotPassword: "Forgot Password",
    rememberMe: "Remember Me",
    loginWith: "Login with {0}",
    registerWith: "Register with {0}",
    password: "Password",
    confirmPassword: "Confirm Password",
    verifyCode: "Verification Code",
    getVerifyCode: "Get Code",
    phoneOrEmail: "Phone/Email",
    agreeTerms: "I have read and agree to the",
    terms: "Terms of Service",
    hasAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    phoneOnlyMainland: "Only mainland China phone numbers are supported",
    joinExistingCompany: "Join existing company directly",
    enterCompanyCode: "Please enter company code",
    companyCode: "Company Code",
    pleaseAgreeTerms: "Please read and accept the terms of service",
    verifyCodeSent: "Verification code sent",
    verifyCodeSendFailed: "Failed to send verification code",
    registerSuccess: "Registration successful",
    registerFailed: "Registration failed",
    logoutSuccess: "Successfully logged out",
  },
  home: {
    heroTitle: "Your Company's Main Slogan",
    heroSubtitle: "Your Secondary Slogan with More Example Text",
    notice: "Note: The lite version does not include freight inquiry in the search box below! Other features remain the same!",
    searchTitle: "Quick Search",
    aboutTitle: "About Us",
    contactTitle: "Contact Us",
    services: {
      title: "Our Services",
      wechat: {
        official: "WeChat Official Account",
        miniprogram: "WeChat Mini Program",
        qrcode: "QR Code"
      },
      customerService: "Online Support",
      booking: {
        title: "Booking Service",
        description: "Booking service (FCL) and Less Container Load (LCL) international transportation. We provide real-time space availability and track all logistics updates while arranging the optimal transportation route."
      },
      customs: {
        title: "Customs Clearance",
        description: "With extensive professional expertise and proven experience, we provide comprehensive protection for import and export goods, ensuring worry-free cargo transportation through administrative licensing procedures."
      },
      warehouse: {
        title: "Warehousing & Distribution",
        description: "Our warehousing network is extensive, with storage facilities in all major port cities. Moreover, we respond promptly to customers' temporary needs and continuously upgrade our service quality to honor every trust placed in us."
      }
    }
  },
  navigation: {
    home: "Home",
    tracking: "Cargo Tracking",
    service: "Services",
    news: "News",
    about: "About Us",
    login: "Login/Register",
  },
  tracking: {
    title: "Cargo Tracking",
    placeholder: "Enter tracking number",
    search: "Search",
    history: "History",
    searchType: {
      order: "Order Number",
      container: "Container Number",
      bill: "Bill of Lading",
    },
    progress: {
      booking: "Booking (Completed)",
      bl: "Bill of Lading (Not Issued)",
      departure: "Departure (Not Started)",
      arrival: "Arrival (Not Started)",
    },
    result: {
      title: "Tracking Result",
      orderNumber: "Order Number",
      status: "Current Status",
      estimatedDelivery: "Estimated Delivery",
      basicInfo: "Basic Information",
      vesselInfo: "Vessel Information",
      vesselName: "Vessel Name / Voyage",
      portInfo: {
        departure: "Port of Loading",
        destination: "Port of Discharge",
        etd: "ETD",
        eta: "ETA",
      },
      containerInfo: {
        type: "Container Type",
        number: "Container Number",
        seal: "Seal Number",
      },
      cargoInfo: {
        reference: "Customer Reference",
        mbl: "MBL No.",
        hbl: "HBL No.",
        pcs: "Pieces",
        cbm: "Volume",
      },
      detailInfo: "Detailed Information",
      attachments: "Attachments",
      noAttachments: "No attachments",
    },
  },
  service: {
    title: "Services",
    subtitle: "Learn about our professional logistics solutions",
    overview: "Service Overview",
    features: "Service Features",
    process: "Service Process",
    schedule: {
      title: "Schedule Query",
      byPort: "By Port",
      byVessel: "By Vessel",
      departurePort: "Enter departure port",
      destinationPort: "Enter destination port"
    },
    price: {
      title: "Price Query",
      departurePort: "Enter departure port",
      destinationPort: "Enter destination port",
      containerInfo: "Enter container type and quantity"
    },
    booking: {
      title: "Booking Service",
      subtitle: "Professional and efficient cargo booking solutions covering major global ports",
      description: "Booking service (FCL) and Less Container Load (LCL) international transportation. We provide real-time space availability and track all logistics updates while arranging the optimal transportation route."
    },
    customs: {
      title: "Customs Clearance",
      subtitle: "Professional customs clearance solutions simplifying your import/export process",
      description: "With extensive professional expertise and proven experience, we provide comprehensive protection for import and export goods, ensuring worry-free cargo transportation through administrative licensing procedures."
    },
    warehouse: {
      title: "Warehousing & Distribution",
      subtitle: "Safe and reliable warehousing solutions meeting your global storage needs",
      description: "Our warehousing network is extensive, with storage facilities in all major port cities. Moreover, we respond promptly to customers' temporary needs and continuously upgrade our service quality to honor every trust placed in us."
    },
    strength: {
      title: "Our Strengths",
      facility: {
        title: "Modern Warehousing Facilities",
        desc: "We have over 100,000 square meters of modern warehousing facilities equipped with advanced racking systems and automated equipment to ensure efficient warehousing management."
      },
      network: {
        title: "Global Logistics Network",
        desc: "We have established close logistics partnerships with over 100 countries and regions worldwide, enabling us to provide comprehensive international logistics services."
      },
      tech: {
        title: "Advanced Technology Systems",
        desc: "We adopt the latest logistics management systems and tracking technologies to achieve full-process visualization management and provide real-time cargo tracking services."
      },
      team: {
        title: "Professional Service Team",
        desc: "We have an experienced and professional logistics service team that can provide professional consulting and customized logistics solutions."
      }
    },
    inquiry: {
      title: "Need More Business Consultation?",
      desc: "Our professional team is always ready to provide detailed business consultation and customized solutions to help you solve various challenges in international trade and logistics.",
      button: "Contact Us"
    }
  },
  news: {
    title: "News Center",
    search: "Search news keywords",
    dateRange: "Date Range",
    category: "Category",
    readMore: "Read More",
    downloadPdf: "Download PDF",
    imageAlt: "News Image",
    categories: {
      all: "All",
      company: "Company News",
      industry: "Industry Updates",
      policy: "Policy Interpretation",
    },
    articles: {
      article1: {
        title: "[Freight Forwarding] A Decade of Excellence: Setting Sail for Success",
        summary: "Care for the ocean, understand the ocean, manage the ocean! China's economic takeoff is inseparable from the ocean"
      },
      article2: {
        title: "[System Update] Cargoware B2B System News Module is Now Live",
        summary: "Cargoware B2B system has updated with news center, offline order viewing and other features. Welcome to try!"
      },
      article3: {
        title: "[Freight Forwarding] Logistics Exchange Rate Hits 20-Year Low",
        summary: "Euro also hits 20-year low!! EUR/USD exchange rate falls to near 20-year low"
      },
      article4: {
        title: "[Shipping Update] Asia-US West Coast Freight Rate Up 11.2% Biweekly",
        summary: "US West Coast port congestion continues to improve, but shipping demand rises as peak season approaches"
      },
      article5: {
        title: "[Policy Analysis] Impact of China's New Export Control Regulations on Shipping Industry",
        summary: "The newly released export control regulations will have significant impact on specific cargo transportation, businesses need to prepare in advance"
      },
      article6: {
        title: "[Industry Analysis] Container Shortage Continues: When Will It Ease?",
        summary: "Global container shortage has lasted for over a year, this article analyzes the causes and future relief timeline"
      },
      article7: {
        title: "[Shipper Guide] Five Strategies to Reduce Maritime Transport Delay Risk",
        summary: "What measures can shippers take to reduce delay risks in current unstable global supply chain"
      },
      article8: {
        title: "[Company News] Successfully Won Large State-owned Enterprise Logistics Service Project",
        summary: "After fierce competition, we won the bid with quality service and innovative solutions"
      },
      article9: {
        title: "[Tech Innovation] How Blockchain Technology Changes Traditional Shipping Documentation",
        summary: "Blockchain technology application in shipping documentation processing is increasingly widespread, will greatly improve efficiency"
      },
      article10: {
        title: "2023 Shipping Industry Development Trend Analysis Report",
        summary: "In-depth analysis of global shipping industry development trends in 2023"
      },
      article11: {
        title: "Shanghai Port Container Throughput Hits New Record",
        summary: "Shanghai Port's container throughput in 2023 breaks historical record, showing strong momentum"
      },
      article12: {
        title: "How to Respond to New Environmental Regulations in Shipping Industry?",
        summary: "Interpreting latest environmental regulations and providing compliance suggestions"
      },
      article13: {
        title: "Japan Route Latest Freight Rate Adjustment Notice",
        summary: "Latest notice regarding freight rate adjustments on China-Japan routes"
      },
      article14: {
        title: "Global Supply Chain Latest Updates and Outlook",
        summary: "Analysis of current global supply chain status and future trends"
      },
      article15: {
        title: "Waltech Shipping Wins 2023 Quality Service Provider Award",
        summary: "Company recognized for excellent service and reputation"
      }
    },
    detail: {
      meta: {
        time: "Time",
        author: "Author",
        source: "Source",
        views: "Views"
      },
      hotNews: "Hot News",
      recommendedNews: "Recommended News",
      viewMore: "View More"
    }
  },
  about: {
    title: "About Us",
    subtitle: "Learn about Shanghai Waltech Information Technology Co., Ltd.",
    company: "Company Profile",
    history: "History",
    culture: "Corporate Culture",
    contact: "Contact Us",
    companyAddress: "9F, Building A, Zhongyin Plaza, 699 Zhoujiazui Road, Hongkou District, Shanghai",
    partners: "Partners",
    partnerLogo: "Partner Logo",
    companyProfile: {
      title: "Company Profile",
      content: "Shanghai Waltech Shipping Co., Ltd. has been officially recognized by China's Ministry of Transport as an NVOCC. With professional expertise and strength, the company is widely known as 'Shanghai Waltech' and as an official member of the Shanghai Shipping Exchange, we continue to focus on sea and air transportation, deeply cultivating the China-Japan market, continuously expanding business scale and steadily improving service quality.",
      vision: "Looking ahead, we will stay true to our original aspiration, committed to optimizing cargo transportation processes, continuously improving transportation efficiency and service quality, creating a more excellent and efficient logistics experience for global customers."
    },
    companyCulture: {
      vision: "Vision",
      mission: "Mission",
      values: "Core Values",
      visionContent: "To become a leading global integrated logistics service provider and reshape the future of the logistics industry with innovative technology.",
      missionContent: "Connecting the world with excellent logistics services, making global trade more convenient and efficient.",
      valuesContent: "Integrity, Customer First, Innovation Driven, Win-win Cooperation, Pursuit of Excellence."
    },
    stats: {
      years: "years+",
      experience: "Industry Experience",
      team: "Professional Team",
      clients: "Partner Clients",
      satisfaction: "Customer Satisfaction"
    },
    timeline: {
      "2012": {
        title: "Company Establishment",
        description: "Shanghai Waltech Shipping Co., Ltd. was established in Shanghai, starting to provide basic logistics services."
      },
      "2015": {
        title: "Business Expansion",
        description: "Obtained NVOCC qualification, expanding business scope to major ports nationwide."
      },
      "2018": {
        title: "Digital Transformation",
        description: "Introduced advanced logistics management system, starting the company's digital transformation journey."
      },
      "2020": {
        title: "Global Layout",
        description: "Established global logistics service network, building stable relationships with logistics partners in over 50 countries."
      },
      "2023": {
        title: "Technical Innovation",
        description: "Launched B2B logistics service platform, providing one-stop online logistics solutions for customers."
      }
    }
  },
  footer: {
    address: "Address",
    workingHours: "Working Hours",
    workingTime: "Monday to Friday 9:00-18:00",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    cookie: "Cookie Policy",
    security: "Information Security",
    copyright: "All Rights Reserved",
    companyName: "Shanghai Waltech Information Technology Co., Ltd.",
    icp: "ICP License No. 07034486",
    description: "Choosing WallTech B2B is a wise choice for your business cooperation. We are committed to providing you with the best B2B service experience.",
  },
  dashboard: {
    title: "Dashboard",
    profile: "Profile",
    company: "Company Info",
    orders: "Orders",
    finance: "Finance",
    system: "System",
    message: "Messages",
    companyVerification: "Company Verification",
    myCompany: "My Company",
    companyAccount: "Company Account",
    forecastOrders: "Forecast Orders",
    billList: "Bill List",
    foreignBill: "Foreign Bills",
    invoiceList: "Invoice List",
    enterpriseManagement: "Enterprise Management",
    verifiedCompanies: "Verified Companies",
    pendingCompanies: "Pending Companies",
    enterpriseAccounts: "Enterprise Accounts",
    operationAccounts: "Operation Accounts",
    permissionManagement: "Permission Management",
    customConfig: "Custom Configuration",
    operationManagement: "Operation Management",
    newsCategory: "News Categories",
    newsManagement: "News Management",
    inbox: "Inbox",
    messageSettings: "Message Settings",
  },
};

// 日文语言包
const jp = {
  common: {
    submit: "送信",
    cancel: "キャンセル",
    confirm: "確認",
    delete: "削除",
    edit: "編集",
    save: "保存",
    search: "検索",
    reset: "リセット",
    loading: "読み込み中...",
    noData: "データなし",
    success: "成功",
    failed: "失敗",
    pleaseInput: "入力してください",
    pleaseSelect: "選択してください",
    all: "すべて",
    more: "もっと見る",
    yes: "はい",
    no: "いいえ",
    enable: "有効",
    disable: "無効",
    status: "ステータス",
    actions: "操作",
    remark: "備考",
    createTime: "作成日時",
    updateTime: "更新日時",
    languageChanged: "言語が変更されました",
    phone: "カスタマーサービス",
    email: "メール",
  },
  auth: {
    login: "ログイン",
    register: "登録",
    logout: "ログアウト",
    forgotPassword: "パスワードを忘れた",
    rememberMe: "ログイン情報を保存",
    loginWith: "{0}でログイン",
    registerWith: "{0}で登録",
    password: "パスワード",
    confirmPassword: "パスワード確認",
    verifyCode: "認証コード",
    getVerifyCode: "認証コードを取得",
    phoneOrEmail: "電話番号/メール",
    agreeTerms: "利用規約に同意する",
    terms: "利用規約",
    hasAccount: "アカウントをお持ちの方",
    noAccount: "アカウントをお持ちでない方",
    phoneOnlyMainland: "中国本土の携帯電話番号のみ対応",
    joinExistingCompany: "既存の企業に直接参加",
    enterCompanyCode: "企業コードを入力してください",
    companyCode: "企業コード",
    pleaseAgreeTerms: "利用規約をお読みいただき、同意してください",
    verifyCodeSent: "認証コードを送信しました",
    verifyCodeSendFailed: "認証コードの送信に失敗しました",
    registerSuccess: "登録が完了しました",
    registerFailed: "登録に失敗しました",
    logoutSuccess: "ログアウトしました",
  },
  home: {
    heroTitle: "御社のメインスローガン",
    heroSubtitle: "サブスローガン、より詳細な説明文",
    notice: "注意：ライト版では下の検索ボックスの運賃照会機能はありません！その他の機能は同じです！",
    searchTitle: "クイック検索",
    aboutTitle: "会社概要",
    contactTitle: "お問い合わせ",
    services: {
      title: "サービス内容",
      wechat: {
        official: "WeChat公式アカウント",
        miniprogram: "WeChatミニプログラム",
        qrcode: "QRコード"
      },
      customerService: "オンラインサポート",
      booking: {
        title: "ブッキングサービス",
        description: "FCLおよびLCL国際輸送のブッキングサービスを提供。リアルタイムのスペース状況確認と物流状況の追跡、最適な輸送ルートをご案内します。"
      },
      customs: {
        title: "通関業務",
        description: "豊富な専門知識と実績のある経験を活かし、輸出入貨物の包括的な保護を提供。行政手続きを通じて、安全な貨物輸送を確保します。"
      },
      warehouse: {
        title: "倉庫・配送",
        description: "主要港湾都市すべてに倉庫網を持ち、お客様の緊急なニーズにも迅速に対応。サービス品質の向上に努め、お客様からの信頼にお応えします。"
      }
    }
  },
  navigation: {
    home: "ホーム",
    tracking: "貨物追跡",
    service: "サービス紹介",
    news: "ニュース",
    about: "会社概要",
    login: "ログイン/登録",
  },
  tracking: {
    title: "貨物追跡",
    placeholder: "追跡番号を入力",
    search: "検索",
    history: "履歴",
    searchType: {
      order: "注文番号",
      container: "コンテナ番号",
      bill: "B/L番号",
    },
    progress: {
      booking: "予約 (完了)",
      bl: "B/L (未発行)",
      departure: "出港 (未開始)",
      arrival: "到着 (未開始)",
    },
    result: {
      title: "追跡結果",
      orderNumber: "注文番号",
      status: "現在のステータス",
      estimatedDelivery: "配達予定日",
      basicInfo: "基本情報",
      vesselInfo: "船舶情報",
      vesselName: "船名 / 航海",
      portInfo: {
        departure: "出発港",
        destination: "到着港",
        etd: "出港予定日",
        eta: "到着予定日",
      },
      containerInfo: {
        type: "コンテナタイプ",
        number: "コンテナ番号",
        seal: "シール番号",
      },
      cargoInfo: {
        reference: "お客様参照番号",
        mbl: "MBL番号",
        hbl: "HBL番号",
        pcs: "個数",
        cbm: "容積",
      },
      detailInfo: "詳細情報",
      attachments: "添付ファイル",
      noAttachments: "添付ファイルなし",
    },
  },
  service: {
    title: "サービス",
    subtitle: "プロフェッショナルな物流ソリューションについて",
    overview: "サービス概要",
    features: "サービスの特徴",
    process: "サービスの流れ",
    schedule: {
      title: "スケジュール照会",
      byPort: "港から検索",
      byVessel: "船名から検索",
      departurePort: "出発港を入力",
      destinationPort: "到着港を入力"
    },
    price: {
      title: "料金照会",
      departurePort: "出発港を入力",
      destinationPort: "到着港を入力",
      containerInfo: "コンテナタイプと数量を入力"
    },
    booking: {
      title: "ブッキングサービス",
      subtitle: "世界主要港をカバーする専門的で効率的な貨物予約ソリューション",
      description: "FCLおよびLCL国際輸送のブッキングサービスを提供。リアルタイムのスペース状況確認と物流状況の追跡、最適な輸送ルートをご案内します。"
    },
    customs: {
      title: "通関業務",
      subtitle: "輸出入プロセスを簡素化する専門的な通関ソリューション",
      description: "豊富な専門知識と実績のある経験を活かし、輸出入貨物の包括的な保護を提供。行政手続きを通じて、安全な貨物輸送を確保します。"
    },
    warehouse: {
      title: "倉庫・配送",
      subtitle: "安全で信頼性の高い倉庫ソリューション",
      description: "主要港湾都市すべてに倉庫網を持ち、お客様の緊急なニーズにも迅速に対応。サービス品質の向上に努め、お客様からの信頼にお応えします。"
    },
    strength: {
      title: "当社の強み",
      facility: {
        title: "最新の倉庫施設",
        desc: "10万平方メートル以上の最新倉庫施設を有し、先進的なラックシステムと自動化設備を備え、効率的な倉庫管理を実現しています。"
      },
      network: {
        title: "グローバル物流ネットワーク",
        desc: "世界100カ国以上の国と地域と密接な物流パートナーシップを確立し、包括的な国際物流サービスを提供しています。"
      },
      tech: {
        title: "先進技術システム",
        desc: "最新の物流管理システムと追跡技術を採用し、全工程の可視化管理とリアルタイムの貨物追跡サービスを実現しています。"
      },
      team: {
        title: "専門サービスチーム",
        desc: "経験豊富で専門的な物流サービスチームが、専門的なコンサルティングとカスタマイズされた物流ソリューションを提供します。"
      }
    },
    inquiry: {
      title: "ビジネスに関するご相談は？",
      desc: "当社の専門チームが、国際貿易と物流における様々な課題解決のため、詳細なビジネスコンサルティングとカスタマイズされたソリューションを提供いたします。",
      button: "お問い合わせ"
    }
  },
  news: {
    title: "ニュースセンター",
    search: "ニュースのキーワード検索",
    dateRange: "日付範囲",
    category: "カテゴリー",
    readMore: "詳細を見る",
    downloadPdf: "PDFをダウンロード",
    imageAlt: "ニュース画像",
    categories: {
      all: "全て",
      company: "企業ニュース",
      industry: "業界動向",
      policy: "政策解説"
    },
    articles: {
      article1: {
        title: "[フレイトフォワーディング] 素晴らしい10年！帆を上げて海を渡る",
        summary: "海を大切に、海を理解し、海を管理する！中国の経済発展は海と切り離せない"
      },
      article2: {
        title: "[システム更新] Cargoware B2Bシステムのニュースモジュールが公開",
        summary: "Cargoware B2Bシステムがニュースセンター、オフライン注文閲覧などの機能で更新されました。ぜひお試しください！"
      },
      article3: {
        title: "[フレイトフォワーディング] 物流為替レートが20年ぶりの安値に",
        summary: "ユーロも20年ぶりの安値に！！ユーロ対ドルレートが20年ぶりの安値に"
      },
      article4: {
        title: "[海運動向] アジア～米西岸運賃が2週間で11.2%上昇",
        summary: "米西岸港湾の混雑は改善を続けているが、ピークシーズン到来で海運需要が上昇"
      },
      article5: {
        title: "[政策分析] 中国の新輸出管理規制が海運業界に与える影響",
        summary: "新たに公布された輸出管理規制は特定貨物の輸送に重要な影響を与え、企業は事前準備が必要"
      },
      article6: {
        title: "[業界分析] コンテナ不足問題が継続、解消時期はいつか",
        summary: "世界的なコンテナ不足問題が1年以上続いており、本稿では不足の原因と今後の緩和時期を分析"
      },
      article7: {
        title: "[荷主ガイド] 海上輸送遅延リスクを軽減する5つの戦略",
        summary: "現在の不安定なグローバルサプライチェーンにおいて、荷主が取れる遅延リスク軽減策"
      },
      article8: {
        title: "[企業ニュース] 大手国有企業の物流サービスプロジェクトを受注",
        summary: "激しい競争の末、質の高いサービスと革新的なソリューションで受注に成功"
      },
      article9: {
        title: "[技術革新] ブロックチェーン技術が従来の船積書類手続きを変える",
        summary: "船積書類処理におけるブロックチェーン技術の応用が広がり、効率が大幅に向上"
      },
      article10: {
        title: "2023年海運業界発展動向分析レポート",
        summary: "2023年のグローバル海運業界の発展動向を詳しく分析し、企業の意思決定に参考を提供"
      },
      article11: {
        title: "上海港のコンテナ取扱量が過去最高を更新",
        summary: "上海港の2023年コンテナ取扱量が過去最高を突破し、力強い発展を示す"
      },
      article12: {
        title: "海運業界の環境規制実施、企業の対応策は？",
        summary: "最新の海運環境規制を解説し、企業のコンプライアンス運営にアドバイスを提供"
      },
      article13: {
        title: "日本航路の最新運賃調整のお知らせ",
        summary: "日中航路の運賃調整に関する最新のお知らせ"
      },
      article14: {
        title: "グローバルサプライチェーンの最新動向と展望",
        summary: "現在のグローバルサプライチェーンの状況を分析し、将来の発展傾向を予測"
      },
      article15: {
        title: "沃行海運が2023年度優良サービス提供業者賞を受賞",
        summary: "優れたサービスと良好な評判により業界から認められる"
      }
    },
    detail: {
      meta: {
        time: "時間",
        author: "著者",
        source: "出典",
        views: "ビュー数"
      },
      hotNews: "注目ニュース",
      recommendedNews: "おすすめニュース",
      viewMore: "もっと見る"
    }
  },
  about: {
    title: "会社概要",
    subtitle: "上海沃行情報技術有限公司の歴史とビジョン",
    company: "会社プロフィール",
    history: "沿革",
    culture: "企業文化",
    contact: "お問い合わせ",
    companyAddress: "上海市虹口区周家嘴路699号中垠広場A棟9F",
    partners: "パートナー企業",
    partnerLogo: "パートナー企業ロゴ",
    companyProfile: {
      title: "会社プロフィール",
      content: "上海沃行海運有限公司は、中国交通運輸部から正式にNVOCC資格を取得しています。専門性と実力を活かし、'上海沃行'として広く知られ、上海航運取引所の正式会員として、海運・航空輸送分野に注力し、中国-日本市場を深耕し、事業規模を拡大し、サービス品質を着実に向上させています。",
      vision: "将来を見据え、初心を忘れず、貨物輸送プロセスの最適化に努め、輸送効率とサービス品質を継続的に向上させ、グローバルなお客様により優れた、より効率的な物流体験を提供します。"
    },
    companyCulture: {
      vision: "ビジョン",
      mission: "ミッション",
      values: "コアバリュー",
      visionContent: "革新的な技術で物流業界の未来を形作り、グローバルな総合物流サービスプロバイダーになること。",
      missionContent: "優れた物流サービスで世界をつなぎ、グローバル貿易をより便利で効率的にする。",
      valuesContent: "誠実、顧客第一、イノベーション推進、協力共栄、卓越性の追求。"
    },
    stats: {
      years: "年以上",
      experience: "業界経験",
      team: "専門チーム",
      clients: "取引先",
      satisfaction: "顧客満足度"
    },
    timeline: {
      "2012": {
        title: "会社設立",
        description: "上海沃行海運有限公司が上海に設立され、基本的な物流サービスの提供を開始。"
      },
      "2015": {
        title: "事業拡大",
        description: "NVOCC資格を取得し、事業範囲を全国の主要港に拡大。"
      },
      "2018": {
        title: "デジタル化",
        description: "先進的な物流管理システムを導入し、企業のデジタル化への転換を開始。"
      },
      "2020": {
        title: "グローバル展開",
        description: "グローバル物流サービスネットワークを確立し、50カ国以上の物流パートナーと安定した関係を構築。"
      },
      "2023": {
        title: "技術革新",
        description: "B2B物流サービスプラットフォームを立ち上げ、お客様にワンストップのオンライン物流ソリューションを提供。"
      }
    }
  },
  footer: {
    address: "住所",
    workingHours: "営業時間",
    workingTime: "月曜日～金曜日 9:00-18:00",
    privacy: "プライバシーポリシー",
    terms: "利用規約",
    cookie: "Cookie ポリシー",
    security: "情報セキュリティ",
    copyright: "無断複写・転載を禁じます",
    companyName: "上海沃行情報技術有限公司",
    icp: "滬ICP備07034486号",
    description: "WallTech B2Bは、ビジネス協力のための賢明な選択です。最高のB2Bサービス体験を提供することに努めています。",
  },
  dashboard: {
    title: "ダッシュボード",
    profile: "プロフィール",
    company: "会社情報",
    orders: "注文管理",
    finance: "財務管理",
    system: "システム管理",
    message: "メッセージ",
    companyVerification: "企業認証",
    myCompany: "マイカンパニー",
    companyAccount: "企業アカウント",
    forecastOrders: "予報注文",
    billList: "請求書一覧",
    foreignBill: "海外請求書",
    invoiceList: "インボイス一覧",
    enterpriseManagement: "企業管理",
    verifiedCompanies: "認証済み企業",
    pendingCompanies: "審査待ち企業",
    enterpriseAccounts: "企業アカウント",
    operationAccounts: "運営アカウント",
    permissionManagement: "権限管理",
    customConfig: "カスタム設定",
    operationManagement: "運営管理",
    newsCategory: "ニュースカテゴリー",
    newsManagement: "ニュース管理",
    inbox: "受信箱",
    messageSettings: "メッセージ設定",
  },
};

const i18n = createI18n({
  legacy: false,
  locale: getStoredLanguage(),
  fallbackLocale: DEFAULT_LANGUAGE,
  messages: {
    zh,
    en,
    jp,
  },
  globalInjection: true,
  datetimeFormats: {
    zh: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    jp: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      }
    }
  }
});

// 初始化时设置HTML lang属性
document.querySelector('html')?.setAttribute('lang', getStoredLanguage());

export default i18n;
