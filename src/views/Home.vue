<template>
  <div class="home-page">
    <!-- 英雄区域 -->
    <section class="hero">
      <div class="hero-slider">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          :class="['slide', { active: currentSlide === index }]"
          :style="{ backgroundImage: `url(${slide.image})` }"
        ></div>
      </div>
      <div class="slider-dots">
        <span
          v-for="(slide, index) in slides"
          :key="index"
          :class="['dot', { active: currentSlide === index }]"
          @click="setCurrentSlide(index)"
        ></span>
      </div>
      <div class="container">
        <div class="hero-content">
          <h1>{{ heroContent.title }}</h1>
          <p v-html="heroContent.subtitle"></p>

          <!-- 恢复原始搜索表单 -->
          <SearchForm />
        </div>
      </div>
    </section>

    <!-- 我们的服务部分 -->
    <section class="services-section">
      <div class="container">
        <h2 class="section-title">我们的服务</h2>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">
              <i class="fas fa-ship"></i>
            </div>
            <h3>订舱服务</h3>
            <p>
              针对整箱（FCL）及拼箱（LCL）国际运输，我们将根据实际情况，为您推荐所需的货物或航班，并安排最佳货运舱位。
            </p>
            <router-link to="/service?service=booking" class="service-link"
              >了解更多 <i class="fas fa-arrow-right"></i
            ></router-link>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <i class="fas fa-file-contract"></i>
            </div>
            <h3>通关·检查</h3>
            <p>
              凭借广博深厚的专业学识，以及久经流淌的丰富经验，全方位助力进出口货物合法依规，高效快捷地通过行政许可流程，确保每一次货物流转都畅行无阻。
            </p>
            <router-link to="/service?service=customs" class="service-link"
              >了解更多 <i class="fas fa-arrow-right"></i
            ></router-link>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <i class="fas fa-warehouse"></i>
            </div>
            <h3>仓库·配送</h3>
            <p>
              我们珍视客户所托，定将其重要货物妥如期送达，不负所望。同时，对于客户的细微求与特殊条件，将竭尽所能，全力提升服务品质，不负每一份信任。
            </p>
            <router-link to="/service?service=warehouse" class="service-link"
              >了解更多 <i class="fas fa-arrow-right"></i
            ></router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 通知与船舶计划 -->
    <section class="schedule-section">
      <div class="container">
        <h2 class="section-title">通知与船舶计划</h2>
        <div class="schedule-table">
          <div class="schedule-header">
            <span class="schedule-col title">标题</span>
            <span class="schedule-col update-time">更新时间</span>
          </div>
          <div v-for="(item, index) in scheduleItems" :key="index" class="schedule-row">
            <span class="schedule-col title">{{ item.title }}</span>
            <span class="schedule-col update-time">{{ item.updateTime }}</span>
          </div>
          <div class="view-more-row">
            <router-link to="/news" class="view-more"
              >查看更多 <i class="fas fa-angle-right"></i
            ></router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 合作伙伴滚动 -->
    <section class="partners-section">
      <div class="container">
        <h2 class="section-title">合作伙伴</h2>
        <div class="partners-slider">
          <div class="partners-track track-row-1">
            <div v-for="i in 16" :key="`partner1-${i}`" class="partner-logo">
              <img src="@/assets/images/logo.png" alt="合作伙伴" />
            </div>
          </div>
          <div class="partners-track track-row-2">
            <div v-for="i in 16" :key="`partner2-${i}`" class="partner-logo">
              <img src="@/assets/images/logo.png" alt="合作伙伴" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 关于我们 -->
    <section class="about-contact">
      <div class="about-contact-inner">
        <div class="about-area">
          <div class="about-content">
            <h2 class="about-title">关于我们</h2>
            <p class="about-company">{{ aboutContent }}</p>
          </div>
        </div>
        <div class="contact-area">
          <div class="contact-content">
            <h2>联系我们</h2>
            <p class="contact-desc">如果您在物流方面有任何想要咨询的事宜，欢迎随时与我们联系。</p>
            <div class="contact-info about-section-contact">
              <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>上海市虹口区周家嘴路699号中垠广场A座9F</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-phone-alt"></i>
                <span>021-65143931转826</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>b2b-service@walltechsystem.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import SearchForm from "@/components/common/SearchForm.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    SearchForm,
  },
  setup() {
    const currentSlide = ref(0);
    const slides = ref([
      { image: require("@/assets/images/bg1.jpg") },
      { image: require("@/assets/images/bg2.jpg") },
    ]);

    const heroContent = ref({
      title: "这里是您公司的主Slogan",
      subtitle:
        "这里是您的副Slogan,示例文字可以多一点<br>注意!注意！轻量版没有下面搜索框里的运价查询！！其他没差别！！",
    });

    const aboutContent = ref(
      '上海沃行航运有限公司，已正式获中国交通运输部认可，荣膺无船承运人（NVOCC）资质。凭借专业与实力，公司以"上海沃行"之名广为人知，且作为上海航运交易所(Shanghai Shipping Exchange)的正式会员，我们持续专注于海运、空运领域，深耕中国至日本市场，业务规模持续扩展，服务品质稳步提升。展望未来，我们将坚守初心，致力于优化货物运输流程，不断提升运输效率与服务质量，为全球客户打造更卓越、更高效的物流体验。'
    );

    // 船期表数据
    const scheduleItems = ref([
      { title: "2025年3月 上海港 船期表", updateTime: "2025-02-25 10:50" },
      { title: "2025年3月 大谷港 船期表", updateTime: "2025-02-21 16:47" },
      { title: "2025年3月 天津/大连港 船期表", updateTime: "2025-02-21 16:43" },
      { title: "2025年3月 石岛/连云/青岛港 船期表", updateTime: "2025-02-21 16:43" },
      { title: "2025年3月 宁波/牛满港 船期表", updateTime: "2025-02-21 16:43" },
    ]);

    // 自动轮播
    let slideInterval: number | null = null;

    const startSlideShow = () => {
      slideInterval = window.setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % slides.value.length;
      }, 5000);
    };

    const setCurrentSlide = (index: number) => {
      currentSlide.value = index;

      // 重置自动轮播计时器
      if (slideInterval) {
        clearInterval(slideInterval);
        startSlideShow();
      }
    };

    onMounted(() => {
      startSlideShow();
    });

    onBeforeUnmount(() => {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    });

    return {
      currentSlide,
      slides,
      heroContent,
      aboutContent,
      scheduleItems,
      setCurrentSlide,
    };
  },
});
</script>

<style scoped>
.hero {
  background-color: #f5f5f5;
  position: relative;
  height: 900px;
  margin-top: 0;
  padding-top: 0;
}

.hero-slider {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease;
  background-size: cover;
  background-position: center;
}

.slide.active {
  opacity: 1;
}

/* 将Slogan从居中改为靠左对齐 */
.hero-content {
  position: relative;
  z-index: 10;
  text-align: left; /* 改为左对齐 */
  padding-top: 200px;
  color: white;
  width: 100%;
  max-width: 1000px; /* 增加最大宽度 */
  margin: 0 auto;
  padding-left: 40px; /* 添加左侧内边距 */
}

.hero-content h1 {
  font-size: 48px;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-weight: bold;
  line-height: 1.2;
  text-align: left; /* 确保左对齐 */
}

.hero-content p {
  font-size: 22px;
  margin-bottom: 40px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  line-height: 1.5;
  text-align: left; /* 确保左对齐 */
}

/* 搜索表单样式调整 */
.hero-content :deep(.search-form) {
  position: relative;
  z-index: 20;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  max-width: 800px;
  margin-left: 0; /* 左对齐 */
  margin-right: auto;
  text-align: left; /* 确保内容左对齐 */
}

/* 调整搜索卡片定位，确保不会被遮挡 */
.hero-content :deep(.search-form) {
  position: relative;
  z-index: 20;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/* 调整搜索表单尺寸确保在各种屏幕尺寸下正常显示 */
@media (max-width: 992px) {
  .hero {
    height: 1000px;
  }

  .hero-content {
    padding-top: 150px;
  }

  .hero-content h1 {
    font-size: 36px;
  }

  .hero-content p {
    font-size: 18px;
  }

  .hero-content :deep(.search-form) {
    margin-top: 30px;
  }
}

/* 确保轮播指示器不被搜索框遮挡 */
.slider-dots {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
}

.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  margin: 0 5px;
  cursor: pointer;
}

.dot.active {
  background: white;
}

/* 服务卡片样式 */
.services-section {
  padding: 80px 0;
  background-color: #f9f9f9;
}

.section-title {
  text-align: center;
  margin-bottom: 50px;
  font-size: 32px;
  font-weight: 600;
  color: #333;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.service-card {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.service-icon {
  font-size: 40px;
  margin-bottom: 20px;
  color: #0056b3;
}

.service-card h3 {
  font-size: 22px;
  margin-bottom: 15px;
  color: #333;
}

.service-card p {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.service-link {
  color: #0056b3;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
}

.service-link i {
  margin-left: 5px;
  transition: transform 0.2s ease;
}

.service-link:hover i {
  transform: translateX(5px);
}

/* 船期表样式 */
.schedule-section {
  padding: 70px 0;
  background-color: #fff;
}

.schedule-table {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.schedule-header {
  display: flex;
  background-color: #f5f5f5;
  padding: 15px 20px;
  font-weight: 600;
}

.schedule-row {
  display: flex;
  padding: 15px 20px;
  border-top: 1px solid #eee;
}

.schedule-col {
  flex: 1;
}

.schedule-col.title {
  flex: 3;
  color: #0056b3;
}

.schedule-col.update-time {
  text-align: right;
  color: #777;
}

.view-more-row {
  padding: 15px 20px;
  text-align: right;
  border-top: 1px solid #eee;
}

.view-more {
  color: #0056b3;
  text-decoration: none;
  font-weight: 500;
}

/* 合作伙伴部分 */
.partners-section {
  padding: 60px 0 80px; /* 增加底部内边距 */
  background-color: #f5f7fa;
  margin-bottom: 30px; /* 增加底部外边距 */
}

/* 确保 logo 墙现在在底部 */
.partners-slider {
  overflow: hidden;
  position: relative;
  height: 120px;
  margin-top: 20px;
}

.hero-section {
  position: relative;
  width: 100%;
  height: 500px; /* 根据实际轮播图高度调整 */
}

.search-container {
  position: absolute;
  left: 50%;
  bottom: -70px; /* 调整搜索框位置，使其部分覆盖在轮播图上 */
  transform: translateX(-50%);
  width: 100%;
  max-width: 1200px;
  z-index: 10;
}

/* 补充响应式调整 */
@media (max-width: 1240px) {
  .search-container {
    width: 95%;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 400px;
  }

  .search-container {
    bottom: -150px;
  }
}
</style>
