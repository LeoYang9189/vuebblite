<template>
  <div class="verification-container">
    <h2 class="page-title">企业账号列表</h2>

    <!-- 筛选区域 -->
    <div class="filter-container">
      <div class="filter-rows">
        <!-- 第一行筛选区域 - 调整为3列均匀布局 -->
        <div class="filter-row">
          <div class="filter-item">
            <span class="filter-label">企业账号</span>
            <a-input v-model="formData.companyAccount" placeholder="请输入" />
          </div>
          <div class="filter-item">
            <span class="filter-label">QQ</span>
            <a-input v-model="formData.qq" placeholder="请输入" />
          </div>
          <div class="filter-item">
            <span class="filter-label">关联个人用户</span>
            <a-input v-model="formData.relatedUser" placeholder="请输入" />
          </div>
        </div>
        
        <!-- 第二行筛选区域 - 使用展开/缩起功能 -->
        <div class="filter-row" v-show="isExpanded">
          <div class="filter-item">
            <span class="filter-label">角色</span>
            <a-select v-model="formData.role" placeholder="请选择">
              <a-option value="企业管理员">企业管理员</a-option>
              <a-option value="企业用户">企业用户</a-option>
            </a-select>
          </div>
          <div class="filter-item">
            <span class="filter-label">状态</span>
            <a-select v-model="formData.status" placeholder="请选择">
              <a-option value="有效">有效</a-option>
              <a-option value="无效">无效</a-option>
            </a-select>
          </div>
          <div class="filter-item">
            <span class="filter-label">联络人</span>
            <a-select v-model="formData.handler" placeholder="请选择">
              <a-option value="否">否</a-option>
              <a-option value="默认">默认</a-option>
            </a-select>
          </div>
        </div>

        <!-- 第三行筛选区域 -->
        <div class="filter-row" v-show="isExpanded">
          <div class="filter-item">
            <span class="filter-label">创建时间</span>
            <a-range-picker 
              v-model="formData.createTime" 
              style="width: 100%"
            />
          </div>
          <div class="filter-item">
            <span class="filter-label">最后登录时间</span>
            <a-range-picker 
              v-model="formData.lastLoginTime"
              style="width: 100%" 
            />
          </div>
          <div class="filter-item">
            <span class="filter-label">邀请人员</span>
            <a-input v-model="formData.addPerson" placeholder="请输入" />
          </div>
        </div>
      </div>
      
      <!-- 展开/缩起按钮 -->
      <div class="expand-toggle">
        <a-button type="text" @click="toggleExpand">
          {{ isExpanded ? '缩起' : '展开' }}
          <template #icon>
            <icon-down v-if="!isExpanded" />
            <icon-up v-else />
          </template>
        </a-button>
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
        <a-button type="primary" style="margin-right: 10px;" @click="handleAddAccount">
          <template #icon><icon-plus /></template>
          新增企业账号
        </a-button>
        <a-button @click="handleInviteUser">
          <template #icon><icon-user-add /></template>
          邀请用户
        </a-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="table-container">
      <a-table 
        :data="accountList" 
        :pagination="false"
        :bordered="{ cell: true }"
        :stripe="false"
        :row-class="rowClass"
        class="custom-table"
        :column-resizable="true"
        :columns="visibleColumns"
        @sorter-change="handleSorterChange"
      >
        <template #status="{ record }">
          <a-tag
            :color="record.status === '有效' ? 'green' : 'red'"
            size="small"
          >
            {{ record.status }}
          </a-tag>
        </template>
        <template #operations="{ record }">
          <div class="operation-buttons">
            <a-button type="text" size="small" @click="handleSetRole(record)">
              设置角色
            </a-button>
            <a-button type="text" size="small" @click="handleUnbindUser(record)" v-if="record.relatedUser">
              解绑用户
            </a-button>
            <a-button type="text" size="small" @click="handleDisable(record)">
              停用
            </a-button>
          </div>
        </template>
      </a-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <div class="pagination-left">
          <!-- 删除最左边的统计条数显示 -->
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
              <!-- 保留这里的页码大小选择器，删除右侧独立的选择器 -->
              <a-select v-model="pagination.pageSize" style="width: 120px; margin-left: 16px" size="small">
                <a-option :value="10">10 条/页</a-option>
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
  IconInfoCircle,
  IconUserAdd
} from "@arco-design/web-vue/es/icon";

interface ColumnConfig extends Omit<TableColumnData, 'checked'> {
  checked: boolean;
}

export default defineComponent({
  name: "CompanyAccountListPage",
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
    IconInfoCircle,
    IconUserAdd
  },
  setup() {
    // 表单数据
    const formData = reactive({
      companyAccount: "",
      qq: "",
      relatedUser: "",
      role: "",
      status: "",
      handler: "",  // 联络人字段
      createTime: [] as (string | number | Date)[],
      lastLoginTime: [] as (string | number | Date)[],
      addPerson: ""  // 邀请人员字段
    });

    // 分页设置
    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: 10
    });

    // 账号列表数据
    const accountList = reactive([
      {
        id: 1,
        companyAccount: "changcheng@car.com",
        status: "有效",
        relatedUser: "changcheng@car.com",
        handler: "默认",  // 联络人
        qq: "无",
        role: "企业管理员",
        updateTime: "2025-03-03 02:57:41",
        clientSource: "Cargo",  // 客户来源
        createTime: "2025-03-03 02:57:41",
        lastLoginTime: "",  // 移除"不详联系"
        inviter: "张三"  // 邀请人员
      },
      {
        id: 2,
        companyAccount: "gm@leotech.site",
        status: "有效",
        relatedUser: "",
        handler: "否",
        qq: "无",
        role: "企业管理员",
        updateTime: "2024-12-19 23:49:32",
        clientSource: "独立站",
        createTime: "2024-12-19 23:49:32",
        lastLoginTime: "",
        inviter: "李四"
      },
      {
        id: 3,
        companyAccount: "wt-customer@walltechsystem.cn",
        status: "有效",
        relatedUser: "wt-customer@walltechsystem.cn",
        handler: "默认",
        qq: "无",
        role: "企业管理员",
        updateTime: "2024-11-12 09:45:31",
        clientSource: "Cargo",
        createTime: "2023-05-31 16:24:45",
        lastLoginTime: "2024-11-12 09:45:51",
        inviter: "王五"
      },
      {
        id: 4,
        companyAccount: "LOOKITE@qq.com",
        status: "有效",
        relatedUser: "",
        handler: "否",
        qq: "无",
        role: "企业用户",
        updateTime: "2024-08-03 09:52:47",
        clientSource: "独立站",
        createTime: "2024-08-02 16:50:00",
        lastLoginTime: "",
        inviter: "赵六"
      },
      {
        id: 5,
        companyAccount: "lucifer4x@walltechsystem.cn",
        status: "有效",
        relatedUser: "lucifer4x@walltechsystem.cn",
        handler: "默认",
        qq: "无",
        role: "企业管理员",
        updateTime: "2023-03-13 18:46:18",
        clientSource: "Cargo",
        createTime: "2022-05-25 14:07:37",
        lastLoginTime: "2022-05-31 16:01:58",
        inviter: "孙七"
      }
    ]);

    // 列配置相关
    const showColumnSetting = ref(false);
    
    // 默认列配置
    const defaultColumns: ColumnConfig[] = [
      {
        title: '企业账号',
        dataIndex: 'companyAccount',
        width: 180,
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        checked: true
      },
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
        title: '关联个人用户',
        dataIndex: 'relatedUser',
        width: 180,
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        checked: true
      },
      {
        title: '联络人',  // 原"取值人"
        dataIndex: 'handler',
        width: 120,
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        checked: true
      },
      {
        title: 'QQ',
        dataIndex: 'qq',
        width: 120,
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        checked: true
      },
      {
        title: '角色',
        dataIndex: 'role',
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
        title: '客户来源',  // 原"授权产品"
        dataIndex: 'clientSource',
        width: 120,
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        checked: true
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 180,
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        checked: true
      },
      {
        title: '最后登录时间',
        dataIndex: 'lastLoginTime',
        width: 180,
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        checked: true
      },
      {
        title: '邀请人员',  // 原"添加人员"
        dataIndex: 'inviter',
        width: 120,
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
        accountList.sort((a, b) => {
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
      formData.companyAccount = "";
      formData.qq = "";
      formData.relatedUser = "";
      formData.role = "";
      formData.status = "";
      formData.handler = "";  // 更新为联络人字段
      formData.createTime = [];
      formData.lastLoginTime = [];
      formData.addPerson = "";
      Message.info("筛选条件已重置");
    };

    // 新增企业账号
    const handleAddAccount = () => {
      Message.success("正在新增企业账号");
    };

    // 邀请用户
    const handleInviteUser = () => {
      Message.success("正在邀请新用户");
    };

    // 设置角色
    const handleSetRole = (record: any) => {
      Message.info(`设置${record.companyAccount}的角色`);
    };

    // 使用
    const handleUse = (record: any) => {
      Message.info(`使用账号: ${record.companyAccount}`);
    };

    // 绑定用户
    const handleBindUser = (record: any) => {
      Message.info(`绑定用户到账号: ${record.companyAccount}`);
    };

    // 解绑用户
    const handleUnbindUser = (record: any) => {
      Message.info(`从账号${record.companyAccount}解绑用户`);
    };

    // 添加停用函数
    const handleDisable = (record: any) => {
      Message.info(`停用账号: ${record.companyAccount}`);
    };

    // 行样式
    const rowClass = (record: any) => {
      return '';
    };

    // 筛选区域展开状态
    const isExpanded = ref(true);
    
    // 切换展开/缩起状态
    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value;
    };

    return {
      formData,
      accountList,
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
      handleAddAccount,
      handleInviteUser,
      handleSetRole,
      handleUse,
      handleBindUser,
      handleUnbindUser,
      rowClass,
      cancelColumnSetting,
      saveColumnSetting,
      resetColumnSetting,
      handleSorterChange,
      handleDisable,
      isExpanded,
      toggleExpand
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
  gap: 24px; /* 增加间隙 */
  margin-bottom: 20px;
}

.filter-row:last-child {
  margin-bottom: 0;
}

.filter-item {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 240px; /* 略微缩小最小宽度 */
  max-width: 30%; /* 减小最大宽度，增加间隔 */
}

.filter-label {
  width: 80px; /* 增加标签宽度 */
  font-size: 14px;
  color: #333;
  text-align: right;
  margin-right: 12px;
  white-space: nowrap;
}

.expand-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
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
  flex: 0.9; /* 缩小输入框宽度 */
}

:deep(.arco-select) {
  border-radius: 4px;
  flex: 0.9; /* 缩小选择框宽度 */
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

.operation-buttons {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style> 