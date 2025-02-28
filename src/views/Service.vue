<template>
  <div class="service-page">
    <ServiceBanner />
    <ServiceNav />
    <ServiceDetails />
  </div>
</template>

<script>
import ServiceBanner from "@/components/service/ServiceBanner.vue";
import ServiceNav from "@/components/service/ServiceNav.vue";
import ServiceDetails from "@/components/service/ServiceDetails.vue";

export default {
  name: "ServicePage",
  components: {
    ServiceBanner,
    ServiceNav,
    ServiceDetails,
  },
};
</script>
