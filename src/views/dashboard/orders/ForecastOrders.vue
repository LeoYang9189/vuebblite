<template>
  <div class="forecast-orders-page">
    <!-- 页面标题区域 -->
    <div class="page-header">
      <h2 class="page-title">预报订单</h2>
    </div>

    <!-- 搜索筛选表单区域 -->
    <div class="search-card">
      <div class="filter-header">
        <div class="filter-title">筛选条件</div>
        <a-button type="text" size="small" @click="toggleFilter" class="filter-toggle">
          <template #icon>
            <icon-up v-if="!isFilterCollapsed" />
            <icon-down v-else />
          </template>
          {{ isFilterCollapsed ? "展开" : "收起" }}
        </a-button>
      </div>

      <!-- 基础筛选部分 - 始终显示 -->
      <div class="basic-filter">
        <a-form :model="searchForm" layout="horizontal" auto-label-width>
          <div class="form-grid basic-grid">
            <a-form-item field="orderNumber" label="订单号">
              <a-input v-model="searchForm.orderNumber" placeholder="请输入订单号" allow-clear />
            </a-form-item>
            <a-form-item field="trackingNumber" label="跟踪号">
              <a-input v-model="searchForm.trackingNumber" placeholder="请输入跟踪号" allow-clear />
            </a-form-item>
            <a-form-item field="customerName" label="客户名称">
              <a-input v-model="searchForm.customerName" placeholder="请输入客户名称" allow-clear />
            </a-form-item>
          </div>
        </a-form>
      </div>

      <!-- 高级筛选部分 - 可折叠 -->
      <div class="filter-content" :class="{ 'filter-collapsed': isFilterCollapsed }">
        <a-form :model="searchForm" layout="horizontal" auto-label-width>
          <div class="form-grid advanced-grid">
            <a-form-item field="status" label="订单状态">
              <a-select v-model="searchForm.status" placeholder="请选择订单状态" allow-clear>
                <a-option value="待处理">待处理</a-option>
                <a-option value="处理中">处理中</a-option>
                <a-option value="已完成">已完成</a-option>
                <a-option value="已取消">已取消</a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="shipMethod" label="运输方式">
              <a-select v-model="searchForm.shipMethod" placeholder="请选择运输方式" allow-clear>
                <a-option value="海运">海运</a-option>
                <a-option value="空运">空运</a-option>
                <a-option value="陆运">陆运</a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="destination" label="目的地">
              <a-input v-model="searchForm.destination" placeholder="请输入目的地" allow-clear />
            </a-form-item>
            <a-form-item field="createTime" label="创建时间">
              <a-range-picker v-model="searchForm.createTime" style="width: 100%" />
            </a-form-item>
            <a-form-item field="estimatedDelivery" label="预计交付时间">
              <a-range-picker v-model="searchForm.estimatedDelivery" style="width: 100%" />
            </a-form-item>
            <a-form-item field="operator" label="操作员">
              <a-input v-model="searchForm.operator" placeholder="请输入操作员" allow-clear />
            </a-form-item>
          </div>
        </a-form>
      </div>

      <!-- 操作按钮 - 始终显示 -->
      <div class="form-actions">
        <a-button @click="resetSearch">
          <template #icon><icon-refresh /></template>
          重置
        </a-button>
        <a-button type="primary" @click="handleSearch">
          <template #icon><icon-search /></template>
          查询
        </a-button>
      </div>
    </div>

    <!-- 订单列表表格区域 -->
    <div class="table-card">
      <div class="table-header">
        <div class="table-title">订单列表</div>
        <div class="table-actions">
          <a-button type="primary" @click="showCreateOrderModal = true">
            <template #icon><icon-plus /></template>
            新增订单
          </a-button>
          <a-button @click="exportOrders">
            <template #icon><icon-export /></template>
            导出订单
          </a-button>
        </div>
      </div>

      <a-table
        :data="orderList"
        :loading="loading"
        :pagination="pagination"
        @page-change="onPageChange"
        @page-size-change="onPageSizeChange"
        stripe
        border-cell
      >
        <template #columns>
          <a-table-column title="订单号" data-index="orderNumber" />
          <a-table-column title="客户名称" data-index="customerName" />
          <a-table-column title="跟踪号" data-index="trackingNumber" />
          <a-table-column title="订单状态" data-index="status">
            <template #cell="{ record }">
              <a-tag
                :color="
                  record.status === '已完成'
                    ? 'green'
                    : record.status === '已取消'
                    ? 'red'
                    : record.status === '处理中'
                    ? 'blue'
                    : 'orange'
                "
              >
                {{ record.status }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="运输方式" data-index="shipMethod" />
          <a-table-column title="目的地" data-index="destination" />
          <a-table-column title="创建时间" data-index="createTime" />
          <a-table-column title="预计交付时间" data-index="estimatedDelivery" />
          <a-table-column title="操作" fixed="right" width="120">
            <template #cell="{ record }">
              <div class="action-buttons-wrapper">
                <a-button type="text" size="small" @click="viewOrderDetail(record)"
                  >查看详情</a-button
                >
                <a-button type="text" size="small" @click="editOrder(record)"> 编辑订单 </a-button>
                <a-button
                  type="text"
                  size="small"
                  status="danger"
                  @click="record.status !== '已取消' ? cancelOrder(record) : recoverOrder(record)"
                >
                  {{ record.status !== "已取消" ? "取消订单" : "恢复订单" }}
                </a-button>
              </div>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>

    <!-- 新增订单模态框 -->
    <a-modal
      v-model:visible="showCreateOrderModal"
      title="新增预报订单"
      @cancel="cancelCreateOrder"
      @ok="submitCreateOrder"
      :mask-closable="false"
      width="800px"
    >
      <a-form :model="orderForm" layout="vertical">
        <div class="form-grid-two-cols">
          <a-form-item field="customerName" label="客户名称" required>
            <a-input v-model="orderForm.customerName" placeholder="请输入客户名称" />
          </a-form-item>
          <a-form-item field="trackingNumber" label="跟踪号">
            <a-input v-model="orderForm.trackingNumber" placeholder="请输入跟踪号" />
          </a-form-item>
          <a-form-item field="shipMethod" label="运输方式" required>
            <a-select v-model="orderForm.shipMethod" placeholder="请选择运输方式">
              <a-option value="海运">海运</a-option>
              <a-option value="空运">空运</a-option>
              <a-option value="陆运">陆运</a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="destination" label="目的地" required>
            <a-input v-model="orderForm.destination" placeholder="请输入目的地" />
          </a-form-item>
          <a-form-item field="estimatedDelivery" label="预计交付时间" required>
            <a-date-picker v-model="orderForm.estimatedDelivery" style="width: 100%" />
          </a-form-item>
          <a-form-item field="weight" label="重量(kg)" required>
            <a-input-number
              v-model="orderForm.weight"
              placeholder="请输入重量"
              :min="0"
              :precision="2"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item field="volume" label="体积(m³)" required>
            <a-input-number
              v-model="orderForm.volume"
              placeholder="请输入体积"
              :min="0"
              :precision="3"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item field="packages" label="包裹数量" required>
            <a-input-number
              v-model="orderForm.packages"
              placeholder="请输入包裹数量"
              :min="1"
              :precision="0"
              style="width: 100%"
            />
          </a-form-item>
        </div>
        <a-form-item field="remarks" label="备注">
          <a-textarea
            v-model="orderForm.remarks"
            placeholder="请输入备注信息"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 订单详情模态框 -->
    <a-modal
      v-model:visible="showOrderDetailModal"
      title="订单详情"
      @cancel="closeOrderDetail"
      :footer="false"
      :mask-closable="true"
      width="800px"
    >
      <div class="order-detail" v-if="currentOrder">
        <div class="detail-section">
          <div class="section-title">基本信息</div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">订单号：</span>
              <span class="detail-value">{{ currentOrder.orderNumber }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">客户名称：</span>
              <span class="detail-value">{{ currentOrder.customerName }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">跟踪号：</span>
              <span class="detail-value">{{ currentOrder.trackingNumber }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">订单状态：</span>
              <span class="detail-value">
                <a-tag
                  :color="
                    currentOrder.status === '已完成'
                      ? 'green'
                      : currentOrder.status === '已取消'
                      ? 'red'
                      : currentOrder.status === '处理中'
                      ? 'blue'
                      : 'orange'
                  "
                >
                  {{ currentOrder.status }}
                </a-tag>
              </span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">运输信息</div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">运输方式：</span>
              <span class="detail-value">{{ currentOrder.shipMethod }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">目的地：</span>
              <span class="detail-value">{{ currentOrder.destination }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">预计交付：</span>
              <span class="detail-value">{{ currentOrder.estimatedDelivery }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">创建时间：</span>
              <span class="detail-value">{{ currentOrder.createTime }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">货物信息</div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">重量：</span>
              <span class="detail-value">{{ currentOrder.weight }} kg</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">体积：</span>
              <span class="detail-value">{{ currentOrder.volume }} m³</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">包裹数量：</span>
              <span class="detail-value">{{ currentOrder.packages }} 个</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">操作员：</span>
              <span class="detail-value">{{ currentOrder.operator }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">备注</div>
          <div class="detail-remarks">{{ currentOrder.remarks || "无" }}</div>
        </div>

        <div class="detail-actions">
          <a-button @click="closeOrderDetail">关闭</a-button>
          <a-button type="primary" @click="editCurrentOrder">编辑订单</a-button>
        </div>
      </div>
    </a-modal>

    <!-- 编辑订单模态框 -->
    <a-modal
      v-model:visible="showEditOrderModal"
      title="编辑订单"
      @cancel="cancelEditOrder"
      @ok="submitEditOrder"
      :mask-closable="false"
      width="800px"
    >
      <a-form :model="orderForm" layout="vertical" v-if="currentOrder">
        <div class="form-grid-two-cols">
          <a-form-item field="customerName" label="客户名称" required>
            <a-input v-model="orderForm.customerName" placeholder="请输入客户名称" />
          </a-form-item>
          <a-form-item field="trackingNumber" label="跟踪号">
            <a-input v-model="orderForm.trackingNumber" placeholder="请输入跟踪号" />
          </a-form-item>
          <a-form-item field="shipMethod" label="运输方式" required>
            <a-select v-model="orderForm.shipMethod" placeholder="请选择运输方式">
              <a-option value="海运">海运</a-option>
              <a-option value="空运">空运</a-option>
              <a-option value="陆运">陆运</a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="destination" label="目的地" required>
            <a-input v-model="orderForm.destination" placeholder="请输入目的地" />
          </a-form-item>
          <a-form-item field="status" label="订单状态" required>
            <a-select v-model="orderForm.status" placeholder="请选择订单状态">
              <a-option value="待处理">待处理</a-option>
              <a-option value="处理中">处理中</a-option>
              <a-option value="已完成">已完成</a-option>
              <a-option value="已取消">已取消</a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="estimatedDelivery" label="预计交付时间" required>
            <a-date-picker v-model="orderForm.estimatedDelivery" style="width: 100%" />
          </a-form-item>
          <a-form-item field="weight" label="重量(kg)" required>
            <a-input-number
              v-model="orderForm.weight"
              placeholder="请输入重量"
              :min="0"
              :precision="2"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item field="volume" label="体积(m³)" required>
            <a-input-number
              v-model="orderForm.volume"
              placeholder="请输入体积"
              :min="0"
              :precision="3"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item field="packages" label="包裹数量" required>
            <a-input-number
              v-model="orderForm.packages"
              placeholder="请输入包裹数量"
              :min="1"
              :precision="0"
              style="width: 100%"
            />
          </a-form-item>
        </div>
        <a-form-item field="remarks" label="备注">
          <a-textarea
            v-model="orderForm.remarks"
            placeholder="请输入备注信息"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 取消订单确认框 -->
    <a-modal
      v-model:visible="showCancelOrderModal"
      title="取消订单"
      @cancel="cancelCancelOrder"
      @ok="confirmCancelOrder"
      :mask-closable="false"
    >
      <p>
        确定要取消订单 <strong>{{ currentOrder?.orderNumber }}</strong> 吗？
      </p>
    </a-modal>

    <!-- 恢复订单确认框 -->
    <a-modal
      v-model:visible="showRecoverOrderModal"
      title="恢复订单"
      @cancel="cancelRecoverOrder"
      @ok="confirmRecoverOrder"
      :mask-closable="false"
    >
      <p>
        确定要恢复订单 <strong>{{ currentOrder?.orderNumber }}</strong> 吗？
      </p>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import {
  IconSearch,
  IconRefresh,
  IconPlus,
  IconExport,
  IconUp,
  IconDown,
} from "@arco-design/web-vue/es/icon";
import { Message } from "@arco-design/web-vue";

// 定义订单类型接口
interface OrderItem {
  id: number;
  orderNumber: string;
  customerName: string;
  trackingNumber: string;
  status: string;
  shipMethod: string;
  destination: string;
  createTime: string;
  estimatedDelivery: string;
  operator: string;
  weight: number;
  volume: number;
  packages: number;
  remarks: string;
}

export default defineComponent({
  name: "ForecastOrders",
  components: {
    IconSearch,
    IconRefresh,
    IconPlus,
    IconExport,
    IconUp,
    IconDown,
  },
  setup() {
    // 筛选区域折叠状态
    const isFilterCollapsed = ref(false);

    const toggleFilter = () => {
      isFilterCollapsed.value = !isFilterCollapsed.value;
    };

    // 搜索表单数据
    const searchForm = reactive({
      orderNumber: "",
      trackingNumber: "",
      customerName: "",
      status: "",
      shipMethod: "",
      destination: "",
      createTime: null,
      estimatedDelivery: null,
      operator: "",
    });

    // 重置搜索表单
    const resetSearch = () => {
      searchForm.orderNumber = "";
      searchForm.trackingNumber = "";
      searchForm.customerName = "";
      searchForm.status = "";
      searchForm.shipMethod = "";
      searchForm.destination = "";
      searchForm.createTime = null;
      searchForm.estimatedDelivery = null;
      searchForm.operator = "";
    };

    // 执行搜索
    const handleSearch = () => {
      // 在实际应用中，这里应该调用API进行搜索
      // 这里仅作演示，重新获取第一页数据
      pagination.current = 1;
      fetchOrderList();
    };

    // 表格数据和分页
    const loading = ref(false);
    const orderList = ref<OrderItem[]>([]);
    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: 100,
      showTotal: true,
      showJumper: true,
      showPageSize: true,
      pageSizeOptions: [10, 20, 50, 100],
    });

    // 分页事件处理
    const onPageChange = (page: number) => {
      pagination.current = page;
      fetchOrderList();
    };

    const onPageSizeChange = (pageSize: number) => {
      pagination.pageSize = pageSize;
      fetchOrderList();
    };

    // 获取订单列表数据
    const fetchOrderList = () => {
      loading.value = true;

      // 模拟API请求延迟
      setTimeout(() => {
        // 模拟订单数据
        orderList.value = Array.from({ length: pagination.pageSize }).map((_, index) => {
          const id = (pagination.current - 1) * pagination.pageSize + index + 1;
          const statusOptions = ["待处理", "处理中", "已完成", "已取消"];
          const shipMethodOptions = ["海运", "空运", "陆运"];

          return {
            id,
            orderNumber: `FO${String(202400000 + id).padStart(8, "0")}`,
            customerName: `客户${(id % 20) + 1}`,
            trackingNumber: `TN${String(Math.floor(Math.random() * 10000000)).padStart(8, "0")}`,
            status: statusOptions[id % statusOptions.length],
            shipMethod: shipMethodOptions[id % shipMethodOptions.length],
            destination: ["上海", "北京", "广州", "深圳", "杭州"][id % 5],
            createTime: new Date(
              Date.now() - Math.floor(Math.random() * 30) * 24 * 3600 * 1000
            ).toLocaleDateString(),
            estimatedDelivery: new Date(
              Date.now() + Math.floor(Math.random() * 60) * 24 * 3600 * 1000
            ).toLocaleDateString(),
            operator: ["张三", "李四", "王五", "赵六"][id % 4],
            weight: parseFloat((Math.random() * 100 + 10).toFixed(2)),
            volume: parseFloat((Math.random() * 5 + 0.5).toFixed(3)),
            packages: Math.floor(Math.random() * 10) + 1,
            remarks: Math.random() > 0.5 ? `这是订单${id}的备注信息，包含一些额外的说明。` : "",
          };
        });

        loading.value = false;
      }, 600);
    };

    // 模态框控制
    const showCreateOrderModal = ref(false);
    const showOrderDetailModal = ref(false);
    const showEditOrderModal = ref(false);
    const showCancelOrderModal = ref(false);
    const showRecoverOrderModal = ref(false);

    // 当前操作的订单
    const currentOrder = ref<OrderItem | null>(null);

    // 订单表单数据
    const orderForm = reactive({
      customerName: "",
      trackingNumber: "",
      shipMethod: "",
      destination: "",
      status: "待处理",
      estimatedDelivery: null,
      weight: null,
      volume: null,
      packages: null,
      remarks: "",
    });

    // 重置订单表单
    const resetOrderForm = () => {
      orderForm.customerName = "";
      orderForm.trackingNumber = "";
      orderForm.shipMethod = "";
      orderForm.destination = "";
      orderForm.status = "待处理";
      orderForm.estimatedDelivery = null;
      orderForm.weight = null;
      orderForm.volume = null;
      orderForm.packages = null;
      orderForm.remarks = "";
    };

    // 新增订单
    const cancelCreateOrder = () => {
      showCreateOrderModal.value = false;
      resetOrderForm();
    };

    const submitCreateOrder = () => {
      // 在实际应用中，这里应该调用API创建订单
      // 这里仅作演示
      Message.success("新增订单成功");
      showCreateOrderModal.value = false;
      resetOrderForm();
      fetchOrderList();
    };

    // 查看订单详情
    const viewOrderDetail = (record: OrderItem) => {
      currentOrder.value = record;
      showOrderDetailModal.value = true;
    };

    const closeOrderDetail = () => {
      showOrderDetailModal.value = false;
      currentOrder.value = null;
    };

    // 编辑订单
    const editOrder = (record: OrderItem) => {
      currentOrder.value = record;
      // 填充表单数据
      orderForm.customerName = record.customerName;
      orderForm.trackingNumber = record.trackingNumber;
      orderForm.shipMethod = record.shipMethod;
      orderForm.destination = record.destination;
      orderForm.status = record.status;
      orderForm.estimatedDelivery = record.estimatedDelivery;
      orderForm.weight = record.weight;
      orderForm.volume = record.volume;
      orderForm.packages = record.packages;
      orderForm.remarks = record.remarks;

      showEditOrderModal.value = true;
    };

    const editCurrentOrder = () => {
      if (currentOrder.value) {
        editOrder(currentOrder.value);
        showOrderDetailModal.value = false;
      }
    };

    const cancelEditOrder = () => {
      showEditOrderModal.value = false;
      currentOrder.value = null;
      resetOrderForm();
    };

    const submitEditOrder = () => {
      // 在实际应用中，这里应该调用API更新订单
      // 这里仅作演示
      Message.success("编辑订单成功");
      showEditOrderModal.value = false;
      currentOrder.value = null;
      resetOrderForm();
      fetchOrderList();
    };

    // 取消订单
    const cancelOrder = (record: OrderItem) => {
      currentOrder.value = record;
      showCancelOrderModal.value = true;
    };

    const cancelCancelOrder = () => {
      showCancelOrderModal.value = false;
      currentOrder.value = null;
    };

    const confirmCancelOrder = () => {
      // 在实际应用中，这里应该调用API取消订单
      // 这里仅作演示
      Message.success("订单已取消");
      showCancelOrderModal.value = false;
      currentOrder.value = null;
      fetchOrderList();
    };

    // 恢复订单
    const recoverOrder = (record: OrderItem) => {
      currentOrder.value = record;
      showRecoverOrderModal.value = true;
    };

    const cancelRecoverOrder = () => {
      showRecoverOrderModal.value = false;
      currentOrder.value = null;
    };

    const confirmRecoverOrder = () => {
      // 在实际应用中，这里应该调用API恢复订单
      // 这里仅作演示
      Message.success("订单已恢复");
      showRecoverOrderModal.value = false;
      currentOrder.value = null;
      fetchOrderList();
    };

    // 导出订单
    const exportOrders = () => {
      Message.success("订单导出成功");
    };

    // 初始化
    onMounted(() => {
      fetchOrderList();
    });

    return {
      // 筛选区域
      isFilterCollapsed,
      toggleFilter,
      searchForm,
      resetSearch,
      handleSearch,

      // 表格数据
      loading,
      orderList,
      pagination,
      onPageChange,
      onPageSizeChange,

      // 各种操作方法
      showCreateOrderModal,
      showOrderDetailModal,
      showEditOrderModal,
      showCancelOrderModal,
      showRecoverOrderModal,
      currentOrder,
      orderForm,
      viewOrderDetail,
      closeOrderDetail,
      editOrder,
      editCurrentOrder,
      cancelEditOrder,
      submitEditOrder,
      cancelCreateOrder,
      submitCreateOrder,
      cancelOrder,
      cancelCancelOrder,
      confirmCancelOrder,
      recoverOrder,
      cancelRecoverOrder,
      confirmRecoverOrder,
      exportOrders,
    };
  },
});
</script>

<style scoped>
.forecast-orders-page {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.search-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.filter-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.filter-toggle {
  color: #3080e8;
}

.filter-toggle .arco-icon {
  margin-right: 4px;
}

.filter-content {
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
  max-height: 600px;
  opacity: 1;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #f0f0f0;
}

.filter-collapsed {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  border-top: none;
  overflow: hidden;
}

.basic-grid,
.advanced-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.table-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.table-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.table-actions {
  display: flex;
  gap: 12px;
}

.action-buttons-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.action-buttons-wrapper .arco-btn {
  padding: 2px 8px;
  height: 26px;
  line-height: 26px;
  margin: 0;
  font-size: 13px;
}

.form-grid-two-cols {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

/* 订单详情样式 */
.order-detail {
  padding: 0 16px;
}

.detail-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.detail-item {
  display: flex;
  align-items: center;
}

.detail-label {
  font-weight: 500;
  color: #666;
  min-width: 100px;
}

.detail-value {
  color: #333;
}

.detail-remarks {
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 4px;
  min-height: 60px;
}

.detail-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .basic-grid,
  .advanced-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .basic-grid,
  .advanced-grid,
  .form-grid-two-cols {
    grid-template-columns: 1fr;
  }

  .table-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .table-actions {
    width: 100%;
  }
}
</style>
