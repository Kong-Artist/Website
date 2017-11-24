$modal = $('#myModal');

function openModal() {
  $modal.addClass('open').fadeIn(200);
}

function closeModal() {
  $modal.remove('open').fadeOut(200);
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}


var startX
var startZ
var stopX
var stopZ
var withinTime
var slideNum = 0
var slides = document.querySelector(".view")
var numOfSlides = slides.children.length - 1

function viewWidth() {
  if(document.width){
    return document.width;
  } else if (window.innerWidth) {
    return window.innerWidth
  } else {
    return document.documentElement.clientWidth
  }
}
function slideTo(index) {
  slideNum = index;
  var prefixes = ["webkitTransform", "oTransform", "mozTransform", "transform"]
  prefixes.forEach(function(pre){slides.style[pre] = "translateX(-" + slides.children[0].offsetWidth * slideNum + "px)"})
}

function isIntentional() {
  minDistance = Math.abs(startX - stopX) > (window.innerWidth / 35)
  withinTime = Math.abs(startZ - stopZ) < 500
  if(minDistance && withinTime) {
    return true;
  } else {
    return false;
  }
}

function getX(event) {
  if(event.clientX) {
    return event.clientX
  } else {
    return event.changedTouches[0].pageX
  }
}

function saveStart(event) {
  startX = getX(event)
  startZ = Date.now()
}

function saveStop(event) {
    stopX = getX(event)
    stopZ = Date.now()
  if(isIntentional() && stopX > startX) {
    if(slideNum === 0) {
      slideNum = numOfSlides
    } else {
      slideNum = slideNum - 1
    }
    checkRadioButton(slideNum);
  } else if (isIntentional() && startX > stopX) {
    if(slideNum === numOfSlides) {
      slideNum = 0
    } else {
      slideNum = slideNum + 1
    }
    checkRadioButton(slideNum);
  }
}

var slider_container = document.querySelector(".gallery")
slider_container.addEventListener('touchstart', function(event) {
  saveStart(event)
}, false)

slider_container.addEventListener('touchend', function(event) {
  saveStop(event)
}, false)

slider_container.addEventListener('mousedown', function(event) {
  saveStart(event)
}, false)

slider_container.addEventListener('mouseup', function(event) {
  saveStop(event)
}, false)
slider_container.addEventListener('touchmove', function(event){
  event.preventDefault()
})

function radioButtonOnChange(event) {
  var nav_inputs = $(".gallery input:radio[name='slide-btn']");
  var selected = $(".gallery input:radio[name='slide-btn']:checked");
  var selectedIndex = nav_inputs.index(selected);
  slideTo(selectedIndex);
}

function checkRadioButton(index) {
  var nav_inputs = $(".gallery input:radio[name='slide-btn']");
  var selectedIndex = nav_inputs[index].checked = true;
  radioButtonOnChange();
}