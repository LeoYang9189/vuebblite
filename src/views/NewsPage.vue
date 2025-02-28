<template>
  <div class="news-page">
    <!-- 页面横幅 -->
    <section class="news-banner">
      <div class="container">
        <h1>资讯中心</h1>
      </div>
    </section>

    <!-- 资讯中心内容 -->
    <section class="news-content-section">
      <div class="container">
        <!-- 资讯筛选 -->
        <div class="news-filter">
          <div class="search-box">
            <input
              type="text"
              v-model="searchKeyword"
              placeholder="搜索资讯关键词"
              @keyup.enter="searchNews"
            />
            <button @click="searchNews">
              <i class="fas fa-search"></i>
            </button>
          </div>

          <div class="filter-options">
            <div class="filter-group">
              <label>时间范围</label>
              <select v-model="filterDateRange">
                <option value="all">全部时间</option>
                <option value="week">最近一周</option>
                <option value="month">最近一个月</option>
                <option value="year">最近一年</option>
              </select>
            </div>

            <div class="filter-group">
              <label>分类</label>
              <select v-model="filterCategory">
                <option value="all">全部分类</option>
                <option value="industry">行业动态</option>
                <option value="company">公司新闻</option>
                <option value="policy">政策法规</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 资讯列表 -->
        <div class="news-list">
          <div v-for="news in filteredNews" :key="news.id" class="news-item">
            <div class="news-date">
              <span class="day">{{ formatDay(news.date) }}</span>
              <span class="month-year">{{ formatMonthYear(news.date) }}</span>
            </div>
            <div class="news-content">
              <h3 class="news-title">{{ news.title }}</h3>
              <div class="news-meta">
                <span class="news-category">{{ getCategoryName(news.category) }}</span>
                <span class="news-views"><i class="fas fa-eye"></i> {{ news.views }}次浏览</span>
              </div>
              <p class="news-summary">{{ news.summary }}</p>
              <div class="news-actions">
                <a :href="news.pdf" class="btn-download" target="_blank" v-if="news.pdf">
                  <i class="fas fa-file-pdf"></i> 下载PDF
                </a>
                <a href="#" class="btn-more" @click.prevent="viewNewsDetail(news)">
                  查看详情 <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="pagination">
          <ul>
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a href="#" class="page-link" @click.prevent="changePage(currentPage - 1)">
                <i class="fas fa-chevron-left"></i>
              </a>
            </li>
            <li
              v-for="page in totalPages"
              :key="page"
              class="page-item"
              :class="{ active: currentPage === page }"
            >
              <a href="#" class="page-link" @click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a href="#" class="page-link" @click.prevent="changePage(currentPage + 1)">
                <i class="fas fa-chevron-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 新闻详情弹窗 -->
    <div class="news-detail-modal" v-if="showNewsDetail" @click.self="closeNewsDetail">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ selectedNews?.title }}</h2>
          <button class="close-btn" @click="closeNewsDetail">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="news-detail-meta">
            <span class="news-detail-date">发布时间: {{ formatFullDate(selectedNews?.date) }}</span>
            <span class="news-detail-category"
              >分类: {{ getCategoryName(selectedNews?.category) }}</span
            >
          </div>
          <div class="news-detail-content" v-html="selectedNews?.content"></div>
        </div>
        <div class="modal-footer">
          <a
            :href="selectedNews?.pdf"
            class="btn-download"
            target="_blank"
            v-if="selectedNews?.pdf"
          >
            <i class="fas fa-file-pdf"></i> 下载PDF
          </a>
          <button class="btn-close" @click="closeNewsDetail">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: string;
  views: number;
  pdf?: string;
}

export default defineComponent({
  name: "NewsPage",
  setup() {
    const searchKeyword = ref("");
    const filterDateRange = ref("all");
    const filterCategory = ref("all");
    const currentPage = ref(1);
    const itemsPerPage = 5;
    const showNewsDetail = ref(false);
    const selectedNews = ref<NewsItem | null>(null);

    // 模拟新闻数据
    const newsData = ref<NewsItem[]>([
      {
        id: 1,
        title: "关于中国至日本新航线开通的通知",
        summary: "我司将于2024年3月开通中国至日本的新航线，提供更便捷、更高效的物流服务。",
        content: `<p>尊敬的客户：</p>
                 <p>为满足日益增长的中日物流需求，我司将于2024年3月15日正式开通中国至日本的新航线。新航线将覆盖上海、宁波、青岛至日本东京、大阪、神户等主要港口，为客户提供更便捷、更高效的物流服务。</p>
                 <p>新航线具有以下特点：</p>
                 <ul>
                   <li>班期稳定：每周三班，确保货物及时运输</li>
                   <li>时效优势：上海至东京仅需3天，大大缩短运输时间</li>
                   <li>服务全面：提供门到门、整箱、拼箱等多种服务选择</li>
                   <li>价格优惠：开航期间，特别推出优惠套餐</li>
                 </ul>
                 <p>期待与您的合作！</p>`,
        date: "2024-02-15",
        category: "company",
        views: 1258,
        pdf: "/assets/pdf/shipping-line-notice.pdf",
      },
      {
        id: 2,
        title: "物流行业数字化转型趋势分析",
        summary:
          "随着科技的快速发展，物流行业正经历前所未有的数字化转型，本文将分析主要趋势和挑战。",
        content: `<p>随着科技的快速发展，物流行业正经历前所未有的数字化转型。从人工智能到区块链，从物联网到大数据分析，各种新兴技术正在重塑物流行业的运作方式，带来更高的效率和更好的服务体验。</p>
                 <p>本文将深入分析物流行业数字化转型的主要趋势：</p>
                 <h3>1. 人工智能与机器学习的应用</h3>
                 <p>人工智能在路径优化、需求预测、仓库自动化等方面的应用正变得越来越普遍。先进的算法可以处理海量数据，提供更精准的决策支持。</p>
                 <h3>2. 区块链技术的落地</h3>
                 <p>区块链技术为物流行业提供了透明、不可篡改的记录系统，有助于建立更可信的供应链生态系统。</p>
                 <h3>3. 物联网与实时追踪</h3>
                 <p>IoT设备的广泛应用使得货物追踪变得更加实时、精确，为客户提供了前所未有的可见性。</p>`,
        date: "2024-01-28",
        category: "industry",
        views: 876,
      },
      {
        id: 3,
        title: "2024年物流行业关键政策解读",
        summary: "本文解读2024年将影响物流行业发展的关键政策，帮助企业把握政策方向，抓住发展机遇。",
        content: `<p>2024年，多项物流相关政策将陆续出台，对行业发展产生深远影响。本文将对这些关键政策进行解读，帮助企业把握政策方向，抓住发展机遇。</p>
                 <h3>跨境电商新政策</h3>
                 <p>新政策扩大了跨境电商试点范围，简化了通关流程，降低了关税水平，将为跨境物流带来更多机遇。</p>
                 <h3>绿色物流推进措施</h3>
                 <p>环保要求将进一步提高，鼓励使用新能源车辆和环保包装，符合条件的企业可获得相关补贴。</p>
                 <h3>物流基础设施建设计划</h3>
                 <p>国家将加大对物流枢纽、智慧物流园区等基础设施的投入，提升物流网络整体效能。</p>`,
        date: "2024-02-10",
        category: "policy",
        views: 1423,
        pdf: "/assets/pdf/policy-analysis.pdf",
      },
      {
        id: 4,
        title: '我司荣获"年度最佳物流服务商"称号',
        summary:
          '在2023年度物流行业评选中，我司凭借卓越的服务质量和创新能力，荣获"年度最佳物流服务商"称号。',
        content: `<p>我们非常荣幸地宣布，在2023年度物流行业评选中，上海沃行信息技术有限公司凭借卓越的服务质量和创新能力，荣获"年度最佳物流服务商"称号。</p>
                 <p>此次评选由多家权威机构联合举办，经过严格的评审流程，从服务质量、技术创新、客户满意度等多个维度进行综合评估。我司在各项指标中均表现突出，最终从众多参评企业中脱颖而出。</p>
                 <p>这一荣誉是对我司多年来坚持以客户为中心，不断创新服务模式的肯定。未来，我们将继续秉承"专业、高效、创新"的服务理念，为客户提供更优质的物流解决方案。</p>
                 <p>感谢所有客户和合作伙伴的信任与支持！</p>`,
        date: "2023-12-15",
        category: "company",
        views: 952,
      },
      {
        id: 5,
        title: "日本新港口设施投入使用对中日航线的影响",
        summary:
          "日本横滨港新码头设施正式投入使用，将极大提升中日航线的运输效率，缩短货物通关时间。",
        content: `<p>日本横滨港新码头设施近日正式投入使用，这将对中日航线产生深远影响。新设施采用先进的自动化技术，大幅提升了装卸效率和港口处理能力。</p>
                 <p>根据估计，新设施将使横滨港的集装箱处理能力提高30%，同时将船舶在港停留时间缩短约40%。这对于中日贸易来说是一个重大利好，将有效缓解当前的港口拥堵状况，提高物流效率。</p>
                 <p>我司已与横滨港建立了战略合作关系，将充分利用新设施带来的优势，为客户提供更快速、更可靠的中日航线服务。预计在未来几个月内，我司的中日航线时效将进一步提升，运输成本也将有所降低。</p>`,
        date: "2024-01-05",
        category: "industry",
        views: 785,
      },
      {
        id: 6,
        title: "集装箱货运市场价格分析与预测",
        summary: "本文分析当前集装箱货运市场的价格走势，并对2024年市场价格走势进行预测。",
        content: `<p>近期，全球集装箱货运市场价格持续波动，给进出口企业带来诸多挑战。本文将深入分析当前市场价格走势，并对2024年市场情况进行预测。</p>
                 <h3>当前价格分析</h3>
                 <p>自2023年四季度以来，亚洲至欧美航线的运价出现了明显上涨，尤其是亚洲至北美西海岸航线，40尺标准箱运价已上涨超过50%。这主要受以下因素影响：</p>
                 <ul>
                   <li>船公司减少运力投放</li>
                   <li>区域地缘政治因素</li>
                   <li>燃油价格上涨</li>
                 </ul>
                 <h3>2024年预测</h3>
                 <p>根据市场数据分析，预计2024年集装箱运价将呈现先高后稳的走势。上半年可能维持高位，下半年随着新船交付和需求回调，运价或将逐步回归理性区间。</p>`,
        date: "2024-02-20",
        category: "industry",
        views: 1050,
        pdf: "/assets/pdf/freight-analysis.pdf",
      },
    ]);

    // 根据筛选条件过滤新闻
    const filteredNews = computed(() => {
      let result = [...newsData.value];

      // 关键词搜索
      if (searchKeyword.value) {
        const keyword = searchKeyword.value.toLowerCase();
        result = result.filter(
          news =>
            news.title.toLowerCase().includes(keyword) ||
            news.summary.toLowerCase().includes(keyword)
        );
      }

      // 分类筛选
      if (filterCategory.value !== "all") {
        result = result.filter(news => news.category === filterCategory.value);
      }

      // 日期筛选
      if (filterDateRange.value !== "all") {
        const now = new Date();
        let compareDate = new Date();

        switch (filterDateRange.value) {
          case "week":
            compareDate.setDate(now.getDate() - 7);
            break;
          case "month":
            compareDate.setMonth(now.getMonth() - 1);
            break;
          case "year":
            compareDate.setFullYear(now.getFullYear() - 1);
            break;
        }

        result = result.filter(news => new Date(news.date) >= compareDate);
      }

      // 按日期排序（最新的在前）
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return result;
    });

    // 计算总页数
    const totalPages = computed(() => {
      return Math.ceil(filteredNews.value.length / itemsPerPage);
    });

    // 当前页显示的新闻
    const paginatedNews = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      return filteredNews.value.slice(startIndex, startIndex + itemsPerPage);
    });

    // 获取分类名称
    const getCategoryName = (category?: string) => {
      if (!category) return "";

      const categories: Record<string, string> = {
        industry: "行业动态",
        company: "公司新闻",
        policy: "政策法规",
      };

      return categories[category] || category;
    };

    // 格式化日期 - 日
    const formatDay = (dateString: string) => {
      return new Date(dateString).getDate();
    };

    // 格式化日期 - 月年
    const formatMonthYear = (dateString: string) => {
      const date = new Date(dateString);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${month}月/${year}`;
    };

    // 格式化完整日期
    const formatFullDate = (dateString?: string) => {
      if (!dateString) return "";

      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    // 搜索新闻
    const searchNews = () => {
      currentPage.value = 1; // 重置到第一页
    };

    // 切换页码
    const changePage = (page: number) => {
      if (page < 1 || page > totalPages.value) {
        return;
      }

      currentPage.value = page;
      // 滚动到页面顶部
      const element = document.querySelector(".news-content-section");
      window.scrollTo({
        top: element instanceof HTMLElement ? element.offsetTop : 0,
        behavior: "smooth",
      });
    };

    // 查看新闻详情
    const viewNewsDetail = (news: NewsItem) => {
      selectedNews.value = news;
      showNewsDetail.value = true;
      document.body.style.overflow = "hidden"; // 防止背景滚动
    };

    // 关闭新闻详情
    const closeNewsDetail = () => {
      showNewsDetail.value = false;
      document.body.style.overflow = ""; // 恢复背景滚动
    };

    onMounted(() => {
      // 在实际应用中，这里可能会从API加载新闻数据
    });

    return {
      searchKeyword,
      filterDateRange,
      filterCategory,
      currentPage,
      filteredNews: paginatedNews, // 使用分页后的数据
      totalPages,
      showNewsDetail,
      selectedNews,
      getCategoryName,
      formatDay,
      formatMonthYear,
      formatFullDate,
      searchNews,
      changePage,
      viewNewsDetail,
      closeNewsDetail,
    };
  },
});
</script>
