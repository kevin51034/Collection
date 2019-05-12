class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);


    this.toResult = this.toResult.bind(this);
    document.addEventListener('toResult', this.toResult);

    this.toMenu = this.toMenu.bind(this);
    let item = document.getElementById('tomenu');
    item.addEventListener("click" , this.toMenu);

    this.toContinue = this.toContinue.bind(this);
    document.addEventListener('toContinue', this.toContinue);

    this.menu.menuItem();
  }
  toResult() {
    this.flashcards.hide();
    this.results.show();
  }
  toMenu(){
    this.results.hide();
    this.menu.show();
    this.flashcards.reset();
  }
  toContinue() {
    this.results.hide();
    this.flashcards.show(this);
  }
}
