<template>
   
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :row-class-name="getStatus ? getRowClass : ''"
    >
      <el-table-column type="index" label="序号" width="50" />
  
      <el-table-column
        v-for="(column, index) in tableColumns"
        :key="index"
        :label="column.label"
        :prop="column.prop"
        :min-width="column.minWidth || 120"
        show-overflow-tooltip
      >
      <template slot-scope="scope">
          <div v-if="editIndex !== scope.$index  || !column.edit">
            <span>{{ scope.row[column.prop] }}</span>
          </div>
          <template v-else>
            <el-input
            v-if="column.type === 'text'"
            v-model="editableRow[column.prop]"
            size="mini"
          />
          <el-select
            v-if="column.type === 'select'"
            v-model="editableRow[column.prop]"
            size="mini"
            :options="column.options"
          >
            <el-option
              v-for="option in column.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
          <el-time-picker
            v-if="column.type === 'time'"
            v-model="editableRow[column.prop]"
            size="mini"
            format="HH:mm:ss"
          />
          </template>
        </template>
      </el-table-column>
  
      <el-table-column v-if="!isViewMode" label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="editIndex === scope.$index"
            size="mini"
            class="btn-primary-action"
            @click="handleSave(scope.$index, scope.row)"
          >
            保存
          </el-button>
          <el-button
            v-else
            size="mini"
            class="btn-primary-action"
            @click="handleEdit(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="editIndex === scope.$index"
            size="mini"
            class="btn-primary-action btn-info"
            @click="handleCancelEdit"
          >
            取消
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script>
  export default {
    props: {
      tableData: {
        type: Array,
        required: true,
      },
      tableColumns: {
        type: Array,
        required: true,
      },
      isViewMode: {
        type: Boolean,
        default: false,
      },
      getStatus: {
        type: Function,
        default: null,
      },
      getRowClass: {
        type: Function,
        default: null,
      },
      editIndex: {
        type: Number,
        default: -1,
      },
    //   editableRow: {
    //     type: Object,
    //     default: () => ({}) 
    //   },
    },
    data(){
        return {
            editableRow:{}
        }
    },
    methods: {
      getSelectedLabel(value, options) {
        const selectedOption = options.find((option) => option.value === value);
        return selectedOption ? selectedOption.label : '';
      },
      handleEdit(index, row) {
        // this.$emit('edit', index, row);
        const hasEditableColumns = this.tableColumns.some(
        (column) => column.edit
      );

      if (hasEditableColumns) {
        this.$emit('edit', index, row);
      } else {
        this.$message.warning('并没有可编辑的项');
      }
        
      },
      handleSave(index, row) {
        this.$emit('save', index, row);
      },
      handleCancelEdit() {
        this.$emit('cancel');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any necessary styles here */
  </style>
  