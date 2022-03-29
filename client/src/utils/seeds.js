import Cookies from "universal-cookie";

export default class SeedController {
  constructor() {
    this.cookies = new Cookies();
  }

  test() {
    this.cookies.set("Test", "Hello this is a test");
  }

  getSeedsAsJson() {
    let seeds = this.cookies.get("seeds") || [];
    if (seeds.length <= 0) return {};

    let seedsAsJson = {};
    for (let i = 0; i < seeds.length; i++) {
      let uri = seeds[i][0];
      let uriType = seeds[i][1];

      let seedType = "seed_" + uriType + "s";

      if (seedType in seedsAsJson) {
        seedsAsJson[seedType] += ", " + seeds[i][0];
      } else {
        seedsAsJson[seedType] = seeds[i][0];
      }
    }
    return seedsAsJson;
  }

  addSeed(uri, type, name) {
    let seeds = this.cookies.get("seeds") || [];
    if (seeds.length >= 4) {
      throw new Error("Seed Limit Reached");
    }
    seeds.push([uri, type, name]);
    this.cookies.set("seeds", seeds);
  }

  removeSeed(uri) {
    let seeds = this.cookies.get("seeds") || [];
    for (let i = 0; i < seeds.length; i++) {
      if (seeds[i][0] == uri) {
        seeds.splice(i, 1);
      }
    }
    this.cookies.set("seeds", seeds);
  }

  containsUri(uri) {
    let seeds = this.cookies.get("seeds") || [];
    for (let i = 0; i < seeds.length; i++) {
      if (seeds[i][0] == uri) {
        return true;
      }
    }
    return false;
  }
}
