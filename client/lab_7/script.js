
const mymap = L.map('mapid').setView([38.83986, -76.941642], 11);


function mapInit() {


    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZ3JhY2VvbmVpbGwiLCJhIjoiY2t1cTduM2Z1NHNtdjJvbW4wbHEydGx5biJ9.Hpd_XkD5gXm4Msqjq9Vv6Q'
    }).addTo(mymap);

}

async function dataHandler() {
    const endpoint= 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

    const request = await fetch(endpoint)

    const restaurant = await request.json()

    function findMatches(wordToMatch, restaurant) {
        return restaurant.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.zip.match(regex)
        });
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    

    function displayMatches(event) {

        let markers = []

        const matchArray = findMatches(event.target.value, restaurant);
        let slicedMatch = matchArray.slice(0, 5);

        const html = slicedMatch.map(place => {
            const regex = new RegExp(event.target.value, 'gi')
            const nameName = place.name 
            const addressName = place.address_line_1
 
            if (place.hasOwnProperty('geocoded_column_1')) {
                const point = place.geocoded_column_1
                const latlong = point.coordinates
                const marker = latlong.reverse()

                markers.push(L.marker(marker).addTo(mymap))
       
            }

            return `
                <li>
                    <div class="box">
                        <span class="name"><b>${nameName}</b></span> 
                        <br>
                        <span class="name"> <em>${addressName}</em></span>
                        <br>
                    </div>
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
dataHandler()

window.onload = dataHandler;