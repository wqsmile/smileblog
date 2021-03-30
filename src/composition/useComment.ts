import { ref, computed } from "vue";
import getBlogId from "@/utils/getBlogId";
import { getComment } from "@/api/comment";
import { comment } from "@/api/comment";
import storage from "@/utils/storage";
import { Message } from "@/utils/message";

export default function useComment() {
  const commentsRef = ref([]);
  const commentRef = ref("");
  const blogId = getBlogId();
  (async () => {
    commentsRef.value = await getComment(blogId);
  })();
  const handleComment = async () => {
    const content = commentRef.value;
    if (content === "") {
      Message("warning", "评论不能为空");
      return;
    }
    const params = {
      blogId,
      profile: storage.get("profile") || "logo.png",
      time: Date.now(),
      username: storage.get("username"),
      comment: content,
    };
    await comment(params).then((res) => {
      if (res) {
        Message("success", "评论成功");
        commentRef.value = "";
        if (commentsRef.value) {
          commentsRef.value.unshift(params);
        } else {
          commentsRef.value = [params];
        }
      } else {
        Message("warning", "失败");
      }
    });
  };
  return {
    comments: computed(() => commentsRef.value),
    comment: commentRef,
    handleComment,
  };
}
