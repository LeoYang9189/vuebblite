<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="@/assets/images/logo.png" alt="WallTech B2B Logo" />
          <p>选择 WallTech B2B 是您业务合作的明智之选。我们致力于为您提供最优质的B2B服务体验。</p>
          <div class="social-links">
            <a href="#"><i class="fab fa-weixin"></i></a>
            <a href="#"><i class="fab fa-tiktok"></i></a>
            <a href="#" class="xiaohongshu"><span>小红书</span></a>
            <a href="#"><i class="fab fa-weibo"></i></a>
          </div>
        </div>
        <div class="footer-links">
          <div class="link-column">
            <h3>地址</h3>
            <ul class="address-info">
              <li>上海市虹口区<br />周家嘴路699号中垠广场A座9F</li>
              <li>工作时间：<br />周一至周五 9:00-18:00</li>
            </ul>
          </div>
          <div class="link-column">
            <h3>关于我们</h3>
            <ul>
              <li><router-link to="/about#company-section">公司简介</router-link></li>
              <li><router-link to="/about#history-section">发展历程</router-link></li>
              <li><router-link to="/about#culture-section">企业文化</router-link></li>
              <li><router-link to="/about#contact-section">联系我们</router-link></li>
            </ul>
          </div>
          <div class="link-column">
            <h3>隐私政策</h3>
            <ul>
              <li><a href="#">用户协议</a></li>
              <li><a href="#">隐私条款</a></li>
              <li><a href="#">Cookie政策</a></li>
              <li><a href="#">信息安全</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>
          © {{ currentYear }} All Rights Reserved 版权所有:上海沃行信息技术有限公司
          沪ICP备07034486号
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "TheFooter",
  setup() {
    const currentYear = computed(() => new Date().getFullYear());

    return {
      currentYear,
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
