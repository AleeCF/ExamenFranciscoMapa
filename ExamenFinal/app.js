
//Creaos la peticion al repositorio y mostramos la tabla al mismo tiempo trayendo directamente los datos de direccion, horario.. etc..

fetch('https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(obj => {
            var x = obj.properties.x;
            var y = obj.properties.y;

            var table = document.getElementById('tablalateral');
            var fila = table.insertRow(-1);

            var info = fila.insertCell(0);
            var informacion = '<b>' + obj.properties.nombre + '</b><br/>' +
                '' + obj.properties.horario + '<br/>' +
                '<span class="bg-secondary text-white">' + obj.properties.direccion + '</span>';
                info.innerHTML = informacion;


            var marker = L.marker([x, y]).addTo(map);

            var label = '<b>' + obj.properties.nombre + '</b><br/>' + obj.properties.direccion;
            marker.bindPopup(label);

            fila.addEventListener('click', function () {
                marker.openPopup();
                map.setView(marker.getLatLng(), 15);
            });


            //Creamos el modal que se abrira al pulsar un marcador

            marker.on('click', function () {
                $('#markerModalLabel').html(obj.properties.nombre);
                $('#markerInfo').html('<b>' + obj.properties.nombre + '</b><br/>' +
                    'Horario: ' + obj.properties.horario + '<br/>' +
                    'Dirección: ' + obj.properties.direccion);
                $('#markerModal').modal('show');
            });
        });
    });
