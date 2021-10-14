async function windowActions() {

    const endpoint= 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

    const request = await fetch(endpoint)

    const restaurant = await request.json()

    function findMatches(wordToMatch, restaurant) {
        return restaurant.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.zip.match(regex) || place.name.match(regex)
        });
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function displayMatches(event) {
        const matchArray = findMatches(event.target.value, restaurant);
        const html = matchArray.map(place => {
            const regex = new RegExp(event.target.value, 'gi')
            const nameName = place.name
            const categoryName = place.category
            const addressName = place.address_line_1
            const cityName = place.city
            const zipName = place.zip
                
            return `
                <li>
                    <span class="name">${nameName}</span> 
                    <br>
                    <span class="name">${categoryName}</span>
                    <br>
                    <span class="name">${addressName}</span>
                    <br>
                    <span class="name">${cityName}</span>
                    <br>
                    <span class="name">${zipName}</span>
                    <br>
                </li>
            `;
        }).join('');
        suggestions.innerHTML = html;

    }

    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });    
    

}

function mapInit() {
    var mymap = L.map('mapid').setView([38.83986, -76.941642], 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZ3JhY2VvbmVpbGwiLCJhIjoiY2t1cTduM2Z1NHNtdjJvbW4wbHEydGx5biJ9.Hpd_XkD5gXm4Msqjq9Vv6Q'
    }).addTo(mymap);

    var marker = L.marker([38.8, -76.9]).addTo(mymap);

}



async function dataHandler() {
    const restaurant = await request.json()

    function findMatches(wordToMatch, restaurant) {
        return restaurant.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.zip.match(regex) || place.name.match(regex)
        });
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function displayMatches(event) {
        const matchArray = findMatches(event.target.value, restaurant);
        const html = matchArray.map(place => {
            const regex = new RegExp(event.target.value, 'gi')
            const nameName = place.name
            const categoryName = place.category
            const addressName = place.address_line_1
            const cityName = place.city
            const zipName = place.zip
                
            return `
                <li>
                    <span class="name">${nameName}</span> 
                    <br>
                    <span class="name">${categoryName}</span>
                    <br>
                    <span class="name">${addressName}</span>
                    <br>
                    <span class="name">${cityName}</span>
                    <br>
                    <span class="name">${zipName}</span>
                    <br>
                </li>
            `;
        }).join('');
        suggestions.innerHTML = html;

    }

    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });    
    

}
mapInit() 

window.onload = windowActions;