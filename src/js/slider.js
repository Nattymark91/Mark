const dots = document.querySelectorAll(".dot");
items = document.querySelectorAll(".slider-item");
next = document.querySelector('.next');
prev = document.querySelector('.prev');
detailed = document.querySelectorAll(".detailed");

let index = 0;


 const activeSlide = n => {
  for (slide of items) {
    slide.classList.remove('active');
  }
  items[n].classList.add('active');

  for (dot of dots) {
    dot.classList.remove('active');
  }
  dots[n].classList.add('active');
 }

 const nextSlide = () => {
  if (index == items.length - 1) {
    index = 0;
    activeSlide(index);
  } else {
    index++;
    activeSlide(index);
  }
 }

 const prevSlide = () => {
  if (index == 0) {
    index = items.length - 1;
    activeSlide(index);
  } else {
    index--;
    activeSlide(index);
  }
 }
 
 next.addEventListener('click', nextSlide);
 prev.addEventListener('click', prevSlide);

 dots.forEach((el, indexDot) => {
  el.addEventListener('click', () => {
    index = indexDot;
    activeSlide(index);
  })
}); 

detailed.forEach((el) => {
  el.addEventListener('mouseover', () => {
    clearInterval(slideShow);
  })
  el.addEventListener('mouseout', () => {
    slideShow = setInterval(nextSlide, 5000);
  })
}); 

let slideShow = setInterval(nextSlide, 5000);