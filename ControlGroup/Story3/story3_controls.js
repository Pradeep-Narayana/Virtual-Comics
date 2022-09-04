import data from './data3_controls.js'
const container = document.querySelector('.slide-container')
const nextBtn = document.querySelector('.next-btn')
const prevBtn = document.querySelector('.prev-btn')
const leftBtn = document.querySelector('.left-btn')
const rightBtn = document.querySelector('.right-btn')

var startTime ;
var endTime;

// if length is 1 hide buttons
if (data.length === 1) {
  nextBtn.style.display = 'none'
  prevBtn.style.display = 'none'
}
// if length is 2, add copies of slides
let people = [...data]
if (data.length === 2) {
  people = [...data, ...data]
}
container.innerHTML = people
  .map((person, slideIndex) => {
    const { img, name, job, text } = person
    let position = 'next'
    if (slideIndex === 0) {
      position = 'active'
    }
    if (slideIndex === people.length - 1) {
        
      position = 'last'
    }
    if (data.length <= 1) {
      position = 'active'
    }
    
    return `<article class="slide ${position}">
  <img src=${img} class="img" alt="${name}"/>
  

 </article>`
  })
  .join('')
window.addEventListener('load', (event) => {
    startTime = new Date();
    console.log(startTime)
});

const startSlider = (type) => {
  // get all three slides active,last next
  const active = document.querySelector('.active')
  const last = document.querySelector('.last')
  let next = active.nextElementSibling
  if (!next) {
    document.getElementsByClassName('question')[0].style.visibility = 'visible'
    nextBtn.style.display = 'none'
    prevBtn.style.display = 'none'

    
  }
  active.classList.remove('active')
  last.classList.remove('last')
  next.classList.remove('next')

  if (type === 'prev') {
    active.classList.add('next')
    last.classList.add('active')
    next = last.previousElementSibling
    if (!next) {
      next = container.lastElementChild
    }
    next.classList.remove('next')
    next.classList.add('last')
    return
  }
  active.classList.add('last')
  last.classList.add('next')
  next.classList.add('active')
}
nextBtn.addEventListener('click', () => {
  startSlider()
})
prevBtn.addEventListener('click', () => {
  startSlider('prev')
})
leftBtn.addEventListener('click', () => {
  window.localStorage.setItem("story3_controls_response","Person1");
  getValues()
})
rightBtn.addEventListener('click', () => {
  window.localStorage.setItem("story3_controls_response","Person2");
  getValues()
})
const getValues =() =>{
  endTime = new Date();
  let timeElasped = (endTime - startTime)/1000;
  console.log(timeElasped)
  //window.location.href='story3_controls.html'
  window.localStorage.setItem("story3_controls",timeElasped);
  var keys = Object.keys(localStorage);
  var text = "";
  for(let i =0; i<keys.length; i++){
    text = text + " " + keys[i] + " : " + localStorage.getItem(keys[i])
  }
  var link = document.createElement('a');
  link.setAttribute('download', 'Control_Condition.txt');
  link.href = makeTextFile(text);
  document.body.appendChild(link);

  // wait for the link to be added to the document
  window.requestAnimationFrame(function () {
    var event = new MouseEvent('click');
    link.dispatchEvent(event);
    document.body.removeChild(link);
  });
}


var textFile = null;

const makeTextFile = (text) => {
  var data = new Blob([text], {type: 'text/plain'});

  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }

  textFile = window.URL.createObjectURL(data);

  // returns a URL you can use as a href
  return textFile;
};