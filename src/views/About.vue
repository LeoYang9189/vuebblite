<template>
  <div class="about-page">
    <AboutBanner />
    <AboutNav />
    <AboutCompany />
    <AboutHistory />
    <AboutCulture />
    <AboutContact />
  </div>
</template>

<script>
import AboutBanner from "@/components/about/AboutBanner.vue";
import AboutNav from "@/components/about/AboutNav.vue";
import AboutCompany from "@/components/about/AboutCompany.vue";
import AboutHistory from "@/components/about/AboutHistory.vue";
import AboutCulture from "@/components/about/AboutCulture.vue";
import AboutContact from "@/components/about/AboutContact.vue";

export default {
  name: "AboutPage",
  components: {
    AboutBanner,
    AboutNav,
    AboutCompany,
    AboutHistory,
    AboutCulture,
    AboutContact,
  },
};
</script>
