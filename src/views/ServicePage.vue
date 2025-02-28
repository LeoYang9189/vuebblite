<template>
  <div class="service-page">
    <!-- 页面横幅 -->
    <section class="service-banner">
      <div class="container">
        <h1>业务介绍</h1>
        <p>了解我们为您提供的专业物流解决方案</p>
      </div>
    </section>

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
            <div class="process-steps">
              <div class="process-step">
                <div class="step-number">01</div>
                <h4>提交订舱申请</h4>
                <p>通过B2B平台或联系客服提交您的订舱需求，包括货物信息、起运港、目的港等。</p>
              </div>
              <div class="process-step">
                <div class="step-number">02</div>
                <h4>确认舱位</h4>
                <p>我们将为您确认合适的舱位，并提供准确的船期和运输时间。</p>
              </div>
              <div class="process-step">
                <div class="step-number">03</div>
                <h4>准备货物</h4>
                <p>根据确认的船期，您需要准备好货物并完成必要的包装。</p>
              </div>
              <div class="process-step">
                <div class="step-number">04</div>
                <h4>装船发运</h4>
                <p>我们将按照约定时间安排您的货物装船，并确保顺利发运。</p>
              </div>
              <div class="process-step">
                <div class="step-number">05</div>
                <h4>全程跟踪</h4>
                <p>通过我们的平台，您可以实时追踪货物的运输状态，掌握最新动态。</p>
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
