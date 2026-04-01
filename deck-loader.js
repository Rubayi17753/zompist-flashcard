function populateDeckDropdown() {
    const select = document.getElementById("deckSelect");
  
    deckList.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });
  }
  
  function loadDeck(file) {
    fetch("decks/" + file)
      .then(r => r.json())
      .then(data => loadCards(data));
  }
  
  function bindDeckUI() {
    const select = document.getElementById("deckSelect");
  
    select.onchange = e => loadDeck(e.target.value);
  
    // initial load
    if (deckList.length > 0) {
      loadDeck(deckList[0]);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    populateDeckDropdown();
    bindDeckUI();
  });