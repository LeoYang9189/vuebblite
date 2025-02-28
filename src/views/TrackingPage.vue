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
              <div class="ship-info">
                <div class="ship-icon">
                  <i class="fas fa-ship"></i>
                </div>
                <div class="ship-details">
                  <h3>船名 / 航次</h3>
                  <p>MARTI STAR II/V.2503E</p>
                </div>
              </div>

              <div class="port-info-container">
                <div class="port-info">
                  <div class="port-icon">
                    <i class="fas fa-anchor"></i>
                  </div>
                  <div class="port-details">
                    <h3>起运港</h3>
                    <p>ZHAPU,CHINA</p>
                    <span>ETD 2025-02-28 00:00:00</span>
                  </div>
                </div>

                <div class="port-info">
                  <div class="port-icon">
                    <i class="fas fa-anchor"></i>
                  </div>
                  <div class="port-details">
                    <h3>目的港</h3>
                    <p>NAGOYA</p>
                    <span>ETA 2025-03-04 00:00:00</span>
                  </div>
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
  width: 250px;
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
  width: 300px;
  padding-right: 20px;
}

.progress-track {
  background: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.progress-item {
  display: flex;
  margin-bottom: 30px;
  position: relative;
}

.progress-item:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 25px;
  left: 15px;
  height: 30px;
  width: 2px;
  background-color: #ddd;
}

.progress-item.completed:not(:last-child)::after {
  background-color: #28a745;
}

.progress-dot {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  border: 2px solid #ddd;
}

.progress-item.completed .progress-dot {
  background-color: #28a745;
  color: white;
  border-color: #28a745;
}

.progress-info h3 {
  font-size: 16px;
  margin: 0 0 5px 0;
}

.progress-info p {
  margin: 0;
  color: #777;
  font-size: 14px;
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

.ship-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.ship-icon,
.port-icon {
  width: 50px;
  height: 50px;
  background-color: #eaf2ff;
  color: #1e5aa0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 15px;
}

.ship-details h3,
.port-details h3 {
  font-size: 15px;
  color: #666;
  margin: 0 0 5px 0;
}

.ship-details p,
.port-details p {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.port-details span {
  font-size: 13px;
  color: #777;
}

.port-info-container {
  display: flex;
  justify-content: space-between;
}

.port-info {
  display: flex;
  align-items: flex-start;
  width: 48%;
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

  .port-info-container {
    flex-direction: column;
  }

  .port-info {
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
</style>
