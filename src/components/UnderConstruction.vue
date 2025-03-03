<template>
  <div class="under-construction">
    <a-result
      status="info"
      title="页面建设中"
      sub-title="该功能正在开发中，敬请期待..."
    >
      <template #extra>
        <a-button type="primary" @click="goBack">返回</a-button>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "UnderConstruction",
  setup() {
    const router = useRouter();

    const goBack = () => {
      router.back();
    };

    return {
      goBack,
    };
  },
});
</script>

<style scoped>
.under-construction {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
</style>
