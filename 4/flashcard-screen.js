class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.word;
    this.itemnum;
    this.wordnum = 1;
    this.correct = 0;
    this.incorrect = 0;
    this.percent = 0;
    this.wrongcard = new Array();
    this.wrongcarddef = new Array();
    this.wrongcardnum = 1;
    this.continue = 0;

    this.dropRight = this.dropRight.bind(this);
    this.dropLeft = this.dropLeft.bind(this);

    document.addEventListener('dropRight', this.dropRight);
    document.addEventListener('dropLeft', this.dropLeft);
    this.correcthtml = document.querySelectorAll('.correct');
    this.incorrecthtml = document.querySelectorAll('.incorrect');
    this.flashcardContainer = document.querySelector('#flashcard-container');
    this.correcthtml[0].textContent = '0';
    this.correcthtml[1].textContent = '0';
    this.incorrecthtml[0].textContent = '0';
    this.incorrecthtml[1].textContent = '0';
  }
  show(item) {
    this.containerElement.classList.remove('inactive');
      for(this.itemnum = 0; this.itemnum < FLASHCARD_DECKS.length;this.itemnum++){
        if(item.innerHTML == FLASHCARD_DECKS[this.itemnum].title){
          item = FLASHCARD_DECKS[this.itemnum];
          this.word = Object.entries(FLASHCARD_DECKS[this.itemnum].words);
          this.w = this.word.length;
            //const card = new Flashcard(this.flashcardContainer, this.word[this.itemnum][0] , this.word[this.itemnum][1]);
            break;
        }
      }
    if(this.continue === 0){
      const card = new Flashcard(this.flashcardContainer, this.word[this.itemnum][0] , this.word[this.itemnum][1]);
    }
    else {
      //console.log('secondround')
      this.continue = 0;
      this.incorrect = 0;
      this.wordnum = 1;
      this.incorrecthtml[0].textContent = '0';
      this.incorrecthtml[1].textContent = '0';

      this.wordnum = 1;
      this.wrongcardnum = 1;
      this.continue = 0;

        this.wordtemp=new Array()
        this.wordtemp=this.word;
        this.word=[];
        for(let i=1;i<this.wrongcard.length;i++){
          this.word[i]=[]
            for(let j=0;j<2;j++){
              this.word[i][j]="[" + i + ", " + j + "]";
            }
        }
        for(let j = 1;j<this.wrongcard.length;j++){
          let i = this.wrongcard[j];
          this.word[j][0]=this.wordtemp[i-1][0];
          this.word[j][1]=this.wordtemp[i-1][1];
        }
        this.card = new Flashcard(this.flashcardContainer, this.word[1][0], this.word[1][1]);
        this.wordnum++;
        this.wrongcard = new Array();
      }
  }
  hide() {
    this.containerElement.classList.add('inactive');
  }
  dropRight() {
    this.correct++;
    this.correcthtml[0].textContent = this.correct;
    this.correcthtml[1].textContent = this.correct;
    this.percent = Math.round(this.correct/this.w*100)
    document.querySelector('.percent').textContent = this.percent;

    let child = document.querySelector('.flashcard-box');
    if (this.wordnum === this.word.length) {
      this.flashcardContainer.removeChild(child);
      document.dispatchEvent(new CustomEvent('toResult'));
    }
    else if (child != null){
       this.flashcardContainer.removeChild(child);
       this.card = new Flashcard(this.flashcardContainer, this.word[this.wordnum][0], this.word[this.wordnum][1]);
       this.wordnum++;
    }
  }
  dropLeft() {
    this.incorrect++;
    this.incorrecthtml[0].textContent = this.incorrect;
    this.incorrecthtml[1].textContent = this.incorrect;
    this.continue = 1;

    this.wrongcard[this.wrongcardnum] = this.wordnum;
    this.wrongcardnum++;

    let child = document.querySelector('.flashcard-box');

    if (this.wordnum === this.word.length) {
      this.flashcardContainer.removeChild(child);
      document.dispatchEvent(new CustomEvent('toResult'));
    }
    else if (child != null){
       this.flashcardContainer.removeChild(child);
       this.card = new Flashcard(this.flashcardContainer, this.word[this.wordnum][0], this.word[this.wordnum][1]);
       this.wordnum++;
    }
  }
  reset() {
    this.wordnum = 1;
    this.correct = 0;
    this.incorrect = 0;
    this.percent = 0;
    this.correcthtml[0].textContent = '0';
    this.correcthtml[1].textContent = '0';
    this.incorrecthtml[0].textContent = '0';
    this.incorrecthtml[1].textContent = '0';
  }
}
