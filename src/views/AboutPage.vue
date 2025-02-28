<template>
  <div class="about-page">
    <!-- 页面横幅 -->
    <section class="about-banner">
      <div class="container">
        <h1>关于我们</h1>
        <p>了解上海沃行信息技术有限公司的历程、愿景与价值观</p>
      </div>
    </section>

    <!-- 关于内容导航 -->
    <section class="about-nav-section">
      <div class="about-navigation">
        <div
          v-for="nav in navItems"
          :key="nav.id"
          class="about-nav-item"
          :class="{ active: activeSection === nav.id }"
          @click="scrollToSection(nav.id)"
        >
          <div class="about-nav-icon">
            <i :class="nav.icon"></i>
          </div>
          <div class="about-nav-text">{{ nav.title }}</div>
        </div>
      </div>
    </section>

    <!-- 关于内容区域 -->
    <section class="about-content-section">
      <!-- 公司简介 -->
      <div
        id="company-section"
        class="about-content"
        :class="{ active: activeSection === 'company' }"
      >
        <div class="about-header">
          <h2>公司简介</h2>
          <p>了解我们的历史和发展历程</p>
        </div>
        <div class="company-intro">
          <div class="intro-image">
            <img src="@/assets/images/about-company.jpg" alt="公司简介" />
          </div>
          <div class="intro-text">
            <h3>企业概述</h3>
            <p>
              上海沃行航运有限公司，已正式获中国交通运输部认可，荣膺无船承运人（NVOCC）资质。凭借专业与实力，公司以"上海沃行"之名广为人知，且作为上海航运交易所(Shanghai
              Shipping
              Exchange)的正式会员，我们持续专注于海运、空运领域，深耕中国至日本市场，业务规模持续扩展，服务品质稳步提升。
            </p>
            <p>
              展望未来，我们将坚守初心，致力于优化货物运输流程，不断提升运输效率与服务质量，为全球客户打造更卓越、更高效的物流体验。
            </p>
          </div>
        </div>
        <div class="company-stats">
          <div class="stat-item">
            <div class="stat-number">10<span>年+</span></div>
            <div class="stat-desc">行业经验</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">50<span>+</span></div>
            <div class="stat-desc">专业团队</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">5000<span>+</span></div>
            <div class="stat-desc">合作客户</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">100<span>%</span></div>
            <div class="stat-desc">客户满意度</div>
          </div>
        </div>
      </div>

      <!-- 发展历程 -->
      <div
        id="history-section"
        class="about-content"
        :class="{ active: activeSection === 'history' }"
      >
        <div class="about-header">
          <h2>发展历程</h2>
          <p>每一步都是我们成长的印记</p>
        </div>
        <div class="history-timeline">
          <div v-for="(item, index) in historyItems" :key="index" class="timeline-item">
            <div class="timeline-year">{{ item.year }}</div>
            <div class="timeline-content">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 企业文化 -->
      <div
        id="culture-section"
        class="about-content"
        :class="{ active: activeSection === 'culture' }"
      >
        <div class="about-header">
          <h2>企业文化</h2>
          <p>我们的价值观与使命</p>
        </div>
        <div class="culture-grid">
          <div class="culture-item">
            <div class="culture-icon">
              <i class="fas fa-bullseye"></i>
            </div>
            <h3>愿景</h3>
            <p>成为全球领先的物流科技服务商，缔造国际货运数字化未来</p>
          </div>
          <div class="culture-item">
            <div class="culture-icon">
              <i class="fas fa-flag"></i>
            </div>
            <h3>使命</h3>
            <p>为全球客户提供高效便捷的物流解决方案，推动行业可持续发展</p>
          </div>
          <div class="culture-item">
            <div class="culture-icon">
              <i class="fas fa-heart"></i>
            </div>
            <h3>价值观</h3>
            <p>诚信、创新、专业、高效、客户至上</p>
          </div>
        </div>
      </div>

      <!-- 联系我们 -->
      <div
        id="contact-section"
        class="about-content"
        :class="{ active: activeSection === 'contact' }"
      >
        <div class="about-header">
          <h2>联系我们</h2>
          <p>随时为您提供服务与支持</p>
        </div>
        <div class="contact-info-grid">
          <div class="contact-info-item">
            <div class="contact-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <h3>地址</h3>
            <p>上海市虹口区周家嘴路699号中垠广场A座9F</p>
          </div>
          <div class="contact-info-item">
            <div class="contact-icon">
              <i class="fas fa-phone-alt"></i>
            </div>
            <h3>电话</h3>
            <p>021-65143931转826</p>
          </div>
          <div class="contact-info-item">
            <div class="contact-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <h3>邮箱</h3>
            <p>b2b-service@walltechsystem.com</p>
          </div>
          <div class="contact-info-item">
            <div class="contact-icon">
              <i class="fas fa-clock"></i>
            </div>
            <h3>工作时间</h3>
            <p>周一至周五<br />9:00-18:00</p>
          </div>
        </div>
        <div class="contact-map">
          <img src="@/assets/images/about-company.jpg" alt="公司地址地图" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { TimelineItem } from "@/types";

export default defineComponent({
  name: "AboutPage",
  setup() {
    const route = useRoute();
    const activeSection = ref("company");

    const navItems = [
      { id: "company", title: "公司简介", icon: "fas fa-building" },
      { id: "history", title: "发展历程", icon: "fas fa-history" },
      { id: "culture", title: "企业文化", icon: "fas fa-users" },
      { id: "contact", title: "联系我们", icon: "fas fa-phone-alt" },
    ];

    const historyItems: TimelineItem[] = [
      {
        id: 1,
        year: "2014",
        title: "公司成立",
        description: "上海沃行信息技术有限公司正式成立，开始提供日本航线的货代服务。",
      },
      {
        id: 2,
        year: "2016",
        title: "业务扩展",
        description: "开始提供中国至日本的门到门物流服务，业务范围进一步扩大。",
      },
      {
        id: 3,
        year: "2018",
        title: "获得NVOCC资质",
        description: "获得中国交通运输部颁发的无船承运人(NVOCC)资质，服务能力得到官方认可。",
      },
      {
        id: 4,
        year: "2020",
        title: "数字化转型",
        description: "开始数字化转型，开发并上线B2B物流平台，提升服务效率与客户体验。",
      },
      {
        id: 5,
        year: "2022",
        title: "战略升级",
        description: "推出全新品牌战略，扩大团队规模，全方位升级客户服务体系。",
      },
      {
        id: 6,
        year: "2024",
        title: "创新发展",
        description: "新一代B2B平台全面升级，引入智能客服，提升用户体验。",
      },
    ];

    const scrollToSection = (sectionId: string) => {
      activeSection.value = sectionId;
      const element = document.getElementById(`${sectionId}-section`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const handleScroll = () => {
      const sections = document.querySelectorAll(".about-content");
      const scrollPosition = window.scrollY + 200;

      sections.forEach(section => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;
        const sectionId = sectionElement.id.replace("-section", "");

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          activeSection.value = sectionId;
        }
      });
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);

      // 处理URL锚点
      const hash = route.hash;
      if (hash) {
        const section = hash.substring(1).replace("-section", "");
        setTimeout(() => {
          scrollToSection(section);
        }, 300);
      }
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      activeSection,
      navItems,
      historyItems,
      scrollToSection,
    };
  },
});
</script>
