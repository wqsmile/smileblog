import request from "./index";
import { IPublish, IBlogList } from "@/interface/IBlog";
import qs from "querystring";

export async function getBlogs(params: IBlogList) {
  return await request.get("/blogs", {
    params,
  });
}
export async function getBlogsTitle(params: IBlogList) {
  return await request.get("/blogsTitle", {
    params,
  });
}

export async function getBlog(id) {
  return await request.get("/blog", {
    params: {
      id,
    },
  });
}

export async function getType() {
  return await request.get("/blogtype");
}

export async function publish(params: IPublish) {
  return await request.post("/publish", qs.stringify({ ...params }));
}
export async function sendImg(img: File) {
  const form = new FormData();
  form.append("file", img);
  return await request.post("/blogImg", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
