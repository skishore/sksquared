function googleMapsCallback() {
  var elements = document.getElementsByClassName('map');
  if (elements.length !== 1) {
    throw Error('Expected 1 .map element; got: ' + elements.length);
  }
  var center = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(elements[0], {
    center: center,
    panControl: false,
    scaleControl: false,
    zoom: 4,
    zoomControl: false,
  });
  var marker = new google.maps.Marker({map: map, position: center});
}
