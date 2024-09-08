<template>
  <div>
    <!-- 筛选条件 -->
    <div class="search-wrapper">
      <!-- 高级搜索区域的展开/折叠动画 -->
      <transition name="expand">
        <div v-if="showAdvancedSearch" class="transition-box">
          <el-form
            ref="formData"
            :model="form"
            label-width="120px"
            size="medium"
            class="form-wrapper"
          >
            <!-- 两列布局的行 -->
            <div class="row-wrapper">
              <!-- 电站 -->
              <el-form-item label="电站：" class="item-width">
                <el-select v-model="form.station">
                  <el-option label="机械" value="mechanical"></el-option>
                  <el-option label="电气" value="electrical"></el-option>
                </el-select>
              </el-form-item>
              <!-- 部门 -->
              <el-form-item label="部门：" class="item-width">
                <el-select v-model="form.department">
                  <el-option label="机械" value="mechanical"></el-option>
                  <el-option label="电气" value="electrical"></el-option>
                </el-select>
              </el-form-item>
              <!-- 科室 -->
              <el-form-item label="科室：" class="item-width">
                <el-select v-model="form.office">
                  <el-option label="机械" value="mechanical"></el-option>
                  <el-option label="电气" value="electrical"></el-option>
                </el-select>
              </el-form-item>
              <!-- 班组 -->
              <el-form-item
                v-if="!showAdvancedSearch"
                label="班组："
                class="item-width"
              >
                <el-select v-model="form.team">
                  <el-option label="机械" value="mechanical"></el-option>
                  <el-option label="电气" value="electrical"></el-option>
                </el-select>
              </el-form-item>
              <!-- 高级搜索条件 -->
              <div v-if="showAdvancedSearch" class="search-more">
                <!-- 工单号 -->
                <el-form-item label="工单号：" class="item-width">
                  <el-input v-model="form.workOrderNumber"></el-input>
                </el-form-item>
                <!-- 功能位置 -->
                <el-form-item label="功能位置：" class="item-width">
                  <el-input v-model="form.functionalLocation"></el-input>
                </el-form-item>
                <!-- 工作内容 -->
                <el-form-item label="工作内容：" class="item-width">
                  <el-input v-model="form.workContent"></el-input>
                </el-form-item>
                <!-- 许可证 -->
                <el-form-item label="许可证类型：" class="item-width">
                  <el-input v-model="form.permit"></el-input>
                </el-form-item>
                <!-- 工作负责人 -->
                <el-form-item label="工作负责人：" class="item-width">
                  <!-- <person-select v-model="form.workLeader"></person-select> -->
                </el-form-item>
                <!-- 状态 -->
                <el-form-item label="状态：" class="item-width">
                  <el-input v-model="form.status"></el-input>
                </el-form-item>
                <!-- 管控人 -->
                <el-form-item label="管控人：" class="item-width">
                  <!-- <person-select v-model="form.management"></person-select> -->
                </el-form-item>
                <!-- 风险识别 -->
                <el-form-item label="风险识别：" class="item-width">
                  <el-input v-model="form.risk"></el-input>
                </el-form-item>
                <!-- 专业 -->
                <el-form-item label="专业：" class="item-width">
                  <el-input v-model="form.professional"></el-input>
                </el-form-item>
                <!-- 多选 -->
                <el-form-item label="" style="flex: 1">
                  <el-checkbox-group v-model="form.workOrderTags">
                    <el-checkbox label="是否超期"></el-checkbox>
                    <el-checkbox label="是否重要工作"></el-checkbox>
                    <el-checkbox label="是否有管控人"></el-checkbox>
                    <el-checkbox label="高风险工作"></el-checkbox>
                    <el-checkbox label="风险识别不为空"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </transition>
      
      <!-- 查询和重置按钮 -->
      <div class="search-btn">
        <el-button type="primary">查询</el-button>
        <el-button @click="resetForm('formData')">重置</el-button>
      </div>

      <!-- 高级查询展开/收起按钮 -->
      <div class="advanced-search-toggle" @click="toggleAdvancedSearch">
        <el-button
          v-if="!showAdvancedSearch"
          type="text"
          icon="el-icon-arrow-down"
        >
          展开高级查询
        </el-button>
        <el-button v-else type="text" icon="el-icon-arrow-up">
          隐藏高级查询
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        workOrderNumber: '',
        functionalLocation: '',
        workContent: '',
        permit: '',
        professional: '',
        workLeader: '',
        dateRange: [],
        status: '',
        maintenanceResponsible: '',
        workOrderTags: [],
      },
      showAdvancedSearch: false, // 初始状态为隐藏高级查询
    };
  },
  methods: {
    // 切换高级查询的显示状态
    toggleAdvancedSearch() {
      this.showAdvancedSearch = !this.showAdvancedSearch;
    },
    // 重置表单
    resetForm() {
      this.form = {
        workOrderNumber: '',
        functionalLocation: '',
        workContent: '',
        permit: '',
        professional: '',
        workLeader: '',
        dateRange: [],
        status: '',
        maintenanceResponsible: '',
        workOrderTags: [],
      };
    },
  },
};
</script>

<style scoped>
/* 添加展开/收起动画效果 */
.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
}
.expand-enter, .expand-leave-to /* .expand-leave-active in <2.1.8 */ {
  opacity: 0;
  height: 0;
  padding: 0;
  margin: 0;
}

/* 样式可根据具体需求调整 */
.search-wrapper {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.search-btn {
  margin-top: 20px;
  text-align: right;
}

.advanced-search-toggle {
  text-align: right;
  margin-top: 10px;
}

.transition-box {
  overflow: hidden;
}

.form-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.row-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.item-width {
  flex: 1 1 45%;
  max-width: 45%;
  margin-right: 20px;
}

.search-more {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
