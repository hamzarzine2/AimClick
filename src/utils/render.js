const clearPage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
};

const renderPageTitle = (title) => {
  if (!title) return;
  const main = document.querySelector('main');
  const pageTitle = document.createElement('h4');
  pageTitle.innerText = title;
  main.appendChild(pageTitle);
};

function makeOverflowAuto() {
  const body=document.querySelector("body")
  body.style.overflow = 'auto';
}
export { clearPage, renderPageTitle ,makeOverflowAuto};
