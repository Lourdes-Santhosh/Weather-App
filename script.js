let lat;
let lon;
// let location = document.getElementById("locationName");
let icon = document.getElementById("icon");
let description = document.getElementById("description");
let temperature = document.getElementById("temperature");
let minTemp = document.getElementById("minTemp");
let maxTemp = document.getElementById("maxTemp");
let windSpeed = document.getElementById("windSpeed");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        // console.log(lat, lon);
        let data = await getWeatherData(lat, lon);
        console.log(data)
        var map = L.map('map').setView([lat,lon], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        
        var marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(`<b>${data.name}</b>`).openPopup();

        map.on('click', async function(e) {
            const data = await getWeatherData(e.latlng.lat, e.latlng.lng);
            marker.setLatLng([e.latlng.lat, e.latlng.lng])
            marker.bindPopup(`<b>${data.name}</b>`).openPopup();
        });


        
        return data;
    })
}


async function getWeatherData(lat, lon) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f00db58cff7a680fb2c3914402e9835e`;

    let response = await fetch(api);
    // console.log(response);

    let data = await response.json();
    // console.log(lat, lon);

    // console.log(data);

    dataHandler(data);
    return data;
}

function dataHandler(data) {
    const {
        temp
    } = data.main;
    // const {description} = data.weather[0];
    const {
        temp_min
    } = data.main;
    const {
        temp_max
    } = data.main;
    const {
        speed
    } = data.wind;

    locationName.innerHTML = data.name;
    description.innerHTML = data.weather[0].description;
    temperature.innerHTML = temp;
    minTemp.innerHTML = "Min Temp: " + temp_min;
    maxTemp.innerHTML = "Max Temp: " + temp_max;
    windSpeed.innerHTML = "Wind Speed: " + speed;

}