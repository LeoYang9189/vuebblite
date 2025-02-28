<template>
  <div class="floating-service">
    <div class="service-icon" id="serviceIcon" @click="openChat">
      <img src="@/assets/images/chat.png" alt="在线客服" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cozeWebChatClient: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CozeWebSDK: any;
  }
}

export default defineComponent({
  name: "FloatingService",
  setup() {
    const openChat = () => {
      if (window.cozeWebChatClient) {
        // 使用正确的方法打开聊天窗口
        if (window.cozeWebChatClient.open && typeof window.cozeWebChatClient.open === "function") {
          window.cozeWebChatClient.open();
        } else if (
          window.cozeWebChatClient.component &&
          window.cozeWebChatClient.component.setOpen
        ) {
          window.cozeWebChatClient.component.setOpen(true);
        } else {
          console.error("无法找到打开聊天窗口的方法，请检查Coze SDK版本");
        }
      }
    };

    onMounted(() => {
      // 动态加载Coze Chat SDK
      const script = document.createElement("script");
      script.src =
        "https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.3/libs/cn/index.js";
      script.async = true;
      script.onload = () => {
        // 初始化Coze Chat客户端
        window.cozeWebChatClient = new window.CozeWebSDK.WebChatClient({
          config: {
            bot_id: "7476024207646769178",
          },
          componentProps: {
            title: "AI智能客服",
            chatIcon: require("@/assets/images/chat.png"),
            chatBtnStyle: {
              display: "none", // 隐藏默认的聊天按钮，使用我们自定义的按钮
            },
            defaultOpen: false, // 默认不打开
            containerStyle: {
              zIndex: 10000, // 确保层级高于页面其他元素
            },
          },
          auth: {
            type: "token",
            token: "pat_PgtN11U2cfEz7AuZi2O9EcRK9bXH6sDt6wH75Vn3B6KJCHMa7El7SQvs1az3B3HZ",
            onRefreshToken: function () {
              return "pat_PgtN11U2cfEz7AuZi2O9EcRK9bXH6sDt6wH75Vn3B6KJCHMa7El7SQvs1az3B3HZ";
            },
          },
        });
      };

      document.body.appendChild(script);
    });

    return {
      openChat,
    };
  },
});
</script>

<style scoped>
.service-icon {
  width: 60px; /* 使用固定宽度 */
  height: 60px; /* 使用相同的高度确保是正方形 */
  border-radius: 50%; /* 可选：使其成为圆形 */
  overflow: hidden; /* 确保内容不溢出 */
}

.service-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 保持图片比例 */
}
</style>
