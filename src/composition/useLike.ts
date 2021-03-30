import { computed } from "vue";
import getBlogId from "@/utils/getBlogId";
import { like } from "@/api/like";
import storage from "@/utils/storage";
import { useStore } from "vuex";

export default function useLike() {
  const id = getBlogId();
  const userId = storage.get("id");
  const store = useStore();
  const handleLike = async (isLike) => {
    const likes = store.state.like.likes;
    if (isLike) {
      likes.splice(likes.indexOf(userId), 1);
    } else {
      likes.push(userId);
    }
    store.commit("like/setLikes", likes);
    const params = {
      id,
      userId,
      isLike: !isLike,
    };
    await like(params);
  };

  return {
    isLike: computed(() => store.state.like.likes.includes(userId)),
    handleLike,
  };
}
