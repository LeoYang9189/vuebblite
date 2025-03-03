<template>
  <div class="verification-container">
    <h2 class="page-title">企业资料</h2>

    <!-- 企业信息表单 -->
    <div class="form-container">
      <div class="form-grid">
        <div class="form-row">
          <div class="form-item">
            <span class="form-label">企业名称</span>
            <a-input v-model="formData.companyName" placeholder="请输入" />
          </div>
          <div class="form-item">
            <span class="form-label">企业英文名称</span>
            <a-input v-model="formData.companyNameEn" placeholder="请输入" />
          </div>
          <div class="form-item">
            <span class="form-label">法定代表人</span>
            <a-input v-model="formData.legalRepresentative" placeholder="请输入" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-item">
            <span class="form-label">状态</span>
            <a-select v-model="formData.status" placeholder="请选择">
              <a-option value="启用">启用</a-option>
              <a-option value="禁用">禁用</a-option>
            </a-select>
          </div>
          <div class="form-item">
            <span class="form-label">企业类型</span>
            <a-select v-model="formData.companyType" placeholder="请选择">
              <a-option value="">请选择</a-option>
              <a-option value="国有企业">国有企业</a-option>
              <a-option value="民营企业">民营企业</a-option>
              <a-option value="外资企业">外资企业</a-option>
              <a-option value="合资企业">合资企业</a-option>
            </a-select>
          </div>
          <div class="form-item">
            <span class="form-label">证件类型</span>
            <a-select v-model="formData.idType" placeholder="请选择">
              <a-option value="">请选择</a-option>
              <a-option value="营业执照">营业执照</a-option>
              <a-option value="统一社会信用代码证">统一社会信用代码证</a-option>
            </a-select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-item">
            <span class="form-label">证件号码</span>
            <a-input v-model="formData.idNumber" placeholder="请输入" />
          </div>
          <div class="form-item">
            <span class="form-label">注册资本</span>
            <a-input-number v-model="formData.registeredCapital" placeholder="请输入" :min="0" style="width: 100%" />
          </div>
          <div class="form-item">
            <span class="form-label">成立日期</span>
            <a-date-picker v-model="formData.establishDate" style="width: 100%" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-item">
            <span class="form-label">营业期限</span>
            <a-range-picker v-model="formData.businessTerm" style="width: 100%" />
          </div>
          <div class="form-item">
            <span class="form-label">CargoWareFMS客户号</span>
            <a-input v-model="formData.cargoWareFMS" placeholder="请输入" />
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="section-title">企业证件</div>
        <div class="upload-container">
          <a-upload
            :file-list="companyDocuments"
            list-type="picture-card"
            @change="handleCompanyDocumentsChange"
          >
            <div v-if="companyDocuments.length < 5">
              <i class="icon-plus"></i>
              <div class="upload-text">上传企业证件</div>
            </div>
          </a-upload>
        </div>
      </div>

      <div class="form-section">
        <div class="section-title">表格及其他附件</div>
        <div class="upload-container">
          <a-upload
            :file-list="otherDocuments"
            list-type="picture-card"
            @change="handleOtherDocumentsChange"
          >
            <div v-if="otherDocuments.length < 5">
              <i class="icon-plus"></i>
              <div class="upload-text">上传其他附件</div>
            </div>
          </a-upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { Message } from "@arco-design/web-vue";

export default defineComponent({
  name: "CompanyInfoPage",
  setup() {
    // 表单数据
    const formData = reactive({
      companyName: "",
      companyNameEn: "",
      legalRepresentative: "",
      status: "",
      companyType: "",
      idType: "",
      idNumber: "",
      registeredCapital: undefined as number | undefined,
      establishDate: undefined as string | number | Date | undefined,
      businessTerm: [] as (string | number | Date)[],
      cargoWareFMS: ""
    });

    // 企业证件文件列表
    const companyDocuments = ref([]);

    // 其他文件列表
    const otherDocuments = ref([]);

    // 处理企业证件上传
    const handleCompanyDocumentsChange = (fileList: any) => {
      companyDocuments.value = fileList;
    };

    // 处理其他文件上传
    const handleOtherDocumentsChange = (fileList: any) => {
      otherDocuments.value = fileList;
    };

    return {
      formData,
      companyDocuments,
      otherDocuments,
      handleCompanyDocumentsChange,
      handleOtherDocumentsChange
    };
  }
});
</script>

<style scoped>
.verification-container {
  width: 100%;
  padding: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #333;
  text-align: left;
}

/* 表单容器样式 */
.form-container {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 24px;
  margin-bottom: 20px;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-item {
  flex: 1;
  min-width: 0;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.form-section {
  margin-top: 30px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 16px;
}

.upload-container {
  padding: 16px 0;
}

/* Arco 组件样式覆盖 */
:deep(.arco-input-wrapper), :deep(.arco-select), :deep(.arco-picker) {
  border-radius: 4px;
  width: 100%;
}

:deep(.arco-picker) {
  display: inline-flex;
}

:deep(.arco-btn) {
  border-radius: 4px;
}

:deep(.arco-input-wrapper), :deep(.arco-select) {
  background-color: #fff;
}

:deep(.arco-upload-list-picture-card) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

:deep(.arco-upload-picture-card) {
  width: 120px;
  height: 120px;
  border-radius: 4px;
  border: 1px dashed #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}

:deep(.arco-upload-picture-card:hover) {
  border-color: #1890ff;
}

.icon-plus {
  font-size: 24px;
  color: #999;
  margin-bottom: 8px;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .form-row {
    flex-wrap: wrap;
  }
  
  .form-item {
    flex-basis: calc(50% - 10px);
    min-width: calc(50% - 10px);
  }
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 16px;
  }
  
  .form-item {
    flex-basis: 100%;
    min-width: 100%;
  }
}
</style> 