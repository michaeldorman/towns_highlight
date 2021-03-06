var map = L.map('map').setView([32, 35], 8);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
$.getJSON("towns.geojson", function(data) {
  geojson = L.geoJson(data, {style: style, onEachFeature: onEachFeature}).addTo(map);
  $('#neighborhood li').on('mouseenter', function(e) {
        hovered_id = $(e.target).data('value');
    $(e.target).addClass("highlight");
    console.log(hovered_id);
        layer = geojson.getLayer(hovered_id); //your feature id here
        layer.setStyle(highlightStyle);
      }).on('mouseout', function(e){
          geojson.resetStyle(layer);
        $(e.target).removeClass("highlight");
        });
  });
var highlightStyle = {
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    }
var normalStyle = {
        weight: 1,
        opacity: 1,
        color: 'gray',
        fillOpacity: 0.25
}
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle(highlightStyle);
    $("li[data-value='" + x(layer._leaflet_id) + "']").addClass("highlight")[0].scrollIntoView();
}
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    $("li[data-value='" + x(e.target._leaflet_id) + "']").removeClass("highlight");
}
x = function addslashes(str) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}
function style(feature) {
    return {
        fillColor: 'red',
        weight: 1,
        opacity: 1,
        color: 'gray',
        fillOpacity: 0.25
    };
}
function onEachFeature(feature, layer) {
	name = feature.properties.name_heb;
 	$('#neighborhood').append('<li data-value="' + name + '">' + name + '</li>');
	layer._leaflet_id = name;
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}
