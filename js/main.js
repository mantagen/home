var $ = require('jquery'),
    base64 = require('./appScriptFiles/base64.js'),
    fibonacci = require('./appScriptFiles/fibonacci.js'),
    vigenere = require('./appScriptFiles/vigenere.js'),
    haversine = require('./appScriptFiles/haversine.js'),
    cookieScripts = require('./cookieScripts.js'),
    leaflet = require('leaflet'),
    map;

function hideDropdownDivs() {
  $('#base64Drop').hide();
  $('#base64Result').hide();
  $('#fibonacciDrop').hide();
  $('#fibonacciResult').hide();
  $('#vigenereDrop').hide();
  $('#vigenereResult').hide();
  $('#haversineDrop').hide();
  $('#haversineResult').hide();
}

function makeMap() {
  map = leaflet.map('leaflet').setView([51.505, -0.09], 13);
  var popup = leaflet.popup();

  leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: "wallcrawler.90e45220",
    accessToken: "pk.eyJ1Ijoid2FsbGNyYXdsZXIiLCJhIjoiZjU1OTRlMjJjNDQ3ZTU4MzdlM2U3NTQwMmJkYjM0MjkifQ.PZGNCUHmnpf8_d8GQOuYdA"
  }).addTo(map);

  var arr = [{}, {
      lat: 0,
      lon: 0
    }];

  map.on('click', onMapClick);

  function updateCoordinates(x) {
    arr[0] = arr[1];
    arr[1] = {
      lat: Number(x.lat),
      lon: Number(x.lng)
    };
  }

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent(e.latlng.toString())
      .openOn(map);
    updateCoordinates(e.latlng);
    console.log(haversine.leafletHav(arr));
  }
}

window.onload = function () {

  hideDropdownDivs();
  cookieScripts.cookieCheck();

};

$('#jumbotron div:first-child').click(function(){
  window.location = "/analytics";
});

//enter key support
$('#userInputEnc').keypress(function(e){
  if(e.keyCode === 13) {
    $('#button1').click();
  }
});

$('#userInputDec').keypress(function(e){
  if(e.keyCode === 13) {
    $('#button2').click();
  }
});

$('#fiboInput').keypress(function(e){
  if(e.keyCode === 13) {
    $('#buttonFib').click();
  }
});

$('#vigMesEnc, #vigPasEnc').keypress(function(e){
  if(e.keyCode === 13) {
    $('#buttonVigEnc').click();
  }
});

$('#vigMesDec, #vigPasDec').keypress(function(e){
  if(e.keyCode === 13) {
    $('#buttonVigDec').click();
  }
});

$('.inputHav').keypress(function(e){
  if(e.keyCode === 13) {
    $('#buttonHav').click();
  }
});

//hatch color change
$('.hatch').hover(function() {
  $(this).addClass('plink');
  $(this).stop().animate({paddingBottom: '+=10px'}, 'fast');
}, function() {
  $(this).removeClass('plink');
  $(this).stop().animate({paddingBottom: '-=10px'}, 'fast');
});

//input divs
$('#base64Hatch').click(function() {
  $('#base64Drop').fadeToggle('slow');
});
$('#fibonacciHatch').click(function() {
  $('#fibonacciDrop').fadeToggle('slow');
});
$('#vigenereHatch').click(function() {
  $('#vigenereDrop').fadeToggle('slow');
});
$('#haversineHatch').click(function() {
  if(map) {
    map.remove();
  }
  $('#haversineDrop').fadeToggle('slow', function() {
    makeMap();
  });
});

//result divs
$('#button1').click(function() {
  $('#base64Result').fadeIn('slow');
  $('#outBase').hide().html('<strong>' + base64.encode(document.getElementById('userInputEnc').value) + '</strong>').fadeIn('slow');
});

$('#button2').click(function() {
  $('#base64Result').fadeIn('slow');
  $('#outBase').hide().html('<strong>' + base64.decode(document.getElementById('userInputDec').value) + '</strong>').fadeIn('slow');
});

$('#buttonFib').click(function() {
  $('#fibonacciResult').fadeIn('slow');
  $('#outFib').hide().html('<strong>' + fibonacci.fibonacci(document.getElementById('fiboInput').value) + '</strong>').fadeIn('slow');
});

$('#buttonVigEnc').click(function() {
  $('#vigenereResult').fadeIn('slow');
  $('#outVig1').html('Your encoded super-secret string is:');
  $('#outVig2').hide().html('<strong>' +
    vigenere.encode(
      document.getElementById('vigMesEnc').value,
      document.getElementById('vigPasEnc').value
    ) + '</strong>').fadeIn('slow');
});

$('#buttonVigDec').click(function() {
  $('#vigenereResult').fadeIn('slow');
  $('#outVig1').html('Your decoded message is:');
  $('#outVig2').hide().html('<strong>' +
    vigenere.decode(
      document.getElementById('vigMesDec').value,
      document.getElementById('vigPasDec').value
    ) + '</strong>').fadeIn('slow');
});

$('#buttonHav').click(function() {
  $('#haversineResult').fadeIn('slow');
  $('#outHav1').html('Your points are apart by:');
  $('#outHav2').hide().html('<strong>' + 
    haversine.haversine(
      [
        document.getElementById('hav1.1').value, document.getElementById('hav1.2').value,
        document.getElementById('hav1.3').value, document.getElementById('hav2.1').value,
        document.getElementById('hav2.2').value, document.getElementById('hav2.3').value,
        document.getElementById('hav3.1').value, document.getElementById('hav3.2').value,
        document.getElementById('hav3.3').value, document.getElementById('hav4.1').value,
        document.getElementById('hav4.2').value, document.getElementById('hav4.3').value
      ],
      [
        document.getElementById('havC1').value, document.getElementById('havC2').value,
        document.getElementById('havC3').value, document.getElementById('havC4').value
      ]
    ) + '</strong>').fadeIn('slow');
});