<template>
  <div class="register-container">
    <div class="container-overlay"></div>
    <div class="register-box">
      <div class="register-header">
        <div class="logo">
          <img src="@/assets/images/logo.png" alt="WALLTECH FAMILY" />
        </div>
        <h2>沃行货运网</h2>
      </div>
      
      <div class="form-group">
        <div class="form-label">手机/邮箱 (仅支持中国大陆的手机号)</div>
        <input
          type="text"
          class="form-input"
          v-model="formData.phone"
          placeholder="请输入您的手机/邮箱"
        />
      </div>
      
      <div class="form-group">
        <div class="form-label">短信/邮件验证码</div>
        <div class="verify-code-group">
          <input
            type="text"
            class="form-input"
            v-model="formData.verifyCode"
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
      
      <div class="checkbox-group">
        <label class="checkbox-container">
          <input type="checkbox" v-model="formData.joinExistingCompany" />
          <span class="checkbox-text">所在企业已入驻，直接加入企业</span>
        </label>
      </div>
      
      <div class="form-group" v-if="formData.joinExistingCompany">
        <input
          type="text"
          class="form-input"
          v-model="formData.companyCode"
          placeholder="请输入企业提供的企业码"
        />
      </div>
      
      <div class="checkbox-group">
        <label class="checkbox-container">
          <input type="checkbox" v-model="formData.agreeTerms" />
          <span class="checkbox-text">
            我已阅读并接受<a href="#" class="link">《用户协议》</a>
          </span>
        </label>
      </div>
      
      <button class="register-button" @click="handleSubmit" :disabled="loading">
        {{ loading ? "注册中..." : "注册" }}
      </button>
      
      <div class="register-links">
        <span>已注册，</span>
        <router-link to="/login" class="link">立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "RegisterPage",
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const countdown = ref(0);

    const formData = reactive({
      phone: "",
      verifyCode: "",
      joinExistingCompany: false,
      companyCode: "",
      agreeTerms: false,
    });

    const getVerifyCode = async () => {
      try {
        if (!formData.phone) {
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

    const handleSubmit = async () => {
      try {
        // 表单验证
        if (!formData.phone) {
          Message.warning("请输入手机号或邮箱");
          return;
        }
        
        if (!formData.verifyCode) {
          Message.warning("请输入验证码");
          return;
        }
        
        if (formData.joinExistingCompany && !formData.companyCode) {
          Message.warning("请输入企业编码");
          return;
        }
        
        if (!formData.agreeTerms) {
          Message.warning("请阅读并接受用户协议");
          return;
        }

        loading.value = true;
        // TODO: 实现注册逻辑
        await new Promise(resolve => setTimeout(resolve, 1000));
        Message.success("注册成功");
        router.push("/login");
      } catch (error) {
        Message.error("注册失败");
      } finally {
        loading.value = false;
      }
    };

    return {
      formData,
      loading,
      countdown,
      handleSubmit,
      getVerifyCode,
    };
  },
});
</script>

<style scoped>
.register-container {
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

.register-box {
  width: 440px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.register-header {
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

.register-header h2 {
  margin: 0;
  font-size: 20px;
  color: #666;
  font-weight: 400;
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

.checkbox-group {
  margin-bottom: 15px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-container input[type="checkbox"] {
  margin-right: 8px;
  width: 16px;
  height: 16px;
}

.checkbox-text {
  font-size: 14px;
  color: #666;
}

.register-button {
  width: 100%;
  height: 40px;
  background-color: #1d4ed8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 15px;
}

.register-button:disabled {
  background-color: #bbb;
  cursor: not-allowed;
}

.register-links {
  text-align: center;
  font-size: 14px;
  color: #666;
}

.link {
  color: #1d4ed8;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
