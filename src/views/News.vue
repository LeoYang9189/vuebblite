<template>
  <div class="news-page">
    <NewsBanner />
    <NewsContent />
  </div>
</template>

<script>
import NewsBanner from "@/components/news/NewsBanner.vue";
import NewsContent from "@/components/news/NewsContent.vue";

export default {
  name: "NewsPage",
  components: {
    NewsBanner,
    NewsContent,
  },
};
</script>
