import { createStore } from "vuex";
import { NewsItem, TrackingStatus } from "@/types";

export default createStore({
  state: {
    language: "zh",
    searchHistory: [] as string[],
    newsList: [
      {
        id: 1,
        title: "上海港口加强自动化改造，提升货物吞吐能力",
        summary:
          '近期，上海港口启动了新一轮的自动化改造工程，预计将大幅提升港口的货物处理效率和吞吐能力。这一项目是"智慧港口"建设的重要组成部分...',
        date: "2023-06-15",
        category: "industry",
        views: 1248,
        content: `<p>近期，上海港口启动了新一轮的自动化改造工程，预计将大幅提升港口的货物处理效率和吞吐能力。这一项目是"智慧港口"建设的重要组成部分。</p>
                  <p>自动化改造后，上海港将引入更多无人驾驶集装箱运输车辆和自动化岸桥，通过人工智能和大数据技术优化港口作业流程，减少人工干预，提高作业精度和效率。</p>
                  <p>据港口管理部门介绍，本次改造完成后，上海港集装箱年吞吐能力将提升约20%，装卸作业效率提高30%以上，同时能源消耗降低15%，有效降低企业物流成本。</p>
                  <p>这一改造也将为上海巩固国际航运中心地位，提升国际竞争力提供有力支撑。</p>`,
      },
      {
        id: 2,
        title: '我司荣获"2023年度最佳物流服务商"荣誉称号',
        summary:
          '在昨日举行的2023中国物流行业年度评选中，我司凭借卓越的服务品质和创新的技术应用，荣获"2023年度最佳物流服务商"荣誉称号...',
        date: "2023-05-20",
        category: "company",
        views: 856,
        pdf: "https://example.com/awards2023.pdf",
        content: `<p>在昨日举行的2023中国物流行业年度评选中，我司凭借卓越的服务品质和创新的技术应用，荣获"2023年度最佳物流服务商"荣誉称号。</p>
                  <p>此次评选由中国物流与采购联合会主办，共有超过500家企业参与角逐。评选标准包括服务质量、技术创新、客户满意度以及社会责任等多个维度。</p>
                  <p>我司CEO在获奖致辞中表示："这一荣誉是对我们长期坚持客户至上、不断创新服务的肯定。未来，我们将继续深耕物流领域，为客户提供更加高效、智能的物流解决方案。"</p>
                  <p>据悉，我司近年来大力投入数字化转型，通过区块链、物联网等技术提升服务透明度和效率，显著提升了客户满意度。</p>`,
      },
      {
        id: 3,
        title: "新版《国际海运条例》将于明年初实施，这些变化需关注",
        summary:
          "国际海事组织(IMO)近日发布公告，新版《国际海运条例》将于明年1月1日正式实施。新规对船舶排放、集装箱安全标准等方面做出了多项调整...",
        date: "2023-04-18",
        category: "policy",
        views: 1502,
        content: `<p>国际海事组织(IMO)近日发布公告，新版《国际海运条例》将于明年1月1日正式实施。新规对船舶排放、集装箱安全标准等方面做出了多项调整。</p>
                  <p>在环保方面，新规进一步降低了船舶硫氧化物和氮氧化物的排放限值，加强了船舶能效管理计划(SEEMP)的实施要求。同时，新规还增加了对船舶压载水处理系统的检测频率。</p>
                  <p>在安全标准方面，新规提高了集装箱结构强度和堆叠能力的要求，并加强了危险品运输的申报和监管流程。</p>
                  <p>业内专家提醒，相关企业应提前了解新规细则，及时调整业务流程，确保合规运营。我司已组织专项培训，帮助客户了解新规对国际贸易的影响。</p>`,
      },
    ] as NewsItem[],
    trackingRecords: {} as Record<string, TrackingStatus[]>,
    userPreferences: {
      darkMode: false,
      notifications: true,
    },
  },
  getters: {
    currentLanguage: state => state.language,
    getNewsByCategory: state => (category: string) => {
      if (category === "all") {
        return state.newsList;
      }
      return state.newsList.filter(news => news.category === category);
    },
    getNewsById: state => (id: number) => {
      return state.newsList.find(news => news.id === id);
    },
    getSearchHistory: state => state.searchHistory,
    getTrackingRecord: state => (trackingNumber: string) => {
      return state.trackingRecords[trackingNumber] || null;
    },
  },
  mutations: {
    setLanguage(state, language: string) {
      state.language = language;
      localStorage.setItem("preferredLanguage", language);
    },
    addSearchHistory(state, trackingNumber: string) {
      // 避免重复添加
      if (!state.searchHistory.includes(trackingNumber)) {
        state.searchHistory.unshift(trackingNumber);
        // 保留最近10条记录
        if (state.searchHistory.length > 10) {
          state.searchHistory.pop();
        }
        // 保存到本地存储
        localStorage.setItem("searchHistory", JSON.stringify(state.searchHistory));
      }
    },
    clearSearchHistory(state) {
      state.searchHistory = [];
      localStorage.removeItem("searchHistory");
    },
    setTrackingRecord(state, { trackingNumber, statuses }) {
      state.trackingRecords[trackingNumber] = statuses;
    },
    toggleDarkMode(state) {
      state.userPreferences.darkMode = !state.userPreferences.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.userPreferences.darkMode));
    },
    toggleNotifications(state) {
      state.userPreferences.notifications = !state.userPreferences.notifications;
      localStorage.setItem("notifications", JSON.stringify(state.userPreferences.notifications));
    },
  },
  actions: {
    initializeStore({ commit, state }) {
      // 恢复语言设置
      const savedLang = localStorage.getItem("preferredLanguage");
      if (savedLang) {
        commit("setLanguage", savedLang);
      }

      // 恢复搜索历史
      const savedHistory = localStorage.getItem("searchHistory");
      if (savedHistory) {
        state.searchHistory = JSON.parse(savedHistory);
      }

      // 恢复用户偏好设置
      const darkMode = localStorage.getItem("darkMode");
      if (darkMode !== null) {
        state.userPreferences.darkMode = JSON.parse(darkMode);
      }

      const notifications = localStorage.getItem("notifications");
      if (notifications !== null) {
        state.userPreferences.notifications = JSON.parse(notifications);
      }
    },
    async trackShipment({ commit }, trackingNumber: string) {
      try {
        // 这里应该是实际的API调用
        // 现在使用模拟数据
        const mockStatuses: TrackingStatus[] = [
          {
            id: "1",
            title: "订单已创建",
            date: "2023-12-01 09:15",
            location: "上海",
            status: "completed",
          },
          {
            id: "2",
            title: "货物已装船",
            date: "2023-12-05 14:30",
            location: "上海港",
            status: "completed",
          },
          {
            id: "3",
            title: "船舶已启航",
            date: "2023-12-06 08:45",
            location: "上海港",
            status: "completed",
          },
          {
            id: "4",
            title: "船舶抵达目的港",
            date: "2023-12-15 16:20",
            location: "东京港",
            status: "current",
          },
          {
            id: "5",
            title: "货物已卸船",
            date: "等待中",
            location: "东京港",
            status: "pending",
          },
          {
            id: "6",
            title: "货物已送达",
            date: "等待中",
            location: "",
            status: "pending",
          },
        ];

        // 添加到搜索历史
        commit("addSearchHistory", trackingNumber);

        // 保存追踪记录
        commit("setTrackingRecord", { trackingNumber, statuses: mockStatuses });

        return mockStatuses;
      } catch (error) {
        console.error("追踪货物失败:", error);
        throw error;
      }
    },
  },
  modules: {
    // 可以添加其他模块
  },
});
