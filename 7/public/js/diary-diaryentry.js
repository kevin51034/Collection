class DiaryEntry {
  constructor(date, diaryId) {
    console.log('DiaryEntry');

    this.entryContainer = document.querySelector("#entry");
    this.dateContainer = document.querySelector("#date");
    this.promptContainer = document.querySelector("#prompt");
    this.contentsContainer = document.querySelector("#contents");

    console.log(diaryId);
    this.diaryId = diaryId;
    this.date = date;
    this.prompt = null;
  }
  async createEntry() {
    console.log('createEntry');
    const random = Math.floor(Math.random() * prompts.length);
    this.prompt = prompts[random];
    const params = {
      diaryId: this.diaryId,
      date: this.date.toLocaleDateString(),
      prompt: this.prompt,
      contents: ""
    };
    //console.log(params);
    const fetchOptions = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    };
    //console.log(fetchOptions);

    const result = await fetch('/create-entry', fetchOptions);
    const json = await result.json();
    console.log(json);
    return json;
  }

  async loadEntry() {
    console.log('loadEntry');

    const date = this.date.toLocaleDateString();
    let result = await fetch(`/id/${this.diaryId}/${date}`);
    let json = await result.json();
    // Entry does not already exist
    if (json === null) {
      console.log('null');

      json = await this.createEntry();
      console.log(json);

    }
    this.prompt = json.prompt;
    this.contents = json.contents;
    const options = {
      month: 'long',
      day: 'numeric'
    };
    const parsed = this.date.toLocaleDateString('en-US', options);
    this.dateContainer.textContent = parsed;
    this.promptContainer.textContent = json.prompt;
    this.contentsContainer.value = json.contents;
  }

  async saveEntry() {
    console.log('saveEntry');

        this.contents = this.contentsContainer.value;
        const params = {
            diaryId: this.diaryId,
            date: this.date.toLocaleDateString(),
            prompt: this.prompt,
            contents: this.contents
        };
        const fetchOptions = {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        };
        const result = await fetch('/create-entry', fetchOptions);
        const json = await result.json();
        return json;
    }
}
