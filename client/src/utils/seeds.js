import Cookies from "universal-cookie";

export default class SeedController {
  constructor() {
    this.cookies = new Cookies();
  }

  test() {
    this.cookies.set("Test", "Hello this is a test");
  }

  addTrack(uri) {
    let total = this.cookies.get("num_seeds") || 0;

    if (total >= 4) {
      return false;
    } else {
      let seed_tracks = this.cookies.get("seed_tracks") || [];
      seed_tracks.push(uri);
      this.cookies.set("seed_tracks", seed_tracks);
      total++;
      this.cookies.set("num_seeds", total);
      return true;
    }
  }

  addArtist(uri) {
    let total = this.cookies.get("num_seeds") || 0;

    if (total >= 4) {
      return false;
    } else {
      let seed_artists = this.cookies.get("seed_artists") || [];
      seed_artists.push(uri);
      this.cookies.set("seed_artists", seed_artists);
      total++;
      this.cookies.set("num_seeds", total);
      return true;
    }
  }

  removeTrack(uri) {
    let seed_tracks = this.cookies.get("seed_tracks") || [];
    for (let i = 0; i < seed_tracks.length; i++) {
      if (seed_tracks[i] == uri) {
        seed_tracks.splice(i, 1);
      }
    }
    let total = this.cookies.get("num_seeds") || 0;
    total--;
    this.cookies.set("num_seeds", total);
    this.cookies.set("seed_tracks", seed_tracks);
  }

  removeArtist(uri) {
    let seed_artists = this.cookies.get("seed_artists") || [];
    for (let i = 0; i < seed_artists.length; i++) {
      if (seed_artists[i] == uri) {
        seed_artists.splice(i, 1);
      }
    }
    let total = this.cookies.get("num_seeds") || 0;
    total--;
    this.cookies.set("num_seeds", total);
    this.cookies.set("seed_artists", seed_artists);
  }
}
