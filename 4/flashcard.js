class Flashcard {
  constructor(containerElement, frontText, backText) {
    this.startx = 0;
    this.starty = 0;
    this.dx = 0;
    this.dy = 0;
    this.deg = 0;
    this.countword = 0;
    this.dragging = false;
    this.containerElement = containerElement;

    this._flipCard = this._flipCard.bind(this);
    this._dragCard = this._dragStart.bind(this);
    this._dragCard = this._dragOver.bind(this);
    this._dragCard = this._dragDrop.bind(this);

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);

    this.flashcardElement.addEventListener('pointerup', this._flipCard);
    this.flashcardElement.addEventListener('pointerdown', this._dragStart);
    this.flashcardElement.addEventListener('pointermove', this._dragOver);
    this.flashcardElement.addEventListener('pointerup', this._dragDrop);
  }
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle('show-word');
  }

  _dragStart(event) {
    this.dragging = true;
    this.startx = event.clientX;
    this.starty = event.clientY;
    document.getElementById('flashcard-container').style="transition-duration:''";

  }

  _dragOver(event) {
    if(this.dragging == false) return;
    this.dx = event.clientX - this.startx;
    this.dy = event.clientY - this.starty;
    this.deg = 0.2 * this.dx;
    let f = document.getElementById('flashcard-container');
    f.style.transform = `translate(${this.dx}px , ${this.dy}px) rotate(${this.deg}deg)`;
    if(this.dx >= 150 || this.dx <= -150){
      document.body.style.backgroundColor = '#97b7b7';
    }
    else{
      document.body.style.backgroundColor = '';
    }
  }

  _dragDrop(event) {

     this.dragging = false;

     document.body.style.backgroundColor = '';
     document.getElementById('flashcard-container').style.transform = '';
     document.getElementById('flashcard-container').style="transition-duration:0.6s";

     if (this.dx > 150) {
        document.dispatchEvent(new CustomEvent('dropRight'));
     }
     else if (this.dx < -150) {
        document.dispatchEvent(new CustomEvent('dropLeft'));
     }
  }
}
