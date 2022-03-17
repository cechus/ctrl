export default class Service {
  private url: string;
  constructor(url: string) {
    this.url = url;
  }
  async post(url: string, body = {}) {
    const response = await fetch(`${this.url}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  }
}
