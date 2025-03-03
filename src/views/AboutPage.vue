<template>
  <div class="about-page">
    <!-- 顶部横幅 - 与其他页面保持一致 -->
    <div class="tracking-banner">
      <div class="container">
        <h1 class="tracking-title">关于我们</h1>
      </div>
    </div>

    <!-- 导航选项卡 -->
    <div class="container">
      <div class="about-tabs">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="about-tab"
          :class="{ active: activeTab === tab.id }"
          @click="scrollToSection(tab.id)"
        >
          <span>{{ tab.name }}</span>
        </div>
      </div>

      <!-- 公司简介 -->
      <section id="company" class="about-section company-section">
        <div class="section-header">
          <h2>公司简介</h2>
          <div class="section-divider"></div>
        </div>

        <div class="company-content">
          <div class="company-image">
            <img src="@/assets/images/about-company.jpg" alt="公司简介" />
          </div>
          <div class="company-text">
            <div class="intro-point">
              <i class="fas fa-angle-right point-icon"></i>
              <p>
                上海沃行航运有限公司，已正式获中国交通运输部认可，荣膺无船承运人（NVOCC）资质。凭借专业与实力，公司以"上海沃行"之名广为人知，且作为上海航运交易所(Shanghai
                Shipping
                Exchange)的正式会员，我们持续专注于海运、空运领域，深耕中国至日本市场，业务规模持续扩展，服务品质稳步提升。
              </p>
            </div>
            <div class="intro-point">
              <i class="fas fa-angle-right point-icon"></i>
              <p>
                展望未来，我们将坚守初心，致力于优化货物运输流程，不断提升运输效率与服务质量，为全球客户打造更卓越、更高效的物流体验。
              </p>
            </div>
          </div>
        </div>

        <div class="company-stats">
          <div class="stat-item">
            <div class="stat-number"><span ref="yearsCount">0</span><span>年+</span></div>
            <div class="stat-desc">行业经验</div>
          </div>
          <div class="stat-item">
            <div class="stat-number"><span ref="teamCount">0</span><span>+</span></div>
            <div class="stat-desc">专业团队</div>
          </div>
          <div class="stat-item">
            <div class="stat-number"><span ref="clientCount">0</span><span>+</span></div>
            <div class="stat-desc">合作客户</div>
          </div>
          <div class="stat-item">
            <div class="stat-number"><span ref="satisfactionCount">0</span><span>%</span></div>
            <div class="stat-desc">客户满意度</div>
          </div>
        </div>
      </section>

      <!-- 发展历程 - 新设计 -->
      <section id="history" class="about-section history-section">
        <div class="section-header">
          <h2>发展历程</h2>
          <div class="section-divider"></div>
        </div>

        <div class="history-timeline">
          <div
            v-for="(item, index) in historyItems"
            :key="index"
            class="timeline-card"
            :class="{ 'timeline-right': index % 2 !== 0 }"
          >
            <div class="timeline-badge">
              <span>{{ item.year }}</span>
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h3>{{ item.title }}</h3>
              </div>
              <div class="timeline-body">
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 企业文化 -->
      <section id="culture" class="about-section culture-section">
        <div class="section-header">
          <h2>企业文化</h2>
          <div class="section-divider"></div>
        </div>

        <div class="culture-content">
          <div class="culture-item">
            <div class="culture-icon">
              <i class="fas fa-eye"></i>
            </div>
            <h3>企业愿景</h3>
            <p>成为全球领先的综合物流服务提供商，以创新科技重塑物流行业未来。</p>
          </div>

          <div class="culture-item">
            <div class="culture-icon">
              <i class="fas fa-bullseye"></i>
            </div>
            <h3>企业使命</h3>
            <p>以卓越的物流服务连接世界，让全球贸易更便捷、更高效。</p>
          </div>

          <div class="culture-item">
            <div class="culture-icon">
              <i class="fas fa-handshake"></i>
            </div>
            <h3>核心价值观</h3>
            <p>诚信为本、客户至上、创新驱动、协作共赢、追求卓越。</p>
          </div>
        </div>

        <div class="culture-image">
          <img src="@/assets/images/company-culture.jpg" alt="企业文化" />
        </div>
      </section>

      <!-- 联系我们 -->
      <section id="contact" class="about-section contact-section">
        <div class="section-header">
          <h2>联系我们</h2>
          <div class="section-divider"></div>
        </div>

        <div class="contact-container">
          <div class="contact-title"></div>

          <div class="contact-grid">
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="contact-label">公司地址</div>
              <div class="contact-value">上海市虹口区周家嘴路699号中坤广场A座9F</div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-phone"></i>
              </div>
              <div class="contact-label">联系电话</div>
              <div class="contact-value">021-65143931转826</div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="contact-label">电子邮箱</div>
              <div class="contact-value">b2b-service@walltechsystem.com</div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="contact-label">工作时间</div>
              <div class="contact-value">周一至周五: 9:00 - 18:00</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "AboutPage",
  setup() {
    const activeTab = ref("company");

    const tabs = [
      { id: "company", name: "公司简介" },
      { id: "history", name: "发展历程" },
      { id: "culture", name: "企业文化" },
      { id: "contact", name: "联系我们" },
    ];

    const historyItems = [
      {
        year: "2012",
        title: "公司成立",
        description: "上海沃行航运有限公司在上海成立，开始提供基础的物流服务。",
      },
      {
        year: "2015",
        title: "业务扩展",
        description: "获得无船承运人(NVOCC)资质，业务范围扩展至全国主要港口。",
      },
      {
        year: "2018",
        title: "数字化转型",
        description: "引入先进物流管理系统，开启公司数字化转型之路。",
      },
      {
        year: "2020",
        title: "全球化布局",
        description: "建立全球物流服务网络，与超过50个国家的物流合作伙伴建立稳定关系。",
      },
      {
        year: "2023",
        title: "技术创新",
        description: "推出B2B物流服务平台，为客户提供一站式在线物流解决方案。",
      },
    ];

    const scrollToSection = (sectionId: string) => {
      activeTab.value = sectionId;

      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 10);
    };

    // 引用元素
    const yearsCount = ref<HTMLElement | null>(null);
    const teamCount = ref<HTMLElement | null>(null);
    const clientCount = ref<HTMLElement | null>(null);
    const satisfactionCount = ref<HTMLElement | null>(null);

    // 最终数值
    const finalCounts = {
      years: 10,
      team: 50,
      clients: 5000,
      satisfaction: 100,
    };

    // 动画逻辑
    const animateCounter = (element: HTMLElement, finalValue: number, duration = 2000) => {
      let startTime: number | null = null;
      const startValue = 0;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentValue = Math.floor(progress * (finalValue - startValue) + startValue);

        element.innerText = currentValue.toString();

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };

    // 检测元素是否在视口中
    const isInViewport = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    // 滚动检测
    let animated = false;
    const handleScroll = () => {
      if (animated) return;

      if (yearsCount.value && teamCount.value && clientCount.value && satisfactionCount.value) {
        if (isInViewport(yearsCount.value)) {
          animated = true;
          animateCounter(yearsCount.value, finalCounts.years);
          animateCounter(teamCount.value, finalCounts.team);
          animateCounter(clientCount.value, finalCounts.clients);
          animateCounter(satisfactionCount.value, finalCounts.satisfaction);
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      // 初始检查，如果统计数字一开始就在视口中
      setTimeout(handleScroll, 500);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    });

    return {
      activeTab,
      tabs,
      historyItems,
      scrollToSection,
      yearsCount,
      teamCount,
      clientCount,
      satisfactionCount,
    };
  },
});
</script>

<style scoped>
.about-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 顶部横幅样式 - 与其他页面保持一致 */
.tracking-banner {
  height: 200px;
  background-image: url("@/assets/images/about-bg.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  position: relative;
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 选项卡样式 */
.about-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.about-tab {
  padding: 20px 30px;
  font-size: 16px;
  font-weight: 500;
  color: #555;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  text-align: center;
  flex: 1;
}

.about-tab.active {
  color: #1e5aa0;
  background-color: #f9f9f9;
}

.about-tab::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background-color: #1e5aa0;
  transition: width 0.3s ease;
}

.about-tab.active::after {
  width: 60%;
}

/* 各部分通用样式 */
.about-section {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 40px;
  margin-bottom: 80px;
  padding-top: 30px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 15px;
}

.section-divider {
  width: 60px;
  height: 3px;
  background-color: #1e5aa0;
  margin: 0 auto;
}

/* 公司简介部分 */
.company-content {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
}

.company-image {
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.company-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.company-text {
  flex: 1;
  text-align: left;
  padding-left: 15px;
}

.intro-point {
  display: flex;
  margin-bottom: 20px;
}

.point-icon {
  color: #1e5aa0;
  font-size: 18px;
  margin-right: 10px;
  margin-top: 3px;
}

.intro-point p {
  margin: 0;
  flex: 1;
}

.company-stats {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 40px;
}

.stat-item {
  flex: 1;
  text-align: center;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: #1e5aa0;
  margin-bottom: 10px;
}

.stat-number span {
  font-size: 24px;
}

.stat-desc {
  font-size: 16px;
  color: #666;
}

/* 发展历程部分 - 新样式 */
.history-timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}

.history-timeline::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 4px;
  background: #1e5aa0;
  border-radius: 2px;
  transform: translateX(-50%);
}

.timeline-card {
  position: relative;
  width: 45%;
  margin-bottom: 60px;
  margin-left: 0;
  padding: 0;
  z-index: 1;
}

.timeline-right {
  margin-left: 55%;
}

.timeline-badge {
  position: absolute;
  top: 15px;
  right: -65px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #1e5aa0;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  z-index: 2;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  transform: translateX(-50%);
}

.timeline-right .timeline-badge {
  right: auto;
  left: -65px;
  transform: translateX(50%);
}

.timeline-panel {
  position: relative;
  background: #fff;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-panel:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.timeline-panel::after {
  content: "";
  position: absolute;
  top: 22px;
  right: -10px;
  width: 20px;
  height: 20px;
  background: #fff;
  transform: rotate(45deg);
}

.timeline-right .timeline-panel::after {
  right: auto;
  left: -10px;
}

.timeline-heading h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #1e5aa0;
}

.timeline-body p {
  margin: 0;
  line-height: 1.6;
  color: #666;
}

/* 企业文化部分 */
.culture-content {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 40px;
}

.culture-item {
  flex: 1;
  text-align: center;
  padding: 30px 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.culture-item:hover {
  transform: translateY(-5px);
}

.culture-icon {
  width: 70px;
  height: 70px;
  background-color: #1e5aa0;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.culture-icon i {
  font-size: 28px;
}

.culture-item h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
}

.culture-item p {
  font-size: 15px;
  line-height: 1.6;
  color: #666;
}

.culture-image {
  border-radius: 8px;
  overflow: hidden;
  margin-top: 40px;
}

.culture-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* 联系我们新样式 */
.contact-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}

.contact-title {
  text-align: center;
  margin-bottom: 50px;
}

.contact-title h3 {
  font-size: 28px;
  color: #333;
  margin-bottom: 15px;
}

.blue-line {
  width: 60px;
  height: 3px;
  background-color: #1e5aa0;
  margin: 0 auto;
}

.contact-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 50px;
}

.contact-item {
  flex-basis: calc(50% - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.contact-icon {
  width: 70px;
  height: 70px;
  margin-bottom: 15px;
  background-color: #1e5aa0;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-icon i {
  font-size: 28px;
}

.contact-label {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.contact-value {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .contact-item {
    flex-basis: 100%;
  }
}

/* 响应式设计 */
@media (max-width: 992px) {
  .company-content,
  .culture-content,
  .contact-content {
    flex-direction: column;
  }

  .about-tabs {
    flex-wrap: wrap;
  }

  .about-tab {
    flex: 1 0 50%;
  }

  .company-stats {
    flex-wrap: wrap;
  }

  .stat-item {
    flex: 1 0 45%;
    margin-bottom: 20px;
  }
}

@media (max-width: 576px) {
  .about-tab {
    flex: 1 0 100%;
  }

  .stat-item {
    flex: 1 0 100%;
  }

  .culture-content {
    flex-direction: column;
  }

  .culture-item {
    margin-bottom: 20px;
  }
}
</style>
