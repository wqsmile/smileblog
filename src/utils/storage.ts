export class LocalStorage {
  name?: string;
  constructor(name: string = "fowpg41uurv") {
    this.name = name;
  }
  setItem(value) {
    try {
      localStorage.setItem(this.name, JSON.stringify(value));
    } catch (err) {
      console.log(err);
    }
  }
  getItem() {
    try {
      const res = localStorage.getItem(this.name);
      return res ? JSON.parse(res) : {};
    } catch (err) {
      console.log(err);
    }
  }
  remove() {
    try {
      localStorage.removeItem(this.name);
    } catch (err) {
      console.log(err);
    }
  }
}

class MyStorage {
  private storage: LocalStorage;
  constructor(name?: string, Storage: any = LocalStorage) {
    this.storage = new Storage(name);
  }
  /**
   *
   * @param name
   * @param value
   * @param expires 有效时间单位为ms，默认永久（10年）
   */
  set(name: string, value, expires: number = 315360000000) {
    const res = this.storage.getItem();
    res[name] = {
      value,
      expires: Date.now() + expires,
    };
    this.storage.setItem(res);
  }
  setMany(obj, expires: number = 315360000000) {
    const res = this.storage.getItem();
    for (const key in obj) {
      res[key] = {
        value: obj[key],
        expires: Date.now() + expires,
      };
    }
    this.storage.setItem(res);
  }
  get(name: string) {
    const res = this.storage.getItem();
    return res[name] ? res[name].value : undefined;
  }
  remove(name) {
    const res = this.storage.getItem();
    return delete res[name];
    this.storage.setItem(res);
  }
  removeMany(arr: Array<string>) {
    const res = this.storage.getItem();
    arr.forEach((item) => {
      delete res[item];
    });
    this.storage.setItem(res);
  }
  getExpires(name: string) {
    const res = this.storage.getItem();
    return res[name] ? res[name].expires : undefined;
  }
  clear() {
    this.storage.remove();
  }
}

export default new MyStorage();
