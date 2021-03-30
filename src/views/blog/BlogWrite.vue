<template>
  <div class="publish-wrap">
    <div class="publish">
      <div class="img">
        <!-- <input type="file" accept="image/*" ref="inputFile" @change="upload" />
        <div
          v-if="img"
          class="temp-img"
          :style="{ backgroundImage: `url('${img}')` }"
        ></div> -->
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :auto-upload="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="title">
        <el-input
          v-model="title"
          placeholder="请输入"
          maxlength="20"
          show-word-limit
        >
          <template #prepend>标题</template>
        </el-input>
      </div>
      <div class="desc">
        <el-tag>博客简要</el-tag>
        <el-input
          type="textarea"
          autosize
          v-model="desc"
          placeholder="请输入"
          maxlength="40"
          show-word-limit
        >
        </el-input>
      </div>
      <div class="category">
        <el-select value-key="id" v-model="theme" placeholder="请选择主题">
          <el-option
            v-for="item in blogType"
            :key="item.id"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div class="public">
        <el-tooltip
          :content="isPublic ? '公开发表' : '私密发表'"
          placement="top"
        >
          <el-switch
            v-model="isPublic"
            active-color="#6b9eee"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
            active-text="公开"
            inactive-text="私密"
          >
          </el-switch>
        </el-tooltip>
      </div>
      <div class="comment">
        <el-tooltip
          :content="isComment ? '开启评论' : '关闭评论'"
          placement="top"
        >
          <el-switch
            v-model="isComment"
            active-color="#6b9eee"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
            active-text="开启评论"
            inactive-text="关闭评论"
          >
          </el-switch>
        </el-tooltip>
      </div>
      <div class="btn-pop">
        <el-button class="publish-btn" @click="publish" :disabled="check"
          >发布</el-button
        >
      </div>
    </div>
    <div class="editor">
      <v-md-editor v-model="text" height="100%"></v-md-editor>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useBlogWrite from "@/composition/useBlogWrite";

export default defineComponent({
  name: "BlogWrite",
  setup() {
    return {
      ...useBlogWrite(),
    };
  },
});
</script>

<style scoped lang="less">
@import "@/styles/var.less";
.publish-wrap {
  display: flex;
  height: 100%;
  .publish {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 300px;
    margin: 40px;
    .img {
      .temp-img {
        width: 200px;
        height: 200px;
        background-size: cover;
      }
    }
    .publish-btn {
      width: 100px;
      background: @primary;
      color: #fff;
    }
  }
  .editor {
    width: calc(100% - 300px);
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>