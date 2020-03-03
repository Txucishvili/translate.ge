window.onload = () => {
  console.log('[app init]');
  initTestApp();
};

const initTestApp = () => {
  console.log('[test view init]');

  const deviceBurgerMenu = document.querySelector('#deviceBugerMenu');
  const headerTarget = document.querySelector('.layout--header-wrapper');

  deviceBurgerMenu.addEventListener('click', () => {
    headerTarget.classList.toggle('layout--header-wrapper--opened');
    deviceBurgerMenu.querySelector('.burger').classList.toggle('is-open');
  });

  const searchClearBTN = document.querySelector('#clear-btn');
  const searchInputTarget = document.querySelector('#search-target');

  const searchDes = document.querySelector('.layout--search--desc');
  const searchSuggest = document.querySelector('.layout--search--suggests');
  const searchResult = document.querySelector('.layout--search--results');
  const blocksContent = document.querySelector('.blocks-content');

  if (searchSuggest) {
    searchSuggest.classList.add('hidden');
  }

  if (searchResult) {
    searchResult.classList.add('hidden');
  }


  if (searchInputTarget) {
    searchInputTarget.addEventListener('change', (e) => {
      if (e.target.value.length > 0) {
        searchClearBTN.classList.add('show');
        searchSuggest.classList.remove('hidden');
        searchResult.classList.remove('hidden');
        blocksContent.classList.add('hidden');
      } else if (e.target.value.length <= 0) {
        searchClearBTN.classList.remove('show');
        searchSuggest.classList.add('hidden');
        searchResult.classList.add('hidden');
        blocksContent.classList.remove('hidden');
      }
    });
  }
  if (searchClearBTN) {
    searchClearBTN.addEventListener('click', () => {
      searchInputTarget.value = '';
      searchClearBTN.classList.remove('show');
      searchClearBTN.classList.remove('show');
      searchSuggest.classList.add('hidden');
      searchResult.classList.add('hidden');
      blocksContent.classList.remove('hidden');
    });
  }

  const billBlock = document.querySelector('.layout--order--bill');
  const billBlockHead = document.querySelector('.bill-block--head');

  if (billBlock && billBlockHead) {
    billBlockHead.addEventListener('click', () => {
      console.log('hit');
      billBlock.classList.toggle('opened');
    })
  }

};
