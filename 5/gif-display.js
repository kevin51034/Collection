class GifDisplay {
  constructor(musicitem) {
    this.changeGif = this.changeGif.bind(this);
    this.preload = this.preload.bind(this);
    this.musicitem = musicitem;
    this.data = musicitem.data;
    this.prerandom = 1;
    this.front = true;
    this.index = 0;
    this.preImageArray = new Array();
  }

  changeGif() {
    console.log('changeGif');
    console.log(this);
    if(this.front == true){
      document.getElementById('backgif').style.zIndex = "1";
      document.getElementById('frontgif').style.zIndex = "-1";
      let random = Math.floor(Math.random() * this.preImageArray.length);
      while(random === this.prerandom){
        let random = Math.floor(Math.random() * this.preImageArray.length);
      }
      this.prerandom = random;
      document.getElementById('frontgif').style.backgroundImage
        = `url(${this.preImageArray[random].src})`;
      this.front = false;
    }

    else {
      document.getElementById('frontgif').style.zIndex = "1";
      document.getElementById('backgif').style.zIndex = "-1";
      let random = Math.floor(Math.random() * this.preImageArray.length);
      while(random === this.prerandom){
        let random = Math.floor(Math.random() * this.preImageArray.length);
      }
      this.prerandom = random;
      document.getElementById('backgif').style.backgroundImage
        = `url(${this.preImageArray[random].src})`;
      this.front = true;
    }
  }
  preload() {
    console.log('preload');

      if(this.index === 2){

        document.getElementById('frontgif').style.backgroundImage
          = `url(${this.preImageArray[0].src})`;
        document.getElementById('backgif').style.backgroundImage
          = `url(${this.preImageArray[1].src})`;
        document.querySelector('#loading').classList.add("inactive");
        document.querySelector('#music').classList.remove("inactive");
      }
      if(this.index < this.data.length){
        this.preImage = new Image();
        this.preImage.src = this.data[this.index].images.downsized.url;
        this.preImageArray.push(this.preImage)

        this.preImage.addEventListener('load', this.preload)
        this.index++;
      }
      console.log(this.preImageArray);
 }
}
