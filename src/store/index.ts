import { createStore, createLogger } from "vuex";
import blogList from "./blogList";
import loginUser from "./loginUser";
import like from "./like";
import category from "./category";

export default createStore({
  modules: {
    blogList,
    loginUser,
    like,
    category,
  },
  // plugins: [createLogger()],
});
