"use strict";
const toggle = (evt) => {
  const btnMore = evt.currentTarget; 
  const parent = btnMore.parentElement;
  const pTags = parent.getElementsByTagName('p');
  const moreText = pTags[1];


  moreText.classList.toggle('hide');
  btnMore.textContent == 'Read More'
    ? (btnMore.textContent = 'Show Less')
    : (btnMore.textContent = 'Read More');

};

document.addEventListener('DOMContentLoaded', () => {
  const btnsMore = document.querySelectorAll('.box-text button');

  
  for (let btnMore of btnsMore) {
    btnMore.addEventListener('click', toggle);
  }
});
