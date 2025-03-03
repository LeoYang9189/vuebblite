<template>
  <div class="verification-container">
    <h2 class="page-title">待审核企业</h2>

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
            <span class="filter-label">法定代表人</span>
            <a-input v-model="formData.legalRepresentative" placeholder="请输入" />
          </div>
          <div class="filter-item">
            <span class="filter-label">证件号码</span>
            <a-input v-model="formData.idNumber" placeholder="请输入" />
          </div>
        </div>
        
        <!-- 第二行筛选区域 - 使用展开/缩起功能 -->
        <div class="filter-row" v-show="isExpanded">
          <div class="filter-item">
            <span class="filter-label">成立日期</span>
            <a-range-picker 
              v-model="formData.establishDate" 
              style="width: 100%"
            />
          </div>
          <div class="filter-item">
            <span class="filter-label">归属分公司</span>
            <a-select v-model="formData.branch" placeholder="请选择">
              <a-option value="">全部</a-option>
              <a-option value="上海新悦达运输有限公司">上海新悦达运输有限公司</a-option>
              <a-option value="上海中浦航运有限公司">上海中浦航运有限公司</a-option>
              <a-option value="上海海港航运有限公司">上海海港航运有限公司</a-option>
            </a-select>
          </div>
          <div class="filter-item">
            <span class="filter-label">销售人员</span>
            <a-select v-model="formData.salesPerson" placeholder="请选择">
              <a-option value="">全部</a-option>
              <a-option value="CargoWare">CargoWare</a-option>
              <a-option value="陈经理">陈经理</a-option>
              <a-option value="王经理">王经理</a-option>
            </a-select>
          </div>
        </div>

        <!-- 第三行筛选区域 -->
        <div class="filter-row" v-show="isExpanded">
          <div class="filter-item">
            <span class="filter-label">营业期限</span>
            <a-range-picker 
              v-model="formData.businessTerm" 
              style="width: 100%"
            />
          </div>
          <div class="filter-item">
            <span class="filter-label">客户来源</span>
            <a-select v-model="formData.customerSource" placeholder="请选择">
              <a-option value="">全部</a-option>
              <a-option value="线上注册">线上注册</a-option>
              <a-option value="销售开发">销售开发</a-option>
              <a-option value="合作伙伴">合作伙伴</a-option>
            </a-select>
          </div>
          <div class="filter-item">
            <span class="filter-label">创建时间</span>
            <a-range-picker 
              v-model="formData.createdAt" 
              style="width: 100%"
            />
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
        <a-button type="primary" style="margin-right: 10px;" @click="handleExportList">
          <template #icon><icon-download /></template>
          导出列表
        </a-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="table-container">
      <a-table 
        :data="companyList" 
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
        <template #status="{ record }">
          <a-tag
            :color="getStatusColor(record.status)"
            size="small"
          >
            {{ record.status }}
          </a-tag>
        </template>
        <template #operations="{ record }">
          <div class="operation-buttons">
            <a-button type="text" size="small" @click="handleViewDetail(record)">
              查看详情
            </a-button>
            <a-button type="text" size="small" @click="handleAudit(record)">
              审核
            </a-button>
          </div>
        </template>
      </a-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <div class="pagination-left">
          <!-- 统计条数显示 -->
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
import type { TableColumnData } from "@arco-design/web-vue";
import { 
  IconSearch, 
  IconUp, 
  IconDown, 
  IconLeft, 
  IconRight,
  IconSettings,
  IconDragDotVertical,
  IconSort,
  IconInfoCircle,
  IconDownload
} from "@arco-design/web-vue/es/icon";

interface ColumnConfig extends Omit<TableColumnData, 'checked'> {
  checked: boolean;
}

export default defineComponent({
  name: "CompanyPendingListPage",
  components: {
    IconSearch,
    IconUp,
    IconDown,
    IconLeft,
    IconRight,
    IconSettings,
    IconDragDotVertical,
    IconSort,
    IconInfoCircle,
    IconDownload
  },
  setup() {
    // 表单数据
    const formData = reactive({
      companyName: "", // 企业名称
      legalRepresentative: "", // 法定代表人
      idNumber: "", // 证件号码
      establishDate: [] as (string | number | Date)[], // 成立日期
      branch: "", // 归属分公司
      salesPerson: "", // 销售人员
      businessTerm: [] as (string | number | Date)[], // 营业期限
      customerSource: "", // 客户来源
      createdAt: [] as (string | number | Date)[] // 创建时间
    });

    // 分页设置
    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: 10
    });

    // 企业列表数据
    const companyList = reactive([
      {
        id: 1,
        status: "待审核",
        flag: "未开通",
        companyName: "KAISHIN",
        legalRepresentative: "1234567",
        idNumber: "123456",
        establishDate: "-",
        businessTerm: "-",
        branch: "上海新月物流",
        salesPerson: "陈经理",
        customerSource: "线上注册",
        updateTime: "2025-02-05 15:08:19",
        createdAt: "2025-02-05 15:08:19"
      },
      {
        id: 2,
        status: "待审核",
        flag: "未开通",
        companyName: "SANKI",
        legalRepresentative: "123321",
        idNumber: "123321",
        establishDate: "-",
        businessTerm: "-",
        branch: "上海新悦达运输有限公司",
        salesPerson: "CargoWare",
        customerSource: "线上注册",
        updateTime: "2025-02-05 14:59:43",
        createdAt: "2025-02-05 14:59:43"
      },
      {
        id: 3,
        status: "待审核",
        flag: "未开通",
        companyName: "マスク",
        legalRepresentative: "文マだ",
        idNumber: "-",
        establishDate: "-",
        businessTerm: "-",
        branch: "上海新悦达运输有限公司",
        salesPerson: "CargoWare",
        customerSource: "销售开发",
        updateTime: "2025-01-02 15:56:57",
        createdAt: "2025-01-02 15:56:57"
      },
      {
        id: 4,
        status: "待审核",
        flag: "未开通",
        companyName: "CIBLE",
        legalRepresentative: "23456",
        idNumber: "23456",
        establishDate: "-",
        businessTerm: "-",
        branch: "上海新悦达运输有限公司",
        salesPerson: "CargoWare",
        customerSource: "合作伙伴",
        updateTime: "2025-01-02 15:36:43",
        createdAt: "2025-01-02 15:36:43"
      },
      {
        id: 5,
        status: "待审核",
        flag: "未开通",
        companyName: "山香",
        legalRepresentative: "55555",
        idNumber: "55555",
        establishDate: "-",
        businessTerm: "-",
        branch: "上海新悦达运输有限公司",
        salesPerson: "CargoWare",
        customerSource: "线上注册",
        updateTime: "2025-01-02 15:25:36",
        createdAt: "2025-01-02 15:25:36"
      },
      {
        id: 6,
        status: "待审核",
        flag: "未开通",
        companyName: "NISYO",
        legalRepresentative: "13556",
        idNumber: "13556",
        establishDate: "-",
        businessTerm: "-",
        branch: "上海新悦达运输有限公司",
        salesPerson: "CargoWare",
        customerSource: "销售开发",
        updateTime: "2025-01-02 15:25:30",
        createdAt: "2025-01-02 15:25:30"
      },
      {
        id: 7,
        status: "待审核",
        flag: "未开通",
        companyName: "トリップモード",
        legalRepresentative: "３３４４",
        idNumber: "３３４４",
        establishDate: "-",
        businessTerm: "-",
        branch: "上海新悦达运输有限公司",
        salesPerson: "CargoWare",
        customerSource: "合作伙伴",
        updateTime: "2025-01-02 15:22:11",
        createdAt: "2025-01-02 15:22:11"
      },
      {
        id: 8,
        status: "待审核",
        flag: "未开通",
        companyName: "INUKAI",
        legalRepresentative: "INUKAI",
        idNumber: "INUKAI",
        establishDate: "-",
        businessTerm: "-",
        branch: "上海中浦航运有限公司",
        salesPerson: "王经理",
        customerSource: "线上注册",
        updateTime: "2025-01-02 15:16:26",
        createdAt: "2025-01-02 15:16:26"
      },
      {
        id: 9,
        status: "待审核",
        flag: "未开通",
        companyName: "LOOOP INC.",
        legalRepresentative: "eee",
        idNumber: "eee",
        establishDate: "-",
        businessTerm: "-",
        branch: "上海中浦航运有限公司",
        salesPerson: "王经理",
        customerSource: "销售开发",
        updateTime: "2025-01-02 15:13:10",
        createdAt: "2025-01-02 15:13:10"
      },
      {
        id: 10,
        status: "待审核",
        flag: "未开通",
        companyName: "AVANCE",
        legalRepresentative: "6666",
        idNumber: "6666",
        establishDate: "-",
        businessTerm: "-",
        branch: "上海中浦航运有限公司",
        salesPerson: "王经理",
        customerSource: "合作伙伴",
        updateTime: "2025-01-02 15:08:01",
        createdAt: "2025-01-02 15:08:01"
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
        slotName: 'status',
        checked: true
      },
      {
        title: '标记',
        dataIndex: 'flag',
        width: 100,
        checked: true
      },
      {
        title: '企业名称',
        dataIndex: 'companyName',
        width: 220,
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        checked: true
      },
      {
        title: '法定代表人',
        dataIndex: 'legalRepresentative',
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
        width: 120,
        checked: true
      },
      {
        title: '成立日期',
        dataIndex: 'establishDate',
        width: 120,
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        checked: true
      },
      {
        title: '营业期限',
        dataIndex: 'businessTerm',
        width: 120,
        checked: true
      },
      {
        title: '归属分公司',
        dataIndex: 'branch',
        width: 180,
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        checked: true
      },
      {
        title: '销售人员',
        dataIndex: 'salesPerson',
        width: 120,
        sortable: {
          sortDirections: ['ascend', 'descend'],
          sorter: true
        },
        checked: true
      },
      {
        title: '客户来源',
        dataIndex: 'customerSource',
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
        title: '创建时间',
        dataIndex: 'createdAt',
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
        width: 160,
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
    
    // 获取状态颜色
    const getStatusColor = (status: string) => {
      switch (status) {
        case '已通过':
          return 'green';
        case '待审核':
          return 'orange';
        case '未通过':
          return 'red';
        default:
          return 'gray';
      }
    };
    
    // 排序处理
    const handleSorterChange = (dataIndex: string, direction: string) => {
      Message.info(`按${dataIndex}字段${direction === 'ascend' ? '升序' : '降序'}排列`);
      
      // 在前端实现排序逻辑
      if (direction) {
        companyList.sort((a, b) => {
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
      Object.keys(formData).forEach(key => {
        const k = key as keyof typeof formData;
        if (Array.isArray(formData[k])) {
          (formData[k] as any) = [];
        } else {
          (formData[k] as any) = "";
        }
      });
      Message.info("筛选条件已重置");
    };

    // 导出列表
    const handleExportList = () => {
      Message.success("正在导出企业列表数据");
    };

    // 查看详情
    const handleViewDetail = (record: any) => {
      Message.info(`查看企业详情: ${record.companyName}`);
    };

    // 审核
    const handleAudit = (record: any) => {
      Message.info(`审核企业信息: ${record.companyName}`);
    };

    // 行样式
    const rowClass = (record: any) => {
      return record.id % 2 === 0 ? '' : 'highlight-row';
    };

    // 筛选区域展开状态
    const isExpanded = ref(true);
    
    // 切换展开/缩起状态
    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value;
    };

    return {
      formData,
      companyList,
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
      handleExportList,
      handleViewDetail,
      handleAudit,
      rowClass,
      cancelColumnSetting,
      saveColumnSetting,
      resetColumnSetting,
      getStatusColor,
      handleSorterChange,
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
  min-width: 80px; /* 使用最小宽度代替固定宽度 */
  font-size: 14px;
  color: #333;
  text-align: right;
  margin-right: 12px;
  white-space: nowrap;
  flex-shrink: 0; /* 防止标签压缩 */
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

.highlight-row {
  background-color: #fafafa;
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

:deep(.arco-input-wrapper), :deep(.arco-select), :deep(.arco-range-picker) {
  border-radius: 4px;
  flex: 1; /* 统一所有输入控件为同等伸缩比例 */
  width: 100%; /* 确保宽度一致 */
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