import { ref } from "vue";

export default function useHandleCategory() {
  let isShowCategory = ref(true);
  const handleCategory = () => {
    isShowCategory.value = !isShowCategory.value;
  };

  return {
    handleCategory,
    isShowCategory,
  };
}
