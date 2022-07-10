<template>
  <div class="app-container">
    <el-form :model="setmes" style="width:800px" label-width="150px" label-position="right" :rules="setrules"
      ref="setform">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="setmes.name" />
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="setmes.price" />
      </el-form-item>
      <el-form-item label="封面">
        <el-upload name="files" :limit="max" :on-success="loadsuccess" :on-error="loaderror" :on-remove="loaddel"
          :action="apiload">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="物品类型" prop="thingtypeId">
        <el-select v-model="setmes.thingtypeId" placeholder="请选择" @change="$forceUpdate()">
          <el-option v-for="item in thingtype" :key="item.id" :label="item.type" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="物品区域" prop="thingtype2Id">
        <el-select v-model="setmes.thingtype2Id" placeholder="请选择" @change="$forceUpdate()">
          <el-option v-for="item in thingtype2" :key="item.id" :label="item.type" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="物品介绍">
        <div class="quill-editor">
          <!-- 图片上传组件辅助-->
          <el-upload class="avatar-uploader" :action="apiloadList" :on-success="uploadsuccess" :file-list="fileList"
            name="uploadList">

          </el-upload>

          <!--富文本编辑器组件-->
          <quill-editor v-model="setmes.content" :content="content" :options="editorOption" @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)" @ready="onEditorReady($event)" ref="QuillEditor">
          </quill-editor>

        </div>


      </el-form-item>
      <!--  <quill-editor ref="myQuillEditor" v-model="setmes.content"  />  -->
    </el-form>
    <div style="text-align:center; width:800">
      <el-button type="primary" @click="sub">提交</el-button>
    </div>

  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";

import { GetByID, Add } from "@/api/thing";
import { deepClone } from "@/utils";
const defaultMod = {
  id: 0,
  thingtypeId: 0,
  thingtype2Id: 0,
  name: '',
  content: '',
  price: 0,
  img: 'images/no.jpg'
}
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // 加粗，斜体，下划线，删除线
  ['blockquote', 'code-block'],                      //引用，代码块
  [{ 'header': 1 }, { 'header': 2 }],               // 几级标题
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],     // 有序列表，无序列表
  [{ 'script': 'sub' }, { 'script': 'super' }],      // 下角标，上角标
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // 缩进
  [{ 'direction': 'rtl' }],                         // 文字输入方向
  [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],// 标题
  [{ 'color': [] }, { 'background': [] }],          // 颜色选择
  [{ 'font': ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial'] }],// 字体
  [{ 'align': [] }], // 居中
  ['clean'],                                       // 清除样式,
  ['link', 'image'],  // 上传图片、上传视频
]

export default {
  components: { Tinymce },

  data() {
    return {
      apiload: process.env.VUE_APP_BASE_API + "upload.do",
      apiloadList: process.env.VUE_APP_BASE_API + "uploadList.do",
      resUrl: process.env.VUE_APP_BASE_API,
      max: 1,
      thingtype: [],
      thingtype2: [],
      fileList: [],
      setmes: Object.assign({}, defaultMod),
      setrules: {
        title: [{ required: true, message: "请填写物品名称", trigger: "blur" }]
      },
      listQuery: {
        id: this.$route.query.id == null ? 0 : this.$route.query.id
      },
      name: 'register-modules-example',
      content: '',
      editorOption: {
        placeholder: '请在这里输入',
        theme: 'snow', //主题 snow/bubble
        modules: {
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function (value) {
                if (value) {
                  // 调用element的图片上传组件
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      }

    }
  },
  created() {
    this.Bind();
  },
  methods: {

    async Bind() {
      await GetByID(this.listQuery.id).then(res => {
        this.thingtype = res.data.thingtype;
        this.thingtype2 = res.data.thingtype2;
        if (res.data.add != null)
          this.setmes = deepClone(res.data.add);
        else {
          this.setmes.thingtypeId = res.data.thingtype[0].id
          this.setmes.thingtype2Id = res.data.thingtype2[0].id
        }
      });
    },
    async sub() {
      if (this.setmes.img.trim().length == 0) {
        this.$message({
          message: "请上传图片",
          type: "error"
        });
        return false;
      }
      this.$refs.setform.validate(async (valid) => {
        if (valid) {
          await Add(this.setmes).then(res => {

            this.$message({
              message: res.msg,
              type: res.icon
            });
            if (res.success)
              this.$router.push({ path: 'thing_list' })
          })
        }
      })
    },
    loadsuccess(response, file, fileList) {
      this.setmes.img = response.data;
    },
    loaderror(err, file, fileList) {
      this.$message({
        message: res.msg,
        type: res.icon
      });
    },
    loaddel(file, fileList) {
      alert("删除照片")
      this.setmes.img = "";
      this.$message({
        message: "移除成功！",
        type: "success"
      });
    },

    // 失去焦点
    onEditorBlur(editor) { },
    // 获得焦点
    onEditorFocus(editor) { },
    // 开始
    onEditorReady(editor) { },
    onEditorChange(editor) {
      this.content = editor.html;
      console.log(editor);
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}?`);
    },
    uploadsuccess(res, file, fileList) {
      this.fileList = []
      // 获取富文本组件实例
      let quill = this.$refs.QuillEditor.quill
      // 如果上传成功
      if (res) {

        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', this.resUrl + res.data)
        // 调整光标到最后
        quill.setSelection(length + 1)
        this.loaddelCon()

      } else {
        // 提示信息，需引入Message
        this.$message.error('图片插入失败！')
      }
    }

  }
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

<style lang="scss"  scoped>
.Tinymce_box {
  display: flex;
}

.editor-content {
  margin-left: 30px;
  flex-grow: 1;
  border: 2px dashed #f1f1f1;
  padding: 0 20px;
}

h3 {
  color: #808080;
}
</style>