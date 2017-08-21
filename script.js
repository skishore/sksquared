var kNumDigits = 26;
var kStartTime = new Date(2018, 8, 15, 16, 0, 0).getTime();

var digit_states = [];
for (var i = 0; i < kNumDigits; i++) {
  digit_states.push(null);
}

function googleMapsCallback() {
  var elements = document.getElementsByClassName('map');
  if (elements.length !== 1) {
    throw Error('Expected 1 .map element; got: ' + elements.length);
  }
  var center = {lat: 38.9309749, lng: -77.246181};
  var map = new google.maps.Map(elements[0], {
    center: center,
    fullscreenControl: false,
    mapTypeControl: false,
    panControl: false,
    scaleControl: false,
    streetViewControl: false,
    zoom: 16,
    zoomControl: false,
  });
  var marker = new google.maps.Marker({map: map, position: center});
}

function setHash(value) {
  history && history.replaceState ?
      history.replaceState(undefined, undefined, '#' + value) :
      window.location.hash = value;
}

function smoothScroll(event) {
  event.preventDefault();
  var hash = $(this).attr('href').replace(/^.*?(#|$)/,'');
  var offset = $('#' + hash).offset().top;
  var body = $('body');
  var element = body.height() > 2 * window.innerHeight ? body : $('#content');
  var destination = element.scrollTop() + offset;
  element.animate({scrollTop: destination}, 500, function() {
    setHash(hash);
  });
  return false;
}

function startClock() {
  for (var i = 0; i < kNumDigits; i++) {
    var image = 'url("digits/' + (i + 3) + '.svg")';
    $('#clock').append($('<div>').css({'background-image': image}));
  }
  tick();
}

function tick() {
  var time = Math.floor((kStartTime - Date.now()) / 1000);
  var target = [];
  for (var i = 0; i < kNumDigits; i++) {
    target.push(time > 0 ? !!(time % 2) : false);
    time = Math.floor(time / 2);
  }
  var digits = $('#clock').children();
  for (var i = 0; i < kNumDigits; i++) {
    if (digit_states[i] !== target[i]) {
      $(digits[i]).css({opacity: target[i] ? 1.0 : 0.2});
      digit_states[i] = target[i];
    }
  }
  setTimeout(tick, 500);
}

function updateActiveLink() {
  var elements = $('.scroll-target');
  var midpoint = window.innerHeight / 2;
  for (var i = 0; i < elements.length; i++) {
    var element = $(elements[i]);
    if (element.offset().top + element.outerHeight() > midpoint) {
      var hash = element[0].id;
      var link = $('.smooth-scroll[href="#' + hash + '"]');
      if (!link.hasClass('active')) {
        $('.smooth-scroll').removeClass('active');
        link.addClass('active');
        setHash(hash);
      }
      break;
    }
  }
}

$(window).on('DOMContentLoaded', function() {
  $('.smooth-scroll').on('click', smoothScroll);
  $('#content').on('scroll', updateActiveLink);
  updateActiveLink();
  startClock();
});
