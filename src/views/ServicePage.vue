<template>
  <div class="service-page">
    <!-- 使用与TrackingPage完全相同的class名称和HTML结构 -->
    <div class="tracking-banner">
      <div class="container">
        <h1 class="tracking-title">业务介绍</h1>
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
          <div class="service-nav-text">{{ nav.title }}</div>
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
          <h2>订舱服务</h2>
          <p>专业高效的货物订舱解决方案，覆盖全球主要港口</p>
        </div>

        <div class="service-content">
          <div class="service-intro">
            <div class="intro-image">
              <img src="@/assets/images/booking-service.jpg" alt="订舱服务" />
            </div>
            <div class="intro-text">
              <h3>服务概述</h3>
              <p>
                我们提供全方位的订舱服务，让您的货物运输更加便捷高效。通过我们的B2B平台，您可以随时查询船期、舱位，并一键提交订舱申请。我们与各大船公司保持密切合作关系，确保您的货物能够按时装船发运。
              </p>
              <p>
                我们的订舱服务涵盖全球主要航线，无论您需要整箱(FCL)还是拼箱(LCL)服务，都能得到专业的支持和保障。通过数字化流程优化，我们大大缩短了订舱确认时间，提高了运输效率。
              </p>
            </div>
          </div>

          <!-- 服务特点 -->
          <div class="service-features">
            <h3 class="section-subtitle">服务特点</h3>
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-ship"></i>
                </div>
                <h4>全球航线覆盖</h4>
                <p>我们提供覆盖全球主要港口的航线服务，满足您不同航线的运输需求。</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-clock"></i>
                </div>
                <h4>快速舱位确认</h4>
                <p>借助先进的系统和专业团队，我们提供快速的舱位确认服务，缩短等待时间。</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-box"></i>
                </div>
                <h4>整箱与拼箱</h4>
                <p>无论是整箱还是拼箱货物，我们都能提供专业的订舱解决方案。</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-chart-line"></i>
                </div>
                <h4>实时数据追踪</h4>
                <p>通过我们的平台，您可以实时追踪船期变动和舱位状态，掌握最新动态。</p>
              </div>
            </div>
          </div>

          <!-- 服务流程 -->
          <div class="service-process">
            <h3 class="section-subtitle">服务流程</h3>
            <div class="process-timeline">
              <div class="process-item">
                <div class="process-dot">
                  <span>1</span>
                </div>
                <div class="process-content">
                  <h4>提交需求</h4>
                  <p>通过我们的平台或客服人员，提交您的订舱需求和相关信息。</p>
                </div>
              </div>

              <div class="process-item">
                <div class="process-dot">
                  <span>2</span>
                </div>
                <div class="process-content">
                  <h4>查询报价</h4>
                  <p>我们将为您提供最优的航线和价格方案，供您选择。</p>
                </div>
              </div>

              <div class="process-item">
                <div class="process-dot">
                  <span>3</span>
                </div>
                <div class="process-content">
                  <h4>确认订舱</h4>
                  <p>确认方案后，我们将为您完成正式订舱流程。</p>
                </div>
              </div>

              <div class="process-item">
                <div class="process-dot">
                  <span>4</span>
                </div>
                <div class="process-content">
                  <h4>舱位确认</h4>
                  <p>获取船公司的舱位确认并通知您相关装货信息。</p>
                </div>
              </div>

              <div class="process-item">
                <div class="process-dot">
                  <span>5</span>
                </div>
                <div class="process-content">
                  <h4>追踪管理</h4>
                  <p>全程追踪货物状态，确保运输顺利完成。</p>
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
          <h2>报关服务</h2>
          <p>专业的通关解决方案，简化您的进出口流程</p>
        </div>

        <div class="service-content">
          <div class="service-intro">
            <div class="intro-image">
              <img src="@/assets/images/customs-service.jpg" alt="报关服务" />
            </div>
            <div class="intro-text">
              <h3>服务概述</h3>
              <p>
                我们提供全面的进出口报关服务，帮助您的货物顺利通过海关检查。凭借丰富的经验和专业知识，我们能够处理各种复杂的报关情况，确保文件准确无误，手续合规合法。
              </p>
              <p>
                我们的报关团队熟悉各国海关规定和进出口政策，能够为您提供最及时、最专业的报关建议，帮助您避免因文件不合规而导致的货物滞留、罚款等问题。
              </p>
            </div>
          </div>

          <!-- 服务特点 -->
          <div class="service-features">
            <h3 class="section-subtitle">服务特点</h3>
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-file-alt"></i>
                </div>
                <h4>文件准备</h4>
                <p>我们帮助您准备所有必要的报关文件，确保内容准确无误。</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-calculator"></i>
                </div>
                <h4>税费计算</h4>
                <p>专业计算进出口税费，提供最优化的税费解决方案。</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-check-circle"></i>
                </div>
                <h4>合规检查</h4>
                <p>严格审核所有文件，确保符合目的国和出发国的海关要求。</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-bolt"></i>
                </div>
                <h4>快速通关</h4>
                <p>优化通关流程，提高通关速度，减少货物滞留时间。</p>
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
          <h2>仓储服务</h2>
          <p>安全可靠的仓储解决方案，满足您的全球仓储需求</p>
        </div>

        <div class="service-content">
          <div class="service-intro">
            <div class="intro-image">
              <img src="@/assets/images/warehouse-service.jpg" alt="仓储服务" />
            </div>
            <div class="intro-text">
              <h3>服务概述</h3>
              <p>
                我们提供全方位的仓储管理服务，拥有位于主要港口城市的现代化仓库设施。无论是短期存储还是长期仓储，我们都能为您的货物提供安全、专业的保障。
              </p>
              <p>
                我们的仓储服务配备先进的仓库管理系统(WMS)，实现对货物的精确追踪和高效管理。我们的专业团队确保您的货物得到妥善保管，并根据您的需求提供灵活的存储解决方案。
              </p>
            </div>
          </div>

          <!-- 服务特点 -->
          <div class="service-features">
            <h3 class="section-subtitle">服务特点</h3>
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-warehouse"></i>
                </div>
                <h4>现代化设施</h4>
                <p>配备先进的仓储设施和安全系统，保障货物安全。</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-barcode"></i>
                </div>
                <h4>精确库存管理</h4>
                <p>使用先进的WMS系统，实现精确的库存控制和货物追踪。</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-dolly"></i>
                </div>
                <h4>灵活的存取服务</h4>
                <p>根据您的需求提供灵活的货物存取服务，满足不同业务场景。</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <h4>全方位安全保障</h4>
                <p>24小时监控和专业安保团队，确保您的货物绝对安全。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 添加公共模块：我们的实力展示 -->
    <section class="strength-section">
      <div class="container">
        <h2 class="strength-title">我们的实力展示</h2>

        <div class="strength-grid">
          <div class="strength-card">
            <div class="strength-image">
              <img src="@/assets/images/warehouse-facility.jpg" alt="现代化仓储设施" />
            </div>
            <h3>现代化仓储设施</h3>
            <p>
              我们拥有超过10万平方米的现代化仓储设施，配备先进的货架系统和自动化设备，确保高效的仓储管理。
            </p>
          </div>

          <div class="strength-card">
            <div class="strength-image">
              <img src="@/assets/images/global-network.jpg" alt="全球物流网络" />
            </div>
            <h3>全球物流网络</h3>
            <p>
              我们与全球超过100个国家和地区建立了紧密的物流合作关系，能够为客户提供全方位的国际物流服务。
            </p>
          </div>

          <div class="strength-card">
            <div class="strength-image">
              <img src="@/assets/images/tech-system.jpg" alt="先进技术系统" />
            </div>
            <h3>先进技术系统</h3>
            <p>
              我们采用最新的物流管理系统和追踪技术，实现全程可视化管理，为客户提供实时的货物跟踪服务。
            </p>
          </div>

          <div class="strength-card">
            <div class="strength-image">
              <img src="@/assets/images/professional-team.jpg" alt="专业服务团队" />
            </div>
            <h3>专业服务团队</h3>
            <p>
              我们拥有一支经验丰富、专业高效的物流服务团队，能够为客户提供专业的咨询和定制化的物流解决方案。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 添加联系我们区域 -->
    <section class="inquiry-section">
      <div class="container">
        <div class="inquiry-content">
          <h2>需要更多业务咨询？</h2>
          <p>
            我们的专业团队随时为您提供详细的业务咨询和定制化解决方案，帮助您解决国际贸易和物流中的各种挑战。
          </p>
          <a href="#" class="contact-btn">联系我们</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "ServicePage",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const activeService = ref("booking");

    const navItems = [
      { id: "booking", title: "订舱服务", icon: "fas fa-ship" },
      { id: "customs", title: "报关服务", icon: "fas fa-file-contract" },
      { id: "warehouse", title: "仓储服务", icon: "fas fa-warehouse" },
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
</style>
