<template>
  <div class="profile-container">
    
    <!-- 基本信息展示模块 -->
    <div class="card-container">
      <h3 class="section-title">基本信息</h3>
      
      <div class="info-list">
        <div class="info-item">
          <span class="info-label">中文名字</span>
          <div class="info-value">
            <span>管理员</span>
            <a-button type="text" class="edit-icon" @click="openEditModal('name')">
              <icon-edit />
            </a-button>
          </div>
        </div>
        
        <div class="info-item">
          <span class="info-label">别名</span>
          <div class="info-value">
            <span>Admin</span>
            <a-button type="text" class="edit-icon" @click="openEditModal('alias')">
              <icon-edit />
            </a-button>
          </div>
        </div>
        
        <div class="info-item">
          <span class="info-label">密码</span>
          <div class="info-value">
            <span>********</span>
            <a-button type="text" class="edit-icon" @click="showPasswordModal = true">
              <icon-edit />
            </a-button>
          </div>
        </div>
        
        <div class="info-item">
          <span class="info-label">手机号</span>
          <div class="info-value">
            <span>13800138000</span>
            <a-button type="text" class="edit-icon" @click="openEditModal('phone')">
              <icon-edit />
            </a-button>
          </div>
        </div>
        
        <div class="info-item">
          <span class="info-label">邮箱</span>
          <div class="info-value">
            <span>chuck-g@newhappy2002.com</span>
            <a-button type="text" class="edit-icon" @click="openEditModal('email')">
              <icon-edit />
            </a-button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 已绑定企业列表 -->
    <div class="card-container">
      <div class="section-header">
        <h3 class="section-title">已绑定企业</h3>
        <a-button type="primary" size="small" @click="showCompanyCodeModal = true">
          <icon-plus />
          输入企业码
        </a-button>
      </div>
      
      <a-table 
        :data="companyList" 
        :pagination="false" 
        :bordered="false"
        :stripe="true"
        class="company-table"
      >
        <template #columns>
          <a-table-column title="状态" data-index="status">
            <template #cell="{ record }">
              <a-tag :color="record.statusColor">{{ record.status }}</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="邮箱或手机号" data-index="account" />
          <a-table-column title="归属" data-index="ownership" />
          <a-table-column title="属性" data-index="attribute" />
          <a-table-column title="操作" :width="150">
            <template #cell="{ record }">
              <a-space>
                <a-button type="text" size="small" status="danger" v-if="record.canUnbind" @click="showUnbindModal(record.account)">解绑</a-button>
                <a-button type="text" size="small" status="warning" v-if="record.status === '离线'" @click="showSwitchModal('blackmei@walltechsystem.cn')">切换</a-button>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>
    
    <!-- 修改密码弹窗 -->
    <a-modal
      v-model:visible="showPasswordModal"
      title="修改密码"
      @cancel="cancelPasswordChange"
      @before-ok="handlePasswordChange"
      :footer="false"
      :mask-closable="false"
      :width="450"
    >
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-icon">
            <icon-lock />
          </div>
          <div class="modal-title">修改密码</div>
          <div class="modal-subtitle">请输入您的当前密码和新密码</div>
        </div>
        
        <a-form :model="passwordForm" layout="vertical" class="custom-form">
          <a-form-item field="oldPassword" label="当前密码">
            <a-input-password v-model="passwordForm.oldPassword" placeholder="请输入当前密码" allow-clear />
          </a-form-item>
          
          <a-form-item field="newPassword" label="新密码">
            <a-input-password v-model="passwordForm.newPassword" placeholder="请输入新密码" allow-clear />
          </a-form-item>
          
          <a-form-item field="confirmPassword" label="确认新密码">
            <a-input-password v-model="passwordForm.confirmPassword" placeholder="请再次输入新密码" allow-clear />
          </a-form-item>
          
          <div class="form-actions">
            <a-button @click="cancelPasswordChange" class="cancel-btn">取消</a-button>
            <a-button type="primary" @click="handlePasswordChange" :loading="submitLoading">确认修改</a-button>
          </div>
        </a-form>
      </div>
    </a-modal>
    
    <!-- 编辑信息弹窗 -->
    <a-modal
      v-model:visible="showEditModal"
      :title="editModalTitle"
      @cancel="cancelEdit"
      @before-ok="handleEdit"
      :footer="false"
      :mask-closable="false"
      :width="450"
    >
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-icon">
            <icon-edit />
          </div>
          <div class="modal-title">{{ editModalTitle }}</div>
          <div class="modal-subtitle">请输入新的{{ editModalLabel }}</div>
        </div>
        
        <a-form :model="editForm" layout="vertical" class="custom-form">
          <a-form-item field="value" :label="editModalLabel">
            <a-input v-model="editForm.value" :placeholder="`请输入${editModalLabel}`" allow-clear />
          </a-form-item>
          
          <template v-if="editField === 'phone' || editField === 'email'">
            <div class="verify-code-area">
              <a-form-item field="verifyCode" label="验证码">
                <div class="verify-code-input">
                  <a-input v-model="editForm.verifyCode" placeholder="请输入验证码" allow-clear />
                  <a-button type="outline" :disabled="codeCooldown > 0" @click="sendVerifyCode">
                    {{ codeCooldown > 0 ? `${codeCooldown}秒后重新获取` : '获取验证码' }}
                  </a-button>
                </div>
              </a-form-item>
            </div>
          </template>
          
          <div class="form-actions">
            <a-button @click="cancelEdit" class="cancel-btn">取消</a-button>
            <a-button type="primary" @click="handleEdit" :loading="submitLoading">保存修改</a-button>
          </div>
        </a-form>
      </div>
    </a-modal>
    
    <!-- 输入企业码弹窗 -->
    <a-modal
      v-model:visible="showCompanyCodeModal"
      title="输入企业码"
      @cancel="cancelCompanyCode"
      @before-ok="handleCompanyCode"
      :footer="false"
      :mask-closable="false"
      :width="450"
    >
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-icon">
            <icon-plus />
          </div>
          <div class="modal-title">输入企业码</div>
          <div class="modal-subtitle">请输入企业提供的企业码进行绑定</div>
        </div>
        
        <a-form :model="companyCodeForm" layout="vertical" class="custom-form">
          <a-form-item field="code" label="企业码">
            <a-input v-model="companyCodeForm.code" placeholder="请输入企业码" allow-clear />
          </a-form-item>
          
          <div class="form-actions">
            <a-button @click="cancelCompanyCode" class="cancel-btn">取消</a-button>
            <a-button type="primary" @click="handleCompanyCode" :loading="submitLoading">提交绑定</a-button>
          </div>
        </a-form>
      </div>
    </a-modal>
    
    <!-- 解绑确认弹窗 -->
    <a-modal
      v-model:visible="showUnbindConfirmModal"
      title="解绑确认"
      @cancel="cancelUnbind"
      @before-ok="handleUnbind"
      :footer="false"
      :mask-closable="false"
      :width="450"
    >
      <div class="modal-content">
        <div class="modal-header warning">
          <div class="modal-icon">
            <icon-exclamation-circle />
          </div>
          <div class="modal-title">解绑确认</div>
        </div>
        
        <div class="confirm-message">
          <p>请确认是否解除账号 <span class="highlight-text">({{ unbindAccount }})</span> 的绑定？</p>
          <p class="sub-message">解绑后，您将无法使用该账号登录对应企业系统。</p>
        </div>
        
        <div class="form-actions">
          <a-button @click="cancelUnbind" class="cancel-btn">取消</a-button>
          <a-button type="primary" status="danger" @click="handleUnbind" :loading="submitLoading">确认解绑</a-button>
        </div>
      </div>
    </a-modal>
    
    <!-- 切换确认弹窗 -->
    <a-modal
      v-model:visible="showSwitchConfirmModal"
      title="切换账号确认"
      @cancel="cancelSwitch"
      @before-ok="handleSwitch"
      :footer="false"
      :mask-closable="false"
      :width="450"
    >
      <div class="modal-content">
        <div class="modal-header info">
          <div class="modal-icon">
            <icon-swap />
          </div>
          <div class="modal-title">切换账号确认</div>
        </div>
        
        <div class="confirm-message">
          <p>请确认是否切换 <span class="highlight-text">({{ switchAccount }})</span> 作为您的工作账号？</p>
          <p class="sub-message">切换后，系统将使用该账号进行后续操作。</p>
        </div>
        
        <div class="form-actions">
          <a-button @click="cancelSwitch" class="cancel-btn">取消</a-button>
          <a-button type="primary" status="warning" @click="handleSwitch" :loading="submitLoading">确认切换</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { Message } from "@arco-design/web-vue";
import { 
  IconEdit, 
  IconPlus, 
  IconLock, 
  IconExclamationCircle, 
  IconSwap 
} from "@arco-design/web-vue/es/icon";

export default defineComponent({
  name: "ProfilePage",
  components: {
    IconEdit,
    IconPlus,
    IconLock,
    IconExclamationCircle,
    IconSwap
  },
  setup() {
    const showPasswordModal = ref(false);
    const showEditModal = ref(false);
    const showCompanyCodeModal = ref(false);
    const showUnbindConfirmModal = ref(false);
    const showSwitchConfirmModal = ref(false);
    const editModalTitle = ref("");
    const editModalLabel = ref("");
    const editField = ref("");
    const unbindAccount = ref("");
    const switchAccount = ref("");
    const submitLoading = ref(false);
    const codeCooldown = ref(0);
    
    const passwordForm = reactive({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    
    const editForm = reactive({
      value: "",
      verifyCode: ""
    });
    
    const companyCodeForm = reactive({
      code: ""
    });
    
    // 已绑定企业列表数据
    const companyList = reactive([
      {
        id: 1,
        name: "上海新悦航运有限公司",
        account: "chuck-g@newhappy2002.com",
        status: "有效",
        statusColor: "green",
        ownership: "个人",
        attribute: "个人",
        canUnbind: false
      },
      {
        id: 2,
        name: "上海联创物流有限公司",
        account: "13800138000",
        status: "在线",
        statusColor: "blue",
        ownership: "上海联创物流有限公司",
        attribute: "企业员工",
        canUnbind: true
      },
      {
        id: 3,
        name: "深圳市智慧物流科技有限公司",
        account: "chuck-g@newhappy2002.com",
        status: "离线",
        statusColor: "grey",
        ownership: "深圳市智慧物流科技有限公司",
        attribute: "企业员工",
        canUnbind: true
      },
      {
        id: 4,
        name: "广州海运贸易有限公司",
        account: "chuck-g@newhappy2002.com",
        status: "离线",
        statusColor: "grey",
        ownership: "广州海运贸易有限公司",
        attribute: "企业员工",
        canUnbind: true
      }
    ]);
    
    // 验证码倒计时
    const startCodeCooldown = () => {
      codeCooldown.value = 60;
      const timer = setInterval(() => {
        codeCooldown.value--;
        if (codeCooldown.value <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    };

    // 发送验证码
    const sendVerifyCode = () => {
      if (codeCooldown.value > 0) return;
      
      if (!editForm.value) {
        Message.warning(`请先输入${editModalLabel.value}`);
        return;
      }
      
      // 模拟发送验证码
      Message.success(`验证码已发送至${editForm.value}`);
      startCodeCooldown();
    };
    
    // 打开编辑信息弹窗
    const openEditModal = (field: string) => {
      editField.value = field;
      editForm.verifyCode = ""; // 重置验证码
      
      switch(field) {
        case 'name':
          editModalTitle.value = "修改中文名字";
          editModalLabel.value = "中文名字";
          editForm.value = "管理员";
          break;
        case 'alias':
          editModalTitle.value = "修改别名";
          editModalLabel.value = "别名";
          editForm.value = "Admin";
          break;
        case 'phone':
          editModalTitle.value = "修改手机号";
          editModalLabel.value = "手机号";
          editForm.value = "13800138000";
          break;
        case 'email':
          editModalTitle.value = "修改邮箱";
          editModalLabel.value = "邮箱";
          editForm.value = "chuck-g@newhappy2002.com";
          break;
      }
      
      showEditModal.value = true;
    };
    
    // 处理编辑信息提交
    const handleEdit = async () => {
      if (!editForm.value) {
        Message.warning(`请输入${editModalLabel.value}`);
        return false;
      }
      
      // 验证码验证
      if ((editField.value === 'phone' || editField.value === 'email') && !editForm.verifyCode) {
        Message.warning("请输入验证码");
        return false;
      }
      
      submitLoading.value = true;
      
      // 模拟信息更新
      await new Promise(resolve => setTimeout(resolve, 800));
      Message.success(`${editModalLabel.value}修改成功`);
      
      submitLoading.value = false;
      showEditModal.value = false;
      return true;
    };
    
    // 取消编辑信息
    const cancelEdit = () => {
      editForm.value = "";
      editForm.verifyCode = "";
      showEditModal.value = false;
    };
    
    // 处理企业码提交
    const handleCompanyCode = async () => {
      if (!companyCodeForm.code) {
        Message.warning("请输入企业码");
        return false;
      }
      
      submitLoading.value = true;
      
      // 模拟绑定企业
      await new Promise(resolve => setTimeout(resolve, 800));
      Message.success("企业绑定申请已提交");
      companyCodeForm.code = "";
      
      submitLoading.value = false;
      showCompanyCodeModal.value = false;
      return true;
    };
    
    // 取消企业码输入
    const cancelCompanyCode = () => {
      companyCodeForm.code = "";
      showCompanyCodeModal.value = false;
    };

    const handlePasswordChange = async () => {
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        Message.error("两次输入的新密码不一致");
        return false;
      }
      
      if (!passwordForm.oldPassword) {
        Message.warning("请输入当前密码");
        return false;
      }
      
      if (!passwordForm.newPassword) {
        Message.warning("请输入新密码");
        return false;
      }
      
      submitLoading.value = true;
      
      // 模拟密码修改
      await new Promise(resolve => setTimeout(resolve, 800));
      Message.success("密码修改成功");
      resetPasswordForm();
      
      submitLoading.value = false;
      showPasswordModal.value = false;
      return true;
    };
    
    const cancelPasswordChange = () => {
      resetPasswordForm();
      showPasswordModal.value = false;
    };
    
    const resetPasswordForm = () => {
      passwordForm.oldPassword = "";
      passwordForm.newPassword = "";
      passwordForm.confirmPassword = "";
    };

    // 显示解绑确认弹窗
    const showUnbindModal = (account: string) => {
      unbindAccount.value = account;
      showUnbindConfirmModal.value = true;
    };
    
    // 处理解绑确认
    const handleUnbind = async () => {
      submitLoading.value = true;
      
      // 模拟解绑操作
      await new Promise(resolve => setTimeout(resolve, 800));
      Message.success(`账号 ${unbindAccount.value} 已成功解绑`);
      
      submitLoading.value = false;
      showUnbindConfirmModal.value = false;
      return true;
    };
    
    // 取消解绑
    const cancelUnbind = () => {
      unbindAccount.value = "";
      showUnbindConfirmModal.value = false;
    };
    
    // 显示切换确认弹窗
    const showSwitchModal = (account: string) => {
      switchAccount.value = account;
      showSwitchConfirmModal.value = true;
    };
    
    // 处理切换确认
    const handleSwitch = async () => {
      submitLoading.value = true;
      
      // 模拟切换操作
      await new Promise(resolve => setTimeout(resolve, 800));
      Message.success(`已成功切换到账号 ${switchAccount.value}`);
      
      submitLoading.value = false;
      showSwitchConfirmModal.value = false;
      return true;
    };
    
    // 取消切换
    const cancelSwitch = () => {
      switchAccount.value = "";
      showSwitchConfirmModal.value = false;
    };

    return {
      passwordForm,
      showPasswordModal,
      companyList,
      showEditModal,
      editModalTitle,
      editModalLabel,
      editField,
      editForm,
      companyCodeForm,
      showCompanyCodeModal,
      showUnbindConfirmModal,
      showSwitchConfirmModal,
      unbindAccount,
      switchAccount,
      submitLoading,
      codeCooldown,
      openEditModal,
      handleEdit,
      cancelEdit,
      sendVerifyCode,
      handleCompanyCode,
      cancelCompanyCode,
      handlePasswordChange,
      cancelPasswordChange,
      showUnbindModal,
      handleUnbind,
      cancelUnbind,
      showSwitchModal,
      handleSwitch,
      cancelSwitch
    };
  },
});
</script>

<style scoped>
.profile-container {
  width: 100%;
  padding: 0 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
  color: #333;
}

.card-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 24px;
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
  text-align: left;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.section-header .section-title {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0;
}

.info-label {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  width: 100px;
  flex-shrink: 0;
  text-align: left;
  padding-left: 0;
}

.info-value {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  flex: 1;
}

.edit-icon {
  color: #1890ff;
  margin-left: 8px;
  font-size: 14px;
  padding: 0;
}

.company-table {
  width: 100%;
}

/* 表格样式 */
:deep(.arco-table-th) {
  background-color: #f5f7fa;
  font-weight: 500;
}

:deep(.arco-table-container) {
  border: none;
}

:deep(.arco-table-header) {
  border-bottom: 1px solid #f0f0f0;
}

:deep(.arco-btn-text) {
  padding: 0 8px;
}

/* 弹窗样式 */
.modal-content {
  padding: 0 10px;
}

.modal-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  text-align: center;
}

.modal-header.warning .modal-icon {
  background-color: #fff2e8;
  color: #fa541c;
}

.modal-header.info .modal-icon {
  background-color: #e8f4ff;
  color: #165dff;
}

.modal-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f2f3f5;
  color: #1890ff;
  font-size: 24px;
  margin-bottom: 16px;
  transition: all 0.3s;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #1d2129;
  margin-bottom: 8px;
}

.modal-subtitle {
  font-size: 14px;
  color: #86909c;
  margin-bottom: 8px;
}

.custom-form {
  margin-top: 16px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.cancel-btn {
  color: #86909c;
  background-color: #f7f8fa;
  border-color: #e5e6eb;
}

.cancel-btn:hover {
  color: #4e5969;
  background-color: #e5e6eb;
  border-color: #c9cdd4;
}

.verify-code-area {
  margin-top: 4px;
}

.verify-code-input {
  display: flex;
  gap: 12px;
}

.verify-code-input button {
  flex-shrink: 0;
  width: 130px;
}

.confirm-message {
  background-color: #f7f8fa;
  border-radius: 4px;
  padding: 16px;
  margin: 16px 0;
}

.confirm-message p {
  margin: 0;
  line-height: 1.6;
}

.highlight-text {
  color: #1890ff;
  font-weight: 500;
}

.sub-message {
  color: #86909c;
  font-size: 13px;
  margin-top: 8px !important;
}

:deep(.arco-modal) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.arco-modal-header) {
  border-bottom: none;
  padding: 20px 20px 0;
}

:deep(.arco-modal-body) {
  padding: 16px 20px 20px;
}

:deep(.arco-input-wrapper),
:deep(.arco-input-password) {
  border-radius: 4px;
}

:deep(.arco-input-wrapper:focus-within),
:deep(.arco-input-password:focus-within) {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

:deep(.arco-btn) {
  border-radius: 4px;
  transition: all 0.2s;
}
</style>
