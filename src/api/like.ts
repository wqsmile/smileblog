import request from "./index";
import qs from "querystring";
import { ILike } from "@/interface/IBlog";

export async function like(params: ILike) {
  // return await request.put("/like", qs.stringify({ ...params }));
  return await request.put("/like", params);
}
