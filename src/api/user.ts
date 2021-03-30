import request from "./index";
import qs from "querystring";
import storage from "@/utils/storage";

export async function login(username, password) {
  const res = await request.post(
    "/login",
    qs.stringify({
      username,
      password,
    })
  );
  if (res) {
    console.log(res);

    storage.setMany(res, 604800000);
    return res;
  }
  storage.removeMany(["username", "id", "token", "profile"]);
  return false;
}

export function loginOut() {
  storage.clear();
  window.location.reload();
}

export function whoami() {
  return {
    username: storage.get("username"),
    profile: storage.get("profile"),
  };
}

export async function register(username, password) {
  return await request.post("/register", qs.stringify({ username, password }));
}

export async function getInfo() {
  return await request.get("/info", {
    params: {
      id: storage.get("id"),
    },
  });
}
export async function setInfo(params) {
  params.userId = storage.get("id");
  return await request.post("/info", qs.stringify({ ...params }));
}
