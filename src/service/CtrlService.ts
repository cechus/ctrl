import Service from "./Service";

export default class CtrlService extends Service {
  constructor() {
    super("http://192.168.1.9:5000");
  }
  async getCategories(body = {}) {
    return await this.post("/v1/category/list", body);
  }
  async createCategory(body = {}) {
    return await this.post("/v1/category/create", body);
  }
  async createCtrl(body = {}) {
    return await this.post("/v1/ctrl/create", body);
  }
  async getCtrl(body = {}) {
    return await this.post("/v1/ctrl/list", body);
  }
  async checkIn(body = {}) {
    return await this.post("/v1/ctrl/check-in", body);
  }
  async getRecords(body = {}) {
    return await this.post("/v1/records/list", body);
  }
}
