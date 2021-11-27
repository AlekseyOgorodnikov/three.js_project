import './style.scss';

let textWrapper = document.querySelector('.title-1');
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

let textWrapper2 = document.querySelector('.title-2');
textWrapper2.innerHTML = textWrapper2.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

let textWrapper3 = document.querySelector('.title-3');
textWrapper3.innerHTML = textWrapper3.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

let tl = gsap.timeline();

tl.to('.title-1 .letter', {
  opacity: 1,
  y: '0',
  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  stagger: '.03',
});
tl.to(
  '.title-2 .letter',
  {
    opacity: 1,
    y: '0',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    stagger: '.03',
  },
  '-=.7'
);
tl.to(
  '.title-3 .letter',
  {
    opacity: 1,
    y: '0',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    stagger: '.03',
  },
  '-=.7'
);
tl.from('p', { opacity: 0, y: '-50px' }, '-=.7');

tl.to(
  '.img',
  {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    ease: Back.easeOut.config(1.7),
    duration: 0.75,
  },
  '-=.5'
);

var myAnimation = new hoverEffect({
  parent: document.querySelector('.img'),
  intensity: 0.3,
  image1: 'https://assets.codepen.io/2621168/abstract1.jpg',
  image2: 'https://assets.codepen.io/2621168/abstract2.jpg',
  displacementImage: 'https://assets.codepen.io/2621168/dis.png',
});

let title = document.querySelector('.container');
let img = document.querySelector('.img');
let cursorCircle = document.querySelector('.cursor');

let cursor = {
  x: 0,
  y: 0,
};

document.addEventListener('mousemove', (e) => {
  cursor.x = -e.clientX * 0.1;
  cursor.y = -e.clientY * 0.1;

  img.style.transform = `translate(${cursor.x}px, ${cursor.y}px)`;
  // cursorCircle.style.transform = `translate(${
  //   e.clientX - cursorCircle.offsetWidth / 2
  // }px, ${e.clientY - cursorCircle.offsetHeight / 2}px)`;

  cursorCircle.style.left = e.clientX - cursorCircle.offsetWidth / 2 + 'px';
  cursorCircle.style.top = e.clientY - cursorCircle.offsetHeight / 2 + 'px';
});
