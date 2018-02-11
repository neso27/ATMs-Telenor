var x = document.getElementById("demo");

var atms = [
    {
        name: "Кнеза Михаила, Београд",
        coords: {lat:44.817750 ,lng:  20.457685},//Кнеза Михаила, Београд
        distance: 0
    },
    {
        name: "Зелени венац, Београд",
        coords: {lat: 44.815842,lng: 20.456508},//Зелени венац, Београд
        distance: 0
    },
    {
        name: "Краља Милана 25, Београд 11000",
        coords: {lat: 44.810507,lng: 20.463578},//Краља Милана 25, Београд 11000
        distance: 0
    },
    {
        name: "Краља Милана 50, Београд 11000",
        coords: {lat: 44.804174,lng: 20.465552},//Краља Милана 50, Београд 11000
        distance: 0
    },
    {
        name: "Максима Горког 19, Београд 11000",
        coords: {lat: 44.800764,lng:  20.476367},//Максима Горког 19, Београд 11000
        distance: 0
    },
    {
        name: "Булевар краља Александра 186, Београд 11000",
        coords: {lat: 44.802835,lng:  20.484178},//Булевар краља Александра 186, Београд 11000
        distance: 0
    },
    {
        name: "Миријевски венац 23, Београд 11160",
        coords: {lat: 44.792481,lng:  20.534303},//Миријевски венац 23, Београд 11160
        distance: 0
    },
    {
        name: "Заплањска 32, Београд",
        coords: {lat: 44.777585,lng:  20.490489},//Заплањска 32, Београд
        distance: 0
    },
    {
        name: "Војводе Степе 85, Beograd 162710, Београд 162710",
        coords: {lat: 44.776976,lng:  20.476584},//Војводе Степе 85, Beograd 162710, Београд 162710
        distance: 0
    },
    {
        name: "ulaz iz Bulevara Mihajla Pupina,Стари Меркатор, Палмира Тољатија 7, Београд 11070",
        coords: {lat: 44.844322,lng:  20.411504},//ulaz iz Bulevara Mihajla Pupina,Стари Меркатор, Палмира Тољатија 7, Београд 11070
        distance: 0
    },
    {
        name: "Зелени венац, Београд",
        coords: {lat: 44.843156,lng:  20.414050},//Јурија Гагарина 16, Београд
        distance: 0
    },
    {
        name: "Јурија Гагарина 16, Београд",
        coords: {lat: 44.812577,lng:  20.405324},//Јурија Гагарина 16, Београд
        distance: 0
    },
    {
        name: "Jurija Gagarina 28a, Београд",
        coords: {lat: 44.816859,lng:  20.385898},//Јурија Гагарина 16, Београд
        distance: 0
    }, 
    {
        name: "Партизанске авијације, Београд",
        coords: {lat: 44.826113,lng:  20.382808},//Јурија Гагарина 16, Београд
        distance: 0
    }, 
    {
        name: "TC Banjica, Паунова 24, Београд",
        coords: {lat: 44.765449,lng:  20.476192},//Јурија Гагарина 16, Београд
        distance: 0
    },
    {
        name: "Пожешка 79, Београд 11030",
        coords: {lat: 44.783241,lng:  20.412677},//Јурија Гагарина 16, Београд
        distance: 0
    }, 
    {
        name: "Аце Јоксимовића 2, Београд",
        coords: {lat: 44.766912,lng:  20.416110},//Јурија Гагарина 16, Београд
        distance: 0
    },
    {
        name: "Устаничка 170E, Београд, Београд",
        coords: {lat: 44.791282,lng:  20.500568},//Јурија Гагарина 16, Београд
        distance: 0
    },

];

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var latLng = new google.maps.LatLng(latitude, longitude);

    calculateDistances(latLng)
    atms.sort(function(a, b){return a.distance - b.distance});
    showATMsOnMap()
    initMap(latLng);


    x.innerHTML = "Latitude: " + latitude +
    "<br>Longitude: " + longitude;
}

function showATMsOnMap() {
    var html = "<ul>";
    for(var i = 0; i< 10; i++){
        var atm = atms[i];
        var atmHtml = "<li><h3>ATM</h3>" + atm.name + "<strong>&nbsp;&nbsp;&nbsp;Distance: " + Math.round(atm.distance) + "km</strong></li>";
        html += atmHtml;
    }
    html += "</ul>";
    document.getElementById("listOfATMs").innerHTML = html;
}

function hideLocation() {
    x.innerHTML = "Sorry, but you didn't allow geolocation usage on your device.";
}

function calculateDistances(latLng) {
    for(var i = 0; i< atms.length; i++){
        var atm = atms[i];
        atm.distance = distance(atm.coords.lat,atm.coords.lng,latLng.lat(),latLng.lng(),"K");
    }
}

function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

//MAP
function initMap(latLng){
    //Map options
    var options = {
        zoom:12,
        center:latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    //New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    //creates the marker for the location placer
    function createMarker(latLng) {
        var markerOptions = {
            position: latLng,
            map: map,
            animation: google.maps.Animation.DROP,
            clickable: true
        }
        var marker = new google.maps.Marker(markerOptions);
    }

    //Add Marker Function
    function addMarker(props){
        var image = 'https://www.telenor.rs/assets/img/icons/favicon.png';
        var marker = new google.maps.Marker({
            position: props.coords,
            icon: image,
            map:map
        });
    }

    //Loop through markers
    for(var i = 0; i< atms.length; i++){
        addMarker(atms[i]);
    }

    createMarker(latLng);

}
