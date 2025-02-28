// 模拟聊天服务

let chatInitialized = false;

export const initChatService = () => {
  return new Promise(resolve => {
    console.log("初始化聊天服务...");
    // 模拟初始化过程
    setTimeout(() => {
      chatInitialized = true;
      console.log("聊天服务初始化完成");
      resolve();
    }, 500);
  });
};

export const openChatWindow = () => {
  if (!chatInitialized) {
    console.warn("聊天服务未初始化，请先初始化");
    return;
  }

  console.log("打开聊天窗口");
  alert("聊天窗口已打开");
  // 在实际应用中，这里会打开聊天窗口或加载聊天组件
};
