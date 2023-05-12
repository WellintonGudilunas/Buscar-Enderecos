document.addEventListener('DOMContentLoaded', () =>{
    if(!('geolocation' in navigator)){
        alert('Navegador nao suporta')
    } else {
        //navigator.geolocation.getCurrentPosition(showPosition);
    }
    
});
const inputEndereco = document.getElementById("inputEndereco");
inputEndereco.addEventListener('keypress', e => {
    if(e.keyCode == 13){
      showPosition();
    }
  }, false);

var map = null;
const showPosition = local => {
    // console.log("cheguei")
    const address = document.getElementById("inputEndereco").value;
    
    
    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    
    //console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.length > 0){
                const lat = data[0].lat;
                const lon = data[0].lon;
                
                //console.log(`FETCH... Latitude: ${lat}, Longitude: ${lon}`);

                document.getElementById("location").innerHTML = "<span>Latitude: </span>" + lat +
                 " <span>Logitude: </span>" + lon ;

                // LEAFLET
                const mapOption = {
                    center: [lat, lon],
                    zoom: 16
                }

                //console.log(map)
                
                if(map){
                    // console.log("IF");
                    map = map.remove();
                    map = L.map('map').setView([lat, lon], 16);
                } else {
                    // console.log("ELSE");
                    map = new L.map('map', mapOption);
                }
                
                // CAMADA
                const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
            
                //Adicionar camada ao mapa
                map.addLayer(layer)
            
                // Marcador
                const marker = new L.Marker([lat, lon]);
                marker.addTo(map).bindPopup('Você está aqui!').openPopup();
  
            } else {
                console.log("Nao encontrado");
                document.getElementById("location").innerHTML = `<span>Localização "${address}" Não encontrada!!!</span>`
        }
    })
}









google.charts.load('current', {'packages':['corechart'],
'language': 'pt'});

function desenharGraficos(){
    //linha
    let tabela = new google.visualization.arrayToDataTable([
        ['mes', 'Linha 1', 'Linha 2'],
        ['jan', 20, 580],
        ['fev', 40, 600],
        ['mar', 40, 600],
        ['abr', 40, 600],
        ['mai', 40, 600],
        ['jun', 600, 250],
        ['jul', 600, 250],
        ['ago', 40, 250],
        ['set', 40, 600],
        ['out', 40, 600],
        ['nov', 40, 600],
        ['dez', 20, 580]
    ]);
   

    let opcoes = {
        title: 'Sem título',
        legend: { position: 'right' },
        width: 650,
        height: 300,
        vAxis: {
            // axes: {
            //     y: {
            //         all: {
            //             range: {
            //                 max: 3000,
            //                 min: 500
            //             }
            //         }
            //     }
            // },
            // minValue: 100,
            // maxValue: 1500,
            viewWindow: {
                max: 1000,
                min:-60
            },
            format: 'currency'
        },
        curveType: 'function',
        lineWidth: 3,
    }


    let grafico = new google.visualization.LineChart(document.getElementById('graficoLinha'));
    grafico.draw(tabela, opcoes);

}


google.charts.setOnLoadCallback(desenharGraficos);					
	