class PlayButton {
  constructor(audioPlayer) {
    this.buttonitem = document.querySelector('#buttonsec');
    this.playbutton = document.querySelector('#playbutton');
    this.pausebutton = document.querySelector('#pausebutton');

    this.play = this.play.bind(this)
    this.playbutton.addEventListener('click', this.play);
    this.pause = this.pause.bind(this)
    this.pausebutton.addEventListener('click', this.pause);
    document.querySelector('#playbutton').classList.add('inactive');
  }
  play() {
      console.log('playbutton')
      app.music.audioPlayer.play();
      document.querySelector('#pausebutton').classList.remove('inactive');
      document.querySelector('#playbutton').classList.add('inactive');
  }
  pause() {
      console.log('pausebutton')
      app.music.audioPlayer.pause();
      document.querySelector('#pausebutton').classList.add('inactive');
      document.querySelector('#playbutton').classList.remove('inactive');
  }
}
