var cacheName = "perri-v3";
var filesToCache = [
    "/",
    "/index.html",
    "/signup.html",
    "/gallery.html",
    "/js/app.js",
    "/js/jquery-3.1.1.min.js",
    "/js/Regiones.js",
    "/js/sign-up.js",
    "/js/slider.min.js",
    "/js/validarRegistro.js",
    "/js/dogges.js",
    "/css/main.css",
    "/css/gallery-style.css",
    "/css/menu-style.css",
    "/css/phone.css",
    "/css/signup-style.css",
    "/css/slider.css",
    "/img/display/dog-1.jpg",
    "/img/display/dog-2.jpg",
    "/img/display/dog-3.jpg",
    "/img/display/dog-4.jpg",
    "/img/blanco.png",
    "/img/negro.png",
    "/img/rojo.png",
    "/img/vet-1.jpg",
];

self.addEventListener( 'install', function( e ) {
    console.log( '[ServiceWorker] Install' );
    e.waitUntil(
        caches.open( cacheName ).then( function( cache ) {
            console.log( '[ServiceWorker] Caching app shell' );
            return cache.addAll( filesToCache );
        } )
    );
} );

self.addEventListener( 'activate', function( e ) {
    console.log( '[ServiceWorker] Activate' );
    e.waitUntil(
        caches.keys( ).then( function( keyList ) {
            return Promise.all( keyList.map( function( key ) {
                if ( key != cacheName ) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete( key );
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener( 'fetch', function( e ) {
    console.log( '[ServiceWorker] Fetch', e.request.url );
    e.respondWith(
        caches.match( e.request ).then( function( response ) {
            return response || fetch( e.request );
        } )
    );
} );