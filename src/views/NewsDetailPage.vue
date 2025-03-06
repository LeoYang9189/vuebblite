<template>
  <div class="news-detail-page">
    <!-- 页面横幅 -->
    <section class="page-banner">
      <div class="banner-overlay"></div>
      <div class="container">
        <div class="banner-content">
          <h2 class="banner-title">{{ t('news.title') }}</h2>
        </div>
      </div>
    </section>

    <div class="container main-content">
      <div class="news-detail-layout">
        <!-- 左侧文章内容区 -->
        <div class="news-content-container">
          <!-- 文章标题 -->
          <h1 class="news-title">{{ newsDetail.title }}</h1>

          <!-- 文章元信息 -->
          <div class="news-meta">
            <span class="meta-item">{{ t('news.detail.meta.time') }}: {{ newsDetail.date }}</span>
            <span class="meta-item">{{ t('news.detail.meta.author') }}: {{ newsDetail.author }}</span>
            <span class="meta-item">{{ t('news.detail.meta.source') }}: {{ newsDetail.source }}</span>
            <span class="meta-item">{{ t('news.detail.meta.views') }}: {{ newsDetail.views }}</span>
          </div>

          <!-- 主图 -->
          <div class="news-main-image">
            <img :src="newsDetail.image" :alt="t('news.imageAlt')" />
          </div>

          <!-- 文章内容 -->
          <div class="news-content" v-html="newsDetail.content"></div>
        </div>

        <!-- 右侧热点推荐 -->
        <div class="news-sidebar">
          <h3 class="sidebar-title">{{ t('news.detail.hotNews') }}</h3>

          <div class="hot-news-list">
            <div
              v-for="(item, index) in relatedNews"
              :key="index"
              class="hot-news-item"
              @click="goToNews(item.id)"
            >
              <div class="hot-news-image">
                <img :src="item.image" :alt="t('news.detail.recommendedNews')" />
              </div>
              <div class="hot-news-info">
                <h4 class="hot-news-title">{{ item.title }}</h4>
                <p class="hot-news-date">{{ item.date }}</p>
              </div>
            </div>
          </div>

          <div class="more-news">
            <router-link to="/news" class="more-link">{{ t('news.detail.viewMore') }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "NewsDetailPage",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t } = useI18n();

    // 获取新闻ID
    const newsId = route.params.id;

    // 更新新闻详情数据，添加更多图片和内容
    const newsDetail = ref({
      id: 1,
      title: "[货代物流]非凡十年！直挂云帆济沧海",
      author: "张琦",
      date: "2024-08-09 09:47:35",
      source: "央视网",
      views: 64,
      image: require("@/assets/images/news-placeholder.jpg"),
      content: `
        <p>央视网消息：关心海洋、认识海洋、经略海洋！中国经济的腾飞，与海洋密不可分。党的十八大以来，习近平总书记高度重视海洋工作，关心海洋事业发展。在中国航海日之际，央视网系列创意微视频《非凡十年》，邀您一起来看中国航海的奋进之路。</p>
        
        <div class="article-image-wrapper">
          <img src="${require("@/assets/images/globe.svg")}" alt="全球航运" class="article-image" />
          <p class="image-caption">图1：全球航运网络示意图</p>
        </div>
        
        <h3>航运业的快速发展</h3>
        <p>随着中国经济的快速发展，我国的海洋运输业也迎来了前所未有的繁荣。近十年来，中国的港口吞吐量连续多年位居世界第一，航运技术不断创新，船舶制造水平显著提升。</p>
        
        <p>我国已建成世界上规模最大的高等级航道网和内河港口群，内河航道通航里程达到12.7万公里，约占世界内河航道总里程的一半，连通了全国32万平方公里的水域，惠及沿岸各省市发展。</p>
        
        <div class="article-image-wrapper">
          <img src="${require("@/assets/images/customs-icon.svg")}" alt="海关通关" class="article-image" />
          <p class="image-caption">图2：现代化的海关通关系统</p>
        </div>
        
        <h3>"一带一路"与海上联通</h3>
        <p>在"一带一路"倡议的推动下，中国与沿线国家的海上贸易往来日益密切。中远海运、中国海运等企业的船队足迹遍布全球主要港口，成为连接中国与世界的重要纽带。</p>
        
        <ul class="article-list">
          <li>促进了全球贸易往来，特别是中国与东南亚、中东、非洲等地区的贸易合作</li>
          <li>带动了沿线国家港口基础设施的现代化建设</li>
          <li>推动了航运服务标准化、规范化和便利化</li>
          <li>为构建人类命运共同体提供了重要支撑</li>
        </ul>
        
        <div class="article-image-wrapper">
          <img src="${require("@/assets/images/why-us.svg")}" alt="航运优势" class="article-image" />
          <p class="image-caption">图3：现代航运的优势</p>
        </div>
        
        <h3>智能与绿色航运的未来</h3>
        <p>未来，随着海洋科技的不断进步和绿色航运理念的深入推广，中国航运业将朝着更加智能、环保的方向发展，为实现"海洋强国"战略贡献力量。智能航运将实现自动驾驶和远程控制，大幅提高航运效率和安全性；绿色航运将减少污染排放，保护海洋生态环境。</p>
        
        <blockquote class="article-quote">
          "建设海洋强国，我一直有这样一个信念。" — 习近平总书记
        </blockquote>
        
        <p>通过持续不断的创新和发展，中国航运业必将在世界舞台上发挥更加重要的作用，为全球航运业的繁荣做出更大贡献。</p>
      `,
    });

    // 模拟相关推荐新闻
    const relatedNews = ref([
      {
        id: 2,
        title: "[系统更新通知] Cargoware B2B系统资讯模块上线啦",
        date: "2022-07-13",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
      {
        id: 3,
        title: "[货代物流] 物流货代汇率跌至近20年低位",
        date: "2022-07-12",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
      {
        id: 4,
        title: "[货代物流] eTower每日跨境热点资讯",
        date: "2022-06-28",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
    ]);

    // 跳转到其他新闻详情
    const goToNews = (id: number) => {
      router.push(`/news/${id}`);
    };

    onMounted(() => {
      // 实际应用中，这里会根据newsId从API获取新闻详情
      console.log("加载新闻ID:", newsId);

      // 模拟API请求延迟和数据加载
      // fetchNewsDetail(newsId);
    });

    return {
      newsDetail,
      relatedNews,
      goToNews,
      t,
    };
  },
});
</script>

<style scoped>
/* 页面横幅样式与NewsPage保持一致 */
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

/* 内容布局 */
.main-content {
  padding-bottom: 60px;
}

.news-detail-layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 40px;
}

/* 左侧文章内容区 */
.news-content-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 30px;
}

.news-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
  line-height: 1.4;
}

.news-meta {
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
  margin-bottom: 20px;
  color: #888;
  font-size: 14px;
}

.meta-item {
  margin-right: 20px;
}

.news-main-image {
  margin-bottom: 25px;
}

.news-main-image img {
  width: 100%;
  border-radius: 6px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.news-content {
  line-height: 1.8;
  color: #444;
  font-size: 16px;
  text-align: left;
}

.news-content p {
  margin-bottom: 1.2em;
  line-height: 1.8;
  text-align: left;
}

/* 右侧热点推荐 */
.news-sidebar {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 20px;
}

.sidebar-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.hot-news-item {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;
  transition: transform 0.2s;
}

.hot-news-item:hover {
  transform: translateX(5px);
}

.hot-news-image {
  width: 80px;
  height: 60px;
  margin-right: 12px;
  flex-shrink: 0;
}

.hot-news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.hot-news-info {
  flex: 1;
}

.hot-news-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hot-news-date {
  font-size: 12px;
  color: #999;
}

.more-news {
  margin-top: 20px;
  text-align: left;
}

.more-link {
  display: inline-block;
  color: #1e5aa0;
  font-size: 14px;
  text-decoration: none;
}

.more-link:hover {
  text-decoration: underline;
}

/* 添加新的文章内容样式 */
.article-image-wrapper {
  margin: 25px 0;
  text-align: center;
}

.article-image {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.image-caption {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  font-style: italic;
  text-align: center;
}

.article-list {
  margin: 20px 0;
  padding-left: 25px;
}

.article-list li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.article-quote {
  margin: 30px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-left: 4px solid #1e5aa0;
  font-style: italic;
  color: #555;
  text-align: left;
}

h3 {
  color: #1e5aa0;
  margin: 30px 0 15px;
  font-size: 20px;
  text-align: left;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .news-detail-layout {
    grid-template-columns: 1fr;
  }

  .news-title {
    font-size: 20px;
  }

  .news-content-container {
    padding: 20px;
  }

  .meta-item {
    display: block;
    margin-bottom: 5px;
  }
}
</style>
