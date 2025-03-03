<template>
  <div class="verification-container">
    <h2 class="page-title">企业认证申请</h2>

    <!-- 筛选区域 -->
    <div class="filter-container">
      <div class="filter-rows">
        <!-- 第一行筛选区域 -->
        <div class="filter-row">
          <div class="filter-item">
            <span class="filter-label">企业名称</span>
            <a-input v-model="formData.companyName" placeholder="请输入" />
          </div>
          <div class="filter-item">
            <span class="filter-label">证件号码</span>
            <a-input v-model="formData.idNumber" placeholder="请输入" />
          </div>
          <div class="filter-item">
            <span class="filter-label">状态</span>
            <a-input v-model="formData.status" placeholder="请输入" />
          </div>
          
          <div class="expand-toggle">
            <a-button type="text" @click="toggleExpand">
              {{ isExpanded ? '收起' : '展开' }}
              <icon-up v-if="isExpanded" />
              <icon-down v-else />
            </a-button>
          </div>
        </div>
        
        <!-- 第二行筛选区域（可切换显示/隐藏） -->
        <div v-show="isExpanded" class="filter-row">
          <div class="filter-item">
            <span class="filter-label">企业类型</span>
            <a-select v-model="formData.companyType" placeholder="请选择">
              <a-option value="国有企业">国有企业</a-option>
              <a-option value="股份制企业">股份制企业</a-option>
              <a-option value="其他分类">其他分类</a-option>
            </a-select>
          </div>
          <div class="filter-item">
            <span class="filter-label">法定代表人</span>
            <a-input v-model="formData.legalRepresentative" placeholder="请输入" />
          </div>
        </div>
      </div>
      
      <!-- 按钮区域（右下角） -->
      <div class="filter-actions">
        <a-button type="primary" @click="handleSearch">
          <template #icon><icon-search /></template>
          查询
        </a-button>
        <a-button @click="handleReset">重置</a-button>
      </div>
    </div>

    <!-- 操作区 -->
    <div class="action-container">
      <div class="action-left">
        <a-button type="outline" size="small" @click="showColumnSetting = true">
          <template #icon><icon-settings /></template>
          自定义列
        </a-button>
      </div>
      <div class="action-right">
        <a-button type="primary" @click="handleApply">
          <template #icon><icon-plus /></template>
          申请企业认证
        </a-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="table-container">
      <a-table 
        :data="applicationList" 
        :pagination="false"
        :bordered="{ cell: true }"
        :stripe="false"
        :row-class="rowClass"
        class="custom-table"
        :column-resizable="true"
        :columns="visibleColumns"
        @sorter-change="handleSorterChange"
      >
        <template #th-extra="{ column }">
          <a-tooltip content="排序" position="top" v-if="column.dataIndex && column.dataIndex !== 'operations'">
            <icon-sort class="sort-icon" />
          </a-tooltip>
        </template>
        <template #operations="{ record }">
          <a-button 
            type="text" 
            size="small" 
            :style="{ color: record.status === '未提交' ? '#f5222d' : '#1890ff' }"
            @click="handleView(record)"
          >
            {{ record.status === '未提交' ? '编辑' : '查看' }}
          </a-button>
        </template>
        <template #status="{ record }">
          <a-tag
            :color="record.status === '已通过' ? 'green' : record.status === '未提交' ? 'orange' : 'green'"
            size="small"
          >
            {{ record.status }}
          </a-tag>
        </template>
      </a-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <div class="pagination-left">
        </div>
        <div class="pagination-right">
          <a-pagination 
            v-model:current="pagination.current" 
            v-model:page-size="pagination.pageSize"
            :total="pagination.total"
            show-total
            show-page-size
          >
            <template #total>
              <span>共 {{ pagination.total }} 条</span>
              <a-select v-model="pagination.pageSize" style="width: 120px; margin-left: 16px" size="small">
                <a-option :value="10">15 条/页</a-option>
                <a-option :value="20">20 条/页</a-option>
                <a-option :value="50">50 条/页</a-option>
                <a-option :value="100">100 条/页</a-option>
              </a-select>
            </template>
          </a-pagination>
        </div>
      </div>
    </div>

    <!-- 自定义列设置弹窗 -->
    <a-modal
      v-model:visible="showColumnSetting"
      title="自定义列设置"
      width="500px"
      :footer="false"
      :unmount-on-close="false"
      :mask-closable="false"
      class="column-setting-modal"
    >
      <div class="column-setting-container">
        <div class="column-setting-header">
          <div class="column-setting-tips">
            <icon-info-circle class="info-icon" />
            <span>拖拽调整列顺序，勾选控制列显示</span>
          </div>
        </div>
        
        <a-divider style="margin: 12px 0;" />
        
        <div class="column-list">
          <div 
            v-for="(column, index) in columnSettingList" 
            :key="column.dataIndex"
            class="column-item"
            :class="{ 'dragging': dragIndex === index }"
            draggable="true"
            @dragstart="dragStart(index, $event)"
            @dragover.prevent="dragOver(index, $event)"
            @dragend="dragEnd"
            @drop="drop(index)"
          >
            <div class="column-item-content">
              <div class="column-drag-handle">
                <icon-drag-dot-vertical />
              </div>
              <a-checkbox v-model="column.checked">{{ column.title }}</a-checkbox>
            </div>
          </div>
        </div>
        
        <a-divider style="margin: 12px 0;" />
        
        <div class="setting-actions">
          <a-button @click="resetColumnSetting" type="secondary">恢复默认</a-button>
          <div class="setting-actions-right">
            <a-button @click="cancelColumnSetting">取消</a-button>
            <a-button type="primary" @click="saveColumnSetting">确定</a-button>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from "vue";
import { Message } from "@arco-design/web-vue";
import type { TableColumnData, TableSortable } from "@arco-design/web-vue";
import { 
  IconPlus, 
  IconSearch, 
  IconUp, 
  IconDown, 
  IconLeft, 
  IconRight,
  IconSettings,
  IconDragDotVertical,
  IconSort,
  IconInfoCircle
} from "@arco-design/web-vue/es/icon";

interface ColumnConfig extends Omit<TableColumnData, 'checked'> {
  checked: boolean;
}

export default defineComponent({
  name: "CompanyVerificationPage",
  components: {
    IconPlus,
    IconSearch,
    IconUp,
    IconDown,
    IconLeft,
    IconRight,
    IconSettings,
    IconDragDotVertical,
    IconSort,
    IconInfoCircle
  },
  setup() {
    // 筛选区展开状态 - 默认展开
    const isExpanded = ref(true);
    
    // 切换展开状态
    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value;
    };
    
    // 表单数据
    const formData = reactive({
      companyName: "",
      legalRepresentative: "",
      status: "",
      companyType: "",
      idNumber: ""
    });

    // 分页设置
    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: 21
    });

    // 申请列表数据
    const applicationList = reactive([
      {
        id: 1,
        status: "已通过",
        companyName: "CESH312312",
        idNumber: "CESH312312",
        companyType: "",
        legalRepresentative: "",
        updateTime: "2024/11/09 21:57:20"
      },
      {
        id: 2,
        status: "已通过",
        companyName: "第二个测试123",
        idNumber: "312312312312",
        companyType: "",
        legalRepresentative: "",
        updateTime: "2024/10/16 04:17:07"
      },
      {
        id: 3,
        status: "已通过",
        companyName: "第一个测试123",
        idNumber: "3213213",
        companyType: "",
        legalRepresentative: "",
        updateTime: "2024/10/16 04:12:37"
      },
      {
        id: 4,
        status: "已通过",
        companyName: "测试企业qwert",
        idNumber: "4343434",
        companyType: "",
        legalRepresentative: "",
        updateTime: "2024/09/19 14:27:53"
      },
      {
        id: 5,
        status: "已通过",
        companyName: "测试漂亮企业",
        idNumber: "12123",
        companyType: "国有企业",
        legalRepresentative: "phil",
        updateTime: "2024/08/02 17:11:03"
      },
      {
        id: 6,
        status: "未提交",
        companyName: "红旗汽车",
        idNumber: "989898998",
        companyType: "其他分类",
        legalRepresentative: "甘马",
        updateTime: "2024/08/02 16:48:09"
      },
      {
        id: 7,
        status: "已通过",
        companyName: "ceshi1111",
        idNumber: "ceshi1111",
        companyType: "",
        legalRepresentative: "ceshi1111",
        updateTime: "2024/07/02 23:56:00"
      },
      {
        id: 8,
        status: "已通过",
        companyName: "完美世代",
        idNumber: "310113198009090012",
        companyType: "",
        legalRepresentative: "",
        updateTime: "2024/04/19 09:59:09"
      },
      {
        id: 9,
        status: "已通过",
        companyName: "测试0625",
        idNumber: "06250505055",
        companyType: "",
        legalRepresentative: "",
        updateTime: "2023/06/25 17:06:57"
      },
      {
        id: 10,
        status: "已通过",
        companyName: "上海一部机器人公司",
        idNumber: "c005123",
        companyType: "股份制企业",
        legalRepresentative: "",
        updateTime: "2023/06/12 10:01:13"
      }
    ]);

    // 列配置相关
    const showColumnSetting = ref(false);
    
    // 默认列配置
    const defaultColumns: ColumnConfig[] = [
      {
        title: '状态',
        dataIndex: 'status',
        width: 100,
        align: 'center',
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        slotName: 'status',
        checked: true
      },
      {
        title: '企业名称',
        dataIndex: 'companyName',
        width: 180,
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        checked: true
      },
      {
        title: '证件号码',
        dataIndex: 'idNumber',
        width: 180,
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        checked: true
      },
      {
        title: '企业类型',
        dataIndex: 'companyType',
        width: 120,
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        checked: true
      },
      {
        title: '法定代表人',
        dataIndex: 'legalRepresentative',
        width: 120,
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        checked: true
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        width: 180,
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        checked: true
      },
      {
        title: '操作',
        dataIndex: 'operations',
        width: 120,
        fixed: 'right',
        align: 'center',
        slotName: 'operations',
        checked: true
      }
    ];
    
    // 列设置
    const columnSettingList = ref<ColumnConfig[]>(JSON.parse(JSON.stringify(defaultColumns)));
    
    // 可见列计算属性
    const visibleColumns = computed(() => {
      return columnSettingList.value.filter((col: ColumnConfig) => col.checked);
    });
    
    // 用于存储确认的列设置
    const columnSettingStorage = ref<ColumnConfig[]>(JSON.parse(JSON.stringify(defaultColumns)));
    
    // 用于拖拽的状态
    const dragIndex = ref<number | null>(null);

    // 拖拽开始
    const dragStart = (index: number, event: DragEvent) => {
      dragIndex.value = index;
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.setData('text/plain', index.toString());
      }
    };

    // 拖拽经过
    const dragOver = (index: number, event: DragEvent) => {
      event.preventDefault();
    };

    // 拖拽结束
    const dragEnd = () => {
      dragIndex.value = null;
    };

    // 放置
    const drop = (index: number) => {
      if (dragIndex.value !== null && dragIndex.value !== index) {
        // 移动元素
        const draggedItem = columnSettingList.value[dragIndex.value];
        columnSettingList.value.splice(dragIndex.value, 1);
        columnSettingList.value.splice(index, 0, draggedItem);
      }
      dragIndex.value = null;
    };
    
    // 取消列设置
    const cancelColumnSetting = () => {
      columnSettingList.value = JSON.parse(JSON.stringify(columnSettingStorage.value));
      showColumnSetting.value = false;
    };
    
    // 保存列设置
    const saveColumnSetting = () => {
      columnSettingStorage.value = JSON.parse(JSON.stringify(columnSettingList.value));
      showColumnSetting.value = false;
      Message.success('列设置已保存');
    };
    
    // 重置列设置
    const resetColumnSetting = () => {
      columnSettingList.value = JSON.parse(JSON.stringify(defaultColumns));
    };
    
    // 排序处理
    const handleSorterChange = (dataIndex: string, direction: string) => {
      Message.info(`按${dataIndex}字段${direction === 'ascend' ? '升序' : '降序'}排列`);
      
      // 在前端实现排序逻辑
      if (direction) {
        applicationList.sort((a, b) => {
          const valueA = a[dataIndex as keyof typeof a];
          const valueB = b[dataIndex as keyof typeof b];
          
          // 字符串比较
          if (typeof valueA === 'string' && typeof valueB === 'string') {
            if (direction === 'ascend') {
              return valueA.localeCompare(valueB, 'zh-CN');
            } else {
              return valueB.localeCompare(valueA, 'zh-CN');
            }
          }
          
          // 数字比较
          if (direction === 'ascend') {
            return (valueA as any) - (valueB as any);
          } else {
            return (valueB as any) - (valueA as any);
          }
        });
      }
    };

    // 查询数据
    const handleSearch = () => {
      // 查询逻辑
      Message.success("查询成功");
    };

    // 重置表单
    const handleReset = () => {
      formData.companyName = "";
      formData.legalRepresentative = "";
      formData.status = "";
      formData.companyType = "";
      formData.idNumber = "";
      Message.info("筛选条件已重置");
    };

    // 申请企业认证
    const handleApply = () => {
      // 验证表单
      if (!formData.companyName) {
        Message.warning("请输入企业名称");
        return;
      }
      if (!formData.idNumber) {
        Message.warning("请输入证件号码");
        return;
      }

      // 提交申请逻辑
      Message.success("申请已提交");
    };

    // 查看/编辑记录
    const handleView = (record: any) => {
      if (record.status === '未提交') {
        // 编辑逻辑
        formData.companyName = record.companyName;
        formData.legalRepresentative = record.legalRepresentative;
        formData.status = record.status;
        formData.companyType = record.companyType;
        formData.idNumber = record.idNumber;
        Message.info("已加载编辑数据");
      } else {
        // 查看逻辑
        Message.info(`查看记录: ${record.companyName}`);
      }
    };

    // 行样式
    const rowClass = (record: any) => {
      return record.status === '未提交' ? 'row-warning' : '';
    };

    return {
      isExpanded,
      toggleExpand,
      formData,
      applicationList,
      pagination,
      columnSettingList,
      showColumnSetting,
      visibleColumns,
      dragIndex,
      dragStart,
      dragOver,
      dragEnd,
      drop,
      handleSearch,
      handleReset,
      handleApply,
      handleView,
      rowClass,
      cancelColumnSetting,
      saveColumnSetting,
      resetColumnSetting,
      handleSorterChange
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

/* 筛选区样式 */
.filter-container {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
}

.filter-rows {
  margin-bottom: 50px; /* 为底部按钮留出空间 */
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.filter-row:last-child {
  margin-bottom: 0;
}

.filter-item {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 260px;
  max-width: 360px;
}

.filter-label {
  width: 70px;
  font-size: 14px;
  color: #333;
  text-align: right;
  margin-right: 12px;
  white-space: nowrap;
}

.expand-toggle {
  margin-left: auto;
}

.filter-actions {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 12px;
}

/* 操作区样式 */
.action-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

/* 表格样式 */
.table-container {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.custom-table {
  border-radius: 4px;
  overflow: hidden;
}

:deep(.arco-table-container) {
  border-radius: 4px;
}

:deep(.arco-table-th) {
  background-color: #f7f8fa;
  font-weight: 700;
  color: #333;
  height: 50px;
  padding: 12px 16px;
}

:deep(.arco-table-td) {
  padding: 12px 16px;
  height: 54px;
}

:deep(.arco-table-tr:hover .arco-table-td) {
  background-color: #f5f7fa;
}

:deep(.arco-table-tr.row-warning .arco-table-td) {
  background-color: #fff9e6;
}

:deep(.arco-table-tr.row-warning:hover .arco-table-td) {
  background-color: #fff3d0;
}

/* 分页样式 */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
}

.pagination-left {
  font-size: 14px;
  color: #666;
}

.pagination-right {
  display: flex;
  align-items: center;
}

:deep(.arco-btn) {
  border-radius: 4px;
}

:deep(.arco-select-view) {
  border-radius: 4px;
}

:deep(.arco-input-wrapper) {
  border-radius: 4px;
  flex: 1;
}

:deep(.arco-select) {
  border-radius: 4px;
  flex: 1;
}

:deep(.arco-tag) {
  font-weight: 500;
}

:deep(.arco-pagination) {
  display: flex;
  align-items: center;
}

:deep(.arco-pagination-list) {
  margin: 0 16px;
}

:deep(.arco-pagination-item) {
  min-width: 32px;
  height: 32px;
  margin: 0 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

:deep(.arco-pagination-item.arco-pagination-item-active) {
  background-color: #1890ff;
  color: #fff;
}

:deep(.arco-pagination-jumper) {
  margin-left: 16px;
}

/* 排序图标 */
.sort-icon {
  font-size: 14px;
  margin-left: 4px;
  color: #86909c;
}

/* 列设置样式 */
.column-setting-container {
  padding: 12px 0;
}

.column-setting-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.column-setting-tips {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-icon {
  font-size: 16px;
  color: #1890ff;
}

.column-list {
  max-height: 400px;
  overflow-y: auto;
  margin: 0 -24px;
  padding: 0 24px;
}

.column-item {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  margin: 0 -16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: move;
  transition: all 0.3s;
  border-radius: 4px;
}

.column-item:hover {
  background-color: #f5f7fa;
}

.column-item:last-child {
  border-bottom: none;
}

.column-item.dragging {
  opacity: 0.7;
  background-color: #e6f7ff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.column-item-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.column-drag-handle {
  cursor: move;
  margin-right: 8px;
  color: #86909c;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.column-item:hover .column-drag-handle {
  background-color: #f0f0f0;
  color: #333;
}

.setting-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.setting-actions-right {
  display: flex;
  gap: 8px;
}

:deep(.arco-checkbox) {
  font-size: 14px;
}

:deep(.arco-checkbox-checked .arco-checkbox-icon) {
  background-color: #1890ff;
  border-color: #1890ff;
}

.column-setting-modal {
  :deep(.arco-modal-header) {
    border-bottom: 1px solid #f0f0f0;
    padding: 16px 24px;
  }
  
  :deep(.arco-modal-body) {
    padding: 24px;
  }
}
</style> 