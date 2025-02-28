<template>
  <section :class="bannerClass">
    <div class="container">
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "BannerSection",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    type: {
      type: String as PropType<"default" | "tracking" | "service" | "news" | "about">,
      default: "default",
      validator: (value: string) => {
        return ["default", "tracking", "service", "news", "about"].includes(value);
      },
    },
  },
  computed: {
    bannerClass(): string {
      return `${this.type}-banner`;
    },
  },
});
</script>
