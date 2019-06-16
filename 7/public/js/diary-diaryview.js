class DiaryView {
  constructor(viewContainer, customevent) {
    console.log('DiaryView');
    console.log(customevent);

    this.viewContainer = viewContainer;
    //this.diaryId = customevent.detail._id;
    this.diaryId = customevent.detail._id;

    this.loadDiary();

    this.checkButton = document.querySelector("#checked");
    this.forwardButton = document.querySelector("#forward");
    this.backButton = document.querySelector("#back");
    this.homeButton = document.querySelector("#home");
    this.textArea = document.querySelector("textarea");
    this.navBar = document.querySelector("#navigation");
    this.editBar = document.querySelector("#edit");

    // Bind methods.
    this.save = this.save.bind(this);
    this.forward = this.forward.bind(this);
    this.back = this.back.bind(this);
    this.home = this.home.bind(this);
    this.edit = this.edit.bind(this);

    // Add event listeners.
    this.checkButton.addEventListener('click', this.save);
    this.forwardButton.addEventListener('click', this.forward);
    this.backButton.addEventListener('click', this.back);
    this.homeButton.addEventListener('click', this.home);
    this.textArea.addEventListener('click', this.edit);
  }


  async forward(event) {
    this.currDate.setDate(this.currDate.getDate() + 1);
    this.currEntry = await new DiaryEntry(this.currDate, this.diaryId);
    await this.currEntry.loadEntry();
  }
  async back(event) {
    this.currDate.setDate(this.currDate.getDate() - 1);
    this.currEntry = new DiaryEntry(this.currDate, this.diaryId);
    await this.currEntry.loadEntry();
  }
  async home(event) {
    this.currDate = new Date();
    this.currEntry = new DiaryEntry(this.currDate, this.diaryId);
    await this.currEntry.loadEntry();
  }
  edit(event) {
    this.navBar.classList.add('hidden');
    this.editBar.classList.remove('hidden');
    this.textArea.classList.add('editing');
  }
  async save(event) {
    await this.currEntry.saveEntry();
    this.navBar.classList.remove('hidden');
    this.editBar.classList.add('hidden');
    this.textArea.classList.remove('editing');
  }
  async loadDiary() {
    console.log('loadDiary');

    const result = await fetch(`/${this.diaryId}`);
    const json = await result.json();
    console.log(json);

    this.currDate = new Date();
    this.currEntry = new DiaryEntry(this.currDate, this.diaryId);
    await this.currEntry.loadEntry();

    this.viewContainer.classList.remove('hidden');
  }
}
