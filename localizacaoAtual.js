document.addEventListener('DOMContentLoaded', () =>{
    if(!('geolocation' in navigator)){
        alert('Navegador nao suporta')
    } else {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    
})
const showPosition = local => {
    const latitude = local.coords.latitude;
    const longitude = local.coords.longitude;


    console.log(latitude)
    document.getElementById("location").innerHTML = "<span>Latitude: </span>" + latitude + " <span>Logitude: </span>" + longitude;

    // LEAFLET
    const mapOption = {
        center: [latitude, longitude],
        zoom: 16
    }
    const map = new L.map('map', mapOption);

    // CAMADA
    const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');


    //Adicionar camada ao mapa
    map.addLayer(layer)


    // Marcador
    const marker = new L.Marker([latitude, longitude]);
    marker.addTo(map).bindPopup('Você está aqui!').openPopup();
}

