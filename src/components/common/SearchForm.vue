<template>
  <div
    class="search-form"
    style="
      min-height: 120px !important;
      padding-bottom: 0 !important;
      display: flex !important;
      flex-direction: column !important;
    "
  >
    <!-- 标签页切换 -->
    <div class="search-tabs">
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'tracking' }"
        @click="setActiveTab('tracking')"
      >
        货物追踪
      </button>
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'schedule' }"
        @click="setActiveTab('schedule')"
      >
        船期查询
      </button>
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'price' }"
        @click="setActiveTab('price')"
      >
        运价查询
      </button>
    </div>

    <!-- Tab内容 - 添加垂直居中样式 -->
    <div
      v-for="tab in primaryTabs"
      :key="`content-${tab.id}`"
      class="tab-content"
      :class="{ 'active-tab': activeTab === tab.id }"
      :id="`${tab.id}-content`"
      style="
        padding-top: 0 !important;
        flex: 1 !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
      "
    >
      <!-- 货物追踪内容 -->
      <div
        v-if="tab.id === 'freight'"
        style="
          flex: 1 !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
        "
      >
        <div
          class="search-box"
          style="
            padding: 10px 20px !important;
            margin-top: 10px !important;
            margin-bottom: 10px !important;
          "
        >
          <input
            type="text"
            v-model="trackingNumber"
            id="tracking-number-input"
            :placeholder="getPlaceholder(tab.id, activeSubTabs[tab.id])"
          />
          <button id="tracking-search-btn" class="btn-search" @click="searchTracking">查询</button>
        </div>
        <div class="text-links" style="padding: 0 20px 5px !important">
          <router-link to="/tracking" class="text-link">
            <i class="fas fa-search"></i> 更多查询
          </router-link>
        </div>
      </div>

      <!-- 船期查询内容 -->
      <div v-else-if="tab.id === 'schedule'">
        <!-- 港口查询 -->
        <div
          class="search-fields port-search"
          :style="{ display: activeSubTabs.schedule === 'port' ? 'flex' : 'none' }"
        >
          <div class="port-from">
            <label>起运港</label>
            <input type="text" placeholder="请输入起运港" />
          </div>
          <div class="port-to">
            <label>目的港</label>
            <input type="text" placeholder="请输入目的港" />
          </div>
          <button class="btn-search">查询</button>
        </div>

        <!-- 船名查询 -->
        <div
          class="search-fields vessel-search"
          :style="{ display: activeSubTabs.schedule === 'vessel' ? 'flex' : 'none' }"
        >
          <div class="vessel-name">
            <label>船名</label>
            <input type="text" placeholder="请输入船名" />
          </div>
          <button class="btn-search">查询</button>
        </div>

        <!-- 删除 additional-links 部分的内容 -->
        <div class="text-links">
          <router-link to="/schedule" class="text-link">
            <i class="fas fa-search"></i> 更多查询
          </router-link>
        </div>
      </div>

      <!-- 运价查询内容 -->
      <div v-else-if="tab.id === 'tracking'">
        <!-- 运价查询表单内容 -->
      </div>
    </div>

    <!-- 在搜索表单底部添加 -->
    <div
      class="text-social-links"
      style="padding: 3px 0 !important; margin-top: auto !important; border-top: 1px solid #f0f0f0"
    >
      <div class="text-social-item wechat">
        <i class="fab fa-weixin"></i>
        <span>微信公众号</span>
        <div class="qrcode-wrapper">
          <img
            src="@/assets/images/qr.jpg"
            alt="微信公众号二维码"
            style="width: 120px; height: 120px; object-fit: contain"
          />
        </div>
      </div>
      <div class="text-social-item miniapp">
        <i class="fab fa-weixin"></i>
        <span>小程序</span>
        <div class="qrcode-wrapper">
          <img
            src="@/assets/images/chengxu.jpg"
            alt="小程序二维码"
            style="width: 120px; height: 120px; object-fit: contain"
          />
        </div>
      </div>
      <div class="text-social-item customer-service" @click="openChat">
        <i class="fas fa-headset"></i>
        <span>在线客服</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";

interface ActiveSubTabs {
  [key: string]: string;
}

export default defineComponent({
  name: "SearchForm",
  setup() {
    const router = useRouter();
    const activeTab = ref("freight");
    const activeSubTabs = reactive<ActiveSubTabs>({
      freight: "order",
      schedule: "port",
      tracking: "price",
    });

    const trackingNumber = ref("");

    const primaryTabs = [
      {
        id: "freight",
        name: "货物追踪",
        subTabs: [
          { id: "order", name: "订单查询" },
          { id: "container", name: "箱号查询" },
        ],
      },
      {
        id: "schedule",
        name: "船期查询",
        subTabs: [
          { id: "port", name: "港口查询" },
          { id: "vessel", name: "船名查询" },
        ],
      },
      {
        id: "tracking",
        name: "运价查询",
        subTabs: [{ id: "price", name: "运价查询" }],
      },
    ];

    const setActiveTab = (tabId: string) => {
      activeTab.value = tabId;
    };

    const setActiveSubTab = (tabId: string, subTabId: string) => {
      activeSubTabs[tabId] = subTabId;
    };

    const searchTracking = () => {
      if (trackingNumber.value.trim()) {
        router.push({
          path: "/tracking",
          query: { number: trackingNumber.value.trim() },
        });
      } else {
        alert("请输入有效的订单号");
      }
    };

    const openChat = () => {
      // 调用FloatingService中的聊天功能
      if (window.cozeWebChatClient) {
        if (window.cozeWebChatClient.open && typeof window.cozeWebChatClient.open === "function") {
          window.cozeWebChatClient.open();
        } else if (
          window.cozeWebChatClient.component &&
          window.cozeWebChatClient.component.setOpen
        ) {
          window.cozeWebChatClient.component.setOpen(true);
        }
      }
    };

    const getPlaceholder = (tabId: string, subTabId: string) => {
      if (tabId === "freight") {
        return subTabId === "order" ? "请输入订单号" : "请输入箱号";
      }
      return "请输入查询内容";
    };

    return {
      activeTab,
      activeSubTabs,
      primaryTabs,
      trackingNumber,
      setActiveTab,
      setActiveSubTab,
      searchTracking,
      openChat,
      getPlaceholder,
    };
  },
});
</script>

<style scoped>
/* 主搜索框样式调整 */
.search-form {
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 20;
  min-height: auto !important;
  padding-bottom: 5px; /* 减小底部填充 */
}

/* 标签样式优化 */
.search-tabs {
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px; /* 增加与内容的间距 */
}

.primary-tabs .tab-btn {
  flex: 1;
  padding: 15px; /* 增加标签按钮的内边距 */
  background: #fff;
  border: none;
  border-bottom: 3px solid transparent;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  transition: all 0.3s;
}

.primary-tabs .tab-btn:first-child {
  border-radius: 8px 0 0 0;
}

.primary-tabs .tab-btn:last-child {
  border-radius: 0 8px 0 0;
}

.primary-tabs .tab-btn.active {
  border-bottom-color: #0056b3;
  color: #0056b3;
  background-color: rgba(0, 86, 179, 0.05);
}

/* 优化二级标签样式，移除灰色背景 */
.secondary-tabs {
  display: flex;
  padding: 8px 15px 5px;
  background: transparent; /* 移除灰色背景 */
  margin-bottom: 5px;
}

.secondary-tabs .tab-btn {
  padding: 6px 15px;
  margin-right: 10px;
  background: transparent; /* 默认无背景 */
  border: 1px solid #e0e0e0; /* 添加浅色边框替代背景 */
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.secondary-tabs .tab-btn.active {
  background: #0056b3;
  color: white;
  border-color: #0056b3;
}

.secondary-tabs .tab-btn:hover:not(.active) {
  background: rgba(0, 86, 179, 0.05);
  border-color: #0056b3;
}

/* 搜索框样式 */
.search-box {
  display: flex;
  padding: 15px 20px 20px; /* 增加上下内边距 */
  margin-bottom: 10px; /* 增加与下方内容的间距 */
}

.search-box input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.search-box .btn-search {
  padding: 0 25px;
  background: #0056b3;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 16px;
  cursor: pointer;
}

/* 确保与截图一致的港口搜索样式 */
.port-search {
  display: flex;
  padding: 15px;
  gap: 15px;
}

.port-from,
.port-to {
  flex: 1;
}

.port-from label,
.port-to label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
  text-align: left;
}

.port-from input,
.port-to input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

/* 新增文字链接样式 */
.text-links {
  display: flex;
  justify-content: flex-end;
  padding: 0 20px 15px; /* 增加内边距 */
}

.text-link {
  color: #0056b3;
  text-decoration: none;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.text-link i {
  margin-right: 5px;
}

/* 底部社交链接优化 */
.text-social-links {
  display: flex;
  justify-content: center;
  padding: 15px 0; /* 增加上下内边距 */
  gap: 40px; /* 增加间距 */
  margin-top: 5px; /* 增加与上方内容的间距 */
  border-top: 1px solid #f0f0f0; /* 添加分隔线 */
}

.text-social-item {
  color: #0056b3;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 8px 12px; /* 增加内边距使按钮更大 */
  border-radius: 4px;
  transition: background-color 0.3s;
}

.text-social-item:hover {
  background-color: rgba(0, 86, 179, 0.1);
}

.text-social-item i {
  margin-right: 5px;
  font-size: 16px;
}

/* 完全重写二维码弹出样式 */
.qrcode-wrapper {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: none;
  z-index: 100;
  margin-bottom: 10px;
  width: 140px;
  height: 140px;
}

.qrcode-wrapper:after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 10px 10px 0;
  border-style: solid;
  border-color: white transparent transparent;
}

.text-social-item.wechat:hover .qrcode-wrapper,
.text-social-item.miniapp:hover .qrcode-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 增强响应式调整，让搜索框在各种屏幕尺寸下都能显示 */
@media screen and (max-width: 1366px) {
  .search-form {
    margin-top: -90px; /* 略微减小负边距 */
  }
}

@media screen and (max-width: 1200px) {
  .search-form {
    margin-top: -110px;
  }
}

@media screen and (max-width: 992px) {
  .search-form {
    margin-top: -150px;
  }
}

/* 确保搜索框内容更紧凑 */
.primary-tabs .tab-btn {
  padding: 12px;
}

.search-box {
  padding: 15px;
}

.port-search {
  padding: 15px;
}

/* 直接在组件中添加更高优先级的样式 */
.search-form {
  min-height: 120px !important;
  padding-bottom: 0 !important;
}

.primary-tabs .tab-btn {
  padding: 10px 15px !important;
}

.tab-content {
  padding-top: 0 !important;
}

.secondary-tabs {
  margin-bottom: 0 !important;
  padding: 5px 15px 2px !important;
  background: transparent !important;
}

.search-box {
  padding: 5px 20px !important;
  margin-top: 0 !important;
  margin-bottom: 2px !important;
}

.text-links {
  padding: 0 20px 5px !important;
}

.text-social-links {
  padding: 3px 0 !important;
  margin-top: 0 !important;
  border-top: 1px solid #f0f0f0 !important;
}
</style>
