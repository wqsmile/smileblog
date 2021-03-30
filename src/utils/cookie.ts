class Cookie {
  // 设置cookie
  set(name, value, time) {
    document.cookie = `${name}=${value}; max-age=${time}`;
  }
  // 获取cookie
  get(name) {
    if (document.cookie.includes(name)) {
      return document.cookie
        .split("; ")
        .filter((item) => item.split("=")[0] === name)[0]
        .split("=")[1];
    }
  }
  // 移除cookie
  remove(name) {
    this.set(name, "", 0);
  }
  // 清空cookie
  clear() {
    document.cookie
      .split("; ")
      .forEach((item) => this.remove(item.split("=")[0]));
  }
}

export default new Cookie();
