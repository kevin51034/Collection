class MusicScreen {
  constructor(musicElement) {
    this.getGifs = this.getGifs.bind(this);
    document.addEventListener('getGifs', this.getGifs);

    this.gifJsonReady = this.gifJsonReady.bind(this);
    this.playButton = new PlayButton(this.audioPlayer);

    this.gif = true;
  }
  getGifs() {
    console.log('getGifs');
    const theme = document.getElementById("query-input").value;
    const endpoint = "https://api.giphy.com/v1/gifs/search?q=" + theme +
     "&api_key=rqzUkSeiIV2n91ZxFDDIqJRnoMbyGBnB&limit=25&rating=g";
   fetch(endpoint)
   .then(function(response) {
     return response.json();
   })
   .then(this.gifJsonReady);
}
  gifJsonReady(json) {
    this.data = json.data;
    console.log(this.data.length)
    if(this.data.length < 2){
      console.log('<2')
      document.getElementById('error').classList.remove('inactive');
      this.gif = false;
    }
    else {
      this.setGifs(this.data);
      this.setSong(this.data);
    }
  }
  setSong(data) {
    console.log('setSong');
    this.data = data;
    this.audioPlayer = new AudioPlayer();
    this.audioPlayer.setSong(app.menu.songUrl);
    this.audioPlayer.setKickCallback(this.disPlayGifs.changeGif);
    //this.audioPlayer.resume();
    this.audioPlayer.play();
  }
  setGifs(data) {
    console.log(data);
    this.disPlayGifs = new GifDisplay(this)
    this.disPlayGifs.preload();
    document.querySelector('#menu').classList.add("inactive");
    document.querySelector('#loading').classList.remove("inactive");
  }
}
