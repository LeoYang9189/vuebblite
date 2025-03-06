<template>
  <div class="service-page">
    <!-- 使用与TrackingPage完全相同的class名称和HTML结构 -->
    <div class="tracking-banner">
      <div class="container">
        <h1 class="tracking-title">{{ t('service.title') }}</h1>
      </div>
    </div>

    <!-- 服务导航 -->
    <section class="service-nav-section">
      <div class="service-navigation">
        <div
          v-for="nav in navItems"
          :key="nav.id"
          class="service-nav-item"
          :class="{ active: activeService === nav.id }"
          :data-service="nav.id"
          @click="switchService(nav.id)"
        >
          <div class="service-nav-icon">
            <i :class="nav.icon"></i>
          </div>
          <div class="service-nav-text">{{ t(`service.${nav.id}.title`) }}</div>
        </div>
      </div>
    </section>

    <!-- 服务详情内容 -->
    <section class="service-details-section">
      <!-- 订舱服务详情 -->
      <div
        id="booking-service"
        class="service-detail"
        :class="{ active: activeService === 'booking' }"
      >
        <div class="service-header">
          <h2>{{ t('service.booking.title') }}</h2>
          <p>{{ t('service.booking.subtitle') }}</p>
        </div>

        <div class="service-content">
          <div class="service-intro">
            <div class="intro-image">
              <img src="@/assets/images/booking-service.jpg" :alt="t('service.booking.title')" />
            </div>
            <div class="intro-text">
              <h3>{{ t('service.overview') }}</h3>
              <p>{{ t('service.booking.description.part1') }}</p>
              <p>{{ t('service.booking.description.part2') }}</p>
            </div>
          </div>

          <!-- 服务特点 -->
          <div class="service-features">
            <h3 class="section-subtitle">{{ t('service.features') }}</h3>
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-ship"></i>
                </div>
                <h4>{{ t('service.booking.features.globalCoverage') }}</h4>
                <p>{{ t('service.booking.features.globalCoverageDesc') }}</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-clock"></i>
                </div>
                <h4>{{ t('service.booking.features.quickConfirmation') }}</h4>
                <p>{{ t('service.booking.features.quickConfirmationDesc') }}</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-box"></i>
                </div>
                <h4>{{ t('service.booking.features.flexibleService') }}</h4>
                <p>{{ t('service.booking.features.flexibleServiceDesc') }}</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-chart-line"></i>
                </div>
                <h4>{{ t('service.booking.features.realTimeTracking') }}</h4>
                <p>{{ t('service.booking.features.realTimeTrackingDesc') }}</p>
              </div>
            </div>
          </div>

          <!-- 服务流程 -->
          <div class="service-process">
            <h3 class="section-subtitle">{{ t('service.process') }}</h3>
            <div class="process-timeline">
              <div class="process-item">
                <div class="process-dot">
                  <span>1</span>
                </div>
                <div class="process-content">
                  <h4>{{ t('service.booking.process.step1.title') }}</h4>
                  <p>{{ t('service.booking.process.step1.desc') }}</p>
                </div>
              </div>

              <div class="process-item">
                <div class="process-dot">
                  <span>2</span>
                </div>
                <div class="process-content">
                  <h4>{{ t('service.booking.process.step2.title') }}</h4>
                  <p>{{ t('service.booking.process.step2.desc') }}</p>
                </div>
              </div>

              <div class="process-item">
                <div class="process-dot">
                  <span>3</span>
                </div>
                <div class="process-content">
                  <h4>{{ t('service.booking.process.step3.title') }}</h4>
                  <p>{{ t('service.booking.process.step3.desc') }}</p>
                </div>
              </div>

              <div class="process-item">
                <div class="process-dot">
                  <span>4</span>
                </div>
                <div class="process-content">
                  <h4>{{ t('service.booking.process.step4.title') }}</h4>
                  <p>{{ t('service.booking.process.step4.desc') }}</p>
                </div>
              </div>

              <div class="process-item">
                <div class="process-dot">
                  <span>5</span>
                </div>
                <div class="process-content">
                  <h4>{{ t('service.booking.process.step5.title') }}</h4>
                  <p>{{ t('service.booking.process.step5.desc') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 报关服务详情 -->
      <div
        id="customs-service"
        class="service-detail"
        :class="{ active: activeService === 'customs' }"
      >
        <div class="service-header">
          <h2>{{ t('service.customs.title') }}</h2>
          <p>{{ t('service.customs.subtitle') }}</p>
        </div>

        <div class="service-content">
          <div class="service-intro">
            <div class="intro-image">
              <img src="@/assets/images/customs-service.jpg" :alt="t('service.customs.title')" />
            </div>
            <div class="intro-text">
              <h3>{{ t('service.overview') }}</h3>
              <p>{{ t('service.customs.description.part1') }}</p>
              <p>{{ t('service.customs.description.part2') }}</p>
            </div>
          </div>

          <!-- 服务特点 -->
          <div class="service-features">
            <h3 class="section-subtitle">{{ t('service.features') }}</h3>
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-file-alt"></i>
                </div>
                <h4>{{ t('service.customs.features.documentation') }}</h4>
                <p>{{ t('service.customs.features.documentationDesc') }}</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-calculator"></i>
                </div>
                <h4>{{ t('service.customs.features.taxCalculation') }}</h4>
                <p>{{ t('service.customs.features.taxCalculationDesc') }}</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-check-circle"></i>
                </div>
                <h4>{{ t('service.customs.features.compliance') }}</h4>
                <p>{{ t('service.customs.features.complianceDesc') }}</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-bolt"></i>
                </div>
                <h4>{{ t('service.customs.features.fastClearance') }}</h4>
                <p>{{ t('service.customs.features.fastClearanceDesc') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 仓储服务详情 -->
      <div
        id="warehouse-service"
        class="service-detail"
        :class="{ active: activeService === 'warehouse' }"
      >
        <div class="service-header">
          <h2>{{ t('service.warehouse.title') }}</h2>
          <p>{{ t('service.warehouse.subtitle') }}</p>
        </div>

        <div class="service-content">
          <div class="service-intro">
            <div class="intro-image">
              <img src="@/assets/images/warehouse-service.jpg" :alt="t('service.warehouse.title')" />
            </div>
            <div class="intro-text">
              <h3>{{ t('service.overview') }}</h3>
              <p>{{ t('service.warehouse.description.part1') }}</p>
              <p>{{ t('service.warehouse.description.part2') }}</p>
            </div>
          </div>

          <!-- 服务特点 -->
          <div class="service-features">
            <h3 class="section-subtitle">{{ t('service.features') }}</h3>
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-warehouse"></i>
                </div>
                <h4>{{ t('service.warehouse.features.modernFacility') }}</h4>
                <p>{{ t('service.warehouse.features.modernFacilityDesc') }}</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-barcode"></i>
                </div>
                <h4>{{ t('service.warehouse.features.inventory') }}</h4>
                <p>{{ t('service.warehouse.features.inventoryDesc') }}</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-dolly"></i>
                </div>
                <h4>{{ t('service.warehouse.features.flexible') }}</h4>
                <p>{{ t('service.warehouse.features.flexibleDesc') }}</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <h4>{{ t('service.warehouse.features.security') }}</h4>
                <p>{{ t('service.warehouse.features.securityDesc') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 添加公共模块：我们的实力展示 -->
    <section class="strength-section">
      <div class="container">
        <h2 class="strength-title">{{ t('service.strength.title') }}</h2>

        <div class="strength-grid">
          <div class="strength-card">
            <div class="strength-image">
              <img src="@/assets/images/warehouse-facility.jpg" :alt="t('service.strength.facility.title')" />
            </div>
            <h3>{{ t('service.strength.facility.title') }}</h3>
            <p>{{ t('service.strength.facility.desc') }}</p>
          </div>

          <div class="strength-card">
            <div class="strength-image">
              <img src="@/assets/images/global-network.jpg" :alt="t('service.strength.network.title')" />
            </div>
            <h3>{{ t('service.strength.network.title') }}</h3>
            <p>{{ t('service.strength.network.desc') }}</p>
          </div>

          <div class="strength-card">
            <div class="strength-image">
              <img src="@/assets/images/tech-system.jpg" :alt="t('service.strength.tech.title')" />
            </div>
            <h3>{{ t('service.strength.tech.title') }}</h3>
            <p>{{ t('service.strength.tech.desc') }}</p>
          </div>

          <div class="strength-card">
            <div class="strength-image">
              <img src="@/assets/images/professional-team.jpg" :alt="t('service.strength.team.title')" />
            </div>
            <h3>{{ t('service.strength.team.title') }}</h3>
            <p>{{ t('service.strength.team.desc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 添加联系我们区域 -->
    <section class="inquiry-section">
      <div class="container">
        <div class="inquiry-content">
          <h2>{{ t('service.inquiry.title') }}</h2>
          <p>{{ t('service.inquiry.desc') }}</p>
          <a href="#" class="contact-btn">{{ t('service.inquiry.button') }}</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "ServicePage",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t } = useI18n();
    const activeService = ref("booking");

    const navItems = [
      { id: "booking", icon: "fas fa-ship" },
      { id: "customs", icon: "fas fa-file-contract" },
      { id: "warehouse", icon: "fas fa-warehouse" },
    ];

    const switchService = (serviceId: string) => {
      activeService.value = serviceId;

      // 修改URL，但不重新加载页面
      router.push({
        path: "/service",
        query: { service: serviceId },
        hash: `#${serviceId}-service`,
      });
    };

    // 处理URL参数
    const handleUrlParams = () => {
      const serviceParam = route.query.service as string;
      if (serviceParam && ["booking", "customs", "warehouse"].includes(serviceParam)) {
        activeService.value = serviceParam;
      }
    };

    onMounted(() => {
      handleUrlParams();

      // 如果有锚点，滚动到对应区域
      const hash = route.hash;
      if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 300);
        }
      }
    });

    // 监听路由变化
    watch(
      () => route.query,
      () => {
        handleUrlParams();
      }
    );

    return {
      activeService,
      navItems,
      switchService,
      t
    };
  },
});
</script>

<style scoped>
/* 完全使用与TrackingPage相同的CSS类名和属性 */
.service-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-top: 0;
  margin-top: 0;
}

.tracking-banner {
  height: 200px;
  background-image: url("@/assets/images/tracking-bg.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 0;
  margin-bottom: 50px;
}

.tracking-banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.tracking-title {
  color: white;
  font-size: 32px;
  position: relative;
  z-index: 2;
  margin: 0;
}

/* 1. 服务概述区域样式 */
.service-intro {
  display: flex;
  align-items: flex-start;
  gap: 40px;
  margin-bottom: 40px;
}

.intro-content {
  flex: 3;
  text-align: left;
}

/* 小标题样式调整 */
.section-subtitle {
  font-size: 22px;
  color: #333;
  margin-bottom: 25px;
  padding-bottom: 12px;
  border-bottom: none;
  position: relative;
  text-align: center;
}

.section-subtitle::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background-color: #1e5aa0;
}

.intro-content p {
  margin-bottom: 15px;
  line-height: 1.6;
  color: #555;
}

.intro-image-container {
  flex: 2;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  max-height: 220px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.intro-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(30, 90, 160, 0.2), transparent);
  z-index: 1;
}

/* 2. 服务流程样式 */
.service-process {
  margin: 50px 0;
}

.process-timeline {
  position: relative;
  padding: 20px 0;
}

.process-timeline::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20px;
  width: 2px;
  background-color: #e0e0e0;
  z-index: 1;
}

.process-item {
  position: relative;
  padding-left: 60px;
  margin-bottom: 30px;
  z-index: 2;
}

.process-item:last-child {
  margin-bottom: 0;
}

.process-dot {
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: 2px solid #1e5aa0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 0 0 4px rgba(30, 90, 160, 0.1);
}

.process-dot span {
  font-weight: 600;
  color: #1e5aa0;
  font-size: 18px;
}

.process-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-left: 3px solid #1e5aa0;
}

.process-content h4 {
  margin: 0 0 10px 0;
  color: #1e5aa0;
  font-size: 18px;
}

.process-content p {
  margin: 0;
  color: #666;
  line-height: 1.5;
}

/* 3. 实力展示区域样式 */
.strength-section {
  padding: 60px 0;
  background-color: #fff;
}

.strength-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 28px;
  color: #333;
  position: relative;
  padding-bottom: 15px;
}

.strength-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #1e5aa0;
}

.strength-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.strength-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.strength-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.strength-image {
  height: 200px;
  overflow: hidden;
}

.strength-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.strength-card:hover .strength-image img {
  transform: scale(1.05);
}

.strength-card h3 {
  padding: 20px 20px 10px;
  margin: 0;
  color: #1e5aa0;
  font-size: 20px;
}

.strength-card p {
  padding: 0 20px 20px;
  margin: 0;
  color: #666;
  line-height: 1.6;
}

/* 4. 联系我们区域样式 */
.inquiry-section {
  padding: 60px 0;
  background-color: #fff;
  text-align: center;
}

.inquiry-content {
  max-width: 800px;
  margin: 0 auto;
}

.inquiry-content h2 {
  font-size: 32px;
  color: #1e5aa0;
  margin-bottom: 20px;
}

.inquiry-content p {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.contact-btn {
  display: inline-block;
  background-color: #1e5aa0;
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 35px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.contact-btn:hover {
  background-color: #164785;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .service-intro {
    flex-direction: column;
  }

  .strength-grid {
    grid-template-columns: 1fr;
  }

  .inquiry-content {
    flex-direction: column;
  }
}

/* 调整页面内容宽度 */
.service-details-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.service-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 15px;
}

.strength-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.service-nav-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.inquiry-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 确保服务概述文字靠左对齐 */
.intro-text {
  text-align: left;
}

.intro-text h3 {
  text-align: left;
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
}

.intro-text h3::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 50px;
  height: 2px;
  background-color: #1e5aa0;
}

.intro-text p {
  text-align: left;
  margin-bottom: 15px;
  line-height: 1.6;
  color: #555;
}

/* 服务导航样式 */
.service-navigation {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 50px;
  padding: 20px 0;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.service-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 6px;
  min-width: 160px;
}

.service-nav-item:hover {
  background-color: #f8f9fa;
  transform: translateY(-2px);
}

.service-nav-item.active {
  background-color: #1e5aa0;
}

.service-nav-icon {
  font-size: 24px;
  margin-bottom: 10px;
  color: #1e5aa0;
  transition: color 0.3s ease;
}

.service-nav-text {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  transition: color 0.3s ease;
}

.service-nav-item.active .service-nav-icon,
.service-nav-item.active .service-nav-text {
  color: #fff;
}

/* 服务详情区域样式 */
.service-detail {
  display: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.service-detail.active {
  display: block;
  opacity: 1;
}

.service-header {
  text-align: center;
  margin-bottom: 40px;
}

.service-header h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.service-header p {
  font-size: 16px;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

/* 服务特点网格布局 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 30px;
}

.feature-item {
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 24px;
  color: #1e5aa0;
  margin-bottom: 15px;
}

.feature-item h4 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.feature-item p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .service-navigation {
    flex-direction: column;
    gap: 10px;
  }

  .service-nav-item {
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    gap: 15px;
    min-width: auto;
  }

  .service-nav-icon {
    margin-bottom: 0;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .service-intro {
    flex-direction: column;
  }

  .intro-image {
    margin-bottom: 20px;
  }

  .intro-image img {
    width: 100%;
    height: auto;
  }
}

/* 图片样式 */
.intro-image {
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.intro-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

/* 容器通用样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
