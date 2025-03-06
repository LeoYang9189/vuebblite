<template>
  <section class="news-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ t('news.title') }}</h2>
        <div class="section-divider"></div>
      </div>

      <div class="news-grid">
        <div
          v-for="(news, index) in newsItems"
          :key="index"
          class="news-card"
          @click="goToNewsDetail(news.id)"
        >
          <div class="news-card-image">
            <img :src="news.image" :alt="t('news.imageAlt')" />
          </div>
          <div class="news-card-content">
            <h3 class="news-card-title">{{ news.title }}</h3>
            <p class="news-card-summary">{{ news.summary }}</p>
            <div class="news-card-meta">
              <span class="news-card-date">
                <i class="far fa-calendar-alt"></i> {{ news.date }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="view-more">
        <router-link to="/news" class="view-more-link">
          {{ t('news.detail.viewMore') }}
          <i class="fas fa-arrow-right"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'NewsSection',
  setup() {
    const { t } = useI18n();
    const router = useRouter();

    const newsItems = ref([
      {
        id: 10,
        title: t('news.articles.article10.title'),
        summary: t('news.articles.article10.summary'),
        date: '2023-06-15',
        image: require('@/assets/images/news-placeholder.jpg')
      },
      {
        id: 11,
        title: t('news.articles.article11.title'),
        summary: t('news.articles.article11.summary'),
        date: '2023-06-10',
        image: require('@/assets/images/news-placeholder.jpg')
      },
      {
        id: 12,
        title: t('news.articles.article12.title'),
        summary: t('news.articles.article12.summary'),
        date: '2023-06-05',
        image: require('@/assets/images/news-placeholder.jpg')
      },
      {
        id: 13,
        title: t('news.articles.article13.title'),
        summary: t('news.articles.article13.summary'),
        date: '2023-05-28',
        image: require('@/assets/images/news-placeholder.jpg')
      },
      {
        id: 14,
        title: t('news.articles.article14.title'),
        summary: t('news.articles.article14.summary'),
        date: '2023-05-20',
        image: require('@/assets/images/news-placeholder.jpg')
      },
      {
        id: 15,
        title: t('news.articles.article15.title'),
        summary: t('news.articles.article15.summary'),
        date: '2023-05-15',
        image: require('@/assets/images/news-placeholder.jpg')
      }
    ]);

    const goToNewsDetail = (id: number) => {
      router.push(`/news/${id}`);
    };

    return {
      t,
      newsItems,
      goToNewsDetail
    };
  }
});
</script>

<style scoped>
.news-section {
  padding: 60px 0;
  background-color: #f8f9fa;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 32px;
  color: #333;
  margin-bottom: 15px;
}

.section-divider {
  width: 60px;
  height: 3px;
  background-color: #1e5aa0;
  margin: 0 auto;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-bottom: 40px;
}

.news-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.news-card-image {
  height: 200px;
  overflow: hidden;
}

.news-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.news-card:hover .news-card-image img {
  transform: scale(1.05);
}

.news-card-content {
  padding: 20px;
}

.news-card-title {
  font-size: 16px;
  margin-bottom: 12px;
  color: #333;
  line-height: 1.4;
  height: 45px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.news-card-summary {
  font-size: 14px;
  color: #666;
  margin-bottom: 18px;
  height: 60px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.news-card-meta {
  color: #999;
  font-size: 12px;
}

.news-card-date i {
  margin-right: 5px;
}

.view-more {
  text-align: center;
  margin-top: 30px;
}

.view-more-link {
  display: inline-flex;
  align-items: center;
  color: #1e5aa0;
  font-size: 16px;
  text-decoration: none;
  transition: color 0.3s;
}

.view-more-link:hover {
  color: #154a89;
}

.view-more-link i {
  margin-left: 8px;
  transition: transform 0.3s;
}

.view-more-link:hover i {
  transform: translateX(5px);
}

@media (max-width: 992px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .news-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 24px;
  }
}
</style> 