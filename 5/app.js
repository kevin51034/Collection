class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    const musicElement = document.querySelector('#music');

    this.toMusic = this.toMusic.bind(this);
    document.addEventListener('toMusic', this.toMusic);

    this.menu = new MenuScreen(menuElement);
    this.music = new MusicScreen(musicElement);
  }

  toMusic() {
    this.music.getGifs();
  }
}
