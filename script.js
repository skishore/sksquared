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
  var destination = $('#content').scrollTop() + offset;
  $('#content').animate({scrollTop: destination}, 500, function() {
    setHash(hash);
  });
  return false;
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

$(window).on('load', function() {
  $('.smooth-scroll').on('click', smoothScroll);
  $('#content').on('scroll', updateActiveLink);
  updateActiveLink();
});
