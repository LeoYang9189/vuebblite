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

          <div class="search-wrapper">
            <div class="search-card">
              <!-- 主选项卡 -->
              <div class="main-tabs">
                <div
                  class="main-tab"
                  :class="{ active: activeSearchTab === 'tracking' }"
                  @click="switchSearchTab('tracking')"
                >
                  {{ t('tracking.title') }}
                </div>
                <div
                  class="main-tab"
                  :class="{ active: activeSearchTab === 'schedule' }"
                  @click="switchSearchTab('schedule')"
                >
                  {{ t('service.schedule.title') }}
                </div>
                <div
                  class="main-tab"
                  :class="{ active: activeSearchTab === 'price' }"
                  @click="switchSearchTab('price')"
                >
                  {{ t('service.price.title') }}
                </div>
              </div>

              <!-- 二级标签栏 - 仅在货物追踪时显示 -->
              <div v-if="activeSearchTab === 'tracking'" class="sub-tabs">
                <div
                  class="sub-tab"
                  :class="{ active: activeTrackingType === 'order' }"
                  @click="switchTrackingType('order')"
                >
                  {{ t('tracking.searchType.order') }}
                </div>
                <div
                  class="sub-tab"
                  :class="{ active: activeTrackingType === 'container' }"
                  @click="switchTrackingType('container')"
                >
                  {{ t('tracking.searchType.container') }}
                </div>
              </div>

              <!-- 添加船期查询的二级选项卡 -->
              <div v-if="activeSearchTab === 'schedule'" class="sub-tabs">
                <div
                  class="sub-tab"
                  :class="{ active: activeScheduleType === 'port' }"
                  @click="switchScheduleType('port')"
                >
                  {{ t('service.schedule.byPort') }}
                </div>
                <div
                  class="sub-tab"
                  :class="{ active: activeScheduleType === 'vessel' }"
                  @click="switchScheduleType('vessel')"
                >
                  {{ t('service.schedule.byVessel') }}
                </div>
              </div>

              <!-- 船期查询的港口搜索框 -->
              <div
                v-if="activeSearchTab === 'schedule' && activeScheduleType === 'port'"
                class="port-search-group"
              >
                <div class="port-inputs">
                  <input
                    type="text"
                    :placeholder="t('service.schedule.departurePort')"
                    v-model="departurePort"
                    class="port-input"
                  />
                  <div class="port-separator">
                    <i class="fas fa-long-arrow-alt-right"></i>
                  </div>
                  <input
                    type="text"
                    :placeholder="t('service.schedule.destinationPort')"
                    v-model="destinationPort"
                    class="port-input"
                  />
                </div>
                <button class="search-btn" @click="handleScheduleSearch">
                  <i class="fas fa-search"></i> {{ t('common.search') }}
                </button>
              </div>

              <!-- 运价查询专用输入组件 -->
              <div v-if="activeSearchTab === 'price'" class="price-search-group">
                <div class="price-inputs">
                  <input
                    type="text"
                    :placeholder="t('service.price.departurePort')"
                    v-model="priceOrigin"
                    class="price-input"
                  />
                  <div class="port-separator">
                    <i class="fas fa-long-arrow-alt-right"></i>
                  </div>
                  <input
                    type="text"
                    :placeholder="t('service.price.destinationPort')"
                    v-model="priceDestination"
                    class="price-input"
                  />
                  <div class="port-separator">
                    <i class="fas fa-box"></i>
                  </div>
                  <input
                    type="text"
                    :placeholder="t('service.price.containerInfo')"
                    v-model="priceContainer"
                    class="price-input container-input"
                  />
                </div>
                <button class="search-btn" @click="handlePriceSearch">
                  <i class="fas fa-search"></i> {{ t('common.search') }}
                </button>
              </div>

              <!-- 普通搜索框 -->
              <div
                v-if="
                  !(activeSearchTab === 'schedule' && activeScheduleType === 'port') &&
                  activeSearchTab !== 'price'
                "
                class="search-input-group"
              >
                <input
                  type="text"
                  :placeholder="getSearchPlaceholder()"
                  v-model="searchQuery"
                  class="search-input"
                />
                <button class="search-btn" @click="handleSearch">
                  <i class="fas fa-search"></i> {{ t('common.search') }}
                </button>
              </div>

              <!-- 添加服务按钮到搜索卡片底部 -->
              <div class="quick-services">
                <div
                  class="service-button"
                  @mouseenter="showQrCode('weixin')"
                  @mouseleave="hideQrCode"
                >
                  <div class="service-button-icon">
                    <i class="fab fa-weixin"></i>
                  </div>
                  <div class="service-button-text">{{ t('home.services.wechat.official') }}</div>
                </div>
                <div
                  class="service-button"
                  @mouseenter="showQrCode('miniprogram')"
                  @mouseleave="hideQrCode"
                >
                  <div class="service-button-icon">
                    <i class="fas fa-mobile-alt"></i>
                  </div>
                  <div class="service-button-text">{{ t('home.services.wechat.miniprogram') }}</div>
                </div>
                <div class="service-button" @click="openCustomerService">
                  <div class="service-button-icon">
                    <i class="fas fa-headset"></i>
                  </div>
                  <div class="service-button-text">{{ t('home.services.customerService') }}</div>
                </div>
              </div>

              <!-- 悬浮二维码显示区域 -->
              <div class="qrcode-popup" v-if="activeQrCode" :style="qrCodeStyle">
                <img :src="getQrCodeImage()" :alt="t('home.services.wechat.qrcode')" class="qrcode-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 我们的服务部分 -->
    <section class="services-section">
      <div class="container">
        <h2 class="section-title">{{ t('home.services.title') }}</h2>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">
              <i class="fas fa-ship"></i>
            </div>
            <h3>{{ t('home.services.booking.title') }}</h3>
            <p>{{ t('home.services.booking.description') }}</p>
            <router-link to="/service?service=booking" class="service-link"
              >{{ t('common.more') }} <i class="fas fa-arrow-right"></i
            ></router-link>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <i class="fas fa-file-contract"></i>
            </div>
            <h3>{{ t('home.services.customs.title') }}</h3>
            <p>{{ t('home.services.customs.description') }}</p>
            <router-link to="/service?service=customs" class="service-link"
              >{{ t('common.more') }} <i class="fas fa-arrow-right"></i
            ></router-link>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <i class="fas fa-warehouse"></i>
            </div>
            <h3>{{ t('home.services.warehouse.title') }}</h3>
            <p>{{ t('home.services.warehouse.description') }}</p>
            <router-link to="/service?service=warehouse" class="service-link"
              >{{ t('common.more') }} <i class="fas fa-arrow-right"></i
            ></router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 将通知与船舶计划替换为资讯中心卡片轮播 -->
    <section class="news-section">
      <div class="container">
        <h2 class="section-title">{{ t('news.title') }}</h2>

        <div class="news-carousel">
          <div class="news-cards">
            <div
              v-for="(news, index) in newsItems.slice(0, 6)"
              :key="index"
              class="news-card"
              @click="navigateToNews(news.id)"
            >
              <div class="news-card-image">
                <img
                  :src="news.image || require('@/assets/images/news-placeholder.jpg')"
                  :alt="t('news.imageAlt')"
                />
              </div>
              <div class="news-card-content">
                <h3 class="news-card-title">{{ news.title }}</h3>
                <p class="news-card-date">{{ news.date }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="view-more-container">
          <router-link to="/news" class="view-more">
            {{ t('common.more') }} <i class="fas fa-angle-right"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 合作伙伴滚动 -->
    <section class="partners-section">
      <div class="container">
        <h2 class="section-title">{{ t('about.partners') }}</h2>
        <div class="partners-slider">
          <div class="partners-track track-row-1">
            <div v-for="i in 16" :key="`partner1-${i}`" class="partner-logo">
              <img src="@/assets/images/logo.png" :alt="t('about.partnerLogo')" />
            </div>
          </div>
          <div class="partners-track track-row-2">
            <div v-for="i in 16" :key="`partner2-${i}`" class="partner-logo">
              <img src="@/assets/images/logo.png" :alt="t('about.partnerLogo')" />
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
            <h2 class="about-title">{{ t('about.title') }}</h2>
            <p class="about-company">{{ t('about.companyProfile.content') }}</p>
          </div>
        </div>
        <div class="contact-area">
          <div class="contact-content">
            <h2>{{ t('about.contact') }}</h2>
            <p class="contact-desc">{{ t('service.inquiry.desc') }}</p>
            <div class="contact-info about-section-contact">
              <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ t('footer.address') }}: {{ t('about.companyAddress') }}</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-phone-alt"></i>
                <span>{{ t('common.phone') }}: 021-65143931转826</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>{{ t('common.email') }}: b2b-service@walltechsystem.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "HomePage",
  setup() {
    const currentSlide = ref(0);
    const slides = ref([
      { image: require("@/assets/images/bg1.jpg") },
      { image: require("@/assets/images/bg2.jpg") },
    ]);

    const heroContent = ref({
      title: "SloganSloganSloganSlogan",
      subtitle:
        "slogan detailslogan detailslogan detailslogan detailslogan detailslogan detailslogan detail",
    });

    const aboutContent = ref(
      '上海沃行航运有限公司，已正式获中国交通运输部认可，荣膺无船承运人（NVOCC）资质。凭借专业与实力，公司以"上海沃行"之名广为人知，且作为上海航运交易所(Shanghai Shipping Exchange)的正式会员，我们持续专注于海运、空运领域，深耕中国至日本市场，业务规模持续扩展，服务品质稳步提升。展望未来，我们将坚守初心，致力于优化货物运输流程，不断提升运输效率与服务质量，为全球客户打造更卓越、更高效的物流体验。'
    );

    // 船期表数据
    const scheduleItems = ref([
      { id: 1, title: "2025年3月 上海港 船期表", updateTime: "2025-02-25 10:50" },
      { id: 2, title: "2025年3月 大谷港 船期表", updateTime: "2025-02-21 16:47" },
      { id: 3, title: "2025年3月 天津/大连港 船期表", updateTime: "2025-02-21 16:43" },
      { id: 4, title: "2025年3月 石岛/连云/青岛港 船期表", updateTime: "2025-02-21 16:43" },
      { id: 5, title: "2025年3月 宁波/牛满港 船期表", updateTime: "2025-02-21 16:43" },
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

    const router = useRouter();

    const navigateToNews = (id: number) => {
      router.push(`/news/${id}`);
    };

    const searchQuery = ref("");
    const activeSearchTab = ref("tracking");
    const activeTrackingType = ref("order");
    const activeScheduleType = ref("port");
    const departurePort = ref("");
    const destinationPort = ref("");

    const switchSearchTab = (tab: string) => {
      activeSearchTab.value = tab;
      // 如果切换到货物追踪，默认选中订单号查询
      if (tab === "tracking") {
        activeTrackingType.value = "order";
      }
    };

    const switchTrackingType = (type: string) => {
      activeTrackingType.value = type;
    };

    const switchScheduleType = (type: string) => {
      activeScheduleType.value = type;
    };

    const getSearchPlaceholder = () => {
      if (activeSearchTab.value === "tracking") {
        return activeTrackingType.value === "order" ? "请输入订单号" : "请输入箱号";
      } else if (activeSearchTab.value === "schedule") {
        return activeScheduleType.value === "port" ? "请输入港口" : "请输入船名";
      } else {
        return ""; // 运价查询不使用这个输入框了
      }
    };

    const handleSearch = () => {
      if (!searchQuery.value.trim()) return;

      if (activeSearchTab.value === "tracking") {
        router.push({
          path: "/tracking",
          query: {
            type: activeTrackingType.value,
            query: searchQuery.value,
          },
        });
      } else if (activeSearchTab.value === "schedule" && activeScheduleType.value === "vessel") {
        router.push({
          path: "/schedule",
          query: {
            type: "vessel",
            query: searchQuery.value,
          },
        });
      } else if (activeSearchTab.value === "price") {
        router.push({
          path: "/price",
          query: {
            query: searchQuery.value,
          },
        });
      }
    };

    const handleScheduleSearch = () => {
      if (activeScheduleType.value === "port") {
        if (!departurePort.value.trim() || !destinationPort.value.trim()) {
          alert("请输入起运港和目的港");
          return;
        }

        router.push({
          path: "/schedule",
          query: {
            type: "port",
            departure: departurePort.value,
            destination: destinationPort.value,
          },
        });
      }
    };

    // 添加二维码显示逻辑
    const activeQrCode = ref<string | null>(null);
    const qrCodeStyle = ref({
      opacity: "0",
      visibility: "hidden",
    });

    const showQrCode = (type: string) => {
      activeQrCode.value = type;
      // 设置为可见
      qrCodeStyle.value = {
        opacity: "1",
        visibility: "visible",
      };
      console.log("显示二维码:", type); // 添加调试日志
    };

    const hideQrCode = () => {
      // 设置为不可见
      qrCodeStyle.value = {
        opacity: "0",
        visibility: "hidden",
      };
      console.log("隐藏二维码"); // 添加调试日志

      // 短暂延迟后清除状态
      setTimeout(() => {
        activeQrCode.value = null;
      }, 300);
    };

    const getQrCodeImage = () => {
      switch (activeQrCode.value) {
        case "weixin":
          // 临时使用logo图片代替二维码，您需要稍后替换成真实二维码
          return require("@/assets/images/logo.png");
        case "miniprogram":
          // 临时使用logo图片代替二维码，您需要稍后替换成真实二维码
          return require("@/assets/images/logo.png");
        default:
          return "";
      }
    };

    // 添加在线客服点击函数
    const openCustomerService = () => {
      // 这里可以根据实际需求进行操作
      // 例如打开聊天窗口或跳转到客服页面
      window.open("https://example.com/customer-service", "_blank");
      // 或者触发一个聊天组件
      // chatComponent.value = true;
    };

    // 添加运价查询所需的数据
    const priceOrigin = ref("");
    const priceDestination = ref("");
    const priceContainer = ref("");

    // 处理运价查询
    const handlePriceSearch = () => {
      // 验证必填项
      if (!priceOrigin.value.trim() || !priceDestination.value.trim()) {
        alert("请输入起运港和目的港");
        return;
      }

      // 跳转到运价查询页面并传递参数
      router.push({
        path: "/price",
        query: {
          origin: priceOrigin.value,
          destination: priceDestination.value,
          container: priceContainer.value,
        },
      });
    };

    // 添加新闻数据
    const newsItems = ref([
      {
        id: 1,
        title: "2023年航运业发展趋势分析报告",
        date: "2023-06-15",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
      {
        id: 2,
        title: "上海港口集装箱吞吐量再创新高",
        date: "2023-06-10",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
      {
        id: 3,
        title: "航运业环保新规实施，企业如何应对？",
        date: "2023-06-05",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
      {
        id: 4,
        title: "日本航线最新运价调整通知",
        date: "2023-05-28",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
      {
        id: 5,
        title: "全球供应链最新动态与展望",
        date: "2023-05-20",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
      {
        id: 6,
        title: '沃行航运荣获"2023年度优质服务供应商"奖项',
        date: "2023-05-15",
        image: require("@/assets/images/news-placeholder.jpg"),
      },
    ]);

    // 新闻轮播逻辑
    const currentNewsPage = ref(0);
    const newsPerPage = 3; // 每页显示3个新闻卡片
    const totalNewsPages = computed(() =>
      Math.ceil(Math.min(newsItems.value.length, 6) / newsPerPage)
    );

    const nextNewsSlide = () => {
      if (currentNewsPage.value < totalNewsPages.value - 1) {
        currentNewsPage.value++;
      } else {
        currentNewsPage.value = 0; // 循环回到第一页
      }
    };

    const prevNewsSlide = () => {
      if (currentNewsPage.value > 0) {
        currentNewsPage.value--;
      } else {
        currentNewsPage.value = totalNewsPages.value - 1; // 循环到最后一页
      }
    };

    // 每5秒自动切换新闻轮播
    let newsInterval: number | null = null;

    onMounted(() => {
      startSlideShow();

      // 启动新闻轮播
      newsInterval = window.setInterval(() => {
        nextNewsSlide();
      }, 5000);
    });

    onBeforeUnmount(() => {
      if (slideInterval) {
        clearInterval(slideInterval);
      }

      // 清除新闻轮播定时器
      if (newsInterval) {
        clearInterval(newsInterval);
      }
    });

    const i18n = useI18n();

    return {
      currentSlide,
      slides,
      heroContent,
      aboutContent,
      scheduleItems,
      setCurrentSlide,
      navigateToNews,
      searchQuery,
      activeSearchTab,
      activeTrackingType,
      activeScheduleType,
      departurePort,
      destinationPort,
      switchSearchTab,
      switchTrackingType,
      switchScheduleType,
      getSearchPlaceholder,
      handleSearch,
      handleScheduleSearch,
      activeQrCode,
      qrCodeStyle,
      showQrCode,
      hideQrCode,
      getQrCodeImage,
      openCustomerService,
      priceOrigin,
      priceDestination,
      priceContainer,
      handlePriceSearch,
      newsItems,
      currentNewsPage,
      nextNewsSlide,
      prevNewsSlide,
      totalNewsPages,
      newsPerPage,
      t: i18n.t,
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

/* 完全重写搜索卡片样式 */
.search-wrapper {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.search-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 30px;
}

.main-tabs {
  display: flex;
  border-bottom: 1px solid #e9e9e9;
}

.main-tab {
  padding: 15px 20px;
  cursor: pointer;
  color: #666;
  font-weight: 500;
  position: relative;
  transition: color 0.3s;
}

.main-tab.active {
  color: #1e5aa0;
}

.main-tab.active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #1e5aa0;
}

.sub-tabs {
  padding: 15px 20px 0;
  display: flex;
  gap: 10px;
}

.sub-tab {
  padding: 8px 20px;
  background: #f2f2f2;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

.sub-tab.active {
  background: #1e5aa0;
  color: white;
}

.search-input-group {
  display: flex;
  padding: 15px 20px 20px;
}

.search-input {
  flex: 1;
  border: 1px solid #ddd;
  border-right: none;
  border-radius: 4px 0 0 4px;
  padding: 0 15px;
  height: 42px;
  font-size: 14px;
  outline: none;
}

.search-btn {
  width: auto;
  border: none;
  background: #1e5aa0;
  color: white;
  border-radius: 0 4px 4px 0;
  padding: 0 25px;
  cursor: pointer;
  font-size: 14px;
  height: 42px;
  display: flex;
  align-items: center;
}

.search-btn i {
  margin-right: 5px;
}

/* 重写底部服务按钮样式 */
.service-buttons-section {
  padding: 30px 0;
  background-color: #f9f9f9;
  border-top: 1px solid #eee;
  position: relative;
  z-index: 10; /* 确保显示在最上层 */
}

.service-buttons {
  display: flex;
  justify-content: center;
  gap: 80px;
  margin: 0;
  padding: 20px 0;
}

.service-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.service-button:hover .service-button-icon {
  transform: translateY(-5px);
}

.service-button-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #1e5aa0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  transition: transform 0.3s;
}

.service-button-icon i {
  font-size: 24px;
}

.service-button-text {
  font-size: 13px;
  color: #666;
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
  position: relative; /* 添加定位，用于背景图定位 */
  overflow: hidden; /* 确保背景图不超出卡片边界 */
  z-index: 1; /* 设置z-index确保内容在背景图之上 */
}

/* 添加背景图通用样式 */
.service-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.08; /* 非常低的透明度 */
  z-index: -1; /* 放在内容后面 */
  transition: opacity 0.3s ease;
}

/* 鼠标悬停时略微增加背景图透明度 */
.service-card:hover::before {
  opacity: 0.12;
}

/* 为每个卡片设置不同的背景图 */
.service-card:nth-child(1)::before {
  background-image: url("@/assets/images/fuwu1.jpg");
}

.service-card:nth-child(2)::before {
  background-image: url("@/assets/images/fuwu2.jpg");
}

.service-card:nth-child(3)::before {
  background-image: url("@/assets/images/fuwu3.jpg");
}

/* 强化卡片内容，确保在背景图上清晰可见 */
.service-card h3 {
  position: relative;
  z-index: 2;
}

.service-card p {
  position: relative;
  z-index: 2;
}

.service-link {
  position: relative;
  z-index: 2;
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

/* 船期表样式优化 */
.schedule-section {
  padding: 70px 0;
  background-color: #fff;
}

.schedule-table {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px; /* 增加底部间距，与"查看更多"分开 */
}

.schedule-header {
  display: flex;
  background-color: #f5f5f5;
  padding: 15px 20px;
  font-weight: 700;
  color: #000;
}

.schedule-header .schedule-col {
  text-align: center; /* 确保标题居中 */
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
  text-align: left; /* 确保内容左对齐 */
}

/* 标题行中的"标题"文本样式 */
.schedule-header .schedule-col.title {
  color: #333333; /* 标题行中的"标题"文本为深灰色 */
}

/* 内容行中的标题文本样式 */
.schedule-row .schedule-col.title {
  color: #0056b3; /* 内容行中的标题文本为蓝色，表示可点击 */
  cursor: pointer; /* 鼠标样式显示为手指，表示可点击 */
  transition: color 0.2s ease; /* 添加颜色过渡效果 */
}

/* 内容行标题的悬停效果 */
.schedule-row:hover .schedule-col.title {
  color: #003d82; /* 悬停时颜色变深 */
  text-decoration: underline; /* 添加下划线强调可点击 */
}

.schedule-col.update-time {
  text-align: right;
  color: #777;
}

/* 将"查看更多"完全移出表格样式 */
.view-more-container {
  text-align: right;
  padding: 15px 0; /* 移除左右内边距 */
  border-top: none; /* 移除上边框 */
  margin-top: 10px; /* 增加与表格的间距 */
}

.view-more {
  color: #0056b3;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  padding: 8px 20px; /* 增加内边距 */
  background-color: #f0f8ff; /* 添加背景色 */
  border-radius: 4px; /* 添加圆角 */
  transition: all 0.3s ease; /* 添加过渡效果 */
}

.view-more:hover {
  background-color: #e0f0ff; /* 鼠标悬停时背景色变化 */
}

.view-more i {
  margin-left: 5px;
  transition: transform 0.2s ease;
}

.view-more:hover i {
  transform: translateX(4px);
}

/* 合作伙伴部分 */
.partners-section {
  padding: 60px 0 80px;
  background-color: #f5f7fa;
  margin-bottom: 30px;
  position: relative; /* 添加定位上下文 */
  z-index: 5; /* 确保合作伙伴部分有明确的层叠顺序 */
}

/* 增加logo墙容器的高度，确保能容纳两行logo */
.partners-slider {
  overflow: hidden;
  position: relative;
  height: 240px; /* 增加高度，从120px增加到240px */
  margin-top: 20px;
  margin-bottom: 20px; /* 添加底部间距 */
}

/* 确保每行logo轨道正确显示 */
.partners-track {
  display: flex;
  position: relative;
  z-index: 6; /* 确保logo在关于我们之上 */
}

.track-row-1 {
  margin-bottom: 20px; /* 两行之间的间距 */
}

.track-row-2 {
  margin-top: 10px; /* 与第一行的间距 */
}

/* 确保"关于我们"部分不会覆盖合作伙伴 */
.about-contact {
  position: relative;
  z-index: 4; /* 低于合作伙伴部分 */
  margin-top: 20px; /* 确保与上方有足够间距 */
}

.partner-logo {
  margin: 0 15px;
  height: 80px; /* 设置固定高度 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.partner-logo img {
  max-height: 60px;
  width: auto;
  filter: grayscale(100%); /* 灰度滤镜，常见于合作伙伴logo展示 */
  transition: filter 0.3s ease;
}

.partner-logo:hover img {
  filter: grayscale(0%); /* 鼠标悬停时显示彩色 */
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

/* 修复服务按钮尺寸和间距问题 */
.quick-services {
  display: flex;
  justify-content: center;
  gap: 100px; /* 增加按钮之间的间距，从50px增加到100px */
  margin-top: 25px;
  border-top: 1px solid #f0f0f0;
  padding-top: 20px;
}

.service-button-icon {
  width: 25px; /* 缩小图标大小，从50px减至25px */
  height: 25px; /* 缩小图标大小，从50px减至25px */
  border-radius: 50%;
  background: #1e5aa0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  transition: transform 0.3s;
}

.service-button-icon i {
  font-size: 12px; /* 缩小图标内部字体大小，从20px减至12px */
}

/* 确保二维码弹出层正常显示 */
.qrcode-popup {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  opacity: 0; /* 初始状态为不可见 */
  visibility: hidden; /* 初始状态为不可见 */
  transition: opacity 0.3s, visibility 0.3s;
  margin-bottom: 10px;
  z-index: 100;
}

/* 添加指向箭头 */
.qrcode-popup::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 8px;
  border-style: solid;
  border-color: white transparent transparent transparent;
}

.qrcode-image {
  width: 120px;
  height: 120px;
  display: block;
}

/* 删除之前错误的底部服务按钮样式 */
.service-buttons-section {
  display: none;
}

/* 港口搜索框样式 */
.port-search-group {
  display: flex;
  padding: 15px 20px 20px;
}

.port-inputs {
  display: flex;
  align-items: center;
  flex: 1;
}

.port-input {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 15px;
  height: 42px;
  font-size: 14px;
  outline: none;
}

.port-separator {
  padding: 0 15px;
  color: #666;
}

/* 当显示港口搜索时，右侧按钮边框调整 */
.port-search-group .search-btn {
  border-radius: 4px;
  margin-left: 10px;
}

/* 运价查询搜索框样式 */
.price-search-group {
  display: flex;
  padding: 15px 20px 20px;
}

.price-inputs {
  display: flex;
  align-items: center;
  flex: 1;
}

.price-input {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 15px;
  height: 42px;
  font-size: 14px;
  outline: none;
}

.container-input {
  flex: 0.8; /* 箱型箱量输入框稍窄一些 */
}

/* 当显示运价搜索时，右侧按钮边框调整 */
.price-search-group .search-btn {
  border-radius: 4px;
  margin-left: 10px;
}

/* 资讯中心卡片轮播样式 */
.news-section {
  padding: 70px 0;
  background-color: #fff;
}

.news-carousel {
  position: relative;
  margin: 30px 0;
  overflow: hidden;
}

.news-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  transition: transform 0.5s ease;
}

.news-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.news-card-image {
  height: 180px;
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
  padding: 15px;
}

.news-card-title {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
  line-height: 1.4;
  height: 45px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.news-card-date {
  font-size: 12px;
  color: #999;
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
}
</style>
