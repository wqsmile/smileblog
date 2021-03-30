import { useRoute } from "vue-router";

export default function getBlogId() {
  const route = useRoute();
  return +route.params.id || 0;
}
