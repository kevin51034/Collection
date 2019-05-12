class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    let item = document.getElementById('continue');
    item.addEventListener("click" , this.check);
  }

  show(numberCorrect, numberWrong) {
    if(document.querySelector('.percent').textContent == '100'){
      document.querySelector('.continue').innerHTML = 'Start over?'
    }
    else{
      document.querySelector('.continue').textContent = 'Continue?'
    }
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
  check() {
    if(document.querySelector('.percent').textContent == '100'){
      app.toMenu();
    }
    else{
      document.querySelector('.continue').textContent = 'Continue?';
      document.dispatchEvent(new CustomEvent('toContinue'));
    }


  }
}
