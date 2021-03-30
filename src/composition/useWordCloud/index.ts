import { ref, computed, onMounted, onUnmounted } from "vue";
import { getWordCloud } from "@/api/wordCloud";
import Mock from "mockjs";

export default function () {
  /* width:700,
    height:700,
    tagsNum:20,
    RADIUS:200,
    speedX:Math.PI/360,
    speedY:Math.PI/360,
    tags: [] */
  const width = ref(500);
  const height = ref(500);
  const tagsNumRef = ref(0);
  const RADIUS = 200;
  let speedX = Math.PI / 360;
  let speedY = Math.PI / 360;
  let timer = null;

  const tagsRef = ref([]);
  (async () => {
    tagsRef.value = await getWordCloud();
    tagsNumRef.value = tagsRef.value.length;
    init();
    timer = setInterval(() => {
      rotateX(speedX);
      rotateY(speedY);
    }, 17);
  })();

  const CX = computed(() => width.value / 2);
  const CY = computed(() => height.value / 2);
  const init = () => {
    // let tags = [];
    for (let i = 0; i < tagsNumRef.value; i++) {
      const item = tagsRef.value[i];
      let tag = {};
      let k = -1 + (2 * (i + 1) - 1) / tagsNumRef.value;
      let a = Math.acos(k);
      let b = a * Math.sqrt(tagsNumRef.value * Math.PI);
      tag.text = item.title;
      tag.x = CX.value + RADIUS * Math.sin(a) * Math.cos(b);
      tag.y = CY.value + RADIUS * Math.sin(a) * Math.sin(b);
      tag.z = RADIUS * Math.cos(a);
      tag.color = Mock.mock("@color");
      tag.href = "http://localhost:3000/#/blog/wc/" + item.title;
      tagsRef.value[i] = Object.assign(item, tag);
      // tags.push(tag);
    }
    // tagsRef.value = tags;
  };
  const rotateX = (speedX) => {
    var cos = Math.cos(speedX);
    var sin = Math.sin(speedX);
    for (let tag of tagsRef.value) {
      var y1 = (tag.y - CY.value) * cos - tag.z * sin + CY.value;
      var z1 = tag.z * cos + (tag.y - CY.value) * sin;
      tag.y = y1;
      tag.z = z1;
    }
  };
  const rotateY = (speedY) => {
    var cos = Math.cos(speedY);
    var sin = Math.sin(speedY);
    for (let tag of tagsRef.value) {
      var x1 = (tag.x - CX.value) * cos - tag.z * sin + CX.value;
      var z1 = tag.z * cos + (tag.x - CX.value) * sin;
      tag.x = x1;
      tag.z = z1;
    }
  };
  // init();
  // onMounted(() => {
  //   timer = setInterval(() => {
  //     rotateX(speedX);
  //     rotateY(speedY);
  //   }, 17);
  // });
  onUnmounted(() => {
    clearInterval(timer);
  });

  const stopMove = (event) => {
    //响应鼠标移动
    // var x = event.clientX - CX.value;
    // var y = event.clientY - CY.value;
    speedX = 0;
    // x * 0.0001 > 0
    //   ? Math.min(RADIUS * 0.00002, x * 0.0001)
    //   : Math.max(-RADIUS * 0.00002, x * 0.0001);
    speedY = 0;
    // y * 0.0001 > 0
    //   ? Math.min(RADIUS * 0.00002, y * 0.0001)
    //   : Math.max(-RADIUS * 0.00002, y * 0.0001);
  };
  const move = () => {
    speedX = Math.PI / 360;
    speedY = Math.PI / 360;
  };

  return {
    width,
    height,
    tagsNum: tagsNumRef,
    RADIUS,
    speedX,
    speedY,
    tags: tagsRef,
    stopMove,
    move,
  };
}
