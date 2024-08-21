const btn = document.querySelector('.btn');
const icon = document.querySelector('.svg-btn-test');
const icon2 = document.querySelector('.svg-btn-test2');

btn.addEventListener('click', btnUpdate);

function btnUpdate() {
  icon.classList.toggle('btn-update');
  icon2.classList.toggle('btn-update2');
}