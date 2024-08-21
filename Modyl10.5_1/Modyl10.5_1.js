const btn = document.querySelector('.btn-getSizeScreen');

btn.addEventListener('click', getSizeScreen);

function getSizeScreen () {
  // С учетом полосы прокрутки
  const widthScroll = window.innerWidth;
  const heightScroll = window.innerHeight;
  
  // Без учета полосы прокрутки
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  
  alert(`Размер экрана в px. С учетом полосы прокрутки (Ширина ${widthScroll}px Высота ${heightScroll}px) Без учета полосы прокрутки (Ширина ${width}px Высота ${height}px)`);

};