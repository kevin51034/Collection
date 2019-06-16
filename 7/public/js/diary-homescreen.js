class HomeScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.createButton = document.querySelector("#create-button");


    this.onClick = this.onClick.bind(this);
    this.createButton.addEventListener('click', this.onClick)
  }
  async onClick(event) {
    const today = new Date();
console.log(today);
    event.preventDefault();
    console.log('click');

    const params = {};
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    };
    const result = await fetch('/create-diary', fetchOptions);
    const json = await result.json();

    //window.history.pushState(null, null, window.location.href);
    window.history.pushState(null, null, window.location.href + 'id/' + json.diaryId);

    this.containerElement.classList.add('hidden');
    document.dispatchEvent(new CustomEvent('toDiaryView', {
      detail: {
        _id: json.diaryId
      }
    }));

  }


}
