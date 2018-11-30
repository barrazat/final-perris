(  function() {
    var app = {
        estadoPerro: document.getElementById( "estadoPerro" ),
        perroList: [],
    }

    var loadData = function() {
        var xhttp = new XMLHttpRequest();
        var url = "http://127.0.0.1:8000/perros/";

        xhttp.onreadystatechange = function() {
            if( this.readyState == 4 && this.status == 200 ){
                console.log( this.responseText );
                var data = JSON.parse( this.responseText );
                displayPerros( data);
                app.perroList = data;
                localStorage.setItem('perros',JSON.stringify(data));
            }
        }
        xhttp.open( 'GET', url, true );
        xhttp.send();
    }

    var displayPerros = function( perros ) {
        var galeria = document.getElementById( "galeria");
        galeria.innerHTML = "";

        for( let perro of perros ) {
            var perroContainer = document.createElement( "figure" );
            var foto = document.createElement( "img" );
            var txtperroName = document.createElement( "h2" );
            var txtperroRaza = document.createElement("p");
            var txtperroDescription = document.createElement( "p" );
            var txtperroEstado = document.createElement( "p" );
            perroContainer.className = "perroContainer";
            txtperroName.innerHTML = perro.nombre;
            foto.src = perro.foto;
            foto.alt = perro.nombre;
            txtperroRaza.innerHTML="<b>Raza: </b>" + perro.raza;
            txtperroDescription.innerHTML = "<b>Descripción: </b>" + perro.descripcion;
            txtperroEstado.innerHTML = "<b>Estado: </b>" + perro.estado;

            perroContainer.appendChild( foto );
            perroContainer.appendChild( txtperroName );            
            perroContainer.appendChild( txtperroRaza );
            perroContainer.appendChild( txtperroDescription );
            perroContainer.appendChild( txtperroEstado );

            galeria.appendChild( perroContainer );
        }
    }

    app.estadoPerro.addEventListener( "change", function( e ) {
        var filteredPerros = app.perroList.filter( function( perro ) {
            if( perro.estado == app.estadoPerro.value ) {
                return perro;
            }
        } );
        displayPerros( filteredPerros );
    } );
    
    loadData();
} ) ( );