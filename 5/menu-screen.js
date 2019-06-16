class MenuScreen {
  constructor(menuElement) {
    this.selectElem = document.querySelector('select');
    this.menuElement = menuElement;
    this.songs = [];
    this.songUrl;
    this.title;
    this.artist;
    this.theme = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];

    this.myJsonReady = this.myJsonReady.bind(this);
    this.fetchsongs = this.fetchsongs.bind(this);
    this.fetchsongs();
    this.getRandomTheme = this.getRandomTheme.bind(this);
    this.getRandomTheme();
    this.submitting  = this.submitting.bind(this);
    document.getElementById('Go').addEventListener('click',this.submitting);
}

fetchsongs() {
  fetch("https://yayinternet.github.io/hw4-music/songs.json")
  .then(function(response) {
    return response.json();
  })
  .then(this.myJsonReady);
}
myJsonReady(myJson) {
  this.songs = myJson;
  for (const song in this.songs) {
    let list = document.getElementById('song-selector');
    const option = document.createElement("option");
      option.value = this.songs[song].songUrl;
      option.text = this.songs[song].title;
      list.add(option);
  }
}

getRandomTheme() {
  let random = Math.floor(Math.random() * 10);
  document.getElementById("query-input").defaultValue = this.theme[random];
}

submitting(event) {
  let songvalue = document.getElementById("song-selector");
  this.songUrl = songvalue.options[songvalue.selectedIndex].value;
  let themevalue = document.getElementById("query-input").value;
  document.dispatchEvent(new CustomEvent('toMusic'));
  event.preventDefault();
}
}
