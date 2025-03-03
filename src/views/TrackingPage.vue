<template>
  <div class="tracking-page">
    <!-- 顶部图片横幅 -->
    <div class="tracking-banner">
      <div class="container">
        <h1 class="tracking-title">货物跟踪</h1>
      </div>
    </div>

    <!-- 搜索框区域 -->
    <div class="container">
      <div class="search-box-wrapper">
        <div class="search-box">
          <!-- 下拉框 -->
          <select class="search-select">
            <option>HBL NO./ MBL NO./业务参考号</option>
            <option>集装箱号</option>
          </select>

          <!-- 输入框 -->
          <input
            type="text"
            class="search-input"
            placeholder="XYE25021657"
            v-model="trackingNumber"
          />

          <!-- 查询按钮 -->
          <button class="search-button" @click="searchTracking">
            <i class="fas fa-search"></i> 查询
          </button>
        </div>
      </div>

      <!-- 结果区域 -->
      <div class="tracking-results" v-if="showResults">
        <!-- 左侧进度条 -->
        <div class="tracking-container">
          <div class="progress-section">
            <div class="progress-track">
              <div class="progress-item completed">
                <div class="progress-dot">
                  <i class="fas fa-check"></i>
                </div>
                <div class="progress-info">
                  <h3>订舱 (订舱完成)</h3>
                  <p>2025-02-25 14:23:41</p>
                </div>
              </div>
              <div class="progress-item">
                <div class="progress-dot"></div>
                <div class="progress-info">
                  <h3>提单 (未制发)</h3>
                  <p>-</p>
                </div>
              </div>
              <div class="progress-item">
                <div class="progress-dot"></div>
                <div class="progress-info">
                  <h3>离港 (未开始)</h3>
                  <p>-</p>
                </div>
              </div>
              <div class="progress-item">
                <div class="progress-dot"></div>
                <div class="progress-info">
                  <h3>已到港 (未开始)</h3>
                  <p>-</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧信息区域 -->
          <div class="info-section">
            <div class="basic-info-section">
              <h2>基本信息</h2>

              <!-- 船舶信息 -->
              <div class="vessel-info">
                <div class="vessel-icon">
                  <i class="fas fa-ship"></i>
                </div>
                <div class="vessel-name-voyage">
                  <span class="label">船名 / 航次</span>
                  <span class="value">MARTI STAR II/V.2503E</span>
                </div>
              </div>

              <!-- 港口信息 -->
              <div class="ports-container">
                <div class="port-column">
                  <div class="port-label">
                    <i class="fas fa-anchor"></i>
                    <span>起运港</span>
                  </div>
                  <div class="port-name">ZHAPU,CHINA</div>
                  <div class="port-date"><span>ETD</span>2025-02-28 00:00:00</div>
                </div>

                <div class="port-column">
                  <div class="port-label">
                    <i class="fas fa-anchor"></i>
                    <span>目的港</span>
                  </div>
                  <div class="port-name">NAGOYA</div>
                  <div class="port-date"><span>ETA</span>2025-03-04 00:00:00</div>
                </div>
              </div>
            </div>

            <div class="detail-info-section">
              <h2>详细信息</h2>
              <div class="detail-table">
                <div class="detail-row">
                  <div class="detail-cell">
                    <span class="label">箱型</span>
                    <span class="value">1*20GP</span>
                  </div>
                  <div class="detail-cell">
                    <span class="label">客户参考号</span>
                    <span class="value">25QX0009</span>
                  </div>
                  <div class="detail-cell">
                    <span class="label">MBL No.</span>
                    <span class="value">NOSZP25NG04330</span>
                  </div>
                </div>

                <div class="detail-row">
                  <div class="detail-cell">
                    <span class="label">HBL No.</span>
                    <span class="value">XYE25021657</span>
                  </div>
                  <div class="detail-cell">
                    <span class="label">PCS</span>
                    <span class="value">200</span>
                  </div>
                  <div class="detail-cell">
                    <span class="label">CBM</span>
                    <span class="value">3300</span>
                  </div>
                </div>

                <div class="detail-row">
                  <div class="detail-cell">
                    <span class="label">12.9</span>
                    <span class="value">-</span>
                  </div>
                  <div class="detail-cell">
                    <span class="label">箱号</span>
                    <span class="value">NBYU0149017</span>
                  </div>
                  <div class="detail-cell">
                    <span class="label">封号</span>
                    <span class="value">NOS3215854</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 附件信息作为独立模块 -->
            <div class="detail-info-section">
              <h2>附件信息</h2>
              <div class="detail-table">
                <div class="detail-row">
                  <div class="detail-cell attachment-cell">
                    <span class="value">暂无附件</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CargoTrackingPage",
  setup() {
    const trackingNumber = ref("XYE25021657");
    const showResults = ref(true); // 默认显示结果，方便测试

    const searchTracking = () => {
      if (trackingNumber.value) {
        showResults.value = true;
      }
    };

    return {
      trackingNumber,
      showResults,
      searchTracking,
    };
  },
});
</script>

<style scoped>
.tracking-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-top: 0; /* 确保没有顶部内边距 */
  margin-top: 0; /* 确保没有顶部外边距 */
}

.tracking-banner {
  height: 200px;
  background-image: url("@/assets/images/tracking-bg.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 0; /* 再次确保没有负margin */
}

.tracking-banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.tracking-title {
  color: white;
  font-size: 32px;
  position: relative;
  z-index: 2;
  margin: 0;
}

.search-box-wrapper {
  margin-top: -25px;
  margin-bottom: 30px;
  position: relative;
  z-index: 10;
}

.search-box {
  display: flex;
  background: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.search-select {
  width: 320px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 14px;
}

.search-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-button {
  padding: 10px 25px;
  background-color: #1e5aa0;
  color: white;
  border: none;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 14px;
}

.tracking-container {
  display: flex;
  margin-bottom: 40px;
}

.progress-section {
  width: 30%;
  padding-right: 30px;
}

.progress-track {
  position: relative;
  padding: 30px 20px 30px 10px;
}

/* 创建连接所有节点的垂直线 */
.progress-track::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 28px;
  width: 2px;
  background-color: #e0e0e0;
  z-index: 1;
}

.progress-item {
  position: relative;
  padding-left: 50px;
  margin-bottom: 25px;
  z-index: 2;
}

.progress-item:last-child {
  margin-bottom: 0;
}

/* 进度点样式优化 */
.progress-dot {
  position: absolute;
  left: 0;
  top: 5px;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.3s ease;
}

/* 已完成状态 */
.progress-item.completed .progress-dot {
  background-color: #1e5aa0;
  border-color: #1e5aa0;
  box-shadow: 0 0 0 4px rgba(30, 90, 160, 0.2);
}

/* 当前状态 */
.progress-item.current .progress-dot {
  background-color: #fff;
  border-color: #1e5aa0;
  box-shadow: 0 0 0 4px rgba(30, 90, 160, 0.15);
}

/* 图标样式 */
.progress-dot i {
  color: white;
  font-size: 10px;
}

.progress-item.current .progress-dot i {
  color: #1e5aa0;
}

/* 信息区域样式 */
.progress-info {
  background-color: #fff;
  padding: 12px 18px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.progress-item.completed .progress-info {
  border-left: 3px solid #1e5aa0;
}

.progress-item.current .progress-info {
  border-left: 3px solid #1e5aa0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.progress-info h3 {
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
}

.progress-item.completed .progress-info h3 {
  color: #1e5aa0;
}

.progress-item.current .progress-info h3 {
  color: #1e5aa0;
}

.progress-info p {
  font-size: 13px;
  color: #777;
  margin: 0;
}

/* 添加悬停效果 */
.progress-item:hover .progress-info {
  transform: translateX(5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

/* 添加时间轴连接线动画效果 */
.progress-track::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 28px;
  width: 2px;
  background-color: #1e5aa0;
  z-index: 1;
  transform-origin: top;
  transform: scaleY(0);
  animation: progressLine 1.5s ease forwards;
}

@keyframes progressLine {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(0.4); /* 进度线显示的比例，根据当前进度调整 */
  }
}

.info-section {
  flex: 1;
}

.basic-info-section,
.detail-info-section {
  background: white;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.vessel-info {
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.vessel-icon {
  width: 40px;
  height: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: #1e5aa0;
  font-size: 20px;
  margin-top: 5px;
}

.vessel-name-voyage {
  flex: 1;
  padding-top: 3px;
  text-align: left;
}

.vessel-name-voyage .label {
  display: block;
  font-size: 13px;
  color: #777;
  margin-bottom: 6px;
  text-align: left;
}

.vessel-name-voyage .value {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  text-align: left;
}

.ports-container {
  display: flex;
  position: relative;
}

.ports-container::before {
  content: "";
  position: absolute;
  top: 30px;
  left: 40px;
  right: 40px;
  height: 1px;
  background: #e0e0e0;
  z-index: 1;
}

.ports-container::after {
  content: "→";
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  color: #1e5aa0;
  background: white;
  padding: 0 15px;
  z-index: 2;
}

.port-column {
  flex: 1;
  padding: 0 10px;
}

.port-label {
  font-size: 13px;
  color: #777;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.port-label i {
  margin-right: 8px;
  color: #1e5aa0;
  font-size: 14px;
}

.port-name {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.port-date {
  font-size: 13px;
  color: #666;
}

.port-date span {
  display: inline-block;
  padding: 2px 6px;
  background-color: #f2f7fd;
  border: 1px solid #e1eeff;
  border-radius: 3px;
  color: #1e5aa0;
  font-weight: 500;
  margin-right: 5px;
  font-size: 12px;
}

.detail-table {
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;
}

.detail-row {
  display: flex;
}

.detail-row:not(:last-child) {
  border-bottom: 1px solid #eee;
}

.detail-cell {
  flex: 1;
  padding: 15px;
}

.detail-cell:not(:last-child) {
  border-right: 1px solid #eee;
}

.detail-cell .label {
  display: block;
  font-size: 13px;
  color: #777;
  margin-bottom: 5px;
}

.detail-cell .value {
  display: block;
  font-size: 15px;
  font-weight: 500;
}

@media (max-width: 992px) {
  .tracking-container {
    flex-direction: column;
  }

  .progress-section {
    width: 100%;
    padding-right: 0;
    margin-bottom: 20px;
  }

  .ports-container {
    flex-direction: column;
  }

  .port-column {
    width: 100%;
    margin-bottom: 15px;
  }

  .detail-row {
    flex-direction: column;
  }

  .detail-cell:not(:last-child) {
    border-right: none;
    border-bottom: 1px solid #eee;
  }
}

@media (max-width: 768px) {
  .search-box {
    flex-direction: column;
  }

  .search-select,
  .search-input,
  .search-button {
    width: 100%;
    margin: 5px 0;
  }
}

/* 全新设计的基本信息部分 */
.basic-info-section {
  background: white;
  border-radius: 8px;
  padding: 25px 30px;
  margin-bottom: 25px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.basic-info-section h2 {
  font-size: 18px;
  color: #333;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #eaeaea;
  font-weight: 600;
}

/* 船舶信息区域 */
.vessel-info {
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.vessel-icon {
  width: 40px;
  height: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: #1e5aa0;
  font-size: 20px;
  margin-top: 5px;
}

.vessel-name-voyage {
  flex: 1;
  padding-top: 3px;
  text-align: left;
}

.vessel-name-voyage .label {
  display: block;
  font-size: 13px;
  color: #777;
  margin-bottom: 6px;
  text-align: left;
}

.vessel-name-voyage .value {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  text-align: left;
}

/* 港口信息区域 */
.ports-container {
  display: flex;
  position: relative;
}

.ports-container::before {
  content: "";
  position: absolute;
  top: 30px;
  left: 40px;
  right: 40px;
  height: 1px;
  background: #e0e0e0;
  z-index: 1;
}

.ports-container::after {
  content: "→";
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  color: #1e5aa0;
  background: white;
  padding: 0 15px;
  z-index: 2;
}

.port-column {
  flex: 1;
  padding: 0 10px;
}

.port-label {
  font-size: 13px;
  color: #777;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.port-label i {
  margin-right: 8px;
  color: #1e5aa0;
  font-size: 14px;
}

.port-name {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.port-date {
  font-size: 13px;
  color: #666;
}

.port-date span {
  display: inline-block;
  padding: 2px 6px;
  background-color: #f2f7fd;
  border: 1px solid #e1eeff;
  border-radius: 3px;
  color: #1e5aa0;
  font-weight: 500;
  margin-right: 5px;
  font-size: 12px;
}
</style>
