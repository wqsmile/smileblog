import request from "./index";

export async function getWordCloud() {
  return await request.get("/wordCloud");
}
