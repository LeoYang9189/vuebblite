<template>
  <div class="login-container">
    <div class="container-overlay"></div>
    <div class="login-box">
      <div class="login-header">
        <div class="logo">
          <img src="@/assets/images/logo.png" alt="航运公司" />
        </div>
        <h2>上海沃行航运有限公司</h2>
      </div>

      <div class="login-tabs">
        <div
          class="tab-item"
          :class="{ active: activeTab === 'password' }"
          @click="activeTab = 'password'"
        >
          账号密码登录
        </div>
        <div
          class="tab-item"
          :class="{ active: activeTab === 'code' }"
          @click="activeTab = 'code'"
        >
          验证码登录
        </div>
      </div>

      <!-- 账号密码登录表单 -->
      <div v-if="activeTab === 'password'">
        <div class="form-group">
          <div class="form-label">手机/邮箱</div>
          <input
            type="text"
            class="form-input"
            v-model="passwordForm.username"
            placeholder="请输入您的手机/邮箱"
          />
        </div>

        <div class="form-group">
          <div class="form-label">密码</div>
          <input
            type="password"
            class="form-input"
            v-model="passwordForm.password"
            placeholder="请输入密码"
          />
        </div>

        <button class="login-button" @click="handlePasswordSubmit" :disabled="loading">
          {{ loading ? "登录中..." : "登录" }}
        </button>
      </div>

      <!-- 验证码登录表单 -->
      <div v-if="activeTab === 'code'">
        <div class="form-group">
          <div class="form-label">手机/邮箱</div>
          <input
            type="text"
            class="form-input"
            v-model="codeForm.username"
            placeholder="请输入您的手机/邮箱"
          />
        </div>

        <div class="form-group">
          <div class="form-label">短信/邮件验证码</div>
          <div class="verify-code-group">
            <input
              type="text"
              class="form-input"
              v-model="codeForm.verifyCode"
              placeholder="请输入验证码"
            />
            <button
              type="button"
              class="verify-code-button"
              @click="getVerifyCode"
              :disabled="loading || !!countdown"
            >
              {{ countdown ? `${countdown}s` : "获取验证码" }}
            </button>
          </div>
        </div>

        <button class="login-button" @click="handleCodeSubmit" :disabled="loading">
          {{ loading ? "登录中..." : "登录" }}
        </button>
      </div>

      <div class="login-links">
        <span>新用户?</span>
        <router-link to="/register">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const countdown = ref(0);
    const activeTab = ref("password");

    // 账号密码登录表单
    const passwordForm = reactive({
      username: "",
      password: "",
    });

    // 验证码登录表单
    const codeForm = reactive({
      username: "",
      verifyCode: "",
    });

    const getVerifyCode = async () => {
      try {
        if (!codeForm.username) {
          Message.warning("请先输入手机号或邮箱");
          return;
        }

        loading.value = true;
        // TODO: 调用发送验证码接口
        await new Promise(resolve => setTimeout(resolve, 1000));
        Message.success("验证码已发送");

        // 开始倒计时
        countdown.value = 60;
        const timer = setInterval(() => {
          countdown.value--;
          if (countdown.value === 0) {
            clearInterval(timer);
          }
        }, 1000);
      } catch (error) {
        Message.error("验证码发送失败");
      } finally {
        loading.value = false;
      }
    };

    const handlePasswordSubmit = async () => {
      try {
        // 表单验证
        if (!passwordForm.username) {
          Message.warning("请输入手机号或邮箱");
          return;
        }
        if (!passwordForm.password) {
          Message.warning("请输入密码");
          return;
        }
        
        loading.value = true;
        
        // 虚拟账号登录逻辑
        if (passwordForm.username === 'yunying' && passwordForm.password === '123') {
          // 存储登录状态和用户信息
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', 'yunying');
          localStorage.setItem('userRole', 'admin');
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          Message.success("登录成功");
          router.push("/dashboard/profile");
        } else {
          throw new Error("用户名或密码错误");
        }
      } catch (error) {
        Message.error(error instanceof Error ? error.message : "登录失败");
      } finally {
        loading.value = false;
      }
    };

    const handleCodeSubmit = async () => {
      try {
        // 表单验证
        if (!codeForm.username) {
          Message.warning("请输入手机号或邮箱");
          return;
        }
        if (!codeForm.verifyCode) {
          Message.warning("请输入验证码");
          return;
        }
        
        loading.value = true;
        
        // 虚拟账号验证码登录逻辑
        if (codeForm.username === 'yunying' && codeForm.verifyCode === '123456') {
          // 存储登录状态和用户信息
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', 'yunying');
          localStorage.setItem('userRole', 'admin');
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          Message.success("登录成功");
          router.push("/dashboard/profile");
        } else {
          throw new Error("用户名或验证码错误");
        }
      } catch (error) {
        Message.error(error instanceof Error ? error.message : "登录失败");
      } finally {
        loading.value = false;
      }
    };

    return {
      activeTab,
      passwordForm,
      codeForm,
      loading,
      countdown,
      handlePasswordSubmit,
      handleCodeSubmit,
      getVerifyCode,
    };
  },
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("@/assets/images/shipping-background.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
}

.container-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.15);
  z-index: 1;
}

.login-box {
  width: 440px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.login-header {
  text-align: center;
  margin-bottom: 25px;
}

.logo {
  width: 100px;
  height: 100px;
  margin: 0 auto 16px;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.login-header h2 {
  margin: 0;
  font-size: 20px;
  color: #666;
  font-weight: 400;
}

.login-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e5e5e5;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: all 0.3s;
  border: 1px solid #e5e5e5;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  background-color: #f5f5f5;
}

.tab-item.active {
  color: #000;
  font-weight: 500;
  background-color: #fff;
  border-top: 2px solid #1d4ed8;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  text-align: left;
}

.form-input {
  width: 100%;
  height: 40px;
  padding: 0 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}

.form-input:focus {
  outline: none;
  border-color: #1d4ed8;
}

.verify-code-group {
  display: flex;
  gap: 10px;
}

.verify-code-group input {
  flex: 1;
}

.verify-code-button {
  padding: 0 15px;
  height: 40px;
  background-color: #1d4ed8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}

.verify-code-button:disabled {
  background-color: #bbb;
  cursor: not-allowed;
}

.login-button {
  width: 100%;
  height: 40px;
  background-color: #1d4ed8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.login-button:disabled {
  background-color: #bbb;
  cursor: not-allowed;
}

.login-links {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #666;
}

.login-links a {
  color: #1d4ed8;
  text-decoration: none;
  margin-left: 5px;
}
</style>
