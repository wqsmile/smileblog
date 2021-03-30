import request from "./index";

export async function getChoice() {
  return await request.get("choice");
}
