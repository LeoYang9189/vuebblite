<template>
  <div class="about-page">
    <!-- 顶部横幅 - 与其他页面保持一致 -->
    <div class="tracking-banner">
      <div class="container">
        <h1 class="tracking-title">{{ t('about.title') }}</h1>
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
          <span>{{ t(`about.${tab.id}`) }}</span>
        </div>
      </div>

      <!-- 公司简介 -->
      <section id="company" class="about-section company-section">
        <div class="section-header">
          <h2>{{ t('about.company') }}</h2>
          <div class="section-divider"></div>
        </div>

        <div class="company-content">
          <div class="company-image">
            <img :src="require('@/assets/images/about-company.jpg')" :alt="t('about.company')" />
          </div>
          <div class="company-text">
            <div class="intro-point">
              <i class="fas fa-angle-right point-icon"></i>
              <p>{{ t('about.companyProfile.content') }}</p>
            </div>
            <div class="intro-point">
              <i class="fas fa-angle-right point-icon"></i>
              <p>{{ t('about.companyProfile.vision') }}</p>
            </div>
          </div>
        </div>

        <div class="company-stats">
          <div class="stat-item">
            <div class="stat-number"><span ref="yearsCount">0</span><span>{{ t('about.stats.years') }}</span></div>
            <div class="stat-desc">{{ t('about.stats.experience') }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-number"><span ref="teamCount">0</span><span>+</span></div>
            <div class="stat-desc">{{ t('about.stats.team') }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-number"><span ref="clientCount">0</span><span>+</span></div>
            <div class="stat-desc">{{ t('about.stats.clients') }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-number"><span ref="satisfactionCount">0</span><span>%</span></div>
            <div class="stat-desc">{{ t('about.stats.satisfaction') }}</div>
          </div>
        </div>
      </section>

      <!-- 发展历程 -->
      <section id="history" class="about-section history-section">
        <div class="section-header">
          <h2>{{ t('about.history') }}</h2>
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
                <h3>{{ t(`about.timeline.${item.id}.title`) }}</h3>
              </div>
              <div class="timeline-body">
                <p>{{ t(`about.timeline.${item.id}.description`) }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 企业文化 -->
      <section id="culture" class="about-section culture-section">
        <div class="section-header">
          <h2>{{ t('about.culture') }}</h2>
          <div class="section-divider"></div>
        </div>

        <div class="culture-content">
          <div class="culture-item">
            <div class="culture-icon">
              <i class="fas fa-eye"></i>
            </div>
            <h3>{{ t('about.companyCulture.vision') }}</h3>
            <p>{{ t('about.companyCulture.visionContent') }}</p>
          </div>

          <div class="culture-item">
            <div class="culture-icon">
              <i class="fas fa-bullseye"></i>
            </div>
            <h3>{{ t('about.companyCulture.mission') }}</h3>
            <p>{{ t('about.companyCulture.missionContent') }}</p>
          </div>

          <div class="culture-item">
            <div class="culture-icon">
              <i class="fas fa-handshake"></i>
            </div>
            <h3>{{ t('about.companyCulture.values') }}</h3>
            <p>{{ t('about.companyCulture.valuesContent') }}</p>
          </div>
        </div>

        <div class="culture-image">
          <img :src="require('@/assets/images/company-culture.jpg')" :alt="t('about.culture')" />
        </div>
      </section>

      <!-- 联系我们 -->
      <section id="contact" class="about-section contact-section">
        <div class="section-header">
          <h2>{{ t('about.contact') }}</h2>
          <div class="section-divider"></div>
        </div>

        <div class="contact-container">
          <div class="contact-title"></div>

          <div class="contact-grid">
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="contact-label">{{ t('footer.address') }}</div>
              <div class="contact-value">{{ t('about.companyAddress') }}</div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-phone"></i>
              </div>
              <div class="contact-label">{{ t('common.phone') }}</div>
              <div class="contact-value">021-65143931转826</div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="contact-label">{{ t('common.email') }}</div>
              <div class="contact-value">b2b-service@walltechsystem.com</div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="contact-label">{{ t('footer.workingHours') }}</div>
              <div class="contact-value">{{ t('footer.workingTime') }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "AboutPage",
  setup() {
    const { t } = useI18n();
    const activeTab = ref("company");

    const tabs = computed(() => [
      { id: "company", name: t('about.company') },
      { id: "history", name: t('about.history') },
      { id: "culture", name: t('about.culture') },
      { id: "contact", name: t('about.contact') },
    ]);

    const historyItems = computed(() => [
      {
        id: "2012",
        year: "2012",
        title: t('about.timeline.2012.title'),
        description: t('about.timeline.2012.description'),
      },
      {
        id: "2015",
        year: "2015",
        title: t('about.timeline.2015.title'),
        description: t('about.timeline.2015.description'),
      },
      {
        id: "2018",
        year: "2018",
        title: t('about.timeline.2018.title'),
        description: t('about.timeline.2018.description'),
      },
      {
        id: "2020",
        year: "2020",
        title: t('about.timeline.2020.title'),
        description: t('about.timeline.2020.description'),
      },
      {
        id: "2023",
        year: "2023",
        title: t('about.timeline.2023.title'),
        description: t('about.timeline.2023.description'),
      },
    ]);

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
      t,
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
