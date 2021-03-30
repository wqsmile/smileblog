import { ref, getCurrentInstance, computed } from "vue";
import { getType, publish, sendImg } from "@/api/blog";
import storage from "@/utils/storage";
import fileToBlob from "@/utils/fileToBlob";
import { Message, ConfirmMessage } from "@/utils/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default function useBlogWrite() {
  const textRef = ref(`# 欢迎使用Markdown编辑器

你好！ 这是你第一次使用 **Markdown编辑器** 所展示的欢迎页。如果你想学习如何使用Markdown编辑器, 可以仔细阅读这篇文章，了解一下Markdown的基本语法知识。## 功能快捷键

## 合理的创建标题，有助于目录的生成

直接输入1次#，并按下space(空格键)后，将生成1级标题。
输入2次#，并按下space后，将生成2级标题。
以此类推，我们支持6级标题。有助于使用'TOC'语法后生成一个完美的目录。

## 如何改变文本的样式

*强调文本* _强调文本_

**加粗文本** __加粗文本__

~~删除文本~~

> 引用文本
  `);
  const isPublicRef = ref(true);
  const themeRef = ref("");
  const isCommentRef = ref(true);
  const titleRef = ref("");
  const descRef = ref("");
  const imgRef = ref("");
  const store = useStore();
  const blogType = store.state.category.data.slice(1);

  const UserId = storage.get("id");
  const router = useRouter();
  (async () => {
    blogType.value = await getType();
  })();

  const check = computed(() => {
    return !(themeRef.value && titleRef.value && textRef.value);
  });

  const { ctx } = getCurrentInstance();
  const upload = async () => {
    try {
      const file = ctx.$refs.inputFile.files[0];
      imgRef.value = fileToBlob(file);
    } catch (err) {
      console.log(err);
    }
  };
  const publishBlog = () => {
    if (textRef.value === "") {
      Message("warning", "文章不能为空!");
      return;
    }
    const tipContent = `此操作将对文章进行${
      isPublicRef.value ? "公开" : "私密"
    }发布，并${isCommentRef.value ? "允许评论" : "不允许评论"}`;

    ConfirmMessage("success", tipContent)
      .then(async () => {
        // 先上传图片文件
        const file = ctx.$refs.inputFile.files[0];
        file && sendImg(file);
        imgRef.value = file ? file.name : "logo.png";
        const { name, id } = themeRef.value;

        const res = await publish({
          UserId,
          content: textRef.value,
          CategoryId: id,
          title: titleRef.value,
          theme: name,
          desc: descRef.value,
          img: imgRef.value,
          isPublic: isPublicRef.value ? 1 : 0,
          isComment: isCommentRef.value ? 1 : 0,
        });
        if (res) {
          Message("success", "发布成功!");
          router.push("/person");
        } else {
          Message("warning", "发布失败!");
        }
      })
      .catch((e) => {
        console.log(e);
        Message("info", "已取消发布!");
      });
  };
  return {
    text: textRef,
    isPublic: isPublicRef,
    theme: themeRef,
    isComment: isCommentRef,
    title: titleRef,
    desc: descRef,
    img: imgRef,
    publish: publishBlog,
    blogType,
    check,
    upload,
  };
}
