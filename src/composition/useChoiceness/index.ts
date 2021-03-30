import { ref, computed } from "vue";
import { getChoice } from "@/api/choiceness";

export default function useChoiceness() {
  const choicesRef = ref([]);
  const carIndexRef = ref(0);
  (async () => {
    await getChoice().then((res) => {
      choicesRef.value = res;
    });
  })();
  const changeCar = (nowIndex, oldIndex) => {
    carIndexRef.value = nowIndex;
  };
  const toBlog = (currIndex, id) => {
    if (currIndex === carIndexRef.value) {
      window.open("http://localhost:3000/#/blog/" + id);
    }
  };
  return {
    choices: choicesRef,
    changeCar,
    carIndex: carIndexRef,
    toBlog,
  };
}
