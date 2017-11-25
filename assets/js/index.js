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
  prefixes.forEach(function(pre){slides.style[pre] = "translateX(-" + slides.children[0].offsetWidth * slideNum + "px)"});
  refreshNavButtons();
}

// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});


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
  if(isIntentional() && stopX > startX) decrementSlide();
  else if (isIntentional() && startX > stopX) incrementSlide();
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
  nav_inputs[index].checked = true;
  radioButtonOnChange();
}

var prevSlide = document.querySelector("label.prev-slide");
var nextSlide = document.querySelector("label.next-slide");

function refreshNavButtons() {
  var nav_inputs = $(".gallery input:radio[name='slide-btn']");
  var selected = $(".gallery input:radio[name='slide-btn']:checked");
  var selectedIndex = nav_inputs.index(selected);
  if (selectedIndex == 0) {
    prevSlide.classList.add('disabled');
    prevSlide.onclick = null;
  } else {
    prevSlide.classList.remove('disabled');
    prevSlide.onclick = changeSlide;
  }

  if (selectedIndex == nav_inputs.length - 1) {
    nextSlide.classList.add('disabled');
    nextSlide.onclick = null;
  } else {
    nextSlide.classList.remove('disabled');
    nextSlide.onclick = changeSlide;
  }
}

refreshNavButtons();

function decrementSlide() {
  if(slideNum === 0) {
    slideNum = numOfSlides;
  } else {
    slideNum = slideNum - 1;
  }
  checkRadioButton(slideNum);
}

function incrementSlide() {
  if(slideNum === numOfSlides) {
    slideNum = 0;
  } else {
    slideNum = slideNum + 1;
  }
  checkRadioButton(slideNum);
}

function changeSlide(event) {
  if ($(event.target).hasClass('prev-slide')) {
    decrementSlide();
  } else {
    incrementSlide();
  }
}

function contactForm(){
	$("#contact-submit").on('click',function() {
		$contact_form = $('#contact-form');
		
		var fields = $contact_form.serialize();
		
		$.ajax({
			type: "POST",
			url: "assets/php/contact.php",
			data: fields,
			dataType: 'json',
			success: function(response) {
				
				if(response.status){
					$('#contact-form input').val('');
					$('#contact-form textarea').val('');
				}
				
				$('#response').empty().html(response.html);
			}
		});
		return false;
	});
}

contactForm();

function switchNav() {
  var x = document.getElementById("topNav");
  if (x.className === "responsive") {
      x.className = "";
  } else {
      x.className = "responsive";
  }
}