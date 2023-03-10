<template>
  <div class="app-container">
    <div class="treeWrap">
      <!--搜索框-->
      <el-input
        v-model="filterText"
        placeholder="输入组织名称进行过滤"
        clearable
      />
      <!--组织树 属性：draggable，拖拽排序待后期完善-->
      <el-tree
        ref="organizationTree"
        class="filter-tree"
        :data="treeProps.data"
        :props="defaultProps"
        :current-node-key="currentNodeKey"
        :filter-node-method="filterNode"
        accordion
        node-key="code"
        highlight-current
        :expand-on-click-node="true"
        :default-expanded-keys="['root']"
        @node-click="handleNodeClick"
        @current-change="handleCurrentChange"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>
            <span class="info">
              {{ node.label }}
            </span>
            <span v-if="data.locked === 1" class="danger">
              （已锁定）
            </span>
            <span
              v-if="data.isNew && data.isNew === 1"
              class="danger"
            >*</span>
          </span>
          <span v-if="currentNodeKey === data.code">
            <el-button
              v-if="!(data.isNew && data.isNew === 1)"
              type="text"
              size="mini"
              @click="() => append(node,data)"
            >
              添加子组织
            </el-button>
            <el-button
              v-if="data.code !== 'root'"
              type="text"
              size="mini"
              class="danger"
              @click="() => handleRemove(node, data)"
            >
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <!--编辑窗口-->
    <div v-show="editVisible" class="tableWrap">
      <el-collapse
        v-model="activeName"
        accordion
        @change="handleCollapseChange"
      >
        <el-collapse-item title="组织息" name="organizationInfo">
          <el-form
            ref="organizationForm"
            size="small"
            :rules="rules"
            :model="organizationProps"
            label-width="150px"
            border
          >
            <el-form-item label="父级编码" prop="parentCode">
              <el-input v-model="organizationProps.parentCode" maxlength="50" placeholder="父级编码" show-word-limit />
            </el-form-item>
            <el-form-item label="组织名称" prop="name">
              <el-input v-model="organizationProps.name" maxlength="100" :clearable="true" placeholder="组织名称" show-word-limit />
            </el-form-item>
            <el-form-item label="组织编码" prop="code">
              <el-input
                v-if="editState === 'create'"
                v-model="organizationProps.code"
                maxlength="50"
                :clearable="true"
                placeholder="组织编码"
                show-word-limit
              />
              <span v-else>{{ organizationProps.code }}</span>
            </el-form-item>
            <el-form-item label="排序" prop="sorting">
              <el-input-number v-model="organizationProps.sorting" :min="0" :max="999999" :clearable="true" />
            </el-form-item>
            <el-form-item label="描述" prop="remark">
              <el-input
                v-model="organizationProps.remark"
                type="textarea"
                maxlength="120"
                show-word-limit
                :clearable="true"
                placeholder="描述"
              />
            </el-form-item>
            <el-form-item label="锁定状态" prop="locked">
              <el-switch
                v-model="organizationProps.locked"
                active-text="已锁定"
                inactive-text="未锁定"
                :active-value="1"
                :inactive-value="0"
                active-color="#ff4949"
                inactive-color="#13ce66"
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="editVisible=false">关闭</el-button>
              <el-button
                v-permission="permissions['update']"
                :type="editState === 'update' ? 'primary' : 'success'"
                :loading="saveLoading"
                @click="saveOrUpdate"
              >
                {{ textMap[editState] }}
              </el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item v-show="userVisible" title="成员信息" name="userInfo">
          <!--查询条件-->
          <el-form ref="userForm" :inline="true" :model="userQuery" class="demo-form-inline">
            <el-form-item prop="input">
              <el-input
                v-model="userQuery.input"
                placeholder="请输入"
                maxlength="50"
                clearable
                @keyup.enter.native="searchUser"
              >
                <el-select slot="prepend" v-model="userQuery.select" placeholder="请选择" style="width: 125px;">
                  <el-option label="用户名称" value="name" />
                  <el-option label="电话号码" value="phone" />
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button v-permission="permissions['get']" type="primary" icon="el-icon-search" :loading="searchLoading" @click="searchUser">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button v-permission="permissions['update']" type="primary" @click="toUserPage">编辑成员</el-button>
            </el-form-item>
          </el-form>
          <!--查询结果-->
          <el-table
            ref="userTable"
            v-loading="searchLoading"
            :data="userPageProps.records"
            element-loading-text="正在查询"
            border
            fit
            stripe
            height="490"
            highlight-current-row
            size="mini"
            @row-click="handleCurrentRowClick"
          >
            <el-table-column align="center" label="序号" width="55">
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column label="用户名称" align="center">
              <template slot-scope="{row}">
                {{ row.userName }}
              </template>
            </el-table-column>
            <el-table-column label="电话号码" align="center">
              <template slot-scope="{row}">
                {{ row.phone }}
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination
            background
            small
            layout="total, sizes, prev, pager, next, jumper"
            :total="userPageProps.total"
            :page-size="userPageProps.pageSize"
            :current-page="userPageProps.pageNum"
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentPageChange"
          />
        </el-collapse-item>
      </el-collapse>
    </div>
    <!--删除提示框-->
    <el-dialog
      v-el-drag-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      @dragDialog="handleDrag"
    >
      <span>{{ removeWarn }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="remove">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js">
</script>
<style scoped>
  .treeWrap{
    float: left;
    width: 40%;
  }
  .tableWrap {
    float: right;
    width: 58%;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .danger {
    color: #F56C6C
  }
  .info {
    font-size: 16px;
  }
</style>
