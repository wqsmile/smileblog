import request from "./index";
import { IComment } from "@/interface/IBlog";
import qs from "querystring";

export async function comment(params: IComment) {
  return await request.post("/comment", qs.stringify({ ...params }));
}

export async function getComment(id: number) {
  return await request.get("/getComment", {
    params: {
      id,
    },
  });
}
