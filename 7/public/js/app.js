class App {
  constructor() {
  
    this.toDiaryView = this.toDiaryView.bind(this);
    document.addEventListener('toDiaryView', this.toDiaryView);


    const urlPathString = window.location.pathname;
    const parts = urlPathString.split('/');
    if (parts.length > 2 && parts[1] === 'id') {
      const diaryId = parts[2];
      this.toDiaryView({detail: {_id: diaryId }});
    } else {
      this.toHomeScreen();
    }

  }
  toDiaryView(customevent) {
      console.log('toDiaryView');
      const viewContainer = document.querySelector('#journal-view');
      const journalView = new DiaryView(viewContainer, customevent);
      document.querySelector('#home-view').classList.add('hidden');

  }
  toHomeScreen() {
    console.log('toHomeScreen');

      const viewContainer = document.querySelector('#home-view');
      const homeScreen = new HomeScreen(viewContainer);
  }
}
