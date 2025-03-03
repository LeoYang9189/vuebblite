<template>
  <div class="news-page">
    <!-- 更新为与ServicePage一致的横幅区域 -->
    <section class="page-banner">
      <div class="banner-overlay"></div>
      <div class="container">
        <div class="banner-content">
          <h2 class="banner-title">资讯中心</h2>
        </div>
      </div>
    </section>

    <div class="container main-content">
      <!-- 原始表格内容 - 临时注释隐藏 -->
      <!--
      <div class="news-table-wrapper">
        <table class="news-table">
          <thead>
            <tr>
              <th width="60%">标题</th>
              <th width="20%">发布时间</th>
              <th width="20%">发布人</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(news, index) in newsList" :key="index">
              <td>
                <router-link :to="`/news/${news.id}`">{{ news.title }}</router-link>
              </td>
              <td>{{ news.date }}</td>
              <td>{{ news.author }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      -->

      <!-- 新的卡片式布局 -->
      <div class="news-filter">
        <div class="filter-item active">全部</div>
        <div class="filter-item">公司新闻</div>
        <div class="filter-item">行业动态</div>
        <div class="filter-item">政策法规</div>
      </div>

      <div class="news-cards">
        <div
          v-for="(news, index) in newsCards"
          :key="index"
          class="news-card"
          @click="goToNewsDetail(news.id)"
        >
          <div class="news-card-image">
            <img
              :src="news.image || require('@/assets/images/news-placeholder.jpg')"
              alt="新闻图片"
            />
          </div>
          <div class="news-card-content">
            <h3 class="news-card-title">{{ news.title }}</h3>
            <p class="news-card-summary">{{ news.summary }}</p>
            <div class="news-card-meta">
              <span class="news-card-author"> <i class="fas fa-user"></i> {{ news.author }} </span>
              <span class="news-card-date">
                <i class="far fa-calendar-alt"></i> {{ news.date }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页器 -->
      <div class="pagination">
        <button class="page-btn prev" :disabled="currentPage === 1">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          :class="['page-number', { active: currentPage === page }]"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        <button class="page-btn next" :disabled="currentPage === totalPages">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NewsPage",
  setup() {
    // 当前页码
    const currentPage = ref(1);
    const itemsPerPage = 9; // 每页显示9个卡片

    // 模拟新闻卡片数据
    const newsCards = ref([
      {
        id: 1,
        title: "[货代物流] 非凡十年！直挂云帆济沧海",
        summary: "关心海洋、认识海洋、经略海洋！中国经济的腾飞，与海洋密不可分。",
        author: "张琦",
        date: "2024-08-09 09:47:35",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
      {
        id: 2,
        title: "[系统更新通知] Cargoware B2B系统资讯模块上线啦",
        summary: "Cargoware B2B系统更新了资讯中心，线下订单查看等功能，欢迎尝鲜",
        author: "admin",
        date: "2022-07-13 15:19:51",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
      {
        id: 3,
        title: "[货代物流] 物流货代汇率跌至近20年低位",
        summary: "欧元也到20年低位了!! 欧元对美元汇率跌至近20年低位",
        author: "无",
        date: "2022-07-12 10:30:08",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
      {
        id: 4,
        title: "[航运动态] 亚洲至美西航线运价双周上涨11.2%",
        summary: "美国西海岸港口拥堵情况继续改善，但随着旺季到来，航运需求有所回升",
        author: "李明",
        date: "2022-06-28 14:23:45",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
      {
        id: 5,
        title: "[政策解读] 中国出口管制新规对航运业影响分析",
        summary: "最新发布的出口管制新规将对特定货物的运输产生重要影响，企业需提前准备",
        author: "王晓",
        date: "2022-06-15 09:15:30",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
      {
        id: 6,
        title: "[行业分析] 集装箱短缺问题持续，何时能够缓解？",
        summary: "全球集装箱短缺问题已持续一年多，本文分析短缺原因及未来缓解时间",
        author: "赵华",
        date: "2022-05-22 16:40:12",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
      {
        id: 7,
        title: "[货主须知] 如何降低海运延误风险的五大策略",
        summary: "在当前全球供应链不稳定的情况下，货主可采取哪些措施降低延误风险",
        author: "陈方",
        date: "2022-05-10 11:25:38",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
      {
        id: 8,
        title: "[公司新闻] 我司成功中标某大型国企物流服务项目",
        summary: "经过激烈竞争，我司凭借优质服务和创新解决方案成功中标",
        author: "秦明",
        date: "2022-04-28 15:36:22",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
      {
        id: 9,
        title: "[技术革新] 区块链技术如何改变传统航运单证流程",
        summary: "区块链技术在航运单证处理中的应用正日益广泛，将大幅提升效率",
        author: "杨科",
        date: "2022-04-15 10:18:55",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
    ]);

    // 计算总页数
    const totalPages = ref(Math.ceil(newsCards.value.length / itemsPerPage));

    // 跳转到新闻详情
    const goToNewsDetail = (id: number) => {
      // 实际应用中跳转到详情页
      console.log("跳转到新闻ID:", id);
    };

    // 页码切换
    const goToPage = (page: number) => {
      currentPage.value = page;
      // 实际应用中可能需要从服务器加载对应页的数据
    };

    return {
      currentPage,
      totalPages,
      newsCards,
      goToNewsDetail,
      goToPage,
    };
  },
});
</script>

<style scoped>
/* 更新横幅样式，与ServicePage保持一致 */
.page-banner {
  background: url("@/assets/images/banner-bg.jpg") no-repeat center center;
  background-size: cover;
  position: relative;
  padding: 60px 0;
  margin-bottom: 50px;
  color: white;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.banner-content {
  position: relative;
  z-index: 2;
}

.banner-title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 15px;
}

.banner-desc {
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
}

/* 移除新增的页面头部样式 */
.page-header {
  display: none;
}

/* 新闻筛选 */
.news-filter {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.filter-item {
  font-size: 16px;
  color: #666;
  cursor: pointer;
  padding: 0 5px 10px;
  position: relative;
}

.filter-item.active {
  color: #1e5aa0;
  font-weight: 500;
}

.filter-item.active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: #1e5aa0;
}

/* 卡片布局 */
.news-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-bottom: 40px;
}

.news-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.news-card-image {
  height: 200px;
  overflow: hidden;
}

.news-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.news-card:hover .news-card-image img {
  transform: scale(1.05);
}

.news-card-content {
  padding: 20px;
}

.news-card-title {
  font-size: 16px;
  margin-bottom: 12px;
  color: #333;
  line-height: 1.4;
  height: 45px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.news-card-summary {
  font-size: 14px;
  color: #666;
  margin-bottom: 18px;
  height: 60px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.news-card-meta {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 12px;
}

.news-card-author i,
.news-card-date i {
  margin-right: 5px;
}

/* 分页器 */
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 40px;
}

.page-btn,
.page-number {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: #666;
}

.page-number.active {
  background: #1e5aa0;
  color: white;
  border-color: #1e5aa0;
}

.page-btn:hover,
.page-number:hover {
  border-color: #1e5aa0;
  color: #1e5aa0;
}

.page-number.active:hover {
  color: white;
}

.page-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  border-color: #ddd;
  color: #666;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .news-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .news-cards {
    grid-template-columns: 1fr;
  }

  .page-header {
    padding: 30px 0;
  }

  .filter-item {
    font-size: 14px;
  }
}
</style>
