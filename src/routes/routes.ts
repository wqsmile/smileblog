import Home from "@/views/home";
import { setAsyncPage } from "@/utils/setAsyncComponent";

const Blog = setAsyncPage("../views/blog/index.vue");
const Person = setAsyncPage("../views/person/index.vue");
const BlogDetail = setAsyncPage("../views/blog/BlogDetail.vue");
const CategoryBlog = setAsyncPage("../views/blog/CategoryBlog.vue");
const BlogWrite = setAsyncPage("../views/blog/BlogWrite.vue");
const Login = setAsyncPage("../components/Login.vue");

export default [
  { path: "/", name: "home", component: Home },
  {
    path: "/blog",
    name: "blog",
    component: Blog,
  },
  {
    path: "/blog/wc/:title",
    name: "wcBlog",
    component: Blog,
  },
  {
    path: "/blog/:id",
    name: "BlogDetail",
    component: BlogDetail,
  },
  {
    path: "/write",
    name: "write",
    component: BlogWrite,
    meta: { requiresAuth: true },
  },
  {
    path: "/person",
    name: "person",
    component: Person,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];
