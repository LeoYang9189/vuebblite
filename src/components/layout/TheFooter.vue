<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="@/assets/images/logo.png" alt="WallTech B2B Logo" />
          <p>{{ t('footer.description') }}</p>
          <div class="social-links">
            <a href="#"><i class="fab fa-weixin"></i></a>
            <a href="#"><i class="fab fa-tiktok"></i></a>
            <a href="#" class="xiaohongshu"><span>小红书</span></a>
            <a href="#"><i class="fab fa-weibo"></i></a>
          </div>
        </div>
        <div class="footer-links">
          <div class="link-column">
            <h3>{{ t('footer.address') }}</h3>
            <ul class="address-info">
              <li>{{ t('about.companyAddress') }}</li>
              <li>{{ t('footer.workingHours') }}：<br />{{ t('footer.workingTime') }}</li>
            </ul>
          </div>
          <div class="link-column">
            <h3>{{ t('about.title') }}</h3>
            <ul>
              <li><router-link to="/about#company-section">{{ t('about.company') }}</router-link></li>
              <li><router-link to="/about#history-section">{{ t('about.history') }}</router-link></li>
              <li><router-link to="/about#culture-section">{{ t('about.culture') }}</router-link></li>
              <li><router-link to="/about#contact-section">{{ t('about.contact') }}</router-link></li>
            </ul>
          </div>
          <div class="link-column">
            <h3>{{ t('footer.privacy') }}</h3>
            <ul>
              <li><a href="#">{{ t('footer.terms') }}</a></li>
              <li><a href="#">{{ t('footer.privacy') }}</a></li>
              <li><a href="#">{{ t('footer.cookie') }}</a></li>
              <li><a href="#">{{ t('footer.security') }}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>
          © {{ currentYear }} {{ t('footer.copyright') }} {{ t('footer.companyName') }}
          {{ t('footer.icp') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "TheFooter",
  setup() {
    const currentYear = computed(() => new Date().getFullYear());
    const { t } = useI18n();

    return {
      currentYear,
      t,
    };
  },
});
</script>

<style scoped>
/* 将logo下方的文字左对齐 */
.footer-logo-section {
  text-align: left; /* 改为左对齐 */
}

.footer-logo {
  text-align: left; /* 确保logo区域左对齐 */
}

.footer-logo img {
  margin-left: 0; /* 确保logo也左对齐 */
}

.footer-logo p {
  text-align: left; /* 确保logo下方文字左对齐 */
  margin-top: 15px;
}

/* 社交链接也左对齐 */
.social-links {
  justify-content: flex-start;
}

/* 如果有版权信息，也确保左对齐 */
.footer-copyright,
.footer-bottom p {
  text-align: left;
}

.address-info {
  text-align: left; /* 左对齐 */
}

.address-info li {
  margin-bottom: 15px;
  text-align: left;
}
</style>
